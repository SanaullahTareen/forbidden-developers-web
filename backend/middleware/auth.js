const jwt = require('jsonwebtoken');
const Admin = require('../model/Admin');

// Protect routes - verify JWT token
const protect = async (req, res, next) => {
    try {
        let token;

        // Check for Bearer token in header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        // Also check for token in HTTP-only cookie
        else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized - No token provided'
            });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get admin from token
            const admin = await Admin.findById(decoded.id);

            if (!admin) {
                return res.status(401).json({
                    success: false,
                    message: 'Not authorized - Admin not found'
                });
            }

            if (!admin.isActive) {
                return res.status(401).json({
                    success: false,
                    message: 'Account has been deactivated'
                });
            }

            // Check if password was changed after token was issued
            if (admin.changedPasswordAfter && admin.changedPasswordAfter(decoded.iat)) {
                return res.status(401).json({
                    success: false,
                    message: 'Password recently changed. Please log in again.'
                });
            }

            req.admin = admin;
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: 'Token expired. Please log in again.'
                });
            }
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid token. Please log in again.'
                });
            }
            return res.status(401).json({
                success: false,
                message: 'Not authorized - Invalid token'
            });
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Admin only middleware
const adminOnly = (req, res, next) => {
    if (req.admin && (req.admin.role === 'admin' || req.admin.role === 'superadmin')) {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: 'Not authorized - Admin access required'
        });
    }
};

// Superadmin only middleware
const superadminOnly = (req, res, next) => {
    if (req.admin && req.admin.role === 'superadmin') {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: 'Not authorized - Superadmin access required'
        });
    }
};

module.exports = { protect, adminOnly, superadminOnly };
