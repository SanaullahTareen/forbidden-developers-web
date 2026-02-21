const mongoose = require('mongoose');

const customQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['text', 'textarea', 'select', 'yesno'],
        default: 'text'
    },
    options: [{
        type: String
    }],
    required: {
        type: Boolean,
        default: false
    }
}, { _id: false });

const careerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true
    },
    type: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
        default: 'Full-time'
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    requirements: [{
        type: String,
        trim: true
    }],
    tags: [{
        type: String,
        trim: true
    }],
    salary: {
        type: String,
        default: ''
    },
    customQuestions: [customQuestionSchema],
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

careerSchema.index({ order: 1, isActive: 1 });

module.exports = mongoose.model('Career', careerSchema);
