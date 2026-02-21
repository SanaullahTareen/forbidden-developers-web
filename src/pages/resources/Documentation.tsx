import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, BookOpen, Search, ChevronRight, Code2, Palette, Database, Cloud, Shield, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const sections = [
    {
        id: 'getting-started',
        icon: Zap,
        title: 'Getting Started',
        description: 'Quick start guides and onboarding resources',
        articles: [
            { title: 'Welcome to Forbidden Dev', time: '3 min' },
            { title: 'Setting up your project', time: '5 min' },
            { title: 'Understanding our workflow', time: '4 min' },
            { title: 'Communication guidelines', time: '3 min' },
        ],
    },
    {
        id: 'development',
        icon: Code2,
        title: 'Development',
        description: 'Technical documentation and coding standards',
        articles: [
            { title: 'Code style guide', time: '8 min' },
            { title: 'Git workflow and branching', time: '6 min' },
            { title: 'Testing best practices', time: '10 min' },
            { title: 'Performance optimization', time: '12 min' },
        ],
    },
    {
        id: 'design',
        icon: Palette,
        title: 'Design System',
        description: 'UI components and design guidelines',
        articles: [
            { title: 'Component library overview', time: '5 min' },
            { title: 'Color and typography', time: '4 min' },
            { title: 'Responsive design principles', time: '6 min' },
            { title: 'Animation guidelines', time: '5 min' },
        ],
    },
    {
        id: 'infrastructure',
        icon: Cloud,
        title: 'Infrastructure',
        description: 'Deployment and DevOps documentation',
        articles: [
            { title: 'CI/CD pipeline setup', time: '10 min' },
            { title: 'Cloud architecture overview', time: '8 min' },
            { title: 'Monitoring and logging', time: '7 min' },
            { title: 'Scaling strategies', time: '9 min' },
        ],
    },
    {
        id: 'security',
        icon: Shield,
        title: 'Security',
        description: 'Security protocols and compliance',
        articles: [
            { title: 'Security best practices', time: '8 min' },
            { title: 'Authentication & authorization', time: '10 min' },
            { title: 'Data protection guidelines', time: '6 min' },
            { title: 'Compliance requirements', time: '7 min' },
        ],
    },
    {
        id: 'databases',
        icon: Database,
        title: 'Databases',
        description: 'Database design and management',
        articles: [
            { title: 'Database selection guide', time: '8 min' },
            { title: 'Schema design patterns', time: '12 min' },
            { title: 'Query optimization', time: '10 min' },
            { title: 'Migration strategies', time: '7 min' },
        ],
    },
]

const popularArticles = [
    { title: 'Complete API reference', category: 'Development', time: '15 min' },
    { title: 'Design system components', category: 'Design', time: '10 min' },
    { title: 'Deployment checklist', category: 'Infrastructure', time: '5 min' },
    { title: 'Security audit guide', category: 'Security', time: '12 min' },
]

const Documentation = () => {
    const heroRef = useRef<HTMLDivElement>(null)
    const isHeroInView = useInView(heroRef, { once: true })
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [searchQuery, setSearchQuery] = useState('')
    const [activeSection, setActiveSection] = useState<string | null>(null)

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0">
                    <div className={`absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] ${isDark ? 'opacity-100' : 'opacity-50'}`} />
                    <div className={`absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] ${isDark ? 'bg-blue-600/15' : 'bg-blue-600/10'}`} />
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

                    <div className="max-w-3xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="mb-6"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20">
                                <BookOpen className="w-4 h-4" />
                                Documentation
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                            How can we{' '}
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                help you?
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`text-lg mb-8 ${isDark ? 'text-white/60' : 'text-gray-600'}`}
                        >
                            Comprehensive guides, tutorials, and references for working with our platform.
                        </motion.p>

                        {/* Search */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="relative max-w-xl mx-auto"
                        >
                            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/30' : 'text-gray-400'}`} />
                            <input
                                type="text"
                                placeholder="Search documentation..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full pl-12 pr-4 py-4 rounded-2xl border text-lg transition-all ${isDark ? 'bg-white/[0.03] border-white/[0.1] focus:border-blue-500/50 text-white placeholder:text-white/30' : 'bg-white border-gray-200 focus:border-blue-500 text-gray-900 placeholder:text-gray-400 shadow-lg'} outline-none`}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Popular Articles */}
            <section className={`py-12 ${isDark ? 'bg-[#020010]' : 'bg-gray-50'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Popular Articles</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {popularArticles.map((article, index) => (
                            <motion.a
                                key={article.title}
                                href="#"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className={`group p-4 rounded-xl transition-all ${isDark ? 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05]' : 'bg-white border border-gray-200 hover:shadow-lg'}`}
                            >
                                <span className={`text-xs font-medium px-2 py-1 rounded ${isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                                    {article.category}
                                </span>
                                <h3 className={`font-medium mt-3 mb-2 group-hover:text-blue-400 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {article.title}
                                </h3>
                                <span className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-400'}`}>{article.time} read</span>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Documentation Sections */}
            <section className={`py-20 ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sections.map((section, index) => {
                            const Icon = section.icon
                            const isExpanded = activeSection === section.id

                            return (
                                <motion.div
                                    key={section.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`rounded-2xl overflow-hidden transition-all ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-white border border-gray-200 shadow-lg'}`}
                                >
                                    <button
                                        onClick={() => setActiveSection(isExpanded ? null : section.id)}
                                        className="w-full p-6 text-left"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-4">
                                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${isDark ? 'from-blue-500/20 to-cyan-500/20' : 'from-blue-100 to-cyan-100'} flex items-center justify-center flex-shrink-0`}>
                                                    <Icon className="w-6 h-6 text-blue-500" />
                                                </div>
                                                <div>
                                                    <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{section.title}</h3>
                                                    <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{section.description}</p>
                                                </div>
                                            </div>
                                            <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-transform ${isDark ? 'text-white/30' : 'text-gray-300'} ${isExpanded ? 'rotate-90' : ''}`} />
                                        </div>
                                    </button>

                                    {isExpanded && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className={`px-6 pb-6 border-t ${isDark ? 'border-white/[0.05]' : 'border-gray-100'}`}
                                        >
                                            <ul className="mt-4 space-y-3">
                                                {section.articles.map((article) => (
                                                    <li key={article.title}>
                                                        <a
                                                            href="#"
                                                            className={`flex items-center justify-between py-2 text-sm transition-colors ${isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                                                        >
                                                            <span>{article.title}</span>
                                                            <span className={`${isDark ? 'text-white/30' : 'text-gray-400'}`}>{article.time}</span>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Help CTA */}
            <section className={`py-20 ${isDark ? 'bg-[#020010]' : 'bg-gray-50'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`relative p-12 rounded-3xl overflow-hidden text-center ${isDark ? 'bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-white/10' : 'bg-gradient-to-br from-blue-100 to-cyan-100 border border-blue-200'}`}
                    >
                        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Can't find what you're looking for?
                        </h2>
                        <p className={`mb-8 max-w-xl mx-auto ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                            Our support team is here to help. Get in touch and we'll get back to you within 24 hours.
                        </p>
                        <Link
                            to="/resources/help-center"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                        >
                            Contact Support
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Documentation
