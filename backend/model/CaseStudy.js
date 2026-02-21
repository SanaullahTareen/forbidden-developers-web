const mongoose = require('mongoose');

const caseStudySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    slug: {
        type: String,
        unique: true,
        trim: true
    },
    client: {
        type: String,
        trim: true
    },
    industry: {
        type: String,
        trim: true
    },
    duration: {
        type: String,
        trim: true
    },
    excerpt: {
        type: String,
        required: true,
        maxlength: 500
    },
    challenge: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true
    },
    results: {
        type: String,
        required: true
    },
    testimonial: {
        quote: String,
        author: String,
        role: String
    },
    image: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    metrics: [{
        label: String,
        value: String
    }],
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Generate slug before saving
caseStudySchema.pre('save', function (next) {
    if (!this.slug) {
        this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    next();
});

module.exports = mongoose.model('CaseStudy', caseStudySchema);
