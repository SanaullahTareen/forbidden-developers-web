import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    ArrowLeft, ArrowRight, Shield, TrendingUp, PieChart, BarChart3,
    Wallet, CreditCard, Building2, Globe, Users, Award, Menu, X,
    Check, ChevronRight, LineChart, Lock, Briefcase, Target
} from 'lucide-react'

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, prefix = '', suffix = '' }: { end: number; duration?: number; prefix?: string; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const increment = end / (duration * 60);
            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 1000 / 60);
            return () => clearInterval(timer);
        }
    }, [isInView, end, duration]);

    return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// Animated Stock Ticker
const StockTicker = () => {
    const stocks = [
        { symbol: 'AAPL', price: 178.32, change: +2.4 },
        { symbol: 'GOOGL', price: 141.80, change: +1.8 },
        { symbol: 'MSFT', price: 378.91, change: -0.5 },
        { symbol: 'AMZN', price: 178.25, change: +3.2 },
        { symbol: 'TSLA', price: 248.50, change: +4.1 },
        { symbol: 'NVDA', price: 875.28, change: +5.6 },
    ];

    return (
        <div className="overflow-hidden bg-slate-800/50 border-y border-slate-700 py-3">
            <motion.div
                className="flex gap-12 whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                {[...stocks, ...stocks].map((stock, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                        <span className="font-semibold text-white">{stock.symbol}</span>
                        <span className="text-slate-400">${stock.price.toFixed(2)}</span>
                        <span className={stock.change >= 0 ? 'text-green-400' : 'text-red-400'}>
                            {stock.change >= 0 ? '+' : ''}{stock.change}%
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

// Floating Data Particle
const FloatingParticle = ({ delay = 0 }: { delay?: number }) => (
    <motion.div
        className="absolute w-1 h-1 bg-blue-500/40 rounded-full"
        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
        animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
        }}
        transition={{ duration: 4 + Math.random() * 2, delay, repeat: Infinity }}
    />
);

// Animated Chart Bar
const AnimatedBar = ({ height, delay, color }: { height: number; delay: number; color: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            className={`w-4 ${color} rounded-t origin-bottom`}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            style={{ height: `${height}%` }}
        />
    );
};

