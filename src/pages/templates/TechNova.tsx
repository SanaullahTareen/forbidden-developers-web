import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    ChevronLeft, ArrowRight, Zap, Shield, Check, Menu, X,
    Cpu, Globe, Terminal, Cloud, Sparkles, Layers, Play, MessageSquare, Rocket, Star,
    Code2, Database, Lock, Server, GitBranch
} from 'lucide-react'

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    useEffect(() => {
        if (isInView) {
            let start = 0
            const end = value
            const increment = end / (duration * 60)
            const timer = setInterval(() => {
                start += increment
                if (start >= end) {
                    setCount(end)
                    clearInterval(timer)
                } else {
                    setCount(Math.floor(start))
                }
            }, 1000 / 60)
            return () => clearInterval(timer)
        }
    }, [isInView, value, duration])

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// Floating Particle Component
const FloatingParticle = ({ delay = 0, size = 4 }: { delay?: number; size?: number }) => (
    <motion.div
        className="absolute rounded-full bg-violet-500/30"
        style={{
            width: size,
            height: size,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
        }}
        animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.3, 1],
        }}
        transition={{
            duration: 15 + Math.random() * 10,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    />
)

// Tech Orbit Visualization
const TechOrbit = () => {
    const [activeNode, setActiveNode] = useState<number | null>(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return
            const rect = containerRef.current.getBoundingClientRect()
            setMousePos({
                x: (e.clientX - rect.left - rect.width / 2) / 30,
                y: (e.clientY - rect.top - rect.height / 2) / 30
            })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const techNodes = [
        { Icon: Code2, color: '#8b5cf6', label: 'Frontend' },
        { Icon: Server, color: '#3b82f6', label: 'Backend' },
        { Icon: Database, color: '#06b6d4', label: 'Database' },
        { Icon: Cloud, color: '#10b981', label: 'Cloud' },
        { Icon: Lock, color: '#f59e0b', label: 'Security' },
        { Icon: GitBranch, color: '#ec4899', label: 'DevOps' },
    ]

    return (
        <div ref={containerRef} className="relative w-full max-w-[450px] aspect-square mx-auto">
            <div className="absolute inset-0 rounded-full blur-[80px] bg-gradient-to-r from-violet-600/30 via-purple-600/30 to-fuchsia-600/30" />

            <motion.div style={{ rotateX: mousePos.y, rotateY: -mousePos.x }} className="absolute inset-0">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-violet-500/20" />
            </motion.div>

            <motion.div style={{ rotateX: mousePos.y * 1.2, rotateY: -mousePos.x * 1.2 }} className="absolute inset-[15%]">
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-purple-500/30" />
            </motion.div>

            <motion.div style={{ rotateX: mousePos.y * 1.5, rotateY: -mousePos.x * 1.5 }} className="absolute inset-[30%]">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-fuchsia-500/40" />
            </motion.div>

            <div className="absolute inset-[38%] flex items-center justify-center">
                <motion.div
                    animate={{ boxShadow: ['0 0 20px rgba(139, 92, 246, 0.3)', '0 0 40px rgba(139, 92, 246, 0.6)', '0 0 20px rgba(139, 92, 246, 0.3)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-full h-full rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center"
                >
                    <Sparkles className="w-10 h-10 text-white" />
                </motion.div>
            </div>

            {techNodes.map((node, i) => {
                const angle = (i / techNodes.length) * 2 * Math.PI - Math.PI / 2
                const x = 50 + 42 * Math.cos(angle)
                const y = 50 + 42 * Math.sin(angle)

                return (
                    <motion.div key={node.label} className="absolute z-10"
                        style={{ left: `${x}%`, top: `${y}%`, x: '-50%', y: '-50%' }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                    >
                        <motion.div
                            onHoverStart={() => setActiveNode(i)}
                            onHoverEnd={() => setActiveNode(null)}
                            whileHover={{ scale: 1.2 }}
                            animate={{ boxShadow: activeNode === i ? `0 0 30px ${node.color}60` : `0 0 15px ${node.color}30` }}
                            className="w-14 h-14 rounded-xl bg-[#0d001a]/80 border border-violet-500/30 flex items-center justify-center cursor-pointer backdrop-blur-sm"
                        >
                            <node.Icon className="w-7 h-7" style={{ color: node.color }} />
                        </motion.div>
                        {activeNode === i && (
                            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-violet-600/90 rounded-lg text-xs whitespace-nowrap">
                                {node.label}
                            </motion.div>
                        )}
                    </motion.div>
                )
            })}
        </div>
    )
}

// Glowing Line
const GlowingLine = () => (
    <div className="relative h-px w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
        <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-400 to-transparent"
            animate={{ x: ['-100%', '100%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />
    </div>
)

// TechNova - Dark Purple Theme Software Company Template
const TechNova = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const heroRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll()
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

    const navItems = ['Products', 'Solutions', 'Developers', 'Company', 'Pricing']

    const features = [
        { icon: Cpu, title: 'AI-Powered Engine', description: 'Advanced machine learning algorithms that adapt to your needs' },
        { icon: Shield, title: 'Enterprise Security', description: 'Bank-grade encryption and compliance standards' },
        { icon: Zap, title: 'Lightning Fast', description: '99.99% uptime with global CDN distribution' },
        { icon: Globe, title: 'Global Scale', description: 'Deploy anywhere with multi-region support' },
        { icon: Terminal, title: 'Developer First', description: 'Powerful APIs and SDKs for seamless integration' },
        { icon: Cloud, title: 'Cloud Native', description: 'Built for modern infrastructure from the ground up' },
    ]

    const stats = [
        { value: 9999, suffix: '%', label: 'Uptime SLA', display: '99.99' },
        { value: 150, suffix: 'ms', label: 'Avg Response' },
        { value: 10, suffix: 'M+', label: 'API Calls/Day' },
        { value: 500, suffix: '+', label: 'Enterprise Clients' },
    ]

    const testimonials = [
        { name: 'Sarah Chen', role: 'CTO at Quantum Labs', content: 'TechNova transformed our infrastructure. The performance gains were immediate and substantial.', avatar: 'S' },
        { name: 'Marcus Rodriguez', role: 'VP Engineering at Scale AI', content: 'The developer experience is unmatched. Our team was productive from day one.', avatar: 'M' },
        { name: 'Emily Watson', role: 'Founder at DataFlow', content: 'Switching to TechNova was the best decision we made. Our costs dropped 40%.', avatar: 'E' },
    ]

    const pricingPlans = [
        { name: 'Starter', price: '$29', period: '/month', features: ['10,000 API calls', '5 Team members', 'Basic analytics', 'Email support'], highlighted: false },
        { name: 'Pro', price: '$99', period: '/month', features: ['100,000 API calls', 'Unlimited members', 'Advanced analytics', 'Priority support', 'Custom integrations'], highlighted: true },
        { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited API calls', 'Dedicated support', 'SLA guarantee', 'On-premise option', 'Custom contracts'], highlighted: false },
    ]

    return (
        <div className="min-h-screen bg-[#0a0015] text-white overflow-x-hidden">
            {/* Floating Particles Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {[...Array(25)].map((_, i) => (
                    <FloatingParticle key={i} delay={i * 0.3} size={2 + Math.random() * 4} />
                ))}
            </div>

            {/* Floating Back Button */}
            <Link
                to="/templates"
                className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-violet-600/20 backdrop-blur-md border border-violet-500/30 rounded-full text-violet-300 hover:bg-violet-600/30 transition-all text-sm"
            >
                <ChevronLeft className="w-4 h-4" />
                Back to Templates
            </Link>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0a0015]/80 backdrop-blur-xl border-b border-violet-500/10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"
                            >
                                <Sparkles className="w-5 h-5 text-white" />
                            </motion.div>
                            <span className="text-xl font-bold">TechNova</span>
                        </div>

                        <div className="hidden md:flex items-center gap-8">
                            {navItems.map((item) => (
                                <a key={item} href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                                    {item}
                                </a>
                            ))}
                        </div>

                        <div className="hidden md:flex items-center gap-4">
                            <button className="text-white/60 hover:text-white transition-colors text-sm">Sign In</button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-5 py-2 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                            >
                                Get Started
                            </motion.button>
                        </div>

                        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden absolute top-full left-0 right-0 bg-[#0a0015] border-b border-violet-500/10 p-6"
                    >
                        {navItems.map((item) => (
                            <a key={item} href="#" className="block py-3 text-white/60 hover:text-white transition-colors">
                                {item}
                            </a>
                        ))}
                        <button className="w-full mt-4 px-5 py-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full text-sm font-medium">
                            Get Started
                        </button>
                    </motion.div>
                )}
            </nav>

            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-32 pb-20 min-h-screen flex items-center">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-violet-600/20 blur-[150px]"
                    />
                    <motion.div
                        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/20 blur-[120px]"
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div style={{ opacity }}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="mb-6"
                            >
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-300 text-sm">
                                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                                        <Sparkles className="w-4 h-4" />
                                    </motion.span>
                                    Now in Public Beta — Join 10,000+ developers
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                            >
                                Build the Future with
                                <br />
                                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                                    Next-Gen Infrastructure
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-xl text-white/60 max-w-xl mb-10"
                            >
                                The most powerful platform for building, deploying, and scaling modern applications.
                                Trusted by the world's most innovative companies.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="flex flex-wrap gap-4"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)' }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full font-semibold hover:opacity-90 transition-all flex items-center gap-2"
                                >
                                    Start Free Trial
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
                                >
                                    <Play className="w-5 h-5" />
                                    Watch Demo
                                </motion.button>
                            </motion.div>
                        </motion.div>

                        {/* Tech Orbit Visualization */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="hidden lg:block"
                        >
                            <TechOrbit />
                        </motion.div>
                    </div>

                    {/* Code Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="mt-20 max-w-4xl mx-auto"
                    >
                        <div className="relative rounded-2xl overflow-hidden border border-violet-500/20 bg-[#0d001a]/80 backdrop-blur-xl">
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-violet-500/10">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                <span className="ml-4 text-white/40 text-sm">terminal</span>
                            </div>
                            <div className="p-6 font-mono text-sm">
                                {[
                                    { text: '$ npm install @technova/sdk', color: 'text-violet-400', delay: 0 },
                                    { text: 'Installing dependencies...', color: 'text-white/40', delay: 0.5 },
                                    { text: '✓ Successfully installed', color: 'text-green-400', delay: 1 },
                                    { text: '$ technova init my-project', color: 'text-violet-400', delay: 1.5 },
                                    { text: 'Creating project structure...', color: 'text-white/40', delay: 2 },
                                    { text: '✓ Project ready in ./my-project', color: 'text-green-400', delay: 2.5 },
                                ].map((line, i) => (
                                    <motion.div key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: line.delay }}
                                        className={`${line.color} ${i > 0 ? 'mt-2' : ''}`}
                                    >
                                        {line.text}
                                    </motion.div>
                                ))}
                                <div className="flex items-center mt-4">
                                    <span className="text-violet-400">$ </span>
                                    <motion.span
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="ml-1 w-2 h-5 bg-violet-400"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <GlowingLine />

            {/* Stats Section */}
            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center group"
                            >
                                <motion.div whileHover={{ scale: 1.1 }} className="relative">
                                    <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                                        {stat.display || <AnimatedCounter value={stat.value} suffix={stat.suffix} />}
                                        {stat.display && stat.suffix}
                                    </div>
                                    <div className="absolute inset-0 blur-2xl bg-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.div>
                                <div className="text-white/40 mt-2">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <GlowingLine />

            {/* Features Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-300 text-sm mb-6">
                            <Layers className="w-4 h-4" />
                            Features
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Everything You Need to{' '}
                            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                                Scale
                            </span>
                        </h2>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">
                            Powerful features that help you build, deploy, and scale your applications with confidence.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon
                            return (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.2)' }}
                                    className="group p-8 rounded-2xl bg-white/[0.02] border border-violet-500/10 hover:border-violet-500/30 transition-all cursor-pointer"
                                >
                                    <motion.div
                                        whileHover={{ rotate: 360, scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center mb-6"
                                    >
                                        <Icon className="w-7 h-7 text-white" />
                                    </motion.div>
                                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                    <p className="text-white/50">{feature.description}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-violet-900/10">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-300 text-sm mb-6">
                            <MessageSquare className="w-4 h-4" />
                            Testimonials
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Loved by{' '}
                            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                                Developers
                            </span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl bg-white/[0.02] border border-violet-500/10"
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-violet-400 text-violet-400" />
                                    ))}
                                </div>
                                <p className="text-white/70 mb-6">"{testimonial.content}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center font-semibold">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold">{testimonial.name}</div>
                                        <div className="text-sm text-white/40">{testimonial.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-300 text-sm mb-6">
                            <Rocket className="w-4 h-4" />
                            Pricing
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Simple,{' '}
                            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                                Transparent
                            </span>{' '}
                            Pricing
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {pricingPlans.map((plan, index) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-8 rounded-2xl ${plan.highlighted ? 'bg-gradient-to-br from-violet-600 to-purple-600 scale-105' : 'bg-white/[0.02] border border-violet-500/10'}`}
                            >
                                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-white/60">{plan.period}</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2">
                                            <Check className={`w-5 h-5 ${plan.highlighted ? 'text-white' : 'text-violet-400'}`} />
                                            <span className={plan.highlighted ? 'text-white/90' : 'text-white/60'}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className={`w-full py-3 rounded-full font-semibold transition-colors ${plan.highlighted ? 'bg-white text-violet-600 hover:bg-white/90' : 'bg-violet-600/20 text-violet-300 hover:bg-violet-600/30'}`}>
                                    Get Started
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl overflow-hidden p-12 md:p-20 bg-gradient-to-br from-violet-900/50 to-purple-900/50 border border-violet-500/20 text-center"
                    >
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                Ready to Get Started?
                            </h2>
                            <p className="text-xl text-white/60 max-w-xl mx-auto mb-10">
                                Join thousands of developers building the future with TechNova.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <button className="px-8 py-4 bg-white text-violet-600 rounded-full font-semibold hover:bg-white/90 transition-colors">
                                    Start Free Trial
                                </button>
                                <button className="px-8 py-4 bg-violet-600/30 border border-violet-500/30 rounded-full font-semibold hover:bg-violet-600/40 transition-colors">
                                    Contact Sales
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-violet-500/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold">TechNova</span>
                        </div>
                        <div className="flex gap-8 text-white/40 text-sm">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                            <a href="#" className="hover:text-white transition-colors">Documentation</a>
                            <a href="#" className="hover:text-white transition-colors">Support</a>
                        </div>
                        <div className="text-white/40 text-sm">
                            © 2025 TechNova. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default TechNova
