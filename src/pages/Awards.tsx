import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, Award, Trophy, Star, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { contentApi } from '../lib/api'

interface AwardItem {
    _id: string
    title: string
    organization: string
    year: string
    category?: string
    description?: string
    image?: string
    link?: string
    order: number
}

const Awards = () => {
    const heroRef = useRef<HTMLDivElement>(null)
    const isHeroInView = useInView(heroRef, { once: true })
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const [awards, setAwards] = useState<AwardItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAwards = async () => {
            try {
                const response = await contentApi.get('/content/awards')
                if (response.data) {
                    setAwards(response.data)
                }
            } catch (error) {
                console.error('Failed to fetch awards:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchAwards()
    }, [])

    // Group awards by year
    const awardsByYear = awards.reduce((acc, award) => {
        if (!acc[award.year]) acc[award.year] = []
        acc[award.year].push(award)
        return acc
    }, {} as Record<string, AwardItem[]>)

    const sortedYears = Object.keys(awardsByYear).sort((a, b) => parseInt(b) - parseInt(a))

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0">
                    <div className={`absolute inset-0 bg-[linear-gradient(rgba(234,179,8,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(234,179,8,0.03)_1px,transparent_1px)] bg-[size:60px_60px] ${isDark ? 'opacity-100' : 'opacity-50'}`} />
                    <div className={`absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] ${isDark ? 'bg-yellow-600/15' : 'bg-yellow-600/10'}`} />
                    <div className={`absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] ${isDark ? 'bg-amber-600/15' : 'bg-amber-600/10'}`} />
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
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-yellow-400 bg-yellow-500/10 rounded-full border border-yellow-500/20">
                                <Trophy className="w-4 h-4" />
                                Recognition
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                            Awards &{' '}
                            <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                                Recognition
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`text-lg mb-8 leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}
                        >
                            We're honored to be recognized by industry leaders for our commitment to
                            excellence in digital innovation and design.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Awards Timeline */}
            <section className={`py-20 ${isDark ? 'bg-[#020010]' : 'bg-gray-50'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : awards.length === 0 ? (
                        <div className="text-center py-20">
                            <Trophy className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-white/20' : 'text-gray-300'}`} />
                            <p className={`text-lg ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                Awards coming soon!
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {sortedYears.map((year, yearIndex) => (
                                <motion.div
                                    key={year}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: yearIndex * 0.1 }}
                                >
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            {year}
                                        </div>
                                        <div className={`flex-1 h-px ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
                                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${isDark ? 'bg-yellow-500/10 text-yellow-400' : 'bg-yellow-100 text-yellow-600'}`}>
                                            <Sparkles className="w-4 h-4" />
                                            {awardsByYear[year].length} Award{awardsByYear[year].length > 1 ? 's' : ''}
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {awardsByYear[year].map((award, index) => (
                                            <motion.div
                                                key={award._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                                className={`group p-6 rounded-2xl transition-all duration-300 ${isDark ? 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-yellow-500/20' : 'bg-white border border-gray-200 hover:shadow-xl hover:border-yellow-400'}`}
                                            >
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <Award className="w-6 h-6 text-yellow-400" />
                                                    </div>
                                                    {award.link && (
                                                        <a
                                                            href={award.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                                                        >
                                                            <Star className={`w-4 h-4 ${isDark ? 'text-white/40' : 'text-gray-400'}`} />
                                                        </a>
                                                    )}
                                                </div>

                                                <h3 className={`text-lg font-semibold mb-2 group-hover:text-yellow-500 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                    {award.title}
                                                </h3>

                                                <p className={`text-sm mb-3 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                                    {award.organization}
                                                </p>

                                                {award.category && (
                                                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${isDark ? 'bg-white/5 text-white/40' : 'bg-gray-100 text-gray-600'}`}>
                                                        {award.category}
                                                    </span>
                                                )}

                                                {award.description && (
                                                    <p className={`mt-3 text-sm ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                                                        {award.description}
                                                    </p>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Stats Section */}
            <section className={`py-20 ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Recognition by the Numbers
                        </h2>
                        <p className={`max-w-2xl mx-auto ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                            Our dedication to excellence has been recognized across the industry.
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { number: awards.length.toString() + '+', label: 'Awards Won' },
                            { number: sortedYears.length.toString(), label: 'Years of Excellence' },
                            { number: '50+', label: 'Industry Partners' },
                            { number: '100%', label: 'Client Satisfaction' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`p-6 rounded-2xl text-center ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-gray-50 border border-gray-200'}`}
                            >
                                <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent mb-2">
                                    {stat.number}
                                </div>
                                <div className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Awards
