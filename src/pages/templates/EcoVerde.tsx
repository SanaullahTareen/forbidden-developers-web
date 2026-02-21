import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    ArrowLeft, ArrowRight, Leaf, TreePine, Droplets, Sun, Wind,
    Recycle, Globe, Heart, Menu, X, Play, Check, Star, Sprout,
    Mountain, CloudRain, Instagram, Twitter, Facebook
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

// Floating Leaf Particle
const FloatingLeaf = ({ delay = 0 }: { delay: number }) => {
    return (
        <motion.div
            className="absolute text-emerald-500/30"
            initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: -50,
                rotate: 0,
                opacity: 0
            }}
            animate={{
                y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
                x: `+=${Math.random() * 200 - 100}`,
                rotate: 360,
                opacity: [0, 0.6, 0.6, 0]
            }}
            transition={{
                duration: 15 + Math.random() * 10,
                delay,
                repeat: Infinity,
                ease: "linear"
            }}
        >
            <Leaf className="w-6 h-6" />
        </motion.div>
    );
};

// Pulsing Circle Component
const PulsingCircle = ({ size, delay, color }: { size: number; delay: number; color: string }) => (
    <motion.div
        className={`absolute rounded-full ${color}`}
        style={{ width: size, height: size }}
        animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
            duration: 4,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    />
);

