const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        trim: true
    },
    company: {
        type: String,
        required: [true, 'Company is required'],
        trim: true
    },
    image: {
        type: String,
        default: 'https://i.pravatar.cc/150'
    },
    content: {
        type: String,
        required: [true, 'Testimonial content is required']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
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

testimonialSchema.index({ order: 1 });

module.exports = mongoose.model('Testimonial', testimonialSchema);
