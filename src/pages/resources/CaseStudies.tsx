import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, Briefcase, ArrowRight, Filter, ChevronDown, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { contentApi } from '../../lib/api'

interface CaseStudy {
    _id: string
    title: string
    client: string
    industry: string
    description: string
    challenge: string
    solution: string
    results: string[]
    image: string
    tags: string[]
    color?: string
    slug?: string
}

const CaseStudies = () => {
    const heroRef = useRef<HTMLDivElement>(null)
    const isHeroInView = useInView(heroRef, { once: true })
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [activeIndustry, setActiveIndustry] = useState('All')
    const [expandedStudy, setExpandedStudy] = useState<string | null>(null)
    const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
    const [industries, setIndustries] = useState<string[]>(['All'])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCaseStudies = async () => {
            try {
                const response = await contentApi.get('/content/case-studies')
                const data = response.data || response
                if (data && data.length > 0) {
                    setCaseStudies(data)
                    const uniqueIndustries = ['All', ...new Set(data.map((cs: CaseStudy) => cs.industry))]
                    setIndustries(uniqueIndustries as string[])
                }
            } catch (error) {
                console.error('Failed to fetch case studies:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchCaseStudies()
    }, [])

    const filteredStudies = caseStudies.filter(
        study => activeIndustry === 'All' || study.industry === activeIndustry
    )

    const colorClasses: Record<string, string> = {
        violet: 'from-violet-500 to-purple-500',
        blue: 'from-blue-500 to-cyan-500',
        emerald: 'from-emerald-500 to-teal-500',
        pink: 'from-pink-500 to-rose-500',
        cyan: 'from-cyan-500 to-blue-500',
        green: 'from-green-500 to-emerald-500',
    }

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0">
                    <div className={`absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] ${isDark ? 'opacity-100' : 'opacity-50'}`} />
                    <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] ${isDark ? 'bg-violet-600/20' : 'bg-violet-600/10'}`} />
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
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="mb-6"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-violet-400 bg-violet-500/10 rounded-full border border-violet-500/20">
                                <Briefcase className="w-4 h-4" />
                                Case Studies
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                            Success{' '}
                            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                                stories
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`text-lg leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}
                        >
                            Explore how we've helped companies transform their digital presence and achieve
                            remarkable results across various industries.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Filter */}
            <section className={`py-8 sticky top-16 z-20 ${isDark ? 'bg-[#030014]/80' : 'bg-white/80'} backdrop-blur-xl border-b ${isDark ? 'border-white/[0.05]' : 'border-gray-200'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <div className="flex items-center gap-4 overflow-x-auto pb-2">
                        <Filter className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-white/40' : 'text-gray-400'}`} />
                        {industries.map((industry) => (
                            <button
                                key={industry}
                                onClick={() => setActiveIndustry(industry)}
                                className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all ${activeIndustry === industry
                                    ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white'
                                    : isDark
                                        ? 'text-white/50 hover:text-white bg-white/[0.03] hover:bg-white/[0.08]'
                                        : 'text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'
                                    }`}
                            >
                                {industry}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Case Studies Grid */}
            <section className={`py-20 ${isDark ? 'bg-[#020010]' : 'bg-gray-50'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
                        </div>
                    ) : caseStudies.length === 0 ? (
                        <div className="text-center py-16">
                            <Briefcase className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-white/20' : 'text-gray-300'}`} />
                            <p className={`text-lg ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                No case studies available yet. Check back soon!
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {filteredStudies.map((study, index) => (
                                <motion.article
                                    key={study._id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className={`rounded-3xl overflow-hidden ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-white border border-gray-200 shadow-xl'}`}
                                >
                                    <div className="grid lg:grid-cols-2">
                                        {/* Image */}
                                        <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                                            <img
                                                src={study.image}
                                                alt={study.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className={`absolute inset-0 bg-gradient-to-r ${colorClasses[study.color || 'violet']} opacity-20`} />
                                            <div className="absolute top-6 left-6">
                                                <span className={`px-3 py-1 text-xs font-medium text-white bg-black/30 backdrop-blur-md rounded-full`}>
                                                    {study.industry}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-8 lg:p-12">
                                            <span className={`text-sm font-medium ${isDark ? 'text-white/40' : 'text-gray-400'}`}>{study.client}</span>
                                            <h2 className={`text-2xl lg:text-3xl font-bold mt-2 mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {study.title}
                                            </h2>
                                            <p className={`mb-6 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                                {study.description}
                                            </p>

                                            {/* Results */}
                                            <div className="grid grid-cols-2 gap-4 mb-6">
                                                {study.results.map((result, i) => (
                                                    <div key={i} className={`p-3 rounded-xl ${isDark ? 'bg-white/[0.03]' : 'bg-gray-50'}`}>
                                                        <span className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-700'}`}>{result}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {study.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className={`px-3 py-1 text-xs font-medium rounded-full ${isDark ? 'bg-white/[0.05] text-white/60' : 'bg-gray-100 text-gray-600'}`}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Expandable details */}
                                            <button
                                                onClick={() => setExpandedStudy(expandedStudy === study._id ? null : study._id)}
                                                className={`flex items-center gap-2 text-sm font-medium ${isDark ? 'text-violet-400 hover:text-violet-300' : 'text-violet-600 hover:text-violet-700'}`}
                                            >
                                                {expandedStudy === study._id ? 'Show less' : 'Read full case study'}
                                                <ChevronDown className={`w-4 h-4 transition-transform ${expandedStudy === study._id ? 'rotate-180' : ''}`} />
                                            </button>

                                            {expandedStudy === study._id && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="mt-6 pt-6 border-t border-white/10"
                                                >
                                                    <div className="space-y-4">
                                                        <div>
                                                            <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Challenge</h4>
                                                            <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{study.challenge}</p>
                                                        </div>
                                                        <div>
                                                            <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Solution</h4>
                                                            <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{study.solution}</p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className={`py-20 ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`relative p-12 rounded-3xl overflow-hidden text-center ${isDark ? 'bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-white/10' : 'bg-gradient-to-br from-violet-100 to-fuchsia-100 border border-violet-200'}`}
                    >
                        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Ready to be our next success story?
                        </h2>
                        <p className={`mb-8 max-w-xl mx-auto ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                            Let's discuss how we can help transform your business with our expertise.
                        </p>
                        <Link
                            to="/#contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-violet-500/25 transition-all"
                        >
                            Start Your Project
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default CaseStudies
