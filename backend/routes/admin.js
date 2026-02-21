const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Admin = require('../model/Admin');
const Contact = require('../model/Contact');
const ScheduleCall = require('../model/ScheduleCall');
const { protect, adminOnly } = require('../middleware/auth');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });
};

// @route   POST /api/admin/login
// @desc    Admin login with brute force protection
// @access  Public
router.post('/login', [
    body('email').trim().isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        // Check if admin exists (include security fields)
        const admin = await Admin.findOne({ email, isActive: true })
            .select('+password +loginAttempts +lockUntil');

        if (!admin) {
            // Generic message to prevent user enumeration
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check if account is locked
        if (admin.isLocked) {
            const lockTimeRemaining = Math.ceil((admin.lockUntil - Date.now()) / 60000);
            return res.status(423).json({
                success: false,
                message: `Account is temporarily locked. Please try again in ${lockTimeRemaining} minutes.`
            });
        }

        // Check password
        const isMatch = await admin.comparePassword(password);

        if (!isMatch) {
            // Increment login attempts on failed login
            await admin.incLoginAttempts();

            // Check if this attempt causes a lock
            const updatedAdmin = await Admin.findById(admin._id).select('+loginAttempts +lockUntil');

            if (updatedAdmin.isLocked) {
                return res.status(423).json({
                    success: false,
                    message: 'Too many failed login attempts. Account is locked for 30 minutes.'
                });
            }

            const remainingAttempts = 5 - (updatedAdmin.loginAttempts || 0);
            return res.status(401).json({
                success: false,
                message: `Invalid credentials. ${remainingAttempts} attempts remaining.`
            });
        }

        // Reset login attempts on successful login
        await admin.resetLoginAttempts();

        // Generate token with shorter expiry for better security
        const token = generateToken(admin._id);

        // Set token in HTTP-only cookie for better security
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                token, // Also return in body for mobile apps
                admin: {
                    id: admin._id,
                    email: admin.email,
                    name: admin.name,
                    role: admin.role
                }
            }
        });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed. Please try again.'
        });
    }
});

// @route   GET /api/admin/me
// @desc    Get current admin profile
// @access  Private
router.get('/me', protect, async (req, res) => {
    try {
        res.json({
            success: true,
            data: {
                id: req.admin._id,
                email: req.admin.email,
                name: req.admin.name,
                role: req.admin.role,
                lastLogin: req.admin.lastLogin
            }
        });
    } catch (error) {
        console.error('Get admin profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch profile'
        });
    }
});

// @route   GET /api/admin/dashboard
// @desc    Get dashboard stats
// @access  Private/Admin
router.get('/dashboard', protect, adminOnly, async (req, res) => {
    try {
        // Get counts
        const [
            totalContacts,
            newContacts,
            totalScheduledCalls,
            pendingCalls
        ] = await Promise.all([
            Contact.countDocuments(),
            Contact.countDocuments({ status: 'new' }),
            ScheduleCall.countDocuments(),
            ScheduleCall.countDocuments({ status: 'pending' })
        ]);

        // Get recent submissions
        const [recentContacts, recentCalls] = await Promise.all([
            Contact.find().sort({ createdAt: -1 }).limit(5).select('name email status createdAt'),
            ScheduleCall.find().sort({ createdAt: -1 }).limit(5).select('name email preferredTime status createdAt')
        ]);

        res.json({
            success: true,
            data: {
                stats: {
                    totalContacts,
                    newContacts,
                    totalScheduledCalls,
                    pendingCalls
                },
                recentContacts,
                recentCalls
            }
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch dashboard data'
        });
    }
});

// @route   POST /api/admin/create
// @desc    Create new admin (superadmin only)
// @access  Private/Superadmin
router.post('/create', protect, [
    body('email').trim().isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name').trim().notEmpty().withMessage('Name is required')
], async (req, res) => {
    try {
        // Only superadmin can create new admins
        if (req.admin.role !== 'superadmin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to create admins'
            });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { email, password, name, role } = req.body;

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: 'Admin with this email already exists'
            });
        }

        const admin = await Admin.create({
            email,
            password,
            name,
            role: role || 'admin'
        });

        res.status(201).json({
            success: true,
            message: 'Admin created successfully',
            data: {
                id: admin._id,
                email: admin.email,
                name: admin.name,
                role: admin.role
            }
        });
    } catch (error) {
        console.error('Create admin error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create admin'
        });
    }
});

// @route   POST /api/admin/setup
// @desc    Initial setup - create first superadmin (only works if no admins exist)
// @access  Public (only works once)
router.post('/setup', [
    body('email').trim().isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name').trim().notEmpty().withMessage('Name is required')
], async (req, res) => {
    try {
        // Check if any admin exists
        const adminCount = await Admin.countDocuments();
        if (adminCount > 0) {
            return res.status(400).json({
                success: false,
                message: 'Setup already completed. Use login instead.'
            });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { email, password, name } = req.body;

        const admin = await Admin.create({
            email,
            password,
            name,
            role: 'superadmin'
        });

        const token = generateToken(admin._id);

        res.status(201).json({
            success: true,
            message: 'Superadmin created successfully',
            data: {
                token,
                admin: {
                    id: admin._id,
                    email: admin.email,
                    name: admin.name,
                    role: admin.role
                }
            }
        });
    } catch (error) {
        console.error('Admin setup error:', error);
        res.status(500).json({
            success: false,
            message: 'Setup failed. Please try again.'
        });
    }
});

module.exports = router;
