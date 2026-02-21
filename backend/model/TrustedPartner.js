const mongoose = require('mongoose');

const trustedPartnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Partner name is required'],
        trim: true
    },
    website: {
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

trustedPartnerSchema.index({ order: 1, isActive: 1 });

module.exports = mongoose.model('TrustedPartner', trustedPartnerSchema);
