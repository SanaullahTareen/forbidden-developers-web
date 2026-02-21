import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    ArrowLeft, ArrowRight, Dumbbell, Timer, Flame, Heart, Target,
    Trophy, Users, Calendar, Menu, X, Play, Check, Star, Zap,
    Clock, MapPin, ChevronRight, Instagram, Youtube, Facebook
} from 'lucide-react'

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
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

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

// Floating Energy Particle
const EnergyParticle = ({ delay = 0 }: { delay?: number }) => (
    <motion.div
        className="absolute w-2 h-2 bg-red-500/40 rounded-full"
        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
        animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
        }}
        transition={{ duration: 3 + Math.random() * 2, delay, repeat: Infinity }}
    />
);

// Pulse Ring Effect
const PulseRing = ({ delay = 0 }: { delay: number }) => (
    <motion.div
        className="absolute rounded-full border-2 border-red-500/30"
        initial={{ scale: 0.5, opacity: 0.8 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 2, delay, repeat: Infinity }}
        style={{ width: 100, height: 100 }}
    />
);

// Heart Rate Animation
const HeartRate = () => {
    return (
        <div className="flex items-center gap-1">
            {[0.3, 0.6, 1, 0.6, 0.3, 0.8, 0.4].map((height, i) => (
                <motion.div
                    key={i}
                    className="w-1 bg-red-500 rounded-full"
                    animate={{ height: [4, height * 20, 4] }}
                    transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity }}
                />
            ))}
        </div>
    );
};

