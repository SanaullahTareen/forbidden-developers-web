const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema({
    // User info
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },

    // Contact preference
    contactMethod: {
        type: String,
        enum: ['email', 'phone', 'whatsapp'],
        required: true,
        default: 'email'
    },
    contactInfo: {
        type: String,
        required: true,
        trim: true
    },

    // Ticket details
    subject: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    category: {
        type: String,
        enum: ['general', 'technical', 'billing', 'feature', 'other'],
        default: 'general'
    },
    message: {
        type: String,
        required: true,
        maxlength: 5000
    },

    // Status
    status: {
        type: String,
        enum: ['open', 'in-progress', 'resolved', 'closed'],
        default: 'open'
    },

    // Admin response
    adminNotes: {
        type: String
    },
    resolvedAt: {
        type: Date
    },

    // Metadata
    ipAddress: String,
    userAgent: String
}, {
    timestamps: true
});

supportTicketSchema.index({ status: 1, createdAt: -1 });
supportTicketSchema.index({ email: 1 });

module.exports = mongoose.model('SupportTicket', supportTicketSchema);
