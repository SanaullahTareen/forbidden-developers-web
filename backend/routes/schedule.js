const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const ScheduleCall = require('../model/ScheduleCall');
const { protect, adminOnly } = require('../middleware/auth');

// Validation rules
const scheduleValidation = [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
    body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('preferredTime').notEmpty().withMessage('Preferred time is required'),
    body('timezone').notEmpty().withMessage('Timezone is required'),
    body('company').optional().trim().isLength({ max: 100 }),
    body('topic').optional().trim().isLength({ max: 500 })
];

// @route   POST /api/schedule
// @desc    Submit schedule call form
// @access  Public
router.post('/', scheduleValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { name, email, phone, company, preferredTime, timezone, topic } = req.body;

        const scheduleCall = await ScheduleCall.create({
            name,
            email,
            phone,
            company,
            preferredTime,
            timezone,
            topic,
            ipAddress: req.ip,
            userAgent: req.get('User-Agent')
        });

        res.status(201).json({
            success: true,
            message: 'Call scheduled successfully! We\'ll call you at your preferred time.',
            data: { id: scheduleCall._id }
        });
    } catch (error) {
        console.error('Schedule call error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to schedule call. Please try again.'
        });
    }
});

// @route   GET /api/schedule
// @desc    Get all scheduled calls (admin only)
// @access  Private/Admin
router.get('/', protect, adminOnly, async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;

        const query = {};
        if (status) query.status = status;

        const scheduledCalls = await ScheduleCall.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await ScheduleCall.countDocuments(query);

        res.json({
            success: true,
            data: scheduledCalls,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Get scheduled calls error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch scheduled calls'
        });
    }
});

// @route   GET /api/schedule/:id
// @desc    Get single scheduled call
// @access  Private/Admin
router.get('/:id', protect, adminOnly, async (req, res) => {
    try {
        const scheduleCall = await ScheduleCall.findById(req.params.id);

        if (!scheduleCall) {
            return res.status(404).json({
                success: false,
                message: 'Scheduled call not found'
            });
        }

        res.json({ success: true, data: scheduleCall });
    } catch (error) {
        console.error('Get scheduled call error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch scheduled call'
        });
    }
});

// @route   PATCH /api/schedule/:id
// @desc    Update scheduled call status/notes
// @access  Private/Admin
router.patch('/:id', protect, adminOnly, async (req, res) => {
    try {
        const { status, notes, callDate } = req.body;

        const updateData = {};
        if (status) updateData.status = status;
        if (notes !== undefined) updateData.notes = notes;
        if (callDate) updateData.callDate = callDate;

        const scheduleCall = await ScheduleCall.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!scheduleCall) {
            return res.status(404).json({
                success: false,
                message: 'Scheduled call not found'
            });
        }

        res.json({ success: true, data: scheduleCall });
    } catch (error) {
        console.error('Update scheduled call error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update scheduled call'
        });
    }
});

// @route   DELETE /api/schedule/:id
// @desc    Delete scheduled call
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        const scheduleCall = await ScheduleCall.findByIdAndDelete(req.params.id);

        if (!scheduleCall) {
            return res.status(404).json({
                success: false,
                message: 'Scheduled call not found'
            });
        }

        res.json({ success: true, message: 'Scheduled call deleted successfully' });
    } catch (error) {
        console.error('Delete scheduled call error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete scheduled call'
        });
    }
});

module.exports = router;
