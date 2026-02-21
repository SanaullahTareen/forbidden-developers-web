require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');

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
const SiteSettings = require('../model/SiteSettings');

// Helper function to generate slugs
const generateSlug = (text) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
};

// Seed data from current hardcoded components
const seedData = {
    services: [
        {
            icon: 'Code',
            title: 'Web Development',
            description: 'Bespoke web applications built with cutting-edge technologies. From complex platforms to elegant landing pages.',
            tags: ['React', 'Next.js', 'TypeScript', 'Node.js'],
            color: 'from-violet-500 to-purple-600',
            shadowColor: 'shadow-violet-500/20',
            order: 0
        },
        {
            icon: 'Smartphone',
            title: 'Mobile Apps',
            description: 'Native and cross-platform mobile experiences that users love. Intuitive, fast, and beautifully designed.',
            tags: ['React Native', 'Flutter', 'iOS', 'Android'],
            color: 'from-blue-500 to-cyan-500',
            shadowColor: 'shadow-blue-500/20',
            order: 1
        },
        {
            icon: 'Brain',
            title: 'AI & Machine Learning',
            description: 'Intelligent solutions that transform data into insights. Custom AI models, automation, and smart integrations.',
            tags: ['OpenAI', 'TensorFlow', 'Python', 'NLP'],
            color: 'from-emerald-500 to-teal-500',
            shadowColor: 'shadow-emerald-500/20',
            order: 2
        },
        {
            icon: 'Palette',
            title: 'UI/UX Design',
            description: 'User-centered design that converts. Beautiful interfaces backed by research and user psychology.',
            tags: ['Figma', 'Prototyping', 'User Research', 'Design Systems'],
            color: 'from-pink-500 to-rose-500',
            shadowColor: 'shadow-pink-500/20',
            order: 3
        },
        {
            icon: 'Server',
            title: 'Backend & APIs',
            description: 'Robust, scalable backend systems. Microservices, APIs, and database architecture that performs.',
            tags: ['GraphQL', 'REST', 'PostgreSQL', 'Redis'],
            color: 'from-orange-500 to-amber-500',
            shadowColor: 'shadow-orange-500/20',
            order: 4
        },
        {
            icon: 'Rocket',
            title: 'DevOps & Cloud',
            description: 'Infrastructure that scales. CI/CD pipelines, cloud architecture, and deployment automation.',
            tags: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
            color: 'from-indigo-500 to-violet-500',
            shadowColor: 'shadow-indigo-500/20',
            order: 5
        }
    ],

    projects: [
        {
            title: 'NeoBank',
            subtitle: 'Fintech Platform',
            description: 'A revolutionary digital banking experience with AI-powered insights and seamless transactions.',
            image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop',
            tags: ['React Native', 'Node.js', 'AI/ML'],
            color: 'violet',
            year: '2024',
            category: 'Mobile',
            order: 0
        },
        {
            title: 'Quantum',
            subtitle: 'Analytics Dashboard',
            description: 'Enterprise-grade analytics with real-time visualization and predictive modeling.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
            tags: ['Next.js', 'D3.js', 'TypeScript'],
            color: 'blue',
            year: '2024',
            category: 'Web',
            order: 1
        },
        {
            title: 'HealthAI',
            subtitle: 'Medical Platform',
            description: 'AI-powered medical diagnosis assistant with advanced computer vision capabilities.',
            image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop',
            tags: ['Python', 'TensorFlow', 'FastAPI'],
            color: 'emerald',
            year: '2024',
            category: 'AI',
            order: 2
        },
        {
            title: 'MetaShop',
            subtitle: '3D E-Commerce',
            description: 'Immersive shopping experience with virtual try-ons and AR product visualization.',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=800&fit=crop',
            tags: ['Three.js', 'React', 'WebGL'],
            color: 'pink',
            year: '2023',
            category: 'Web',
            order: 3
        }
    ],

    stats: [
        { value: 150, suffix: '+', label: 'Projects Delivered', description: 'Across various industries', order: 0 },
        { value: 98, suffix: '%', label: 'Client Retention', description: 'Long-term partnerships', order: 1 },
        { value: 50, suffix: '+', label: 'Team Members', description: 'Expert developers & designers', order: 2 },
        { value: 8, suffix: '+', label: 'Years Experience', description: 'Building digital products', order: 3 }
    ],

    skills: [
        { icon: 'Brain', title: 'AI Innovation', description: 'Cutting-edge AI & ML solutions', order: 0 },
        { icon: 'Cpu', title: 'ML Expertise', description: 'Advanced machine learning models', order: 1 },
        { icon: 'Users', title: 'Expert Team', description: 'Seasoned professionals across all domains', order: 2 },
        { icon: 'Zap', title: 'Agile Process', description: 'Flexible methodology for fast iteration', order: 3 },
        { icon: 'Shield', title: 'Transparent', description: 'Clear communication at every step', order: 4 },
        { icon: 'Clock', title: '24/7 Support', description: 'Round-the-clock assistance', order: 5 }
    ],

    testimonials: [
        {
            name: 'Sarah Chen',
            role: 'CEO',
            company: 'TechStart Inc',
            image: 'https://i.pravatar.cc/150?img=1',
            content: 'Forbidden Developers transformed our vision into reality. Their expertise in AI and modern web technologies is unmatched. The team delivered beyond our expectations with exceptional attention to detail and innovative solutions.',
            rating: 5,
            order: 0
        },
        {
            name: 'Marcus Rodriguez',
            role: 'CTO',
            company: 'FinanceFlow',
            image: 'https://i.pravatar.cc/150?img=12',
            content: 'Working with Forbidden Developers was a game-changer for our fintech platform. They built our app with incredible attention to security and user experience. The communication throughout was excellent.',
            rating: 5,
            order: 1
        },
        {
            name: 'Emma Wilson',
            role: 'Founder',
            company: 'HealthTech',
            image: 'https://i.pravatar.cc/150?img=5',
            content: 'The best development team we have ever worked with. Their AI/ML implementation was flawless, and the project was delivered ahead of schedule. True professionals who understand complex requirements.',
            rating: 5,
            order: 2
        },
        {
            name: 'David Kim',
            role: 'Product Manager',
            company: 'ShopNow',
            image: 'https://i.pravatar.cc/150?img=13',
            content: 'Incredible work on our 3D e-commerce experience. The immersive features they built increased our conversion rates by 40%. Masters of their craft with cutting-edge technology expertise.',
            rating: 5,
            order: 3
        }
    ],

    careers: [
        {
            title: 'Senior Full-Stack Engineer',
            department: 'Engineering',
            location: 'Remote / San Francisco',
            type: 'Full-time',
            description: 'Build scalable applications using React, Node.js, and cloud technologies.',
            tags: ['React', 'Node.js', 'TypeScript', 'AWS'],
            order: 0
        },
        {
            title: 'AI/ML Engineer',
            department: 'AI Division',
            location: 'Remote / New York',
            type: 'Full-time',
            description: 'Develop cutting-edge AI solutions and integrate ML models into products.',
            tags: ['Python', 'TensorFlow', 'PyTorch', 'MLOps'],
            order: 1
        },
        {
            title: 'Senior Product Designer',
            department: 'Design',
            location: 'Remote / London',
            type: 'Full-time',
            description: 'Create exceptional user experiences for enterprise and consumer products.',
            tags: ['Figma', 'Design Systems', 'Prototyping', 'Research'],
            order: 2
        },
        {
            title: 'DevOps Engineer',
            department: 'Infrastructure',
            location: 'Remote',
            type: 'Full-time',
            description: 'Manage cloud infrastructure and CI/CD pipelines for high-traffic applications.',
            tags: ['Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
            order: 3
        },
        {
            title: 'Technical Project Manager',
            department: 'Operations',
            location: 'San Francisco',
            type: 'Full-time',
            description: 'Lead cross-functional teams to deliver complex software projects.',
            tags: ['Agile', 'Scrum', 'JIRA', 'Leadership'],
            order: 4
        },
        {
            title: 'Mobile Developer (iOS/Android)',
            department: 'Engineering',
            location: 'Remote',
            type: 'Full-time',
            description: 'Build beautiful, performant mobile applications using React Native.',
            tags: ['React Native', 'iOS', 'Android', 'TypeScript'],
            order: 5
        }
    ],

    blogPosts: [
        {
            title: 'The Future of AI in Web Development: What to Expect in 2025',
            slug: 'future-of-ai-in-web-development-2025',
            excerpt: 'Explore how artificial intelligence is reshaping the landscape of web development and what developers need to know to stay ahead.',
            content: 'Artificial intelligence is rapidly transforming web development. From code generation to automated testing, AI tools are becoming essential for modern developers. In this article, we explore the key trends and technologies that will shape web development in 2025 and beyond.',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
            category: 'AI & ML',
            author: 'Sarah Chen',
            readTime: '8 min read',
            featured: true,
            isPublished: true,
            order: 0
        },
        {
            title: 'Building Scalable Design Systems with React and TypeScript',
            slug: 'building-scalable-design-systems-react-typescript',
            excerpt: 'A comprehensive guide to creating maintainable, scalable design systems that grow with your organization.',
            content: 'Design systems are the foundation of consistent, efficient UI development. Learn how to build a robust design system using React and TypeScript that scales with your team and product.',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
            category: 'Development',
            author: 'Marcus Johnson',
            readTime: '12 min read',
            featured: true,
            isPublished: true,
            order: 1
        },
        {
            title: 'Microservices vs Monoliths: Making the Right Choice',
            slug: 'microservices-vs-monoliths-making-right-choice',
            excerpt: 'Understanding when to use microservices architecture and when a monolithic approach might be the better choice.',
            content: 'The debate between microservices and monolithic architecture continues. This guide helps you understand the trade-offs and make the right architectural decision for your project.',
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
            category: 'Architecture',
            author: 'Alex Chen',
            readTime: '10 min read',
            featured: false,
            isPublished: true,
            order: 2
        },
        {
            title: 'The Ultimate Guide to React Server Components',
            slug: 'ultimate-guide-react-server-components',
            excerpt: 'Deep dive into React Server Components and how they change the way we build modern web applications.',
            content: 'React Server Components represent a paradigm shift in how we think about React applications. Learn how to leverage RSC for better performance and developer experience.',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop',
            category: 'React',
            author: 'Emily Zhang',
            readTime: '15 min read',
            featured: false,
            isPublished: true,
            order: 3
        },
        {
            title: 'Optimizing Performance in Large-Scale Applications',
            slug: 'optimizing-performance-large-scale-applications',
            excerpt: 'Proven strategies and techniques for maintaining high performance in enterprise-level applications.',
            content: 'Performance optimization is critical for user experience and business success. Discover proven strategies for keeping your large-scale applications fast and responsive.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
            category: 'Performance',
            author: 'David Kim',
            readTime: '11 min read',
            featured: false,
            isPublished: true,
            order: 4
        },
        {
            title: 'Implementing CI/CD Pipelines: Best Practices',
            slug: 'implementing-cicd-pipelines-best-practices',
            excerpt: 'Learn how to set up efficient CI/CD pipelines that accelerate your development workflow.',
            content: 'Continuous Integration and Continuous Deployment are essential for modern software development. This guide covers best practices for setting up robust CI/CD pipelines.',
            image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=500&fit=crop',
            category: 'DevOps',
            author: 'Sarah Chen',
            readTime: '9 min read',
            featured: false,
            isPublished: true,
            order: 5
        }
    ],

    pressReleases: [
        {
            title: 'Forbidden Dev Raises $25M Series B to Expand AI Division',
            excerpt: 'Funding will accelerate development of enterprise AI solutions and expand global team.',
            source: 'TechCrunch',
            image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=500&fit=crop',
            publishedAt: new Date('2024-12-18'),
            order: 0
        },
        {
            title: 'Named to Forbes "Top 50 Digital Agencies" for Third Consecutive Year',
            excerpt: 'Recognition highlights continued excellence in delivering transformative digital experiences.',
            source: 'Forbes',
            image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop',
            publishedAt: new Date('2024-11-15'),
            order: 1
        },
        {
            title: 'Partnership with Microsoft to Deliver Azure-Powered Solutions',
            excerpt: 'Strategic alliance brings enterprise-grade cloud capabilities to mid-market clients.',
            source: 'Business Wire',
            image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=800&h=500&fit=crop',
            publishedAt: new Date('2024-10-28'),
            order: 2
        },
        {
            title: 'Opens New European Headquarters in London',
            excerpt: 'Expansion supports growing demand for digital transformation services across EMEA.',
            source: 'Reuters',
            image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=500&fit=crop',
            publishedAt: new Date('2024-09-10'),
            order: 3
        }
    ],

    awards: [
        { title: 'Best Digital Agency 2024', organization: 'Awwwards', year: '2024', order: 0 },
        { title: 'Innovation in AI Development', organization: 'TechCrunch Disrupt', year: '2024', order: 1 },
        { title: 'Best UX Design', organization: 'WebDesign Magazine', year: '2023', order: 2 },
        { title: 'Top 100 Tech Companies', organization: 'Inc. Magazine', year: '2023', order: 3 },
        { title: 'Excellence in Web Development', organization: 'CSS Design Awards', year: '2023', order: 4 },
        { title: 'Best Startup Culture', organization: 'Glassdoor', year: '2022', order: 5 }
    ],

    brandAssets: [
        { name: 'Company Logo Pack', type: 'ZIP', size: '2.4 MB', downloadUrl: '#', order: 0 },
        { name: 'Brand Guidelines', type: 'PDF', size: '5.1 MB', downloadUrl: '#', order: 1 },
        { name: 'Executive Headshots', type: 'ZIP', size: '12 MB', downloadUrl: '#', order: 2 },
        { name: 'Company Fact Sheet', type: 'PDF', size: '890 KB', downloadUrl: '#', order: 3 }
    ],

    siteSettings: {
        contactEmail: 'hello@forbiddendev.com',
        address: 'San Francisco, CA',
        companyName: 'Forbidden Dev',
        tagline: 'Premium development studio crafting exceptional digital experiences',
        footerText: 'Premium development studio crafting exceptional digital experiences for forward-thinking brands.',
        pressEmail: 'press@forbiddendev.com',
        ctaTitle: 'Ready to build something amazing?',
        ctaDescription: "Let's turn your vision into reality. Get in touch for a free consultation.",
        ctaButtonText: 'Start Your Project'
    }
};

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data (optional - comment out to preserve)
        console.log('🗑️  Clearing existing content data...');
        await Promise.all([
            Service.deleteMany({}),
            Project.deleteMany({}),
            Stat.deleteMany({}),
            Skill.deleteMany({}),
            Testimonial.deleteMany({}),
            Career.deleteMany({}),
            BlogPost.deleteMany({}),
            PressRelease.deleteMany({}),
            Award.deleteMany({}),
            BrandAsset.deleteMany({})
        ]);

        // Seed all data
        console.log('🌱 Seeding content data...');

        await Service.insertMany(seedData.services);
        console.log(`   ✅ ${seedData.services.length} services`);

        await Project.insertMany(seedData.projects);
        console.log(`   ✅ ${seedData.projects.length} projects`);

        await Stat.insertMany(seedData.stats);
        console.log(`   ✅ ${seedData.stats.length} stats`);

        await Skill.insertMany(seedData.skills);
        console.log(`   ✅ ${seedData.skills.length} skills`);

        await Testimonial.insertMany(seedData.testimonials);
        console.log(`   ✅ ${seedData.testimonials.length} testimonials`);

        await Career.insertMany(seedData.careers);
        console.log(`   ✅ ${seedData.careers.length} careers`);

        await BlogPost.insertMany(seedData.blogPosts);
        console.log(`   ✅ ${seedData.blogPosts.length} blog posts`);

        await PressRelease.insertMany(seedData.pressReleases);
        console.log(`   ✅ ${seedData.pressReleases.length} press releases`);

        await Award.insertMany(seedData.awards);
        console.log(`   ✅ ${seedData.awards.length} awards`);

        await BrandAsset.insertMany(seedData.brandAssets);
        console.log(`   ✅ ${seedData.brandAssets.length} brand assets`);

        // Upsert site settings
        await SiteSettings.findOneAndUpdate(
            { key: 'main' },
            seedData.siteSettings,
            { upsert: true, new: true }
        );
        console.log('   ✅ Site settings');

        console.log('\n🎉 Database seeded successfully!');

        await mongoose.disconnect();
        console.log('✅ Disconnected from MongoDB');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
