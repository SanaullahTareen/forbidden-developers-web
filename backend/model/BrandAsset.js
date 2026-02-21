const mongoose = require('mongoose');

const brandAssetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    type: {
        type: String,
        enum: ['ZIP', 'PDF', 'PNG', 'SVG', 'AI', 'Other'],
        default: 'PDF'
    },
    size: {
        type: String,
        default: ''
    },
    downloadUrl: {
        type: String,
        required: [true, 'Download URL is required']
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

brandAssetSchema.index({ order: 1 });

module.exports = mongoose.model('BrandAsset', brandAssetSchema);