// FinEdge - Blue Corporate Finance Template
const FinEdge = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const heroRef = useRef<HTMLDivElement>(null)

    const navItems = ['Solutions', 'Products', 'Resources', 'Company', 'Careers']

    const stats = [
        { value: '$50B+', label: 'Assets Under Management' },
        { value: '150+', label: 'Countries Served' },
        { value: '99.9%', label: 'Platform Uptime' },
        { value: '2M+', label: 'Active Users' },
    ]

    const services = [
        { icon: TrendingUp, title: 'Investment Banking', description: 'Strategic advisory and capital raising solutions for global enterprises' },
        { icon: PieChart, title: 'Wealth Management', description: 'Personalized portfolio management for high-net-worth individuals' },
        { icon: Shield, title: 'Risk Management', description: 'Advanced risk analytics and compliance frameworks' },
        { icon: BarChart3, title: 'Market Analytics', description: 'Real-time market data and predictive analytics platform' },
        { icon: CreditCard, title: 'Corporate Banking', description: 'Comprehensive banking solutions for businesses of all sizes' },
        { icon: Globe, title: 'Global Markets', description: 'Access to international markets and forex trading' },
    ]

    const testimonials = [
        { name: 'Michael Chen', role: 'CFO, TechGlobal Inc.', content: 'FinEdge has transformed how we manage our corporate treasury. The platform is exceptional.', company: 'TechGlobal' },
        { name: 'Sarah Williams', role: 'Director of Finance, Apex Ventures', content: 'The level of security and compliance features gives us complete peace of mind.', company: 'Apex Ventures' },
        { name: 'James Morrison', role: 'Managing Partner, Sterling Capital', content: 'Best-in-class analytics and a team that truly understands institutional needs.', company: 'Sterling Capital' },
    ]

    const features = [
        'Bank-grade security protocols',
        '24/7 dedicated support',
        'Real-time transaction monitoring',
        'Automated compliance reporting',
        'Multi-currency support',
        'API integration capabilities',
    ]

    return (
        <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
            {/* Floating Particles */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {[...Array(20)].map((_, i) => (
                    <FloatingParticle key={i} delay={i * 0.3} />
                ))}
            </div>

            {/* Floating Back Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="fixed top-6 left-6 z-50"
            >
                <Link
                    to="/templates"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 backdrop-blur-md border border-blue-500/30 rounded-full text-blue-300 hover:bg-blue-600/30 transition-all text-sm shadow-lg shadow-blue-500/10"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Templates
                </Link>
            </motion.div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-blue-500/10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <motion.div
                            className="flex items-center gap-3"
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.div
                                className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center"
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                <BarChart3 className="w-5 h-5 text-white" />
                            </motion.div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">FinEdge</span>
                        </motion.div>

                        <div className="hidden md:flex items-center gap-8">
                            {navItems.map((item) => (
                                <motion.a
                                    key={item}
                                    href="#"
                                    className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
                                    whileHover={{ y: -2 }}
                                >
                                    {item}
                                </motion.a>
                            ))}
                        </div>

                        <div className="hidden md:flex items-center gap-4">
                            <button className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Login</button>
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-sm font-medium transition-all"
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
                        className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-b border-blue-500/10 p-6"
                    >
                        {navItems.map((item) => (
                            <a key={item} href="#" className="block py-3 text-slate-400 hover:text-white transition-colors">
                                {item}
                            </a>
                        ))}
                        <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-sm font-medium">
                            Get Started
                        </button>
                    </motion.div>
                )}
            </nav>

            {/* Stock Ticker */}
            <div className="pt-16">
                <StockTicker />
            </div>

            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-16 pb-20 min-h-[90vh] flex items-center">
                {/* Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
                    <motion.div
                        className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-blue-600/10 blur-[150px]"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[120px]"
                        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />
                    {/* Rotating rings */}
                    <motion.div
                        className="absolute top-1/3 right-1/4 w-96 h-96 border border-blue-500/10 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute top-1/3 right-1/4 w-72 h-72 border border-cyan-500/10 rounded-full"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="mb-6"
                            >
                                <motion.span
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-sm font-medium"
                                    animate={{ boxShadow: ['0 0 0 rgba(59, 130, 246, 0)', '0 0 20px rgba(59, 130, 246, 0.3)', '0 0 0 rgba(59, 130, 246, 0)'] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <Shield className="w-4 h-4" />
                                    Trusted by Fortune 500 Companies
                                </motion.span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
                            >
                                Secure Financial
                                <br />
                                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                    Infrastructure
                                </span>
                                <br />
                                for Enterprise
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-lg text-slate-400 mb-10 max-w-lg"
                            >
                                The leading platform for institutional-grade financial services.
                                Empowering businesses with cutting-edge banking, investment, and risk management solutions.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="flex flex-wrap gap-4"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold flex items-center gap-2 transition-all"
                                >
                                    Schedule Demo
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-slate-800 border border-slate-700 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
                                >
                                    Contact Sales
                                </motion.button>
                            </motion.div>

                            {/* Trust Badges */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="mt-12 flex flex-wrap items-center gap-6"
                            >
                                {[
                                    { icon: Lock, label: 'SOC 2 Certified' },
                                    { icon: Shield, label: 'GDPR Compliant' },
                                    { icon: Award, label: 'ISO 27001' }
                                ].map((badge, i) => (
                                    <motion.div
                                        key={badge.label}
                                        className="flex items-center gap-2 text-slate-500 text-sm"
                                        whileHover={{ scale: 1.05, color: '#94a3b8' }}
                                    >
                                        <badge.icon className="w-4 h-4" />
                                        <span>{badge.label}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Hero Visual */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative"
                        >
                            <motion.div
                                className="relative rounded-2xl overflow-hidden border border-blue-500/20 bg-slate-800/50 backdrop-blur-xl p-8"
                                whileHover={{ borderColor: 'rgba(59, 130, 246, 0.4)' }}
                            >
                                {/* Dashboard Preview */}
                                <div className="mb-6">
                                    <div className="text-sm text-slate-400 mb-2">Portfolio Value</div>
                                    <div className="text-4xl font-bold">
                                        $<AnimatedCounter end={124892543} duration={2.5} />
                                    </div>
                                    <motion.div
                                        className="flex items-center gap-2 mt-2 text-green-400 text-sm"
                                        animate={{ opacity: [0.7, 1, 0.7] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <TrendingUp className="w-4 h-4" />
                                        <span>+12.4% this month</span>
                                    </motion.div>
                                </div>

                                {/* Animated Chart */}
                                <div className="h-48 bg-gradient-to-t from-blue-600/10 to-transparent rounded-xl flex items-end justify-between px-4 pb-4">
                                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, i) => (
                                        <AnimatedBar
                                            key={i}
                                            height={height}
                                            delay={i * 0.1}
                                            color="bg-gradient-to-t from-blue-500 to-cyan-500"
                                        />
                                    ))}
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-3 gap-4 mt-6">
                                    <motion.div
                                        className="p-4 bg-slate-700/50 rounded-xl"
                                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(100, 116, 139, 0.4)' }}
                                    >
                                        <div className="text-slate-400 text-xs mb-1">Transactions</div>
                                        <div className="font-semibold"><AnimatedCounter end={2847} /></div>
                                    </motion.div>
                                    <motion.div
                                        className="p-4 bg-slate-700/50 rounded-xl"
                                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(100, 116, 139, 0.4)' }}
                                    >
                                        <div className="text-slate-400 text-xs mb-1">Accounts</div>
                                        <div className="font-semibold"><AnimatedCounter end={156} /></div>
                                    </motion.div>
                                    <motion.div
                                        className="p-4 bg-slate-700/50 rounded-xl"
                                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(100, 116, 139, 0.4)' }}
                                    >
                                        <div className="text-slate-400 text-xs mb-1">Returns</div>
                                        <div className="font-semibold text-green-400">+<AnimatedCounter end={18} suffix=".2%" /></div>
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Floating Cards */}
                            <motion.div
                                className="absolute -top-6 -right-6 p-4 bg-slate-800 border border-blue-500/20 rounded-xl shadow-xl"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <Check className="w-5 h-5 text-green-400" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium">Payment Received</div>
                                        <div className="text-xs text-slate-400">$50,000.00</div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 border-y border-blue-500/10 bg-slate-800/30 relative overflow-hidden">
                <motion.div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                    animate={{ x: [0, 40], y: [0, 40] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <div className="max-w-7xl mx-auto px-6 relative">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: 50, prefix: '$', suffix: 'B+', label: 'Assets Under Management' },
                            { value: 150, prefix: '', suffix: '+', label: 'Countries Served' },
                            { value: 99.9, prefix: '', suffix: '%', label: 'Platform Uptime' },
                            { value: 2, prefix: '', suffix: 'M+', label: 'Active Users' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="text-center p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/30 transition-all"
                            >
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    {stat.prefix}<AnimatedCounter end={stat.value} />{stat.suffix}
                                </div>
                                <div className="text-slate-400 mt-2">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800/50" />
                <div className="max-w-7xl mx-auto px-6 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-sm font-medium mb-6">
                            <Briefcase className="w-4 h-4" />
                            Our Solutions
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Comprehensive{' '}
                            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                Financial Services
                            </span>
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            End-to-end solutions designed for the modern enterprise, backed by decades of financial expertise.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => {
                            const Icon = service.icon
                            return (
                                <motion.div
                                    key={service.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className="group p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                                >
                                    <motion.div
                                        className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600/80 to-cyan-600/80 flex items-center justify-center mb-6 group-hover:from-blue-600 group-hover:to-cyan-600 transition-all"
                                        whileHover={{ rotate: 5, scale: 1.1 }}
                                    >
                                        <Icon className="w-7 h-7 text-white" />
                                    </motion.div>
                                    <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                                    <p className="text-slate-400 mb-4">{service.description}</p>
                                    <motion.a
                                        href="#"
                                        className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors"
                                        whileHover={{ x: 5 }}
                                    >
                                        Learn More
                                        <ChevronRight className="w-4 h-4" />
                                    </motion.a>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-slate-800/30">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-sm font-medium mb-6">
                                <Target className="w-4 h-4" />
                                Why Choose Us
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                Enterprise-Grade{' '}
                                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    Security & Compliance
                                </span>
                            </h2>
                            <p className="text-lg text-slate-400 mb-8">
                                Built from the ground up with security and regulatory compliance at its core.
                                Trust the platform that the world's largest financial institutions rely on.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-4 h-4 text-blue-400" />
                                        </div>
                                        <span className="text-slate-300">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=500&fit=crop"
                                alt="Analytics Dashboard"
                                className="rounded-2xl border border-slate-700"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-sm font-medium mb-6">
                            <Users className="w-4 h-4" />
                            Client Success
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Trusted by{' '}
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                Industry Leaders
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
                                className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700"
                            >
                                <div className="mb-6">
                                    <Building2 className="w-10 h-10 text-blue-400" />
                                </div>
                                <p className="text-slate-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                                <div>
                                    <div className="font-semibold">{testimonial.name}</div>
                                    <div className="text-sm text-slate-400">{testimonial.role}</div>
                                </div>
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
                        className="relative rounded-3xl overflow-hidden p-12 md:p-20 bg-gradient-to-br from-blue-900/80 to-cyan-900/80 border border-blue-500/20"
                    >
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                        <div className="relative z-10 text-center max-w-2xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                Ready to Transform Your Financial Operations?
                            </h2>
                            <p className="text-xl text-slate-300 mb-10">
                                Join thousands of enterprises already using FinEdge to power their financial infrastructure.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <button className="px-8 py-4 bg-white text-slate-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                    Schedule a Demo
                                </button>
                                <button className="px-8 py-4 bg-blue-600/30 border border-blue-500/30 rounded-lg font-semibold hover:bg-blue-600/40 transition-colors">
                                    Contact Sales
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                <BarChart3 className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold">FinEdge</span>
                        </div>
                        <div className="flex gap-8 text-slate-400 text-sm">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                            <a href="#" className="hover:text-white transition-colors">Security</a>
                            <a href="#" className="hover:text-white transition-colors">Compliance</a>
                        </div>
                        <div className="text-slate-400 text-sm">
                            © 2025 FinEdge. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default FinEdge
