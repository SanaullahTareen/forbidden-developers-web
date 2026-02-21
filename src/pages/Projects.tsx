import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ExternalLink, X, Calendar, Tag, Search, Filter } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { contentApi } from '../lib/api'

interface Project {
    _id: string
    title: string
    subtitle: string
    description: string
    image: string
    tags: string[]
    color: string
    year: string
    category: string
    link?: string
    order: number
}

const categories = ['All', 'Web', 'Mobile', 'AI', 'Design']

const Projects = () => {
    const heroRef = useRef<HTMLDivElement>(null)
    const isHeroInView = useInView(heroRef, { once: true })
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await contentApi.get('/content/projects')
                if (response.data) {
                    setProjects(response.data)
                }
            } catch (error) {
                console.error('Failed to fetch projects:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchProjects()
    }, [])

    const filteredProjects = projects.filter(project => {
        const matchesCategory = activeCategory === 'All' || project.category === activeCategory
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        return matchesCategory && matchesSearch
    })

    const openProjectModal = (project: Project) => {
        setSelectedProject(project)
        document.body.style.overflow = 'hidden'
    }

    const closeProjectModal = () => {
        setSelectedProject(null)
        document.body.style.overflow = 'auto'
    }

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0">
                    <div className={`absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:60px_60px] ${isDark ? 'opacity-100' : 'opacity-50'}`} />
                    <div className={`absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full blur-[150px] ${isDark ? 'bg-cyan-600/15' : 'bg-cyan-600/10'}`} />
                    <div className={`absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full blur-[120px] ${isDark ? 'bg-blue-600/15' : 'bg-blue-600/10'}`} />
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

                    <div className="max-w-3xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                            Our{' '}
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                Projects
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`text-lg mb-8 leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}
                        >
                            Explore our portfolio of successful projects across various industries and technologies.
                        </motion.p>

                        {/* Search */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="relative max-w-md"
                        >
                            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/30' : 'text-gray-400'}`} />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all ${isDark ? 'bg-white/[0.03] border-white/[0.1] focus:border-cyan-500/50 text-white placeholder:text-white/30' : 'bg-white border-gray-200 focus:border-cyan-500 text-gray-900 placeholder:text-gray-400'} outline-none`}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className={`py-16 ${isDark ? 'bg-[#020010]' : 'bg-gray-50'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    {/* Category filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-2 mb-12"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeCategory === cat
                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                                    : isDark
                                        ? 'text-white/50 hover:text-white bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08]'
                                        : 'text-gray-500 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-100'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : filteredProjects.length === 0 ? (
                        <div className="text-center py-20">
                            <p className={`text-lg ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                No projects found matching your criteria.
                            </p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    onClick={() => openProjectModal(project)}
                                    className={`group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${isDark ? 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.1]' : 'bg-white border border-gray-200 hover:shadow-xl'}`}
                                >
                                    <div className="aspect-[16/10] overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-100 text-cyan-600'}`}>
                                                {project.category}
                                            </span>
                                            <span className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                                                {project.year}
                                            </span>
                                        </div>
                                        <h3 className={`text-xl font-semibold mb-2 group-hover:text-cyan-500 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            {project.title}
                                        </h3>
                                        <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className={`px-2 py-1 text-xs font-medium rounded-full ${isDark ? 'text-white/40 bg-white/[0.05]' : 'text-gray-600 bg-gray-100'}`}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Project Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                            onClick={closeProjectModal}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl ${isDark ? 'bg-[#0a0a1a] border border-white/10' : 'bg-white'}`}
                        >
                            <button
                                onClick={closeProjectModal}
                                className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}
                            >
                                <X className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-700'}`} />
                            </button>

                            <div className="relative aspect-video">
                                <img
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#0a0a1a]' : 'from-white'} to-transparent`} />
                            </div>

                            <div className="p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-100 text-cyan-600'}`}>
                                        {selectedProject.category}
                                    </span>
                                    <span className={`flex items-center gap-1 text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                                        <Calendar className="w-4 h-4" />
                                        {selectedProject.year}
                                    </span>
                                </div>

                                <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {selectedProject.title}
                                </h2>
                                <p className={`text-lg mb-6 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                    {selectedProject.subtitle}
                                </p>

                                <p className={`mb-6 leading-relaxed ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                                    {selectedProject.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {selectedProject.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-full ${isDark ? 'bg-white/[0.05] text-white/60' : 'bg-gray-100 text-gray-600'}`}
                                        >
                                            <Tag className="w-3 h-3" />
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {selectedProject.link && (
                                    <a
                                        href={selectedProject.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                                    >
                                        Visit Project
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Projects
