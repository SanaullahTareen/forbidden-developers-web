const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    icon: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        required: true
    },
    content: [{
        type: String
    }],
    order: {
        type: Number,
        default: 0
    }
}, { _id: true });

const pageContentSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: [true, 'Slug is required'],
        unique: true,
        trim: true,
        lowercase: true
    },
    pageType: {
        type: String,
        enum: ['service', 'resource', 'legal', 'other'],
        required: true
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    subtitle: {
        type: String,
        default: ''
    },
    heroDescription: {
        type: String,
        default: ''
    },
    heroImage: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: 'blue'
    },
    sections: [sectionSchema],
    features: [{
        type: String
    }],
    technologies: [{
        name: String,
        icon: String
    }],
    process: [{
        step: String,
        title: String,
        description: String
    }],
    caseStudies: [{
        title: String,
        description: String,
        metric: String,
        metricLabel: String,
        image: String
    }],
    metaTitle: {
        type: String,
        default: ''
    },
    metaDescription: {
        type: String,
        default: ''
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

pageContentSchema.index({ slug: 1, pageType: 1 });

module.exports = mongoose.model('PageContent', pageContentSchema);
