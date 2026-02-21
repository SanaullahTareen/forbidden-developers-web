import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    ArrowLeft, ArrowRight, Sparkles, Heart, ShoppingBag, Star,
    Crown, Gem, Camera, Menu, X, Play, ChevronRight, Truck,
    RefreshCw, Shield, Instagram, Twitter, Facebook, Youtube
} from 'lucide-react'

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true })

    useEffect(() => {
        if (!isInView) return

        let startTime: number
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
            setCount(Math.floor(progress * end))
            if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
    }, [isInView, end, duration])

    return <span ref={ref}>{count}{suffix}</span>
}

// Floating Particle Component
const FloatingParticle = ({ delay = 0, size = 4, initialX = 0 }: { delay?: number; size?: number; initialX?: number }) => (
    <motion.div
        className="absolute rounded-full bg-gradient-to-r from-pink-400/30 to-fuchsia-400/30 blur-sm"
        style={{ width: size, height: size }}
        initial={{ x: initialX, y: '100vh', opacity: 0 }}
        animate={{
            y: '-100vh',
            opacity: [0, 1, 1, 0],
            x: initialX + Math.sin(delay) * 100,
        }}
        transition={{
            duration: 15 + Math.random() * 10,
            delay: delay,
            repeat: Infinity,
            ease: 'linear',
        }}
    />
)

