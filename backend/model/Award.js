const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    organization: {
        type: String,
        required: [true, 'Organization is required'],
        trim: true
    },
    year: {
        type: String,
        required: [true, 'Year is required']
    },
    description: {
        type: String,
        default: ''
    },
    image: {
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

awardSchema.index({ year: -1, order: 1 });

module.exports = mongoose.model('Award', awardSchema);
