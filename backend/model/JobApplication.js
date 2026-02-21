const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
    // Job reference
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Career',
        required: false // null for general submissions
    },
    jobTitle: {
        type: String,
        required: false
    },

    // Applicant info
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true
    },

    // Custom question answers (stored as key-value pairs)
    customAnswers: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        default: {}
    },

    // Resume file
    resumeUrl: {
        type: String,
        required: true
    },
    resumeFilename: {
        type: String,
        required: true
    },

    // Cover letter (optional)
    coverLetter: {
        type: String,
        maxlength: 5000
    },

    // Status tracking
    status: {
        type: String,
        enum: ['new', 'reviewing', 'shortlisted', 'interviewed', 'rejected', 'hired'],
        default: 'new'
    },

    // Admin notes
    notes: {
        type: String
    },

    // Metadata
    ipAddress: String,
    userAgent: String,
    isGeneralSubmission: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Index for efficient queries
jobApplicationSchema.index({ jobId: 1, status: 1 });
jobApplicationSchema.index({ email: 1 });
jobApplicationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
