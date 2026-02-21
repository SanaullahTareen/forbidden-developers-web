const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    icon: {
        type: String,
        required: [true, 'Icon is required'],
        default: 'Code'
    },
    tags: [{
        type: String,
        trim: true
    }],
    color: {
        type: String,
        default: 'from-violet-500 to-purple-600'
    },
    shadowColor: {
        type: String,
        default: 'shadow-violet-500/20'
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

serviceSchema.index({ order: 1 });

module.exports = mongoose.model('Service', serviceSchema);