// Vogue - Pink/Purple Fashion Brand Template
const Vogue = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const heroRef = useRef<HTMLDivElement>(null)

    const navItems = ['New In', 'Collections', 'Shoes', 'Accessories', 'Sale']

    const collections = [
        { name: 'Spring/Summer 2025', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop', items: '42 Items' },
        { name: 'Evening Elegance', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop', items: '28 Items' },
        { name: 'Urban Street', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop', items: '35 Items' },
    ]

    const featuredProducts = [
        { name: 'Silk Evening Gown', price: '$899', originalPrice: null, image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=500&fit=crop', tag: 'New' },
        { name: 'Velvet Blazer', price: '$459', originalPrice: '$599', image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400&h=500&fit=crop', tag: 'Sale' },
        { name: 'Leather Crossbody', price: '$329', originalPrice: null, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop', tag: 'Bestseller' },
        { name: 'Crystal Heels', price: '$549', originalPrice: null, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=500&fit=crop', tag: 'Limited' },
    ]

    const features = [
        { icon: Truck, title: 'Free Shipping', description: 'On orders over $200' },
        { icon: RefreshCw, title: 'Easy Returns', description: '30-day return policy' },
        { icon: Shield, title: 'Secure Checkout', description: 'SSL encrypted' },
        { icon: Crown, title: 'VIP Rewards', description: 'Earn points on every purchase' },
    ]

    const testimonials = [
        { name: 'Isabella M.', content: 'Absolutely stunning quality. The dress fit perfectly and the fabric is luxurious.', rating: 5 },
        { name: 'Sophia L.', content: 'My go-to brand for special occasions. Never disappoints!', rating: 5 },
        { name: 'Emma K.', content: 'The attention to detail is incredible. Worth every penny.', rating: 5 },
    ]

    const instagramPosts = [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&h=300&fit=crop',
    ]

    return (
        <div className="min-h-screen bg-neutral-950 text-white overflow-x-hidden">
            {/* Floating Particles */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {[...Array(20)].map((_, i) => (
                    <FloatingParticle
                        key={i}
                        delay={i * 1.5}
                        size={Math.random() * 6 + 2}
                        initialX={Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920)}
                    />
                ))}
            </div>

            {/* Floating Back Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed top-6 left-6 z-50"
            >
                <Link to="/templates">
                    <motion.div
                        className="flex items-center gap-2 px-4 py-2 bg-pink-600/20 backdrop-blur-md border border-pink-500/30 rounded-full text-pink-300 text-sm"
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(219, 39, 119, 0.3)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Templates
                    </motion.div>
                </Link>
            </motion.div>

            {/* Announcement Bar */}
            <div className="bg-gradient-to-r from-pink-600 to-fuchsia-600 py-2 text-center text-sm">
                <span>✨ New Season Sale — Up to 50% Off Selected Items ✨</span>
            </div>

            {/* Navigation */}
            <nav className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-xl border-b border-pink-500/10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Crown className="w-8 h-8 text-pink-400" />
                            <span className="text-2xl font-light tracking-[0.3em] uppercase">Vogue</span>
                        </div>

                        <div className="hidden md:flex items-center gap-10">
                            {navItems.map((item) => (
                                <motion.a
                                    key={item}
                                    href="#"
                                    className="text-neutral-400 hover:text-pink-400 transition-colors text-sm tracking-wider uppercase relative"
                                    whileHover={{ scale: 1.05, color: '#f472b6' }}
                                >
                                    {item}
                                    <motion.div
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-400 to-fuchsia-400"
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                </motion.a>
                            ))}
                        </div>

                        <div className="hidden md:flex items-center gap-6">
                            <button className="text-neutral-400 hover:text-pink-400 transition-colors">
                                <Heart className="w-5 h-5" />
                            </button>
                            <button className="text-neutral-400 hover:text-pink-400 transition-colors relative">
                                <ShoppingBag className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full text-xs flex items-center justify-center">3</span>
                            </button>
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
                        className="md:hidden absolute top-full left-0 right-0 bg-neutral-950 border-b border-pink-500/10 p-6"
                    >
                        {navItems.map((item) => (
                            <a key={item} href="#" className="block py-3 text-neutral-400 hover:text-pink-400 transition-colors uppercase tracking-wider text-sm">
                                {item}
                            </a>
                        ))}
                    </motion.div>
                )}
            </nav>

            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-[90vh] flex items-center">
                {/* Background */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&h=1080&fit=crop"
                        alt="Fashion"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent" />

                    {/* Animated Gradient Blobs */}
                    <motion.div
                        className="absolute top-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                            x: [0, 50, 0],
                            y: [0, -30, 0],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-3xl"
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.4, 0.2, 0.4],
                            x: [0, -40, 0],
                            y: [0, 40, 0],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    />
                    <motion.div
                        className="absolute top-1/2 right-1/2 w-48 h-48 bg-rose-400/15 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-6"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/20 border border-pink-500/30 rounded-full text-pink-300 text-sm tracking-wider">
                                <Sparkles className="w-4 h-4" />
                                Spring/Summer 2025
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-light mb-6 leading-tight tracking-tight"
                        >
                            Redefine
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 font-normal italic">
                                Elegance
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-neutral-400 mb-10"
                        >
                            Discover the new collection. Timeless pieces crafted for the modern woman
                            who dares to stand out.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-wrap gap-4"
                        >
                            <motion.button
                                className="group px-8 py-4 bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-full font-medium tracking-wider uppercase text-sm flex items-center gap-2 relative overflow-hidden"
                                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(236, 72, 153, 0.5)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10">Shop Collection</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-pink-500"
                                    initial={{ x: '100%' }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.button>
                            <motion.button
                                className="px-8 py-4 border border-pink-500/30 rounded-full font-medium tracking-wider uppercase text-sm flex items-center gap-2"
                                whileHover={{ scale: 1.05, borderColor: 'rgba(236, 72, 153, 0.6)', backgroundColor: 'rgba(236, 72, 153, 0.1)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Play className="w-4 h-4" />
                                Watch Lookbook
                            </motion.button>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <div className="w-6 h-10 border-2 border-pink-500/30 rounded-full flex justify-center pt-2">
                        <div className="w-1 h-2 bg-pink-400 rounded-full" />
                    </div>
                </motion.div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gradient-to-b from-neutral-900/50 to-neutral-950">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: 50, suffix: 'K+', label: 'Happy Customers' },
                            { number: 200, suffix: '+', label: 'Designer Pieces' },
                            { number: 15, suffix: '+', label: 'Years of Excellence' },
                            { number: 98, suffix: '%', label: 'Customer Satisfaction' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-light text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-fuchsia-400 mb-2">
                                    <AnimatedCounter end={stat.number} suffix={stat.suffix} duration={2.5} />
                                </div>
                                <div className="text-neutral-400 text-sm uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Bar */}
            <section className="py-8 border-y border-pink-500/10 bg-neutral-900/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {features.map((feature) => {
                            const Icon = feature.icon
                            return (
                                <div key={feature.title} className="flex items-center gap-3 justify-center text-center md:text-left md:justify-start">
                                    <Icon className="w-5 h-5 text-pink-400" />
                                    <div>
                                        <div className="font-medium text-sm">{feature.title}</div>
                                        <div className="text-xs text-neutral-500">{feature.description}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Collections Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-pink-400 uppercase tracking-[0.3em] text-sm">Curated</span>
                        <h2 className="text-4xl md:text-5xl font-light mt-4 tracking-tight">
                            Latest{' '}
                            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-fuchsia-400">
                                Collections
                            </span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {collections.map((collection, index) => (
                            <motion.div
                                key={collection.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                                    <img
                                        src={collection.image}
                                        alt={collection.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <h3 className="text-2xl font-light mb-1 group-hover:text-pink-300 transition-colors">{collection.name}</h3>
                                        <p className="text-pink-400 text-sm">{collection.items}</p>
                                    </div>
                                    <div className="absolute inset-0 bg-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <motion.span
                                            className="px-6 py-3 bg-white text-neutral-900 rounded-full font-medium text-sm uppercase tracking-wider"
                                            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(236, 72, 153, 0.4)' }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            View Collection
                                        </motion.span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-24 bg-neutral-900/50">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-between items-end mb-12"
                    >
                        <div>
                            <span className="text-pink-400 uppercase tracking-[0.3em] text-sm">Trending Now</span>
                            <h2 className="text-4xl md:text-5xl font-light mt-4 tracking-tight">
                                Featured{' '}
                                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-fuchsia-400">
                                    Pieces
                                </span>
                            </h2>
                        </div>
                        <a href="#" className="hidden md:flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors text-sm uppercase tracking-wider">
                            View All
                            <ChevronRight className="w-4 h-4" />
                        </a>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((product, index) => (
                            <motion.div
                                key={product.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <motion.span
                                            className={`px-3 py-1 text-xs font-medium rounded-full ${product.tag === 'Sale' ? 'bg-red-500' :
                                                product.tag === 'New' ? 'bg-pink-500' :
                                                    product.tag === 'Limited' ? 'bg-purple-500' :
                                                        'bg-fuchsia-500'
                                                }`}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            {product.tag}
                                        </motion.span>
                                    </div>
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <motion.button
                                            className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-neutral-900 hover:bg-pink-500 hover:text-white transition-colors"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Heart className="w-4 h-4" />
                                        </motion.button>
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <motion.button
                                            className="w-full py-3 bg-white text-neutral-900 rounded-full font-medium text-sm uppercase tracking-wider"
                                            whileHover={{ scale: 1.02, backgroundColor: '#ec4899', color: '#ffffff' }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Add to Bag
                                        </motion.button>
                                    </div>
                                </div>
                                <h3 className="font-medium mb-1 group-hover:text-pink-400 transition-colors">{product.name}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-pink-400">{product.price}</span>
                                    {product.originalPrice && (
                                        <span className="text-neutral-500 line-through text-sm">{product.originalPrice}</span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Editorial Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop"
                                alt="Editorial"
                                className="rounded-2xl"
                            />
                            <div className="absolute -bottom-6 -right-6 p-6 bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-2xl max-w-[200px] hidden md:block">
                                <Camera className="w-8 h-8 mb-2" />
                                <p className="text-sm font-medium">Behind the Scenes</p>
                                <p className="text-xs text-white/80">SS25 Campaign</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-pink-400 uppercase tracking-[0.3em] text-sm">Our Story</span>
                            <h2 className="text-4xl md:text-5xl font-light mt-4 mb-6 tracking-tight">
                                Crafted with
                                <br />
                                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-fuchsia-400">
                                    Passion
                                </span>
                            </h2>
                            <p className="text-neutral-400 mb-6 leading-relaxed">
                                Since 2015, Vogue has been redefining luxury fashion. Every piece in our collection
                                is meticulously crafted by skilled artisans using the finest materials sourced from
                                around the world.
                            </p>
                            <p className="text-neutral-400 mb-8 leading-relaxed">
                                We believe that true elegance lies in the details. From hand-stitched seams to
                                carefully selected fabrics, every element is designed to make you feel extraordinary.
                            </p>
                            <motion.button
                                className="px-8 py-4 border border-pink-500/30 rounded-full font-medium tracking-wider uppercase text-sm"
                                whileHover={{ scale: 1.05, borderColor: 'rgba(236, 72, 153, 0.6)', backgroundColor: 'rgba(236, 72, 153, 0.1)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Learn More About Us
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-gradient-to-b from-neutral-900/50 to-neutral-950">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-pink-400 uppercase tracking-[0.3em] text-sm">Reviews</span>
                        <h2 className="text-4xl md:text-5xl font-light mt-4 tracking-tight">
                            What Our{' '}
                            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-fuchsia-400">
                                Clients Say
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
                                className="p-8 rounded-2xl bg-neutral-900/50 border border-pink-500/10"
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-pink-400 text-pink-400" />
                                    ))}
                                </div>
                                <p className="text-neutral-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                                <div className="font-medium">{testimonial.name}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Instagram Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-pink-400 uppercase tracking-[0.3em] text-sm">@voguefashion</span>
                        <h2 className="text-4xl md:text-5xl font-light mt-4 tracking-tight">
                            Follow Our{' '}
                            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-fuchsia-400">
                                Journey
                            </span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                        {instagramPosts.map((post, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="aspect-square relative group cursor-pointer overflow-hidden rounded-lg"
                            >
                                <img src={post} alt="Instagram" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-pink-500/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Instagram className="w-8 h-8" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-24 bg-gradient-to-r from-pink-900/30 to-fuchsia-900/30">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-2xl mx-auto"
                    >
                        <Gem className="w-12 h-12 text-pink-400 mx-auto mb-6" />
                        <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
                            Join the{' '}
                            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-fuchsia-400">
                                Inner Circle
                            </span>
                        </h2>
                        <p className="text-neutral-400 mb-10">
                            Subscribe to receive exclusive offers, early access to new collections, and styling tips from our experts.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-4 bg-white/5 border border-pink-500/30 rounded-full text-white placeholder-neutral-500 focus:outline-none focus:border-pink-400"
                            />
                            <motion.button
                                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-full font-medium tracking-wider uppercase text-sm whitespace-nowrap relative overflow-hidden"
                                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(236, 72, 153, 0.5)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Subscribe
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 border-t border-pink-500/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <Crown className="w-6 h-6 text-pink-400" />
                                <span className="text-xl font-light tracking-[0.3em] uppercase">Vogue</span>
                            </div>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                Redefining elegance since 2015. Crafted with passion, worn with confidence.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-medium mb-4 uppercase tracking-wider text-sm">Shop</h4>
                            <ul className="space-y-3 text-neutral-500 text-sm">
                                <li><a href="#" className="hover:text-pink-400 transition-colors">New Arrivals</a></li>
                                <li><a href="#" className="hover:text-pink-400 transition-colors">Collections</a></li>
                                <li><a href="#" className="hover:text-pink-400 transition-colors">Sale</a></li>
                                <li><a href="#" className="hover:text-pink-400 transition-colors">Gift Cards</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-4 uppercase tracking-wider text-sm">Help</h4>
                            <ul className="space-y-3 text-neutral-500 text-sm">
                                <li><a href="#" className="hover:text-pink-400 transition-colors">Customer Service</a></li>
                                <li><a href="#" className="hover:text-pink-400 transition-colors">Shipping & Returns</a></li>
                                <li><a href="#" className="hover:text-pink-400 transition-colors">Size Guide</a></li>
                                <li><a href="#" className="hover:text-pink-400 transition-colors">Contact Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-4 uppercase tracking-wider text-sm">Follow Us</h4>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 hover:bg-pink-500/30 transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 hover:bg-pink-500/30 transition-colors">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 hover:bg-pink-500/30 transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 hover:bg-pink-500/30 transition-colors">
                                    <Youtube className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-pink-500/10 text-center text-neutral-500 text-sm">
                        © 2025 Vogue Fashion. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Vogue
