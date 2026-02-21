import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'
import { Brain, Cpu, Zap, Shield, Users, Clock, type LucideIcon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { contentApi } from '../lib/api'

interface Stat {
    _id?: string
    value: number
    suffix: string
    label: string
    description: string
    order: number
}

interface Skill {
    _id?: string
    icon: string
    title: string
    description: string
    order: number
}

interface TechSkill {
    _id?: string
    name: string
    order: number
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
    Brain, Cpu, Zap, Shield, Users, Clock
}

const fallbackStats: Stat[] = [
    { value: 150, suffix: '+', label: 'Projects Delivered', description: 'Across various industries', order: 0 },
    { value: 98, suffix: '%', label: 'Client Retention', description: 'Long-term partnerships', order: 1 },
    { value: 50, suffix: '+', label: 'Team Members', description: 'Expert developers & designers', order: 2 },
    { value: 8, suffix: '+', label: 'Years Experience', description: 'Building digital products', order: 3 },
]

const fallbackSkills: Skill[] = [
    { icon: 'Brain', title: 'AI Innovation', description: 'Cutting-edge AI & ML solutions', order: 0 },
    { icon: 'Cpu', title: 'ML Expertise', description: 'Advanced machine learning models', order: 1 },
    { icon: 'Users', title: 'Expert Team', description: 'Seasoned professionals across all domains', order: 2 },
    { icon: 'Zap', title: 'Agile Process', description: 'Flexible methodology for fast iteration', order: 3 },
    { icon: 'Shield', title: 'Transparent', description: 'Clear communication at every step', order: 4 },
    { icon: 'Clock', title: '24/7 Support', description: 'Round-the-clock assistance', order: 5 },
]

const fallbackTechSkills: TechSkill[] = [
    { name: 'React', order: 0 },
    { name: 'Next.js', order: 1 },
    { name: 'TypeScript', order: 2 },
    { name: 'Node.js', order: 3 },
    { name: 'Python', order: 4 },
    { name: 'AWS', order: 5 },
    { name: 'TensorFlow', order: 6 },
    { name: 'PyTorch', order: 7 },
    { name: 'OpenAI', order: 8 },
]

// Animated counter with spring physics
const AnimatedCounter = ({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) => {
    const springValue = useSpring(0, { stiffness: 50, damping: 20 })
    const displayValue = useTransform(springValue, (latest) => Math.floor(latest))
    const [displayNumber, setDisplayNumber] = useState(0)

    useEffect(() => {
        if (isInView) {
            springValue.set(value)
        }
    }, [isInView, value, springValue])

    useEffect(() => {
        const unsubscribe = displayValue.on('change', (latest) => {
            setDisplayNumber(latest)
        })
        return () => unsubscribe()
    }, [displayValue])

    return (
        <span className="tabular-nums">
            {displayNumber}{suffix}
        </span>
    )
}

const Stats = () => {
    const { theme } = useTheme()
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
    const isDark = theme === 'dark'
    const [stats, setStats] = useState<Stat[]>(fallbackStats)
    const [skills, setSkills] = useState<Skill[]>(fallbackSkills)
    const [techSkills, setTechSkills] = useState<TechSkill[]>(fallbackTechSkills)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, skillsRes, techRes] = await Promise.all([
                    contentApi.get('/content/stats'),
                    contentApi.get('/content/skills'),
                    contentApi.get('/content/tech-skills')
                ])
                if (statsRes.data && statsRes.data.length > 0) {
                    setStats(statsRes.data)
                }
                if (skillsRes.data && skillsRes.data.length > 0) {
                    setSkills(skillsRes.data)
                }
                if (techRes.data && techRes.data.length > 0) {
                    setTechSkills(techRes.data)
                }
            } catch (error) {
                console.error('Failed to fetch stats/skills:', error)
            }
        }
        fetchData()
    }, [])

    return (
        <section id="about" ref={sectionRef} className={`relative py-20 md:py-32 overflow-hidden ${isDark ? 'bg-[#030014]' : 'bg-gray-50'}`}>
            {/* Background */}
            <div className="absolute inset-0">
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] rounded-full blur-[150px] ${isDark ? 'bg-gradient-to-r from-violet-600/10 via-fuchsia-600/10 to-cyan-600/10' : 'bg-gradient-to-r from-violet-400/20 via-fuchsia-400/20 to-cyan-400/20'}`} />
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="mb-4"
                    >
                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-full border ${isDark ? 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20' : 'text-fuchsia-600 bg-fuchsia-100 border-fuchsia-200'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-fuchsia-400' : 'bg-fuchsia-500'}`} />
                            About Us
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                    >
                        Numbers that{' '}
                        <span className="bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                            speak
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={`text-base md:text-lg ${isDark ? 'text-white/40' : 'text-gray-500'}`}
                    >
                        Our track record of excellence in delivering transformative digital solutions
                        for businesses worldwide.
                    </motion.p>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: [0.33, 1, 0.68, 1] }}
                            className="group relative"
                        >
                            <div className={`relative p-6 md:p-8 rounded-2xl md:rounded-3xl backdrop-blur-sm text-center transition-all duration-500 ${isDark ? 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1]' : 'bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200'}`}>
                                {/* Value */}
                                <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    <AnimatedCounter
                                        value={stat.value}
                                        suffix={stat.suffix}
                                        isInView={isInView}
                                    />
                                </div>

                                {/* Label */}
                                <div className={`text-sm md:text-lg font-semibold mb-1 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                                    {stat.label}
                                </div>

                                {/* Description */}
                                <div className={`text-xs md:text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                                    {stat.description}
                                </div>

                                {/* Decorative element */}
                                <div className={`absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isDark ? 'from-violet-600/20 via-transparent to-fuchsia-600/20' : 'from-violet-400/10 via-transparent to-fuchsia-400/10'}`} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Why choose us section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-16 md:mt-20 grid lg:grid-cols-2 gap-8 md:gap-12 items-start"
                >
                    <div>
                        <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Why companies{' '}
                            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                                choose us
                            </span>
                        </h3>
                        <p className={`text-base md:text-lg leading-relaxed mb-6 md:mb-8 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                            We combine technical excellence with creative innovation to deliver solutions
                            that not only meet but exceed expectations. Our approach is built on understanding
                            your unique challenges and crafting tailored solutions.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                            {skills.map((item, i) => {
                                const Icon = iconMap[item.icon] || Brain
                                return (
                                    <motion.div
                                        key={item._id || item.title}
                                        className={`flex gap-3 md:gap-4 p-4 rounded-xl transition-all duration-300 ${isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-white hover:shadow-sm'}`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                                    >
                                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20' : 'bg-gradient-to-br from-violet-100 to-fuchsia-100'}`}>
                                            <Icon className={`w-5 h-5 md:w-6 md:h-6 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
                                        </div>
                                        <div>
                                            <div className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</div>
                                            <div className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{item.description}</div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Tech stack visualization */}
                    <div className="relative">
                        <div className="grid grid-cols-3 gap-3 md:gap-4">
                            {techSkills.map((tech, i) => (
                                <motion.div
                                    key={tech._id || tech.name}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 0.4, delay: 0.8 + i * 0.05 }}
                                    className={`p-3 md:p-4 rounded-xl md:rounded-2xl text-center transition-all duration-300 cursor-default ${isDark ? 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.1]' : 'bg-white border border-gray-100 shadow-sm hover:shadow-md'}`}
                                >
                                    <span className={`text-xs md:text-sm font-medium ${isDark ? 'text-white/60' : 'text-gray-600'}`}>{tech.name}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Decorative gradient */}
                        <div className={`absolute -inset-4 rounded-3xl blur-3xl -z-10 ${isDark ? 'bg-gradient-to-r from-violet-600/20 via-transparent to-fuchsia-600/20' : 'bg-gradient-to-r from-violet-400/10 via-transparent to-fuchsia-400/10'}`} />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Stats
