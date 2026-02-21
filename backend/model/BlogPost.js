const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    excerpt: {
        type: String,
        required: [true, 'Excerpt is required']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    image: {
        type: String,
        required: [true, 'Image URL is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true
    },
    readTime: {
        type: String,
        default: '5 min read'
    },
    featured: {
        type: Boolean,
        default: false
    },
    tags: [{
        type: String,
        trim: true
    }],
    isPublished: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Generate slug from title before saving
blogPostSchema.pre('save', function (next) {
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
    if (this.isPublished && !this.publishedAt) {
        this.publishedAt = new Date();
    }
    next();
});

blogPostSchema.index({ slug: 1 });
blogPostSchema.index({ isPublished: 1, publishedAt: -1 });

module.exports = mongoose.model('BlogPost', blogPostSchema);
