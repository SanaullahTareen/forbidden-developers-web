const mongoose = require('mongoose');

const newsletterSubscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    source: {
        type: String,
        enum: ['blog', 'footer', 'popup', 'other'],
        default: 'blog'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    },
    unsubscribedAt: {
        type: Date
    },
    ipAddress: String,
    userAgent: String
}, {
    timestamps: true
});

module.exports = mongoose.model('NewsletterSubscriber', newsletterSubscriberSchema);
