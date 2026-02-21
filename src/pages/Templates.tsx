import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink, Eye, Palette, Monitor, Smartphone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const templates = [
    {
        id: 'technova',
        name: 'TechNova',
        category: 'Software Company',
        description: 'A bold, dark-themed template perfect for tech startups and software companies. Features futuristic gradients and sleek animations.',
        color: 'from-violet-600 to-purple-800',
        bgColor: 'bg-[#0a0015]',
        textColor: 'text-violet-400',
        tags: ['Dark Theme', 'Tech', 'Modern', 'Animated'],
        preview: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop',
        path: '/templates/technova'
    },
    {
        id: 'lumina',
        name: 'Lumina',
        category: 'Creative Agency',
        description: 'Clean, minimal, and elegant. A light-themed template ideal for creative agencies and design studios.',
        color: 'from-gray-100 to-white',
        bgColor: 'bg-white',
        textColor: 'text-gray-900',
        tags: ['Light Theme', 'Minimal', 'Clean', 'Elegant'],
        preview: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=500&fit=crop',
        path: '/templates/lumina'
    },
    {
        id: 'finedge',
        name: 'FinEdge',
        category: 'Finance & Corporate',
        description: 'Professional and trustworthy. A blue-themed template designed for finance, banking, and corporate businesses.',
        color: 'from-blue-600 to-cyan-600',
        bgColor: 'bg-slate-900',
        textColor: 'text-blue-400',
        tags: ['Blue Theme', 'Corporate', 'Professional', 'Trust'],
        preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
        path: '/templates/finedge'
    },
    {
        id: 'flavor',
        name: 'Flavor',
        category: 'Restaurant & Food',
        description: 'Warm and appetizing. An orange/yellow themed template perfect for restaurants, cafes, and food businesses.',
        color: 'from-orange-500 to-amber-500',
        bgColor: 'bg-amber-950',
        textColor: 'text-orange-400',
        tags: ['Warm Theme', 'Food', 'Restaurant', 'Inviting'],
        preview: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop',
        path: '/templates/flavor'
    },
    {
        id: 'fitforge',
        name: 'FitForge',
        category: 'Fitness & Gym',
        description: 'Energetic and powerful. A red-themed template designed for gyms, fitness centers, and sports brands.',
        color: 'from-red-600 to-rose-600',
        bgColor: 'bg-zinc-950',
        textColor: 'text-red-500',
        tags: ['Red Theme', 'Fitness', 'Energetic', 'Bold'],
        preview: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=500&fit=crop',
        path: '/templates/fitforge'
    },
    {
        id: 'ecoverde',
        name: 'EcoVerde',
        category: 'Eco & Sustainability',
        description: 'Natural and refreshing. A green-themed template ideal for eco-friendly brands and sustainability initiatives.',
        color: 'from-emerald-500 to-green-600',
        bgColor: 'bg-emerald-950',
        textColor: 'text-emerald-400',
        tags: ['Green Theme', 'Eco', 'Natural', 'Fresh'],
        preview: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=500&fit=crop',
        path: '/templates/ecoverde'
    },
    {
        id: 'vogue',
        name: 'Vogue',
        category: 'Fashion & Lifestyle',
        description: 'Stylish and sophisticated. A pink/purple themed template perfect for fashion brands and lifestyle businesses.',
        color: 'from-pink-500 to-fuchsia-600',
        bgColor: 'bg-neutral-950',
        textColor: 'text-pink-400',
        tags: ['Fashion', 'Lifestyle', 'Elegant', 'Trendy'],
        preview: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=500&fit=crop',
        path: '/templates/vogue'
    },
    {
        id: 'cardrive',
        name: 'CarDrive',
        category: 'Automotive Dealership',
        description: 'Sleek and professional. A dark blue-themed template perfect for car dealers, automotive brands, and vehicle showcases.',
        color: 'from-blue-600 to-blue-800',
        bgColor: 'bg-slate-950',
        textColor: 'text-blue-400',
        tags: ['Automotive', 'Dealership', 'Premium', 'Modern'],
        preview: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=500&fit=crop',
        path: '/templates/cardrive'
    },
    {
        id: 'homeflow',
        name: 'HomeFlow',
        category: 'Home Services',
        description: 'Warm and professional. An orange-themed template for plumbing, electrical, cleaning, and home maintenance services.',
        color: 'from-orange-500 to-amber-600',
        bgColor: 'bg-orange-50',
        textColor: 'text-orange-600',
        tags: ['Services', 'Home', 'Professional', 'Trustworthy'],
        preview: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=500&fit=crop',
        path: '/templates/homeflow'
    },
    {
        id: 'sneakhub',
        name: 'SneakHub',
        category: 'Shoe & Sneaker Brand',
        description: 'Bold and dynamic. A black and red-themed template inspired by premium sneaker brands and athletic footwear.',
        color: 'from-red-600 to-gray-900',
        bgColor: 'bg-neutral-950',
        textColor: 'text-red-500',
        tags: ['Sneakers', 'Fashion', 'Athletic', 'Bold'],
        preview: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=500&fit=crop',
        path: '/templates/sneakhub'
    },
    {
        id: 'adminpro',
        name: 'AdminPro',
        category: 'Admin Dashboard',
        description: 'Functional and intuitive. A dark purple-themed admin dashboard template with charts, tables, and analytics.',
        color: 'from-violet-600 to-indigo-700',
        bgColor: 'bg-slate-950',
        textColor: 'text-violet-400',
        tags: ['Dashboard', 'Admin', 'Analytics', 'UI Kit'],
        preview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
        path: '/templates/adminpro'
    },
    {
        id: 'shophub',
        name: 'ShopHub',
        category: 'Ecommerce Platform',
        description: 'Colorful and engaging. A vibrant multi-category ecommerce template with product browsing and shopping features.',
        color: 'from-gradient-to-r',
        bgColor: 'bg-white',
        textColor: 'text-gray-900',
        tags: ['Ecommerce', 'Shopping', 'Multi-Category', 'Modern'],
        preview: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=500&fit=crop',
        path: '/templates/shophub'
    },
    {
        id: 'travelmax',
        name: 'TravelMax',
        category: 'Travel & Tourism',
        description: 'Inspiring and adventurous. A vibrant blue and teal-themed template for travel agencies and vacation planning.',
        color: 'from-cyan-500 to-blue-600',
        bgColor: 'bg-blue-950',
        textColor: 'text-cyan-400',
        tags: ['Travel', 'Tourism', 'Adventure', 'Vacation'],
        preview: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500&fit=crop',
        path: '/templates/travelmax'
    },
]

