import { useRef, useEffect, useState, useMemo } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play, ChevronDown, Code2, Globe, Cpu, Layers, X, Brain, Rocket, Cloud } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

// Video Modal Component
const VideoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>

                        {/* Video Placeholder - Replace with actual video */}
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-900/50 to-fuchsia-900/50">
                            <div className="text-center px-4">
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center"
                                >
                                    <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" />
                                </motion.div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Our Showreel</h3>
                                <p className="text-white/60 text-sm md:text-base">Coming Soon - Showcasing our best work</p>

                                {/* Demo content */}
                                <div className="mt-8 grid grid-cols-3 gap-3 md:gap-4 max-w-md mx-auto">
                                    {['Web Apps', 'Mobile Apps', 'AI Solutions'].map((item, i) => (
                                        <motion.div
                                            key={item}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 + i * 0.1 }}
                                            className="p-3 md:p-4 rounded-xl bg-white/5 border border-white/10"
                                        >
                                            <span className="text-xs md:text-sm text-white/80">{item}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// Interactive 3D Tech Orbit - Enhanced
const TechOrbit = () => {
    const { theme } = useTheme()
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [activeNode, setActiveNode] = useState<number | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const isDark = theme === 'dark'

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return
            const rect = containerRef.current.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            setMousePos({
                x: (e.clientX - centerX) / 25,
                y: (e.clientY - centerY) / 25
            })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const techNodes = [
        { Icon: Code2, color: '#8b5cf6', label: 'Frontend', desc: 'React, Vue, Next.js' },
        { Icon: Cloud, color: '#3b82f6', label: 'Backend', desc: 'Node.js, Python, Go' },
        { Icon: Brain, color: '#06b6d4', label: 'AI/ML', desc: 'TensorFlow, PyTorch' },
        { Icon: Globe, color: '#10b981', label: 'Web', desc: 'PWA, SEO, Performance' },
        { Icon: Cpu, color: '#f59e0b', label: 'Systems', desc: 'Low-level, Embedded' },
        { Icon: Rocket, color: '#ec4899', label: 'DevOps', desc: 'AWS, Docker, K8s' },
    ]

    return (
        <div
            ref={containerRef}
            className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[550px] aspect-square mx-auto"
        >
            {/* Ambient glow */}
            <div className={`absolute inset-0 rounded-full blur-[100px] ${isDark ? 'bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-cyan-600/20' : 'bg-gradient-to-r from-violet-400/30 via-fuchsia-400/30 to-cyan-400/30'}`} />

            {/* Outer rotating ring */}
            <motion.div
                className="absolute inset-0"
                style={{ rotateX: mousePos.y, rotateY: -mousePos.x }}
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className={`absolute inset-0 rounded-full border border-dashed ${isDark ? 'border-white/10' : 'border-gray-300'}`}
                />
            </motion.div>

            {/* Middle ring */}
            <motion.div
                className="absolute inset-[15%]"
                style={{ rotateX: mousePos.y * 1.2, rotateY: -mousePos.x * 1.2 }}
            >
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className={`absolute inset-0 rounded-full border ${isDark ? 'border-violet-500/20' : 'border-violet-400/30'}`}
                />
            </motion.div>

            {/* Inner ring */}
            <motion.div
                className="absolute inset-[30%]"
                style={{ rotateX: mousePos.y * 1.5, rotateY: -mousePos.x * 1.5 }}
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={`absolute inset-0 rounded-full border ${isDark ? 'border-fuchsia-500/30' : 'border-fuchsia-400/40'}`}
                />
            </motion.div>

            {/* Tech nodes around the circle */}
            {techNodes.map((node, i) => {
                const angle = (i / techNodes.length) * 2 * Math.PI - Math.PI / 2
                const radius = 42
                const x = 50 + radius * Math.cos(angle)
                const y = 50 + radius * Math.sin(angle)
                const isActive = activeNode === i

                return (
                    <motion.div
                        key={node.label}
                        className="absolute"
                        style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            x: '-50%',
                            y: '-50%',
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                    >
                        <motion.button
                            onHoverStart={() => setActiveNode(i)}
                            onHoverEnd={() => setActiveNode(null)}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative group"
                        >
                            <motion.div
                                animate={{
                                    boxShadow: isActive
                                        ? `0 0 40px ${node.color}50, 0 0 80px ${node.color}30`
                                        : `0 0 20px ${node.color}20`
                                }}
                                className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center backdrop-blur-md border transition-all duration-300 ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                                style={{
                                    background: isDark
                                        ? `linear-gradient(135deg, ${node.color}20, ${node.color}05)`
                                        : `linear-gradient(135deg, ${node.color}15, ${node.color}05)`,
                                    borderColor: isActive ? `${node.color}50` : undefined,
                                }}
                            >
                                <node.Icon
                                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-transform duration-300"
                                    style={{ color: node.color }}
                                />
                            </motion.div>

                            {/* Tooltip */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                        className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 px-4 py-2 rounded-xl backdrop-blur-xl border whitespace-nowrap z-50 ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/90 border-gray-200 shadow-lg'}`}
                                    >
                                        <div className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{node.label}</div>
                                        <div className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-500'}`}>{node.desc}</div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </motion.div>
                )
            })}

            {/* Center Core */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ rotateX: mousePos.y * 0.5, rotateY: -mousePos.x * 0.5 }}
            >
                <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
                >
                    {/* Glowing layers */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 blur-xl opacity-50" />
                    <div className="absolute inset-2 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 blur-md opacity-60" />

                    {/* Main orb */}
                    <div className="absolute inset-3 rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-500 shadow-2xl shadow-violet-500/50">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/10 to-white/30" />
                    </div>

                    {/* Center icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Layers className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white drop-shadow-lg" />
                    </div>
                </motion.div>

                {/* Orbiting particles */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8 + i * 4, repeat: Infinity, ease: "linear" }}
                    >
                        <div
                            className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/80"
                            style={{
                                transform: `translateX(${40 + i * 12}px) translateY(-50%)`,
                                boxShadow: '0 0 10px rgba(255,255,255,0.5)'
                            }}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity={isDark ? "0.3" : "0.4"} />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
                    </linearGradient>
                </defs>
                {techNodes.map((_, i) => {
                    const angle = (i / techNodes.length) * 2 * Math.PI - Math.PI / 2
                    const radius = 42
                    const x = 50 + radius * Math.cos(angle)
                    const y = 50 + radius * Math.sin(angle)
                    return (
                        <motion.line
                            key={i}
                            x1="50%"
                            y1="50%"
                            x2={`${x}%`}
                            y2={`${y}%`}
                            stroke="url(#lineGradient)"
                            strokeWidth="1"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                        />
                    )
                })}
            </svg>
        </div>
    )
}

// Interactive Code Terminal
const CodeTerminal = () => {
    const { theme } = useTheme()
    const [currentLine, setCurrentLine] = useState(0)
    const [isTyping, setIsTyping] = useState(true)
    const isDark = theme === 'dark'

    const codeLines = useMemo(() => [
        { text: 'const developer = {', color: 'text-violet-400' },
        { text: '  name: "Forbidden Developers",', color: 'text-cyan-400' },
        { text: '  skills: ["React", "AI", "Cloud"],', color: 'text-emerald-400' },
        { text: '  passion: "Building dreams",', color: 'text-pink-400' },
        { text: '  status: "Ready to code! 🚀"', color: 'text-amber-400' },
        { text: '};', color: 'text-violet-400' },
    ], [])

    useEffect(() => {
        if (currentLine < codeLines.length) {
            const timer = setTimeout(() => {
                setCurrentLine(prev => prev + 1)
            }, 600)
            return () => clearTimeout(timer)
        } else {
            setIsTyping(false)
            // Reset after delay
            const resetTimer = setTimeout(() => {
                setCurrentLine(0)
                setIsTyping(true)
            }, 3000)
            return () => clearTimeout(resetTimer)
        }
    }, [currentLine, codeLines.length])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="absolute bottom-8 right-8 hidden xl:block"
        >
            <div className={`w-80 rounded-xl overflow-hidden backdrop-blur-xl border shadow-2xl ${isDark ? 'bg-[#0a0a1a]/90 border-white/10 shadow-violet-500/10' : 'bg-white/90 border-gray-200 shadow-gray-500/10'}`}>
                {/* Terminal header */}
                <div className={`flex items-center gap-2 px-4 py-3 border-b ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className={`ml-2 text-xs font-mono ${isDark ? 'text-white/40' : 'text-gray-400'}`}>developer.js</span>
                </div>

                {/* Terminal content */}
                <div className="p-4 font-mono text-sm space-y-1">
                    {codeLines.slice(0, currentLine).map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className={line.color}
                        >
                            {line.text}
                        </motion.div>
                    ))}
                    {isTyping && (
                        <span className="inline-block w-2 h-4 bg-violet-400 animate-pulse" />
                    )}
                </div>
            </div>
        </motion.div>
    )
}

// Magnetic button effect
const MagneticButton = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => {
    const ref = useRef<HTMLButtonElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        x.set((e.clientX - centerX) * 0.15)
        y.set((e.clientY - centerY) * 0.15)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    const springConfig = { stiffness: 150, damping: 15 }
    const springX = useSpring(x, springConfig)
    const springY = useSpring(y, springConfig)

    return (
        <motion.button
            ref={ref}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={className}
        >
            {children}
        </motion.button>
    )
}

// Animated text reveal
const AnimatedText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
    const words = text.split(' ')
    return (
        <span className={className}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden">
                    <motion.span
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: delay + i * 0.05,
                            ease: [0.33, 1, 0.68, 1]
                        }}
                        className="inline-block"
                    >
                        {word}&nbsp;
                    </motion.span>
                </span>
            ))}
        </span>
    )
}

// Floating orbs with parallax
const FloatingOrbs = () => {
    const { scrollY } = useScroll()
    const y1 = useTransform(scrollY, [0, 500], [0, -100])
    const y2 = useTransform(scrollY, [0, 500], [0, -150])
    const y3 = useTransform(scrollY, [0, 500], [0, -80])

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
                style={{ y: y1 }}
                className="absolute top-[10%] right-[10%] w-[600px] h-[600px]"
            >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-violet-600/30 via-fuchsia-500/20 to-transparent blur-[100px] animate-float-slow" />
            </motion.div>

            <motion.div
                style={{ y: y2 }}
                className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px]"
            >
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-600/25 via-cyan-500/15 to-transparent blur-[80px] animate-float-slow animation-delay-2000" />
            </motion.div>

            <motion.div
                style={{ y: y3 }}
                className="absolute top-[40%] left-[30%] w-[300px] h-[300px]"
            >
                <div className="w-full h-full rounded-full bg-gradient-to-r from-pink-500/20 to-orange-500/10 blur-[60px] animate-float-slow animation-delay-4000" />
            </motion.div>
        </div>
    )
}

// Animated grid lines
const GridLines = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
            <motion.div
                key={`h-${i}`}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.06 }}
                transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
                className="absolute h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{ top: `${15 + i * 15}%`, left: 0, right: 0 }}
            />
        ))}
        {[...Array(8)].map((_, i) => (
            <motion.div
                key={`v-${i}`}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 0.03 }}
                transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
                className="absolute w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"
                style={{ left: `${10 + i * 12}%`, top: 0, bottom: 0 }}
            />
        ))}
    </div>
)

// Cursor glow effect
const CursorGlow = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <motion.div
            className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-0 hidden md:block"
            animate={{ x: mousePos.x - 300, y: mousePos.y - 300 }}
            transition={{ type: 'spring', stiffness: 30, damping: 20 }}
            style={{
                background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
            }}
        />
    )
}

const Hero = () => {
    const { theme } = useTheme()
    const containerRef = useRef<HTMLElement>(null)
    const [isVideoOpen, setIsVideoOpen] = useState(false)
    const isDark = theme === 'dark'

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

    return (
        <>
            <section
                ref={containerRef}
                id="home"
                className={`relative min-h-screen flex items-center justify-center overflow-hidden ${isDark ? 'bg-[#030014]' : 'bg-gradient-to-b from-gray-50 to-white'}`}
            >
                {/* Background layers */}
                <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-violet-950/20 via-transparent to-blue-950/20' : 'bg-gradient-to-b from-violet-100/30 via-transparent to-blue-100/30'}`} />
                <FloatingOrbs />
                {isDark && <GridLines />}
                <CursorGlow />

                {/* Noise texture */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-noise" />

                {/* Main content */}
                <motion.div
                    style={{ opacity, scale, y }}
                    className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 pt-24 md:pt-32 pb-16 md:pb-20"
                >
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left content */}
                        <div className="text-center lg:text-left order-2 lg:order-1">
                            {/* Top badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="mb-6 md:mb-8 inline-flex"
                            >
                                <div className={`inline-flex items-center gap-3 px-4 py-2 md:px-5 md:py-2.5 rounded-full backdrop-blur-xl border ${isDark ? 'bg-white/[0.03] border-white/[0.08]' : 'bg-white/80 border-gray-200 shadow-sm'}`}>
                                    <div className="flex items-center gap-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                        </span>
                                        <span className={`text-xs md:text-sm font-medium ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Available for projects</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Main headline */}
                            <div className="mb-4 md:mb-6">
                                <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    <AnimatedText
                                        text="We craft digital"
                                        className="block"
                                        delay={0.3}
                                    />
                                    <span className="block mt-1 md:mt-2">
                                        <AnimatedText
                                            text="products that"
                                            className={isDark ? 'text-white/90' : 'text-gray-800'}
                                            delay={0.5}
                                        />
                                    </span>
                                    <span className="block mt-1 md:mt-2">
                                        <motion.span
                                            initial={{ opacity: 0, y: 40 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.8, ease: [0.33, 1, 0.68, 1] }}
                                            className="relative inline-block bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent"
                                        >
                                            inspire & scale
                                            <motion.span
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
                                                className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-0.5 md:h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 rounded-full origin-left"
                                            />
                                        </motion.span>
                                    </span>
                                </h1>
                            </div>

                            {/* Subheadline */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.9 }}
                                className={`max-w-xl text-base md:text-lg lg:text-xl leading-relaxed mb-8 md:mb-10 mx-auto lg:mx-0 ${isDark ? 'text-white/40' : 'text-gray-500'}`}
                            >
                                Premium development studio specializing in exceptional web experiences,
                                mobile applications, and AI-powered solutions.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1 }}
                                className="flex flex-col sm:flex-row items-center lg:items-start gap-3 md:gap-4"
                            >
                                <MagneticButton
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                    className={`group relative w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 font-semibold rounded-full overflow-hidden transition-all duration-300 ${isDark ? 'bg-white text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]' : 'bg-gray-900 text-white hover:shadow-[0_0_40px_rgba(0,0,0,0.2)]'}`}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Start a Project
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </MagneticButton>

                                <MagneticButton
                                    onClick={() => setIsVideoOpen(true)}
                                    className={`group flex items-center justify-center gap-3 w-full sm:w-auto px-4 md:px-6 py-3 md:py-4 font-medium transition-colors ${isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                                >
                                    <span className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all ${isDark ? 'border-white/20 group-hover:border-white/40 group-hover:bg-white/5' : 'border-gray-300 group-hover:border-gray-400 group-hover:bg-gray-100'}`}>
                                        <Play className="w-4 h-4 ml-0.5" />
                                    </span>
                                    Watch Showreel
                                </MagneticButton>
                            </motion.div>

                            {/* Mini stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.2 }}
                                className="mt-10 md:mt-12 flex flex-wrap justify-center lg:justify-start gap-6 md:gap-8"
                            >
                                {[
                                    { value: '150+', label: 'Projects' },
                                    { value: '50+', label: 'Clients' },
                                    { value: '99%', label: 'Satisfaction' },
                                ].map((stat) => (
                                    <div key={stat.label} className="text-center lg:text-left">
                                        <div className={`text-xl md:text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                                        <div className={`text-xs uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{stat.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Right content - Interactive Tech Orbit */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="flex items-center justify-center order-1 lg:order-2"
                        >
                            <TechOrbit />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Interactive code terminal */}
                <CodeTerminal />

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className={`text-xs uppercase tracking-widest ${isDark ? 'text-white/30' : 'text-gray-400'}`}>Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown className={`w-5 h-5 ${isDark ? 'text-white/30' : 'text-gray-400'}`} />
                    </motion.div>
                </motion.div>

                {/* Bottom gradient */}
                <div className={`absolute bottom-0 left-0 right-0 h-32 md:h-40 pointer-events-none ${isDark ? 'bg-gradient-to-t from-[#030014] to-transparent' : 'bg-gradient-to-t from-gray-50 to-transparent'}`} />
            </section>

            {/* Video Modal */}
            <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
        </>
    )
}

export default Hero