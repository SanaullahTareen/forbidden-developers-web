const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const rateLimit = require('express-rate-limit');

// Rate limiter for support tickets - max 1 per 24 hours per IP
const ticketRateLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    max: 1, // Max 1 ticket per day
    message: {
        success: false,
        message: 'You can only submit one support ticket per day. Please try again tomorrow.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    // Use default keyGenerator (handles IPv6 properly)
    // Falls back to req.ip which express handles correctly
});

// Configure multer for resume uploads
const uploadsDir = path.join(__dirname, '../uploads/resumes');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// Import all models
const Service = require('../model/Service');
const Project = require('../model/Project');
const Stat = require('../model/Stat');
const Skill = require('../model/Skill');
const Testimonial = require('../model/Testimonial');
const Career = require('../model/Career');
const BlogPost = require('../model/BlogPost');
const PressRelease = require('../model/PressRelease');
const Award = require('../model/Award');
const BrandAsset = require('../model/BrandAsset');
const PageContent = require('../model/PageContent');
const SiteSettings = require('../model/SiteSettings');
const FAQ = require('../model/FAQ');
const SupportTicket = require('../model/SupportTicket');
const JobApplication = require('../model/JobApplication');
const NewsletterSubscriber = require('../model/NewsletterSubscriber');
const CaseStudy = require('../model/CaseStudy');
const TechSkill = require('../model/TechSkill');
const TrustedPartner = require('../model/TrustedPartner');