const Templates = () => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const heroRef = useRef<HTMLDivElement>(null)
    const isHeroInView = useInView(heroRef, { once: true })
    const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null)

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#030014]' : 'bg-gray-50'}`}>
            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0">
                    <div className={`absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] ${isDark ? 'opacity-100' : 'opacity-50'}`} />
                    <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] ${isDark ? 'bg-violet-600/20' : 'bg-violet-600/10'}`} />
                    <div className={`absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] ${isDark ? 'bg-fuchsia-600/15' : 'bg-fuchsia-600/10'}`} />
                </div>

                <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            to="/"
                            className={`inline-flex items-center gap-2 mb-8 text-sm font-medium transition-colors ${isDark ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Link>
                    </motion.div>

                    <div className="text-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="mb-6"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-violet-400 bg-violet-500/10 rounded-full border border-violet-500/20">
                                <Palette className="w-4 h-4" />
                                Website Templates
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                            Explore Our{' '}
                            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                                Design Templates
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`text-lg md:text-xl max-w-2xl mx-auto mb-8 ${isDark ? 'text-white/60' : 'text-gray-600'}`}
                        >
                            Browse through our collection of stunning website templates. Each design showcases our expertise and can serve as inspiration for your project.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-wrap justify-center gap-4 text-sm"
                        >
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-white/5 text-white/60' : 'bg-white text-gray-600 shadow-sm'}`}>
                                <Monitor className="w-4 h-4" />
                                <span>Fully Responsive</span>
                            </div>
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-white/5 text-white/60' : 'bg-white text-gray-600 shadow-sm'}`}>
                                <Smartphone className="w-4 h-4" />
                                <span>Mobile Optimized</span>
                            </div>
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-white/5 text-white/60' : 'bg-white text-gray-600 shadow-sm'}`}>
                                <Eye className="w-4 h-4" />
                                <span>Interactive Preview</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Templates Grid */}
            <section className="py-20">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {templates.map((template, index) => (
                            <motion.div
                                key={template.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onMouseEnter={() => setHoveredTemplate(template.id)}
                                onMouseLeave={() => setHoveredTemplate(null)}
                                className="group"
                            >
                                <div className={`relative h-full rounded-2xl overflow-hidden transition-all duration-500 ${isDark ? 'bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.15]' : 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-xl'}`}>
                                    {/* Preview Image */}
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <img
                                            src={template.preview}
                                            alt={template.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-t ${template.color} opacity-40`} />

                                        {/* Overlay on hover */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: hoveredTemplate === template.id ? 1 : 0 }}
                                            className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
                                        >
                                            <Link
                                                to={template.path}
                                                className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors"
                                            >
                                                <Eye className="w-4 h-4" />
                                                Preview
                                            </Link>
                                        </motion.div>

                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${template.color} text-white`}>
                                                {template.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            {template.name}
                                        </h3>
                                        <p className={`text-sm mb-4 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                            {template.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {template.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className={`px-2 py-1 text-xs rounded-md ${isDark ? 'bg-white/5 text-white/40' : 'bg-gray-100 text-gray-500'}`}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Action */}
                                        <Link
                                            to={template.path}
                                            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${template.textColor} hover:opacity-80`}
                                        >
                                            View Template
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`relative rounded-3xl overflow-hidden p-8 md:p-12 lg:p-16 ${isDark ? 'bg-gradient-to-br from-violet-900/50 to-fuchsia-900/50 border border-white/10' : 'bg-gradient-to-br from-violet-100 to-fuchsia-100'}`}
                    >
                        <div className="relative z-10 text-center max-w-2xl mx-auto">
                            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Like What You See?
                            </h2>
                            <p className={`text-lg mb-8 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                Let's build something amazing together. Our team can customize any template or create something entirely unique for your brand.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    to="/#contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
                                >
                                    Start Your Project
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    to="/services/web-development"
                                    className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-colors ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white text-gray-900 hover:bg-gray-50'}`}
                                >
                                    <ExternalLink className="w-5 h-5" />
                                    Learn More
                                </Link>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/20 to-transparent rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-fuchsia-500/20 to-transparent rounded-full blur-3xl" />
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Templates
