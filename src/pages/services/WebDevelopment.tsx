import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, Code2, CheckCircle, Layers, Zap, Shield, ArrowRight, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const features = [
    'Custom web application development',
    'Progressive Web Apps (PWA)',
    'E-commerce platforms',
    'Content management systems',
    'API development & integration',
    'Real-time applications',
    'Cloud-native solutions',
    'Performance optimization',
]

const technologies = [
    { name: 'React', icon: '⚛️' },
    { name: 'Next.js', icon: '▲' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'GraphQL', icon: '◈' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'AWS', icon: '☁️' },
]

const process = [
    { step: '01', title: 'Discovery', description: 'We dive deep into your requirements, goals, and target audience to create a solid foundation.' },
    { step: '02', title: 'Planning', description: 'Detailed technical architecture, timeline, and milestone planning for efficient execution.' },
    { step: '03', title: 'Development', description: 'Agile development with regular updates, code reviews, and quality assurance.' },
    { step: '04', title: 'Launch', description: 'Rigorous testing, deployment, and post-launch support to ensure success.' },
]

const caseStudies = [
    {
        title: 'NeoBank',
        description: 'Built a scalable fintech platform serving 2M+ users with 99.99% uptime.',
        metric: '300%',
        metricLabel: 'User growth',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop',
    },
    {
        title: 'Quantum Analytics',
        description: 'Enterprise dashboard processing 10TB+ data with real-time visualization.',
        metric: '5x',
        metricLabel: 'Faster insights',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    },
]

const WebDevelopment = () => {
    const heroRef = useRef<HTMLDivElement>(null)
    const isHeroInView = useInView(heroRef, { once: true })
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0">
                    <div className={`absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] ${isDark ? 'opacity-100' : 'opacity-50'}`} />
                    <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] ${isDark ? 'bg-blue-600/20' : 'bg-blue-600/10'}`} />
                    <div className={`absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] ${isDark ? 'bg-cyan-600/15' : 'bg-cyan-600/10'}`} />
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
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20">
                                    <Code2 className="w-4 h-4" />
                                    Web Development
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                            >
                                World-class{' '}
                                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    web solutions
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className={`text-lg mb-8 leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}
                            >
                                From blazing-fast websites to complex web applications, we build digital
                                experiences that captivate users and drive business growth.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="flex flex-wrap gap-4"
                            >
                                <Link
                                    to="/#contact"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                                >
                                    Start Your Project
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        </div>

                        {/* Visual */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className={`rounded-3xl overflow-hidden ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-gray-50 border border-gray-200'}`}>
                                <img
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                                    alt="Web Development"
                                    className="w-full h-auto"
                                />
                            </div>
                            <div className={`absolute -bottom-6 -left-6 p-4 rounded-2xl backdrop-blur-xl ${isDark ? 'bg-white/10 border border-white/20' : 'bg-white/90 border border-gray-200 shadow-xl'}`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                        <Globe className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>200+</div>
                                        <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>Projects Delivered</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className={`py-20 ${isDark ? 'bg-[#020010]' : 'bg-gray-50'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`text-3xl sm:text-4xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}
                            >
                                Everything you need for success
                            </motion.h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={feature}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                        className="flex items-center gap-3"
                                    >
                                        <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                        <span className={`${isDark ? 'text-white/70' : 'text-gray-600'}`}>{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {technologies.map((tech, index) => (
                                <motion.div
                                    key={tech.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    className={`p-4 rounded-2xl text-center transition-all duration-300 ${isDark ? 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05]' : 'bg-white border border-gray-200 hover:shadow-lg'}`}
                                >
                                    <span className="text-2xl mb-2 block">{tech.icon}</span>
                                    <span className={`text-sm font-medium ${isDark ? 'text-white/70' : 'text-gray-700'}`}>{tech.name}</span>
                                </motion.div>
                            ))}
                        </div>
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
                            Our Process
                        </span>
                        <h2 className={`text-3xl sm:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            How we work
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
                                <span className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    {item.step}
                                </span>
                                <h3 className={`text-xl font-semibold mt-4 mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                                <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Case Studies */}
            <section className={`py-20 ${isDark ? 'bg-[#020010]' : 'bg-gray-50'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-4">
                            <Zap className="w-4 h-4" />
                            Success Stories
                        </span>
                        <h2 className={`text-3xl sm:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Results that speak
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {caseStudies.map((study, index) => (
                            <motion.div
                                key={study.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`group rounded-2xl overflow-hidden ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-white border border-gray-200 shadow-lg'}`}
                            >
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={study.image}
                                        alt={study.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{study.title}</h3>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                                {study.metric}
                                            </div>
                                            <div className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-400'}`}>{study.metricLabel}</div>
                                        </div>
                                    </div>
                                    <p className={`${isDark ? 'text-white/50' : 'text-gray-500'}`}>{study.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Templates Showcase Banner */}
            <section className={`py-16 ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`relative p-8 md:p-12 rounded-3xl overflow-hidden ${isDark ? 'bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-violet-500/20' : 'bg-gradient-to-br from-violet-100 to-fuchsia-100 border border-violet-200'}`}
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    Explore Our Website Templates
                                </h3>
                                <p className={`${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                    Browse through 7 stunning template designs to get inspired for your next project.
                                </p>
                            </div>
                            <Link
                                to="/templates"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-violet-500/25 transition-all whitespace-nowrap"
                            >
                                View Templates
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className={`py-20 ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`relative p-12 rounded-3xl overflow-hidden text-center ${isDark ? 'bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-white/10' : 'bg-gradient-to-br from-blue-100 to-cyan-100 border border-blue-200'}`}
                    >
                        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Ready to build something amazing?
                        </h2>
                        <p className={`mb-8 max-w-xl mx-auto ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                            Let's discuss your web development project and create something extraordinary together.
                        </p>
                        <Link
                            to="/#contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                        >
                            Get Started
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default WebDevelopment