// EcoVerde - Green Eco/Sustainability Template
const EcoVerde = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const heroRef = useRef<HTMLDivElement>(null)

    const navItems = ['Mission', 'Products', 'Impact', 'Community', 'Shop']

    const stats = [
        { value: '1M+', label: 'Trees Planted' },
        { value: '50K', label: 'Tons CO₂ Offset' },
        { value: '100%', label: 'Sustainable Materials' },
        { value: '30+', label: 'Countries Reached' },
    ]

    const initiatives = [
        { icon: TreePine, title: 'Reforestation', description: 'Planting trees in deforested regions to restore natural habitats', impact: '1M+ trees' },
        { icon: Droplets, title: 'Ocean Cleanup', description: 'Removing plastic waste from oceans and coastlines worldwide', impact: '500K tons' },
        { icon: Sun, title: 'Solar Energy', description: 'Powering communities with clean, renewable solar energy', impact: '10K homes' },
        { icon: Wind, title: 'Wind Farms', description: 'Investing in wind energy for sustainable power generation', impact: '5 farms' },
        { icon: Recycle, title: 'Zero Waste', description: 'Implementing circular economy practices in all operations', impact: '95% rate' },
        { icon: Globe, title: 'Carbon Neutral', description: 'Achieving net-zero carbon emissions across the supply chain', impact: 'Since 2023' },
    ]

    const products = [
        { name: 'Bamboo Collection', category: 'Home & Living', image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=400&fit=crop', price: 'From $29' },
        { name: 'Organic Apparel', category: 'Fashion', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=400&fit=crop', price: 'From $45' },
        { name: 'Plant-Based Skincare', category: 'Beauty', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop', price: 'From $24' },
        { name: 'Eco Essentials Kit', category: 'Starter Pack', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=400&fit=crop', price: '$89' },
    ]

    const testimonials = [
        { name: 'Emma Wilson', role: 'Environmental Activist', content: 'EcoVerde is leading the way in sustainable practices. Their transparency and commitment are unmatched.', avatar: 'E' },
        { name: 'David Chen', role: 'Climate Researcher', content: 'Finally, a brand that walks the talk. Their impact metrics are verifiable and impressive.', avatar: 'D' },
    ]

    const impactNumbers = [
        { icon: TreePine, value: '1,234,567', label: 'Trees Planted' },
        { icon: Droplets, value: '500,000', label: 'Tons Ocean Plastic Removed' },
        { icon: Sun, value: '50,000', label: 'MWh Clean Energy Generated' },
    ]

    return (
        <div className="min-h-screen bg-emerald-950 text-white overflow-x-hidden">
            {/* Floating Leaf Particles */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {[...Array(15)].map((_, i) => (
                    <FloatingLeaf key={i} delay={i * 1.5} />
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
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600/20 backdrop-blur-md border border-emerald-500/30 rounded-full text-emerald-300 hover:bg-emerald-600/30 transition-all text-sm shadow-lg shadow-emerald-500/10"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Templates
                </Link>
            </motion.div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-40 bg-emerald-950/90 backdrop-blur-xl border-b border-emerald-500/10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <motion.div
                            className="flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.div
                                className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center"
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                <Leaf className="w-5 h-5 text-white" />
                            </motion.div>
                            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">EcoVerde</span>
                        </motion.div>

                        <div className="hidden md:flex items-center gap-10">
                            {navItems.map((item) => (
                                <motion.a
                                    key={item}
                                    href="#"
                                    className="text-emerald-200/70 hover:text-white transition-colors text-sm font-medium"
                                    whileHover={{ y: -2 }}
                                >
                                    {item}
                                </motion.a>
                            ))}
                        </div>

                        <div className="hidden md:flex items-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full text-sm font-semibold transition-all"
                            >
                                Join the Movement
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
                        className="md:hidden absolute top-full left-0 right-0 bg-emerald-950/95 backdrop-blur-xl border-b border-emerald-500/10 p-6"
                    >
                        {navItems.map((item) => (
                            <a key={item} href="#" className="block py-3 text-emerald-200/70 hover:text-white transition-colors">
                                {item}
                            </a>
                        ))}
                        <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full text-sm font-semibold">
                            Join the Movement
                        </button>
                    </motion.div>
                )}
            </nav>

            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-screen flex items-center">
                {/* Background */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop"
                        alt="Forest"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/90 to-emerald-950/70" />
                </div>

                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-20 left-20 w-72 h-72 bg-green-500/10 rounded-full blur-[80px]"
                        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 6, repeat: Infinity }}
                    />
                    {/* Floating rings */}
                    <motion.div
                        className="absolute top-1/2 right-1/4 w-64 h-64 border border-emerald-500/20 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute top-1/2 right-1/4 w-48 h-48 border border-green-500/20 rounded-full"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-6"
                        >
                            <motion.span
                                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 text-sm"
                                animate={{ boxShadow: ['0 0 0 rgba(16, 185, 129, 0)', '0 0 20px rgba(16, 185, 129, 0.3)', '0 0 0 rgba(16, 185, 129, 0)'] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Sprout className="w-4 h-4" />
                                B Corp Certified • Carbon Neutral
                            </motion.span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                        >
                            Protect Our
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-400">
                                Planet
                            </span>
                            <br />
                            Together
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-emerald-200/70 mb-10 max-w-lg"
                        >
                            Join the sustainable revolution. Every purchase supports reforestation,
                            ocean cleanup, and renewable energy projects worldwide.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-wrap gap-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(16, 185, 129, 0.5)' }}
                                whileTap={{ scale: 0.95 }}
                                className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full font-semibold flex items-center gap-2 transition-all"
                            >
                                Shop Sustainable
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 border border-emerald-500/30 rounded-full font-semibold hover:bg-emerald-500/10 transition-colors flex items-center gap-2"
                            >
                                <Play className="w-5 h-5" />
                                Our Story
                            </motion.button>
                        </motion.div>

                        {/* Impact Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mt-16 grid grid-cols-3 gap-6"
                        >
                            {impactNumbers.map((item, index) => {
                                const Icon = item.icon
                                return (
                                    <motion.div
                                        key={item.label}
                                        className="text-center p-4 rounded-xl bg-emerald-900/30 backdrop-blur-sm border border-emerald-500/10"
                                        whileHover={{ y: -5, borderColor: 'rgba(16, 185, 129, 0.3)' }}
                                    >
                                        <motion.div
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 2, delay: index * 0.2, repeat: Infinity }}
                                        >
                                            <Icon className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                                        </motion.div>
                                        <div className="text-2xl font-bold">
                                            <AnimatedCounter end={parseInt(item.value.replace(/,/g, ''))} suffix="+" />
                                        </div>
                                        <div className="text-xs text-emerald-200/60">{item.label}</div>
                                    </motion.div>
                                )
                            })}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="py-16 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 relative overflow-hidden">
                {/* Animated background pattern */}
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
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="text-center p-4"
                            >
                                <div className="text-4xl md:text-5xl font-bold">
                                    {stat.value.includes('M') ? (
                                        <><AnimatedCounter end={1} />M+</>
                                    ) : stat.value.includes('K') ? (
                                        <><AnimatedCounter end={50} />K</>
                                    ) : stat.value.includes('%') ? (
                                        <><AnimatedCounter end={100} />%</>
                                    ) : (
                                        <><AnimatedCounter end={30} />+</>
                                    )}
                                </div>
                                <div className="text-white/80 mt-1">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Initiatives Section */}
            <section className="py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 to-emerald-900/50" />
                <div className="max-w-7xl mx-auto px-6 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-emerald-400 uppercase tracking-widest text-sm font-medium">Our Impact</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                            Making a{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-400">
                                Difference
                            </span>
                        </h2>
                        <p className="text-emerald-200/60 max-w-xl mx-auto">
                            Every initiative is designed to create measurable positive impact for our planet and communities.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {initiatives.map((initiative, index) => {
                            const Icon = initiative.icon
                            return (
                                <motion.div
                                    key={initiative.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className="group p-8 rounded-2xl bg-emerald-900/30 border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10"
                                >
                                    <motion.div
                                        className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors"
                                        whileHover={{ rotate: 10 }}
                                    >
                                        <Icon className="w-7 h-7 text-emerald-400 group-hover:text-white transition-colors" />
                                    </motion.div>
                                    <h3 className="text-xl font-semibold mb-3 group-hover:text-emerald-400 transition-colors">{initiative.title}</h3>
                                    <p className="text-emerald-200/60 mb-4">{initiative.description}</p>
                                    <motion.div
                                        className="inline-flex items-center px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-400 text-sm"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        Impact: {initiative.impact}
                                    </motion.div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-24 bg-emerald-900/30 relative overflow-hidden">
                <div className="absolute inset-0">
                    <motion.div
                        className="absolute top-1/4 left-10 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px]"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-10 w-80 h-80 bg-green-500/5 rounded-full blur-[100px]"
                        animate={{ scale: [1.2, 1, 1.2] }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />
                </div>
                <div className="max-w-7xl mx-auto px-6 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-emerald-400 uppercase tracking-widest text-sm font-medium">Shop</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                            Sustainable{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-400">
                                Products
                            </span>
                        </h2>
                        <p className="text-emerald-200/60 max-w-xl mx-auto">
                            Every product is made with sustainable materials and supports environmental causes.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product, index) => (
                            <motion.div
                                key={product.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
                                    <motion.img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent opacity-70" />
                                    <motion.div
                                        className="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <span className="text-emerald-300 text-sm">{product.category}</span>
                                        <div className="font-bold text-lg">{product.name}</div>
                                        <div className="text-emerald-400 mt-1 font-semibold">{product.price}</div>
                                    </div>
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        whileHover={{ scale: 1.05 }}
                                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Heart className="w-5 h-5 text-emerald-600" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="text-center mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full font-semibold transition-all"
                        >
                            Shop All Products
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-emerald-400 uppercase tracking-widest text-sm font-medium">How It Works</span>
                            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                                Every Purchase
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">
                                    Plants a Tree
                                </span>
                            </h2>
                            <p className="text-emerald-200/70 mb-8 leading-relaxed">
                                When you shop with EcoVerde, you're not just buying products – you're investing in our planet's future.
                                We plant one tree for every item purchased and donate 10% of profits to environmental causes.
                            </p>
                            <div className="space-y-4">
                                {[
                                    'Sustainable materials sourced responsibly',
                                    'Carbon-neutral shipping worldwide',
                                    '1 tree planted per purchase',
                                    '10% of profits to environmental nonprofits',
                                    'Plastic-free packaging guaranteed',
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-4 h-4 text-emerald-400" />
                                        </div>
                                        <span className="text-emerald-200/80">{item}</span>
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
                                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=700&fit=crop"
                                alt="Sustainability"
                                className="rounded-2xl"
                            />
                            <div className="absolute -bottom-6 -left-6 p-6 bg-emerald-500 rounded-2xl max-w-xs hidden md:block">
                                <div className="flex items-center gap-3">
                                    <TreePine className="w-8 h-8" />
                                    <div>
                                        <div className="text-2xl font-bold">1,234,567</div>
                                        <div className="text-white/80 text-sm">Trees planted this year</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-emerald-900/30">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-emerald-400 uppercase tracking-widest text-sm font-medium">Community</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-4">
                            Voices of{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">
                                Change
                            </span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl bg-emerald-900/50 border border-emerald-500/10"
                            >
                                <p className="text-emerald-200/80 text-lg mb-6 leading-relaxed">"{testimonial.content}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center font-semibold">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold">{testimonial.name}</div>
                                        <div className="text-sm text-emerald-200/60">{testimonial.role}</div>
                                    </div>
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
                        className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
                    >
                        <div className="absolute inset-0">
                            <img
                                src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1400&h=600&fit=crop"
                                alt="Nature"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-emerald-950/85" />
                        </div>
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <Leaf className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                Join the Green Revolution
                            </h2>
                            <p className="text-xl text-emerald-200/70 mb-10">
                                Be part of the solution. Subscribe for updates on our environmental initiatives and exclusive sustainable products.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-6 py-4 bg-white/10 border border-emerald-500/30 rounded-full text-white placeholder-emerald-200/50 focus:outline-none focus:border-emerald-400"
                                />
                                <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full font-semibold hover:opacity-90 transition-opacity whitespace-nowrap">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-emerald-500/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                                <Leaf className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold">EcoVerde</span>
                        </div>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/30 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/30 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/30 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                        </div>
                        <div className="text-emerald-200/60 text-sm">
                            © 2025 EcoVerde. Planting a greener future.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default EcoVerde
