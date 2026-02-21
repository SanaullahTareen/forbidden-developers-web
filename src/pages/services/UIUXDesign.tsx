import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, Palette, CheckCircle, Layers, Sparkles, ArrowRight, Eye, MousePointer, Figma } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const services = [
    {
        icon: Eye,
        title: 'User Research',
        description: 'Deep understanding of your users through research, interviews, and analytics.',
    },
    {
        icon: Layers,
        title: 'Information Architecture',
        description: 'Organized, intuitive structures that make navigation effortless.',
    },
    {
        icon: Palette,
        title: 'Visual Design',
        description: 'Stunning interfaces that align with your brand and delight users.',
    },
    {
        icon: MousePointer,
        title: 'Interaction Design',
        description: 'Smooth, intuitive interactions that feel natural and engaging.',
    },
    {
        icon: Figma,
        title: 'Prototyping',
        description: 'Interactive prototypes to validate ideas before development.',
    },
    {
        icon: Sparkles,
        title: 'Design Systems',
        description: 'Scalable component libraries ensuring consistency across products.',
    },
]

const process = [
    { step: '01', title: 'Discover', description: 'Research users, analyze competitors, and define project goals.' },
    { step: '02', title: 'Define', description: 'Create personas, user journeys, and information architecture.' },
    { step: '03', title: 'Design', description: 'Wireframes, visual designs, and interactive prototypes.' },
    { step: '04', title: 'Deliver', description: 'Developer handoff with detailed specifications and assets.' },
]

const portfolio = [
    {
        title: 'FinanceApp Redesign',
        category: 'Mobile App',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=800&fit=crop',
        color: 'from-violet-500 to-purple-500',
    },
    {
        title: 'E-commerce Platform',
        category: 'Web Design',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=800&fit=crop',
        color: 'from-cyan-500 to-blue-500',
    },
    {
        title: 'Healthcare Dashboard',
        category: 'Dashboard',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=800&fit=crop',
        color: 'from-emerald-500 to-teal-500',
    },
    {
        title: 'SaaS Product',
        category: 'Web App',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=800&fit=crop',
        color: 'from-orange-500 to-red-500',
    },
]

const tools = [
    { name: 'Figma', icon: '🎨' },
    { name: 'Sketch', icon: '💎' },
    { name: 'Adobe XD', icon: '📐' },
    { name: 'Framer', icon: '🎬' },
    { name: 'Principle', icon: '✨' },
    { name: 'Zeplin', icon: '📋' },
    { name: 'Miro', icon: '🗂️' },
    { name: 'Maze', icon: '🧪' },
]

const UIUXDesign = () => {
    const heroRef = useRef<HTMLDivElement>(null)
    const isHeroInView = useInView(heroRef, { once: true })
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0">
                    <div className={`absolute inset-0 bg-[linear-gradient(rgba(244,114,182,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,114,182,0.03)_1px,transparent_1px)] bg-[size:60px_60px] ${isDark ? 'opacity-100' : 'opacity-50'}`} />
                    <div className={`absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] ${isDark ? 'bg-pink-600/20' : 'bg-pink-600/10'}`} />
                    <div className={`absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] ${isDark ? 'bg-violet-600/15' : 'bg-violet-600/10'}`} />
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

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6 }}
                                className="mb-6"
                            >
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-pink-400 bg-pink-500/10 rounded-full border border-pink-500/20">
                                    <Palette className="w-4 h-4" />
                                    UI/UX Design
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                            >
                                Design that{' '}
                                <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                                    captivates
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className={`text-lg mb-8 leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}
                            >
                                We craft intuitive, beautiful interfaces that users love. From research to
                                prototypes, we design experiences that drive engagement and conversions.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <Link
                                    to="/#contact"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-pink-500/25 transition-all"
                                >
                                    Start a Project
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        </div>

                        {/* Portfolio preview */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {portfolio.map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                    className={`relative rounded-2xl overflow-hidden group ${index === 0 || index === 3 ? 'aspect-[3/4]' : 'aspect-square'}`}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-0 group-hover:opacity-60 transition-opacity`} />
                                    <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div>
                                            <div className="text-white font-semibold">{item.title}</div>
                                            <div className="text-white/70 text-sm">{item.category}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className={`py-20 ${isDark ? 'bg-[#020010]' : 'bg-gray-50'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-violet-400 bg-violet-500/10 rounded-full border border-violet-500/20 mb-4">
                            <Sparkles className="w-4 h-4" />
                            Our Services
                        </span>
                        <h2 className={`text-3xl sm:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            End-to-end design services
                        </h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => {
                            const Icon = service.icon
                            return (
                                <motion.div
                                    key={service.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`group p-6 rounded-2xl transition-all duration-300 ${isDark ? 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05]' : 'bg-white border border-gray-200 hover:shadow-xl'}`}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-violet-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Icon className="w-6 h-6 text-pink-400" />
                                    </div>
                                    <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{service.title}</h3>
                                    <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{service.description}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className={`py-20 ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-cyan-400 bg-cyan-500/10 rounded-full border border-cyan-500/20 mb-4">
                            <Layers className="w-4 h-4" />
                            Design Process
                        </span>
                        <h2 className={`text-3xl sm:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            How we design
                        </h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {process.map((item, index) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`p-6 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-gray-50 border border-gray-200'}`}
                            >
                                <span className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                                    {item.step}
                                </span>
                                <h3 className={`text-xl font-semibold mt-4 mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                                <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tools */}
            <section className={`py-20 ${isDark ? 'bg-[#020010]' : 'bg-gray-50'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Tools we use
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                        {tools.map((tool, index) => (
                            <motion.div
                                key={tool.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className={`p-4 rounded-2xl text-center transition-all duration-300 ${isDark ? 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05]' : 'bg-white border border-gray-200 hover:shadow-lg'}`}
                            >
                                <span className="text-2xl mb-2 block">{tool.icon}</span>
                                <span className={`text-xs font-medium ${isDark ? 'text-white/70' : 'text-gray-700'}`}>{tool.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={`py-20 ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`relative p-12 rounded-3xl overflow-hidden text-center ${isDark ? 'bg-gradient-to-br from-pink-600/20 to-violet-600/20 border border-white/10' : 'bg-gradient-to-br from-pink-100 to-violet-100 border border-pink-200'}`}
                    >
                        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Ready for a design upgrade?
                        </h2>
                        <p className={`mb-8 max-w-xl mx-auto ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                            Let's create an exceptional user experience together. Get a free design audit.
                        </p>
                        <Link
                            to="/#contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-pink-500/25 transition-all"
                        >
                            Get Design Audit
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default UIUXDesign
