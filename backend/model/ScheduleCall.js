const mongoose = require('mongoose');

const scheduleCallSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },
    company: {
        type: String,
        trim: true,
        maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    preferredTime: {
        type: String,
        required: [true, 'Preferred time is required'],
        enum: [
            '9:00 AM - 10:00 AM',
            '10:00 AM - 11:00 AM',
            '11:00 AM - 12:00 PM',
            '2:00 PM - 3:00 PM',
            '3:00 PM - 4:00 PM',
            '4:00 PM - 5:00 PM'
        ]
    },
    timezone: {
        type: String,
        required: [true, 'Timezone is required']
        // Accepts any timezone string from frontend
    },
    topic: {
        type: String,
        trim: true,
        maxlength: [500, 'Topic cannot exceed 500 characters']
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no-show'],
        default: 'pending'
    },
    callDate: {
        type: Date
    },
    notes: {
        type: String,
        trim: true
    },
    ipAddress: {
        type: String
    },
    userAgent: {
        type: String
    }
}, {
    timestamps: true
});

// Index for faster queries
scheduleCallSchema.index({ status: 1, createdAt: -1 });
scheduleCallSchema.index({ email: 1 });
scheduleCallSchema.index({ callDate: 1 });

module.exports = mongoose.model('ScheduleCall', scheduleCallSchema);
