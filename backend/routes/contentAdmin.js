const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { protect, adminOnly } = require('../middleware/auth');

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

// Generic CRUD factory for simple models
const createCRUDRoutes = (Model, modelName) => {
    const routes = express.Router();

    // GET all (including inactive for admin)
    routes.get('/', protect, async (req, res) => {
        try {
            const items = await Model.find().sort({ order: 1, createdAt: -1 });
            res.json({ success: true, data: items });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });

    // GET single
    routes.get('/:id', protect, async (req, res) => {
        try {
            const item = await Model.findById(req.params.id);
            if (!item) {
                return res.status(404).json({ success: false, message: `${modelName} not found` });
            }
            res.json({ success: true, data: item });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });

    // CREATE
    routes.post('/', protect, async (req, res) => {
        try {
            const item = await Model.create(req.body);
            res.status(201).json({ success: true, data: item, message: `${modelName} created successfully` });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    });

    // UPDATE
    routes.put('/:id', protect, async (req, res) => {
        try {
            const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!item) {
                return res.status(404).json({ success: false, message: `${modelName} not found` });
            }
            res.json({ success: true, data: item, message: `${modelName} updated successfully` });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    });

    // DELETE
    routes.delete('/:id', protect, async (req, res) => {
        try {
            const item = await Model.findByIdAndDelete(req.params.id);
            if (!item) {
                return res.status(404).json({ success: false, message: `${modelName} not found` });
            }
            res.json({ success: true, message: `${modelName} deleted successfully` });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });

    // REORDER (update order field)
    routes.post('/reorder', protect, async (req, res) => {
        try {
            const { items } = req.body; // Array of { id, order }
            const bulkOps = items.map(item => ({
                updateOne: {
                    filter: { _id: item.id },
                    update: { order: item.order }
                }
            }));
            await Model.bulkWrite(bulkOps);
            res.json({ success: true, message: 'Order updated successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });

    // TOGGLE active status
    routes.patch('/:id/toggle', protect, async (req, res) => {
        try {
            const item = await Model.findById(req.params.id);
            if (!item) {
                return res.status(404).json({ success: false, message: `${modelName} not found` });
            }
            item.isActive = !item.isActive;
            await item.save();
            res.json({ success: true, data: item, message: `${modelName} ${item.isActive ? 'activated' : 'deactivated'}` });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });

    return routes;
};

// Apply CRUD routes
router.use('/services', createCRUDRoutes(Service, 'Service'));
router.use('/projects', createCRUDRoutes(Project, 'Project'));
router.use('/stats', createCRUDRoutes(Stat, 'Stat'));
router.use('/skills', createCRUDRoutes(Skill, 'Skill'));
router.use('/tech-skills', createCRUDRoutes(TechSkill, 'Tech Skill'));
router.use('/trusted-partners', createCRUDRoutes(TrustedPartner, 'Trusted Partner'));
router.use('/testimonials', createCRUDRoutes(Testimonial, 'Testimonial'));
router.use('/careers', createCRUDRoutes(Career, 'Career'));
router.use('/press-releases', createCRUDRoutes(PressRelease, 'Press Release'));
router.use('/awards', createCRUDRoutes(Award, 'Award'));
router.use('/brand-assets', createCRUDRoutes(BrandAsset, 'Brand Asset'));
router.use('/faqs', createCRUDRoutes(FAQ, 'FAQ'));
router.use('/case-studies', createCRUDRoutes(CaseStudy, 'Case Study'));

// ==================== BLOG POSTS (Custom routes with publish) ====================
router.get('/blog', protect, async (req, res) => {
    try {
        const posts = await BlogPost.find().sort({ createdAt: -1 });
        res.json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/blog/:id', protect, async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Blog post not found' });
        }
        res.json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/blog', protect, async (req, res) => {
    try {
        const post = await BlogPost.create(req.body);
        res.status(201).json({ success: true, data: post, message: 'Blog post created successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.put('/blog/:id', protect, async (req, res) => {
    try {
        const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!post) {
            return res.status(404).json({ success: false, message: 'Blog post not found' });
        }
        res.json({ success: true, data: post, message: 'Blog post updated successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.delete('/blog/:id', protect, async (req, res) => {
    try {
        const post = await BlogPost.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Blog post not found' });
        }
        res.json({ success: true, message: 'Blog post deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.patch('/blog/:id/publish', protect, async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Blog post not found' });
        }
        post.isPublished = !post.isPublished;
        if (post.isPublished && !post.publishedAt) {
            post.publishedAt = new Date();
        }
        await post.save();
        res.json({ success: true, data: post, message: `Blog post ${post.isPublished ? 'published' : 'unpublished'}` });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== PAGE CONTENT ====================
router.get('/pages', protect, async (req, res) => {
    try {
        const { pageType } = req.query;
        const filter = pageType ? { pageType } : {};
        const pages = await PageContent.find(filter).sort({ pageType: 1, slug: 1 });
        res.json({ success: true, data: pages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/pages/:id', protect, async (req, res) => {
    try {
        const page = await PageContent.findById(req.params.id);
        if (!page) {
            return res.status(404).json({ success: false, message: 'Page not found' });
        }
        res.json({ success: true, data: page });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/pages', protect, async (req, res) => {
    try {
        const page = await PageContent.create(req.body);
        res.status(201).json({ success: true, data: page, message: 'Page created successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.put('/pages/:id', protect, async (req, res) => {
    try {
        const page = await PageContent.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!page) {
            return res.status(404).json({ success: false, message: 'Page not found' });
        }
        res.json({ success: true, data: page, message: 'Page updated successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.delete('/pages/:id', protect, async (req, res) => {
    try {
        const page = await PageContent.findByIdAndDelete(req.params.id);
        if (!page) {
            return res.status(404).json({ success: false, message: 'Page not found' });
        }
        res.json({ success: true, message: 'Page deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.patch('/pages/:id/publish', protect, async (req, res) => {
    try {
        const page = await PageContent.findById(req.params.id);
        if (!page) {
            return res.status(404).json({ success: false, message: 'Page not found' });
        }
        page.isPublished = !page.isPublished;
        await page.save();
        res.json({ success: true, data: page, message: `Page ${page.isPublished ? 'published' : 'unpublished'}` });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== SITE SETTINGS ====================
router.get('/settings', protect, async (req, res) => {
    try {
        const settings = await SiteSettings.getSettings();
        res.json({ success: true, data: settings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put('/settings', protect, async (req, res) => {
    try {
        let settings = await SiteSettings.findOne({ key: 'main' });
        if (!settings) {
            settings = new SiteSettings({ key: 'main', ...req.body });
        } else {
            Object.assign(settings, req.body);
        }
        await settings.save();
        res.json({ success: true, data: settings, message: 'Settings updated successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// ==================== SUPPORT TICKETS ====================
router.get('/support-tickets', protect, async (req, res) => {
    try {
        const { status } = req.query;
        const filter = status ? { status } : {};
        const tickets = await SupportTicket.find(filter).sort({ createdAt: -1 });
        res.json({ success: true, data: tickets });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/support-tickets/:id', protect, async (req, res) => {
    try {
        const ticket = await SupportTicket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found' });
        }
        res.json({ success: true, data: ticket });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.patch('/support-tickets/:id', protect, async (req, res) => {
    try {
        const { status, adminNotes } = req.body;
        const updateData = {};
        if (status) updateData.status = status;
        if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
        if (status === 'resolved') updateData.resolvedAt = new Date();

        const ticket = await SupportTicket.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found' });
        }
        res.json({ success: true, data: ticket, message: 'Ticket updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/support-tickets/:id', protect, async (req, res) => {
    try {
        const ticket = await SupportTicket.findByIdAndDelete(req.params.id);
        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found' });
        }
        res.json({ success: true, message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== JOB APPLICATIONS ====================
router.get('/job-applications', protect, async (req, res) => {
    try {
        const { jobId, status } = req.query;
        const filter = {};
        if (jobId) filter.jobId = jobId;
        if (status) filter.status = status;

        const applications = await JobApplication.find(filter).sort({ createdAt: -1 });
        res.json({ success: true, data: applications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/job-applications/:id', protect, async (req, res) => {
    try {
        const application = await JobApplication.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }
        res.json({ success: true, data: application });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.patch('/job-applications/:id', protect, async (req, res) => {
    try {
        const { status, notes } = req.body;
        const updateData = {};
        if (status) updateData.status = status;
        if (notes !== undefined) updateData.notes = notes;

        const application = await JobApplication.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!application) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }
        res.json({ success: true, data: application, message: 'Application updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/job-applications/:id', protect, async (req, res) => {
    try {
        const application = await JobApplication.findByIdAndDelete(req.params.id);
        if (!application) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }
        res.json({ success: true, message: 'Application deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== NEWSLETTER SUBSCRIBERS ====================
router.get('/newsletter', protect, async (req, res) => {
    try {
        const subscribers = await NewsletterSubscriber.find().sort({ createdAt: -1 });
        res.json({ success: true, data: subscribers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/newsletter/:id', protect, async (req, res) => {
    try {
        const subscriber = await NewsletterSubscriber.findByIdAndDelete(req.params.id);
        if (!subscriber) {
            return res.status(404).json({ success: false, message: 'Subscriber not found' });
        }
        res.json({ success: true, message: 'Subscriber deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
