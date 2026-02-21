const mongoose = require('mongoose');

const pressReleaseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    excerpt: {
        type: String,
        required: [true, 'Excerpt is required']
    },
    content: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        required: [true, 'Image URL is required']
    },
    source: {
        type: String,
        required: [true, 'Source is required'],
        trim: true
    },
    link: {
        type: String,
        default: ''
    },
    publishedAt: {
        type: Date,
        default: Date.now
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

pressReleaseSchema.index({ publishedAt: -1 });

module.exports = mongoose.model('PressRelease', pressReleaseSchema);
