import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, Briefcase, MapPin, Clock, ArrowRight, Heart, Zap, Coffee, Laptop, Users, Rocket } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { contentApi } from '../lib/api'
import JobApplicationModal from '../components/JobApplicationModal'

interface CustomQuestion {
    question: string
    type: 'text' | 'textarea' | 'select' | 'yesno'
    options?: string[]
    required: boolean
}

interface Job {
    _id: string
    title: string
    department: string
    location: string
    type: string
    description: string
    requirements?: string[]
    tags: string[]
    salary?: string
    customQuestions?: CustomQuestion[]
}

const benefits = [
    { icon: Laptop, title: 'Remote First', description: 'Work from anywhere in the world' },
    { icon: Heart, title: 'Health & Wellness', description: 'Premium health, dental & vision coverage' },
    { icon: Coffee, title: 'Unlimited PTO', description: 'Take time off when you need it' },
    { icon: Zap, title: 'Learning Budget', description: '$5,000 annual learning & development' },
    { icon: Users, title: 'Team Events', description: 'Quarterly team retreats & meetups' },
    { icon: Rocket, title: 'Equity Package', description: 'Competitive equity for all employees' },
]

const Careers = () => {
    const heroRef = useRef<HTMLDivElement>(null)
    const isHeroInView = useInView(heroRef, { once: true })
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const [jobs, setJobs] = useState<Job[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedJob, setSelectedJob] = useState<Job | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isGeneralSubmission, setIsGeneralSubmission] = useState(false)

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await contentApi.get('/content/careers')
                if (response.data) {
                    setJobs(response.data)
                }
            } catch (error) {
                console.error('Failed to fetch jobs:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchJobs()
    }, [])

    const openJobModal = (job: Job) => {
        setSelectedJob(job)
        setIsGeneralSubmission(false)
        setIsModalOpen(true)
    }

    const openGeneralModal = () => {
        setSelectedJob(null)
        setIsGeneralSubmission(true)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedJob(null)
    }

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0">
                    <div className={`absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:60px_60px] ${isDark ? 'opacity-100' : 'opacity-50'}`} />
                    <div className={`absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] ${isDark ? 'bg-cyan-600/20' : 'bg-cyan-600/10'}`} />
                    <div className={`absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] ${isDark ? 'bg-emerald-600/15' : 'bg-emerald-600/10'}`} />
                </div>

                <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    {/* Back button */}
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
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="mb-6"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-cyan-400 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                                <Briefcase className="w-4 h-4" />
                                Join Our Team
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                            Build the future{' '}
                            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                                with us
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`text-lg mb-8 leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}
                        >
                            Join a team of exceptional engineers, designers, and innovators working on
                            cutting-edge projects that shape the digital landscape. Remote-first, globally distributed.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-wrap gap-4"
                        >
                            <a
                                href="#positions"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                            >
                                View Open Positions
                                <ArrowRight className="w-4 h-4" />
                            </a>
                            <span className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${isDark ? 'bg-white/[0.05] text-white/60' : 'bg-gray-100 text-gray-600'}`}>
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                {loading ? '...' : jobs.length} Open Positions
                            </span>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className={`py-20 ${isDark ? 'bg-[#020010]' : 'bg-gray-50'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-violet-400 bg-violet-500/10 rounded-full border border-violet-500/20 mb-4">
                            <Heart className="w-4 h-4" />
                            Benefits & Perks
                        </span>
                        <h2 className={`text-3xl sm:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Why you'll love working here
                        </h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit, index) => {
                            const Icon = benefit.icon
                            return (
                                <motion.div
                                    key={benefit.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`group p-6 rounded-2xl transition-all duration-300 ${isDark ? 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05]' : 'bg-white border border-gray-200 hover:shadow-xl'}`}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Icon className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{benefit.title}</h3>
                                    <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{benefit.description}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Open Positions Section */}
            <section id="positions" className={`py-20 ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20 mb-4">
                            <Briefcase className="w-4 h-4" />
                            Open Positions
                        </span>
                        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Find your next role
                        </h2>
                        <p className={`max-w-2xl mx-auto ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                            We're always looking for talented individuals to join our growing team.
                        </p>
                    </motion.div>

                    <div className="space-y-4">
                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : jobs.length === 0 ? (
                            <div className="text-center py-20">
                                <p className={`text-lg ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                    No open positions at the moment. Check back soon!
                                </p>
                            </div>
                        ) : (
                            jobs.map((job, index) => (
                                <motion.div
                                    key={job._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    onClick={() => openJobModal(job)}
                                    className={`group p-6 rounded-2xl transition-all duration-300 cursor-pointer ${isDark ? 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.1]' : 'bg-white border border-gray-200 hover:shadow-xl hover:border-gray-300'}`}
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{job.title}</h3>
                                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${isDark ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-cyan-50 text-cyan-600 border border-cyan-200'}`}>
                                                    {job.department}
                                                </span>
                                            </div>
                                            <p className={`mb-3 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{job.description}</p>
                                            <div className="flex flex-wrap items-center gap-4 text-sm">
                                                <span className={`flex items-center gap-1 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                                                    <MapPin className="w-4 h-4" />
                                                    {job.location}
                                                </span>
                                                <span className={`flex items-center gap-1 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                                                    <Clock className="w-4 h-4" />
                                                    {job.type}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2 lg:justify-end">
                                            {job.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className={`px-3 py-1 text-xs font-medium rounded-full ${isDark ? 'bg-white/[0.05] text-white/60' : 'bg-gray-100 text-gray-600'}`}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <ArrowRight className={`w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform ${isDark ? 'text-white/30 group-hover:text-white' : 'text-gray-300 group-hover:text-gray-600'}`} />
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={`py-20 ${isDark ? 'bg-[#020010]' : 'bg-gray-50'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`relative p-12 rounded-3xl overflow-hidden text-center ${isDark ? 'bg-gradient-to-br from-cyan-600/20 to-emerald-600/20 border border-white/10' : 'bg-gradient-to-br from-cyan-100 to-emerald-100 border border-cyan-200'}`}
                    >
                        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Don't see the right role?
                        </h2>
                        <p className={`mb-8 max-w-xl mx-auto ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                            We're always interested in meeting talented people. Send us your resume and we'll keep you in mind for future opportunities.
                        </p>
                        <button
                            onClick={openGeneralModal}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                        >
                            Send Your Resume
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Job Application Modal */}
            <JobApplicationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                job={selectedJob}
                isGeneral={isGeneralSubmission}
            />
        </div>
    )
}

export default Careers
