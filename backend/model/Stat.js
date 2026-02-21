const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
    value: {
        type: Number,
        required: [true, 'Value is required']
    },
    suffix: {
        type: String,
        default: '+'
    },
    label: {
        type: String,
        required: [true, 'Label is required'],
        trim: true
    },
    description: {
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

statSchema.index({ order: 1 });

module.exports = mongoose.model('Stat', statSchema);
