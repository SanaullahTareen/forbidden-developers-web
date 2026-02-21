import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ExternalLink, ArrowUpRight, X, Calendar, Tag } from 'lucide-react'
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

const fallbackProjects: Omit<Project, '_id'>[] = [
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
    },
]

const categories = ['All', 'Web', 'Mobile', 'AI', 'Design']

const Portfolio = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
    const [hoveredId, setHoveredId] = useState<string | null>(null)
    const [activeCategory, setActiveCategory] = useState('All')
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [projects, setProjects] = useState<(Project | Omit<Project, '_id'>)[]>(fallbackProjects)
    const [selectedProject, setSelectedProject] = useState<Project | Omit<Project, '_id'> | null>(null)

    const openProjectModal = (project: Project | Omit<Project, '_id'>) => {
        setSelectedProject(project)
        document.body.style.overflow = 'hidden'
    }

    const closeProjectModal = () => {
        setSelectedProject(null)
        document.body.style.overflow = 'auto'
    }

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await contentApi.get('/content/projects')
                if (response.data && response.data.length > 0) {
                    setProjects(response.data)
                }
            } catch (error) {
                console.error('Failed to fetch projects:', error)
            }
        }
        fetchProjects()
    }, [])

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(p => p.category === activeCategory)

    // Show only first 4 projects on homepage
    const displayedProjects = filteredProjects.slice(0, 4)

    return (
        <section id="portfolio" ref={sectionRef} className={`relative py-20 md:py-32 overflow-hidden ${isDark ? 'bg-[#020010]' : 'bg-white'}`}>
            {/* Background */}
            <div className="absolute inset-0">
                <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] ${isDark ? 'opacity-100' : 'opacity-0'}`} />
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full blur-[150px] ${isDark ? 'bg-blue-600/10' : 'bg-blue-600/5'}`} />
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-16">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="mb-4"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-cyan-400 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                Selected Work
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                            Projects we're{' '}
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                proud of
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`text-base md:text-lg ${isDark ? 'text-white/40' : 'text-gray-500'}`}
                        >
                            A showcase of our finest work, demonstrating our expertise in creating
                            impactful digital solutions.
                        </motion.p>
                    </div>

                    {/* Category filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-wrap gap-2"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 md:px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeCategory === cat
                                    ? isDark ? 'bg-white text-black' : 'bg-gray-900 text-white'
                                    : isDark
                                        ? 'text-white/50 hover:text-white bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08]'
                                        : 'text-gray-500 hover:text-gray-900 bg-gray-100 border border-gray-200 hover:bg-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Projects grid */}
                <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                    {displayedProjects.map((project, index) => {
                        const projectId = '_id' in project ? project._id : project.title
                        return (
                            <motion.div
                                key={projectId}
                                initial={{ opacity: 0, y: 60 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: [0.33, 1, 0.68, 1] }}
                                onMouseEnter={() => setHoveredId(projectId)}
                                onMouseLeave={() => setHoveredId(null)}
                                onClick={() => openProjectModal(project)}
                                className="group relative cursor-pointer"
                            >
                                <div className={`relative rounded-2xl md:rounded-3xl overflow-hidden backdrop-blur-sm ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-white border border-gray-200 shadow-lg'}`}>
                                    {/* Image container */}
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <motion.img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                            animate={{
                                                scale: hoveredId === projectId ? 1.05 : 1,
                                            }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                        />

                                        {/* Overlay gradient */}
                                        <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#020010] via-[#020010]/50' : 'from-black/70 via-black/30'} to-transparent`} />

                                        {/* Year badge */}
                                        <div className="absolute top-4 md:top-6 left-4 md:left-6">
                                            <span className="px-3 py-1 text-xs font-medium text-white/70 bg-black/30 backdrop-blur-md rounded-full border border-white/10">
                                                {project.year}
                                            </span>
                                        </div>

                                        {/* View button */}
                                        <AnimatePresence>
                                            {hoveredId === projectId && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    className="absolute top-4 md:top-6 right-4 md:right-6"
                                                >
                                                    <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center text-black hover:scale-110 transition-transform">
                                                        <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 md:p-8">
                                        <div className="flex items-start justify-between gap-4 mb-4">
                                            <div>
                                                <p className={`text-sm mb-1 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{project.subtitle}</p>
                                                <h3 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
                                            </div>
                                            <ExternalLink className={`w-5 h-5 flex-shrink-0 mt-1 transition-colors ${isDark ? 'text-white/20 group-hover:text-white/60' : 'text-gray-300 group-hover:text-gray-600'}`} />
                                        </div>

                                        <p className={`mb-6 line-clamp-2 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                                            {project.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className={`px-3 py-1 text-xs font-medium rounded-full ${isDark ? 'text-white/50 bg-white/[0.05]' : 'text-gray-600 bg-gray-100'}`}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* View all button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center mt-12 md:mt-16"
                >
                    <Link
                        to="/projects"
                        className={`group inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 font-semibold rounded-full border transition-all ${isDark ? 'text-white border-white/10 hover:bg-white/[0.05]' : 'text-gray-900 border-gray-300 hover:bg-gray-50'}`}
                    >
                        View All Projects
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>

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
                            {/* Close button */}
                            <button
                                onClick={closeProjectModal}
                                className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}
                            >
                                <X className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-700'}`} />
                            </button>

                            {/* Image */}
                            <div className="relative aspect-video">
                                <img
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#0a0a1a]' : 'from-white'} to-transparent`} />
                            </div>

                            {/* Content */}
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

                                {/* Tags */}
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

                                {/* Project Link */}
                                {'link' in selectedProject && selectedProject.link && (
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
        </section>
    )
}

export default Portfolio
