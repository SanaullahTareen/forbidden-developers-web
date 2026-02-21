const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    subtitle: {
        type: String,
        required: [true, 'Subtitle is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    image: {
        type: String,
        required: [true, 'Image URL is required']
    },
    tags: [{
        type: String,
        trim: true
    }],
    color: {
        type: String,
        default: 'violet'
    },
    year: {
        type: String,
        default: new Date().getFullYear().toString()
    },
    category: {
        type: String,
        enum: ['Web', 'Mobile', 'AI', 'Design', 'Other'],
        default: 'Web'
    },
    link: {
        type: String,
        default: ''
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

projectSchema.index({ order: 1 });

module.exports = mongoose.model('Project', projectSchema);