// FitForge - Red Fitness/Gym Template
const FitForge = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const heroRef = useRef<HTMLDivElement>(null)

    const navItems = ['Programs', 'Classes', 'Trainers', 'Membership', 'Contact']

    const stats = [
        { value: '15K+', label: 'Active Members' },
        { value: '50+', label: 'Expert Trainers' },
        { value: '100+', label: 'Weekly Classes' },
        { value: '12', label: 'Locations' },
    ]

    const programs = [
        { icon: Dumbbell, title: 'Strength Training', description: 'Build muscle and increase power with our comprehensive strength programs', duration: '45-60 min', intensity: 'High' },
        { icon: Flame, title: 'HIIT Workouts', description: 'Burn calories and boost metabolism with high-intensity interval training', duration: '30-45 min', intensity: 'Extreme' },
        { icon: Heart, title: 'Cardio Fitness', description: 'Improve endurance and heart health with varied cardio sessions', duration: '45 min', intensity: 'Medium' },
        { icon: Target, title: 'Functional Training', description: 'Enhance everyday movement patterns and core stability', duration: '45 min', intensity: 'Medium' },
    ]

    const trainers = [
        { name: 'Marcus Johnson', specialty: 'Strength & Conditioning', image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=500&fit=crop', certifications: ['NASM-CPT', 'CrossFit L2'] },
        { name: 'Sarah Chen', specialty: 'HIIT & Cardio', image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=500&fit=crop', certifications: ['ACE-CPT', 'TRX'] },
        { name: 'David Williams', specialty: 'Functional Fitness', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=500&fit=crop', certifications: ['CSCS', 'FMS'] },
    ]

    const membershipPlans = [
        { name: 'Basic', price: '$29', period: '/month', features: ['Gym access (6am-10pm)', 'Basic equipment', 'Locker room', 'Free parking'], highlighted: false },
        { name: 'Pro', price: '$59', period: '/month', features: ['24/7 gym access', 'All equipment', 'Group classes', 'Sauna & steam', '1 PT session/month'], highlighted: true },
        { name: 'Elite', price: '$99', period: '/month', features: ['All Pro features', 'Unlimited PT sessions', 'Nutrition planning', 'Recovery zone', 'Guest passes'], highlighted: false },
    ]

    const testimonials = [
        { name: 'Mike T.', result: 'Lost 30 lbs', content: 'FitForge completely transformed my life. The trainers are incredible!', image: 'M' },
        { name: 'Jennifer R.', result: 'Gained strength', content: 'I\'ve never felt stronger or more confident. Best gym decision ever.', image: 'J' },
        { name: 'Carlos M.', result: 'Marathon ready', content: 'From couch to marathon in 8 months. The cardio programs are amazing.', image: 'C' },
    ]

    return (
        <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
            {/* Floating Energy Particles */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {[...Array(15)].map((_, i) => (
                    <EnergyParticle key={i} delay={i * 0.3} />
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
                    className="flex items-center gap-2 px-4 py-2 bg-red-600/20 backdrop-blur-md border border-red-500/30 rounded-full text-red-300 hover:bg-red-600/30 transition-all text-sm shadow-lg shadow-red-500/10"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Templates
                </Link>
            </motion.div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-b border-red-500/10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <motion.div
                            className="flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.div
                                className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center"
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Dumbbell className="w-5 h-5 text-white" />
                            </motion.div>
                            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent">FITFORGE</span>
                        </motion.div>

                        <div className="hidden md:flex items-center gap-8">
                            {navItems.map((item) => (
                                <motion.a
                                    key={item}
                                    href="#"
                                    className="text-zinc-400 hover:text-white transition-colors text-sm font-semibold uppercase tracking-wide"
                                    whileHover={{ y: -2 }}
                                >
                                    {item}
                                </motion.a>
                            ))}
                        </div>

                        <div className="hidden md:flex items-center gap-4">
                            <button className="text-zinc-400 hover:text-white transition-colors text-sm font-semibold">Login</button>
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)' }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 rounded-lg text-sm font-bold uppercase tracking-wide transition-all"
                            >
                                Start Free Trial
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
                        className="md:hidden absolute top-full left-0 right-0 bg-zinc-950/95 backdrop-blur-xl border-b border-red-500/10 p-6"
                    >
                        {navItems.map((item) => (
                            <a key={item} href="#" className="block py-3 text-zinc-400 hover:text-white transition-colors uppercase text-sm font-semibold tracking-wide">
                                {item}
                            </a>
                        ))}
                        <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 rounded-lg text-sm font-bold uppercase tracking-wide">
                            Start Free Trial
                        </button>
                    </motion.div>
                )}
            </nav>

            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-screen flex items-center">
                {/* Background */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop"
                        alt="Gym"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/95 to-zinc-950/80" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
                </div>

                {/* Animated Background Effects */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute top-20 right-20 w-96 h-96 bg-red-600/10 rounded-full blur-[100px]"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 6, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-20 left-20 w-72 h-72 bg-rose-600/10 rounded-full blur-[80px]"
                        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    {/* Pulse rings at center */}
                    <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2">
                        <PulseRing delay={0} />
                        <PulseRing delay={0.5} />
                        <PulseRing delay={1} />
                    </div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-6"
                        >
                            <motion.span
                                className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 text-sm font-semibold uppercase tracking-wide"
                                animate={{ boxShadow: ['0 0 0 rgba(239, 68, 68, 0)', '0 0 20px rgba(239, 68, 68, 0.4)', '0 0 0 rgba(239, 68, 68, 0)'] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Zap className="w-4 h-4" />
                                New Year, New You — 50% Off First Month
                            </motion.span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black mb-6 leading-none uppercase tracking-tight"
                        >
                            Transform
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-red-500">
                                Your Body
                            </span>
                            <br />
                            Today
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl text-zinc-400 mb-10 max-w-lg"
                        >
                            Join the most intense fitness community. Expert trainers, cutting-edge equipment,
                            and programs designed to push your limits.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-wrap gap-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)' }}
                                whileTap={{ scale: 0.95 }}
                                className="group px-8 py-4 bg-gradient-to-r from-red-600 to-rose-600 rounded-lg font-bold uppercase tracking-wide flex items-center gap-2 transition-all"
                            >
                                Start Free Trial
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 border border-zinc-700 rounded-lg font-bold uppercase tracking-wide hover:bg-zinc-800 transition-colors flex items-center gap-2"
                            >
                                <Play className="w-5 h-5" />
                                Watch Video
                            </motion.button>
                        </motion.div>

                        {/* Quick Info with Heart Rate */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mt-12 flex flex-wrap items-center gap-6"
                        >
                            <div className="flex items-center gap-2 text-zinc-500 text-sm">
                                <Clock className="w-4 h-4 text-red-500" />
                                <span>Open 24/7</span>
                            </div>
                            <div className="flex items-center gap-2 text-zinc-500 text-sm">
                                <MapPin className="w-4 h-4 text-red-500" />
                                <span>12 Locations Citywide</span>
                            </div>
                            <div className="flex items-center gap-2 text-zinc-500 text-sm">
                                <Users className="w-4 h-4 text-red-500" />
                                <span>15,000+ Members</span>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-500 text-sm">
                                <Heart className="w-4 h-4 text-red-500" />
                                <HeartRate />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 relative overflow-hidden">
                <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '30px 30px'
                    }}
                    animate={{ x: [0, 30], y: [0, 30] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <div className="max-w-7xl mx-auto px-6 relative">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: 15000, suffix: '+', label: 'Active Members' },
                            { value: 50, suffix: '+', label: 'Expert Trainers' },
                            { value: 100, suffix: '+', label: 'Weekly Classes' },
                            { value: 12, suffix: '', label: 'Locations' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="text-center p-4"
                            >
                                <div className="text-5xl font-black">
                                    <AnimatedCounter end={stat.value} duration={2} suffix={stat.suffix} />
                                </div>
                                <div className="text-white/80 mt-1 uppercase text-sm tracking-wide">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Programs Section */}
            <section className="py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 to-zinc-900/50" />
                <div className="max-w-7xl mx-auto px-6 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-red-500 uppercase tracking-widest text-sm font-bold">Our Programs</span>
                        <h2 className="text-4xl md:text-5xl font-black mt-4 uppercase tracking-tight">
                            Train Like a{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-red-500">
                                Beast
                            </span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {programs.map((program, index) => {
                            const Icon = program.icon
                            return (
                                <motion.div
                                    key={program.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    className="group p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-red-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10"
                                >
                                    <motion.div
                                        className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center mb-6 group-hover:bg-red-500 transition-colors"
                                        whileHover={{ rotate: 10, scale: 1.1 }}
                                    >
                                        <Icon className="w-7 h-7 text-red-500 group-hover:text-white transition-colors" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold mb-3 uppercase group-hover:text-red-500 transition-colors">{program.title}</h3>
                                    <p className="text-zinc-400 mb-4">{program.description}</p>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-zinc-500">{program.duration}</span>
                                        <motion.span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${program.intensity === 'Extreme' ? 'bg-red-500/20 text-red-400' :
                                                program.intensity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                                                    'bg-yellow-500/20 text-yellow-400'
                                                }`}
                                            animate={program.intensity === 'Extreme' ? {
                                                boxShadow: ['0 0 0 rgba(239, 68, 68, 0)', '0 0 10px rgba(239, 68, 68, 0.3)', '0 0 0 rgba(239, 68, 68, 0)']
                                            } : {}}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            {program.intensity}
                                        </motion.span>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Trainers Section */}
            <section className="py-24 bg-zinc-900/50">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-red-500 uppercase tracking-widest text-sm font-bold">Expert Team</span>
                        <h2 className="text-4xl md:text-5xl font-black mt-4 uppercase tracking-tight">
                            Meet Your{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-500">
                                Trainers
                            </span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {trainers.map((trainer, index) => (
                            <motion.div
                                key={trainer.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                                    <img
                                        src={trainer.image}
                                        alt={trainer.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <h3 className="text-2xl font-bold">{trainer.name}</h3>
                                        <p className="text-red-400">{trainer.specialty}</p>
                                        <div className="flex gap-2 mt-3">
                                            {trainer.certifications.map((cert) => (
                                                <span key={cert} className="px-2 py-1 bg-zinc-800/80 rounded text-xs text-zinc-300">
                                                    {cert}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >

            {/* Membership Section */}
            < section className="py-24" >
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-red-500 uppercase tracking-widest text-sm font-bold">Pricing</span>
                        <h2 className="text-4xl md:text-5xl font-black mt-4 uppercase tracking-tight">
                            Choose Your{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-500">
                                Plan
                            </span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {membershipPlans.map((plan, index) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-8 rounded-2xl ${plan.highlighted ? 'bg-gradient-to-br from-red-600 to-rose-600 scale-105' : 'bg-zinc-900 border border-zinc-800'}`}
                            >
                                <h3 className="text-xl font-bold uppercase tracking-wide mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-5xl font-black">{plan.price}</span>
                                    <span className="text-white/60">{plan.period}</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2">
                                            <Check className={`w-5 h-5 ${plan.highlighted ? 'text-white' : 'text-red-500'}`} />
                                            <span className={plan.highlighted ? 'text-white/90' : 'text-zinc-400'}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className={`w-full py-4 rounded-lg font-bold uppercase tracking-wide transition-colors ${plan.highlighted ? 'bg-white text-red-600 hover:bg-gray-100' : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'}`}>
                                    Get Started
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >

            {/* Testimonials */}
            < section className="py-24 bg-zinc-900/50" >
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-red-500 uppercase tracking-widest text-sm font-bold">Success Stories</span>
                        <h2 className="text-4xl md:text-5xl font-black mt-4 uppercase tracking-tight">
                            Real{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-500">
                                Results
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
                                className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center text-xl font-bold">
                                        {testimonial.image}
                                    </div>
                                    <div>
                                        <div className="font-bold">{testimonial.name}</div>
                                        <div className="text-red-400 text-sm">{testimonial.result}</div>
                                    </div>
                                </div>
                                <p className="text-zinc-400">"{testimonial.content}"</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >

            {/* CTA Section */}
            < section className="py-24" >
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl overflow-hidden p-12 md:p-20 bg-gradient-to-br from-red-900/80 to-rose-900/80 text-center"
                    >
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">
                                Ready to Get Started?
                            </h2>
                            <p className="text-xl text-white/80 mb-10">
                                Your transformation begins today. Join thousands who have already achieved their fitness goals.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <button className="px-8 py-4 bg-white text-red-600 rounded-lg font-bold uppercase tracking-wide hover:bg-gray-100 transition-colors">
                                    Start Free Trial
                                </button>
                                <button className="px-8 py-4 bg-red-600/30 border border-red-500/30 rounded-lg font-bold uppercase tracking-wide hover:bg-red-600/40 transition-colors">
                                    Book a Tour
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section >

            {/* Footer */}
            < footer className="py-12 border-t border-zinc-800" >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center">
                                <Dumbbell className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-black tracking-tight">FITFORGE</span>
                        </div>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-red-500 hover:bg-zinc-700 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-red-500 hover:bg-zinc-700 transition-colors">
                                <Youtube className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-red-500 hover:bg-zinc-700 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                        </div>
                        <div className="text-zinc-500 text-sm">
                            © 2025 FitForge. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer >
        </div >
    )
}

export default FitForge