// ==================== SERVICES ====================
router.get('/services', async (req, res) => {
    try {
        const services = await Service.find({ isActive: true }).sort({ order: 1 });
        res.json({ success: true, data: services });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== PROJECTS ====================
router.get('/projects', async (req, res) => {
    try {
        const { category } = req.query;
        const filter = { isActive: true };
        if (category && category !== 'All') {
            filter.category = category;
        }
        const projects = await Project.find(filter).sort({ order: 1 });
        res.json({ success: true, data: projects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== STATS ====================
router.get('/stats', async (req, res) => {
    try {
        const stats = await Stat.find({ isActive: true }).sort({ order: 1 });
        res.json({ success: true, data: stats });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== SKILLS (Why Choose Us) ====================
router.get('/skills', async (req, res) => {
    try {
        const skills = await Skill.find({ isActive: true }).sort({ order: 1 });
        res.json({ success: true, data: skills });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== TECH SKILLS (Technology Stack) ====================
router.get('/tech-skills', async (req, res) => {
    try {
        const techSkills = await TechSkill.find({ isActive: true }).sort({ order: 1 });
        res.json({ success: true, data: techSkills });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== TRUSTED PARTNERS (Industry Leaders) ====================
router.get('/trusted-partners', async (req, res) => {
    try {
        const partners = await TrustedPartner.find({ isActive: true }).sort({ order: 1 });
        res.json({ success: true, data: partners });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== TESTIMONIALS ====================
router.get('/testimonials', async (req, res) => {
    try {
        const testimonials = await Testimonial.find({ isActive: true }).sort({ order: 1 });
        res.json({ success: true, data: testimonials });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== CAREERS ====================
router.get('/careers', async (req, res) => {
    try {
        const careers = await Career.find({ isActive: true }).sort({ order: 1 });
        res.json({ success: true, data: careers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/careers/:id', async (req, res) => {
    try {
        const career = await Career.findOne({ _id: req.params.id, isActive: true });
        if (!career) {
            return res.status(404).json({ success: false, message: 'Career not found' });
        }
        res.json({ success: true, data: career });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== BLOG POSTS ====================
router.get('/blog', async (req, res) => {
    try {
        const { category, featured, limit } = req.query;
        const filter = { isPublished: true };
        if (category && category !== 'All') {
            filter.category = category;
        }
        if (featured === 'true') {
            filter.featured = true;
        }

        let query = BlogPost.find(filter).sort({ publishedAt: -1 });
        if (limit) {
            query = query.limit(parseInt(limit));
        }

        const posts = await query;
        res.json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/blog/categories', async (req, res) => {
    try {
        const categories = await BlogPost.distinct('category', { isPublished: true });
        res.json({ success: true, data: ['All', ...categories] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/blog/:slug', async (req, res) => {
    try {
        const post = await BlogPost.findOne({ slug: req.params.slug, isPublished: true });
        if (!post) {
            return res.status(404).json({ success: false, message: 'Blog post not found' });
        }
        res.json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== PRESS RELEASES ====================
router.get('/press-releases', async (req, res) => {
    try {
        const releases = await PressRelease.find({ isActive: true }).sort({ publishedAt: -1 });
        res.json({ success: true, data: releases });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== AWARDS ====================
router.get('/awards', async (req, res) => {
    try {
        const awards = await Award.find({ isActive: true }).sort({ year: -1, order: 1 });
        res.json({ success: true, data: awards });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== BRAND ASSETS ====================
router.get('/brand-assets', async (req, res) => {
    try {
        const assets = await BrandAsset.find({ isActive: true }).sort({ order: 1 });
        res.json({ success: true, data: assets });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== PAGE CONTENT ====================
router.get('/pages/:slug', async (req, res) => {
    try {
        const page = await PageContent.findOne({ slug: req.params.slug, isPublished: true });
        if (!page) {
            return res.status(404).json({ success: false, message: 'Page not found' });
        }
        res.json({ success: true, data: page });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/pages/type/:pageType', async (req, res) => {
    try {
        const pages = await PageContent.find({ pageType: req.params.pageType, isPublished: true });
        res.json({ success: true, data: pages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== SITE SETTINGS ====================
router.get('/settings', async (req, res) => {
    try {
        const settings = await SiteSettings.getSettings();
        res.json({ success: true, data: settings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== FAQS ====================
router.get('/faqs', async (req, res) => {
    try {
        const faqs = await FAQ.find({ isActive: true }).sort({ category: 1, order: 1 });
        // Group by category
        const grouped = faqs.reduce((acc, faq) => {
            if (!acc[faq.category]) acc[faq.category] = [];
            acc[faq.category].push(faq);
            return acc;
        }, {});
        res.json({ success: true, data: faqs, grouped });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== SUPPORT TICKETS ====================
router.post('/support-tickets', ticketRateLimiter, async (req, res) => {
    try {
        const { name, subject, category, message, contactMethod, contactInfo, _timestamp } = req.body;

        // Validate required fields
        if (!name || !subject || !message || !contactMethod || !contactInfo) {
            return res.status(400).json({
                success: false,
                message: 'Name, subject, message, contact method and contact info are required'
            });
        }

        // Spam protection: Check if timestamp is reasonable (within last 5 minutes)
        if (_timestamp) {
            const submittedTime = parseInt(_timestamp);
            const now = Date.now();
            const fiveMinutesAgo = now - (5 * 60 * 1000);

            if (submittedTime < fiveMinutesAgo || submittedTime > now + 60000) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid submission. Please refresh the page and try again.'
                });
            }
        }

        // Spam protection: Check if this contact already submitted a ticket today (1 per day limit)
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const existingTicket = await SupportTicket.findOne({
            contactInfo: contactInfo,
            createdAt: { $gte: oneDayAgo }
        });

        if (existingTicket) {
            return res.status(400).json({
                success: false,
                message: 'You can only submit one support ticket per day. Please try again tomorrow or contact us directly.'
            });
        }

        const ticket = await SupportTicket.create({
            name,
            subject,
            category: category || 'general',
            message,
            contactMethod,
            contactInfo,
            ipAddress: req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip,
            userAgent: req.get('User-Agent')
        });

        res.status(201).json({
            success: true,
            data: { ticketId: ticket._id },
            message: 'Support ticket submitted successfully! We will contact you soon via your preferred method.'
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// ==================== JOB APPLICATIONS ====================
router.post('/job-applications', upload.single('resume'), async (req, res) => {
    try {
        const { jobId, jobTitle, name, email, phone, customAnswers, coverLetter, isGeneralSubmission } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Resume file is required' });
        }

        const resumeUrl = `/uploads/resumes/${req.file.filename}`;

        const application = await JobApplication.create({
            jobId: jobId || null,
            jobTitle,
            name,
            email,
            phone,
            customAnswers: customAnswers ? JSON.parse(customAnswers) : {},
            resumeUrl,
            resumeFilename: req.file.originalname,
            coverLetter,
            isGeneralSubmission: isGeneralSubmission === 'true' || false,
            ipAddress: req.ip,
            userAgent: req.get('User-Agent')
        });
        res.status(201).json({ success: true, data: application, message: 'Application submitted successfully!' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// ==================== NEWSLETTER ====================
router.post('/newsletter/subscribe', async (req, res) => {
    try {
        const { email, source } = req.body;

        // Check if already subscribed
        const existing = await NewsletterSubscriber.findOne({ email });
        if (existing) {
            if (existing.isActive) {
                return res.json({ success: true, message: 'You are already subscribed!' });
            }
            // Reactivate
            existing.isActive = true;
            existing.unsubscribedAt = null;
            await existing.save();
            return res.json({ success: true, message: 'Welcome back! You have been resubscribed.' });
        }

        await NewsletterSubscriber.create({
            email,
            source: source || 'blog',
            ipAddress: req.ip,
            userAgent: req.get('User-Agent')
        });
        res.status(201).json({ success: true, message: 'Successfully subscribed to our newsletter!' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// ==================== CASE STUDIES ====================
router.get('/case-studies', async (req, res) => {
    try {
        const caseStudies = await CaseStudy.find({ isActive: true }).sort({ order: 1 });
        res.json({ success: true, data: caseStudies });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/case-studies/:slug', async (req, res) => {
    try {
        const caseStudy = await CaseStudy.findOne({ slug: req.params.slug, isActive: true });
        if (!caseStudy) {
            return res.status(404).json({ success: false, message: 'Case study not found' });
        }
        res.json({ success: true, data: caseStudy });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== SINGLE BLOG POST ====================
router.get('/blog/:slug', async (req, res) => {
    try {
        const post = await BlogPost.findOne({ slug: req.params.slug, isPublished: true });
        if (!post) {
            return res.status(404).json({ success: false, message: 'Blog post not found' });
        }
        res.json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== SINGLE PROJECT ====================
router.get('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project || !project.isActive) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== SINGLE CAREER ====================
router.get('/careers/:id', async (req, res) => {
    try {
        const career = await Career.findById(req.params.id);
        if (!career || !career.isActive) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }
        res.json({ success: true, data: career });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
