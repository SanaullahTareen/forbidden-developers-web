const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
    // Only one document should exist
    key: {
        type: String,
        default: 'main',
        unique: true
    },
    // Contact Information
    contactEmail: {
        type: String,
        default: 'hello@forbiddendev.com'
    },
    contactPhone: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: 'San Francisco, CA'
    },
    // Social Links
    socialLinks: {
        github: { type: String, default: '' },
        twitter: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        instagram: { type: String, default: '' },
        facebook: { type: String, default: '' },
        youtube: { type: String, default: '' }
    },
    // Company Info
    companyName: {
        type: String,
        default: 'Forbidden Dev'
    },
    tagline: {
        type: String,
        default: 'Premium development studio crafting exceptional digital experiences'
    },
    // Footer Text
    footerText: {
        type: String,
        default: 'Premium development studio crafting exceptional digital experiences for forward-thinking brands.'
    },
    copyrightText: {
        type: String,
        default: '© {year} Forbidden Dev. All rights reserved.'
    },
    // Press Contact
    pressEmail: {
        type: String,
        default: 'press@forbiddendev.com'
    },
    // Newsletter
    newsletterEnabled: {
        type: Boolean,
        default: true
    },
    // CTA Section
    ctaTitle: {
        type: String,
        default: 'Ready to build something amazing?'
    },
    ctaDescription: {
        type: String,
        default: "Let's turn your vision into reality. Get in touch for a free consultation."
    },
    ctaButtonText: {
        type: String,
        default: 'Start Your Project'
    },
    // Maintenance Mode
    maintenanceMode: {
        type: Boolean,
        default: false
    },
    maintenanceMessage: {
        type: String,
        default: 'We\'re making some improvements to give you a better experience. This won\'t take long – check back soon!'
    },
    // Google Analytics
    googleAnalyticsId: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Static method to get settings (creates default if not exists)
siteSettingsSchema.statics.getSettings = async function () {
    let settings = await this.findOne({ key: 'main' });
    if (!settings) {
        settings = await this.create({ key: 'main' });
    }
    return settings;
};

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
