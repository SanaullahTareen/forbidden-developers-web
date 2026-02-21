import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    ArrowLeft, ArrowRight, UtensilsCrossed, Clock, MapPin, Phone,
    Star, Menu, X, ChefHat, Flame, Leaf, Wine, Calendar, Users,
    Instagram, Facebook, Twitter
} from 'lucide-react'

// AnimatedCounter component for counting up numbers
const AnimatedCounter = ({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true })

    useEffect(() => {
        if (!isInView) return
        let start = 0
        const end = value
        const incrementTime = (duration * 1000) / end
        const timer = setInterval(() => {
            start += 1
            setCount(start)
            if (start >= end) clearInterval(timer)
        }, Math.max(incrementTime, 10))
        return () => clearInterval(timer)
    }, [isInView, value, duration])

    return <span ref={ref}>{count}{suffix}</span>
}

// Steam particle for food-themed ambient effect
const SteamParticle = ({ delay = 0 }: { delay?: number }) => {
    const randomX = Math.random() * 100
    const randomDuration = 4 + Math.random() * 3
    const randomSize = 4 + Math.random() * 8

    return (
        <motion.div
            className="absolute rounded-full bg-gradient-to-t from-orange-400/20 to-amber-200/10 blur-sm"
            style={{
                width: randomSize,
                height: randomSize,
                left: `${randomX}%`,
                bottom: '0%',
            }}
            animate={{
                y: [0, -300, -600],
                x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1.2, 0.8],
            }}
            transition={{
                duration: randomDuration,
                delay: delay,
                repeat: Infinity,
                ease: 'easeOut',
            }}
        />
    )
}

// Flavor - Orange/Yellow Restaurant Template
const Flavor = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const heroRef = useRef<HTMLDivElement>(null)

    const navItems = ['Menu', 'About', 'Reservations', 'Events', 'Contact']

    const menuCategories = [
        { name: 'Starters', count: 8 },
        { name: 'Mains', count: 12 },
        { name: 'Desserts', count: 6 },
        { name: 'Drinks', count: 15 },
    ]

    const featuredDishes = [
        { name: 'Truffle Risotto', description: 'Arborio rice, black truffle, aged parmesan', price: '$32', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=400&fit=crop', tag: 'Chef\'s Special' },
        { name: 'Grilled Sea Bass', description: 'Mediterranean herbs, lemon butter, seasonal vegetables', price: '$38', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=400&fit=crop', tag: 'Popular' },
        { name: 'Wagyu Steak', description: 'A5 Japanese wagyu, truffle mash, red wine reduction', price: '$85', image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400&h=400&fit=crop', tag: 'Premium' },
        { name: 'Lobster Thermidor', description: 'Fresh Maine lobster, cognac cream, gruyère', price: '$55', image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=400&h=400&fit=crop', tag: 'Signature' },
    ]

    const features = [
        { icon: ChefHat, title: 'Master Chefs', description: 'Award-winning culinary team' },
        { icon: Leaf, title: 'Fresh Ingredients', description: 'Locally sourced daily' },
        { icon: Wine, title: 'Fine Wines', description: '200+ wine selection' },
        { icon: Flame, title: 'Wood-Fired', description: 'Traditional cooking methods' },
    ]

    const testimonials = [
        { name: 'James & Sarah M.', content: 'An unforgettable dining experience. The truffle risotto alone is worth the visit!', rating: 5 },
        { name: 'Michael K.', content: 'Best restaurant in the city. The attention to detail is remarkable.', rating: 5 },
        { name: 'Elena R.', content: 'Perfect for special occasions. The ambiance and food are exceptional.', rating: 5 },
    ]

    const stats = [
        { value: 15, suffix: '+', label: 'Years of Excellence' },
        { value: 3, suffix: '', label: 'Michelin Stars' },
        { value: 50, suffix: 'K+', label: 'Happy Guests' },
        { value: 200, suffix: '+', label: 'Wine Selection' },
    ]

    return (
        <div className="min-h-screen bg-amber-950 text-white overflow-x-hidden">
            {/* Ambient Steam Particles */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <SteamParticle key={i} delay={i * 0.5} />
                ))}
            </div>

            {/* Floating Back Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed top-6 left-6 z-50"
            >
                <Link
                    to="/templates"
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600/20 backdrop-blur-md border border-orange-500/30 rounded-full text-orange-300 hover:bg-orange-600/30 transition-all text-sm group"
                >
                    <motion.span
                        whileHover={{ x: -3 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </motion.span>
                    Back to Templates
                </Link>
            </motion.div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-40 bg-amber-950/90 backdrop-blur-xl border-b border-orange-500/10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <UtensilsCrossed className="w-8 h-8 text-orange-400" />
                            <span className="text-2xl font-serif font-bold">Flavor</span>
                        </div>

                        <div className="hidden md:flex items-center gap-10">
                            {navItems.map((item) => (
                                <motion.a
                                    key={item}
                                    href="#"
                                    className="text-amber-200/70 hover:text-orange-400 transition-colors text-sm font-medium tracking-wide uppercase"
                                    whileHover={{ y: -2, scale: 1.05 }}
                                    transition={{ type: 'spring', stiffness: 400 }}
                                >
                                    {item}
                                </motion.a>
                            ))}
                        </div>

                        <div className="hidden md:flex items-center gap-4">
                            <motion.button
                                className="relative px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full text-sm font-semibold overflow-hidden group"
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(249, 115, 22, 0.5)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10">Reserve a Table</span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
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
                        className="md:hidden absolute top-full left-0 right-0 bg-amber-950 border-b border-orange-500/10 p-6"
                    >
                        {navItems.map((item) => (
                            <a key={item} href="#" className="block py-3 text-amber-200/70 hover:text-orange-400 transition-colors uppercase text-sm tracking-wide">
                                {item}
                            </a>
                        ))}
                        <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full text-sm font-semibold">
                            Reserve a Table
                        </button>
                    </motion.div>
                )}
            </nav>

            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-screen flex items-center">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop"
                        alt="Restaurant Interior"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-950 via-amber-950/90 to-amber-950/70" />
                </div>

                {/* Animated Gradient Blobs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
                        animate={{
                            x: [0, 50, 0],
                            y: [0, 30, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-0 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl"
                        animate={{
                            x: [0, -40, 0],
                            y: [0, -50, 0],
                            scale: [1, 1.3, 1],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"
                        animate={{
                            x: [0, 60, 0],
                            y: [0, -40, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
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
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-300 text-sm">
                                <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                                <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                                <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                                3 Michelin Stars
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight"
                        >
                            A Culinary
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                                Experience
                            </span>
                            <br />
                            Like No Other
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-amber-200/70 mb-10"
                        >
                            Where passion meets perfection. Experience the finest Mediterranean cuisine
                            crafted by world-renowned chefs using the freshest local ingredients.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-wrap gap-4"
                        >
                            <motion.button
                                className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full font-semibold flex items-center gap-2 overflow-hidden"
                                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(249, 115, 22, 0.5)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Calendar className="w-5 h-5 relative z-10" />
                                <span className="relative z-10">Make a Reservation</span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.button>
                            <motion.button
                                className="px-8 py-4 border border-orange-500/30 rounded-full font-semibold hover:bg-orange-500/10 transition-colors flex items-center gap-2"
                                whileHover={{ scale: 1.05, borderColor: 'rgba(249, 115, 22, 0.6)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View Menu
                                <motion.span
                                    whileHover={{ x: 5 }}
                                    transition={{ type: 'spring', stiffness: 400 }}
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </motion.span>
                            </motion.button>
                        </motion.div>

                        {/* Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mt-12 flex flex-wrap gap-6 text-sm text-amber-200/60"
                        >
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-orange-400" />
                                <span>Tue-Sun: 6PM - 11PM</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-orange-400" />
                                <span>123 Gourmet Street, NYC</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-orange-400" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-amber-900/30">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon
                            return (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center cursor-pointer group"
                                >
                                    <motion.div
                                        className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500/30 transition-colors"
                                        whileHover={{ rotate: 360, scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Icon className="w-8 h-8 text-orange-400" />
                                    </motion.div>
                                    <h3 className="font-semibold mb-1 group-hover:text-orange-300 transition-colors">{feature.title}</h3>
                                    <p className="text-sm text-amber-200/60">{feature.description}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Featured Menu Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-orange-400 uppercase tracking-widest text-sm font-medium">Our Menu</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6">
                            Chef's{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                                Selections
                            </span>
                        </h2>
                        <p className="text-amber-200/60 max-w-xl mx-auto">
                            Discover our carefully curated dishes, each telling a unique story through exceptional flavors.
                        </p>
                    </motion.div>

                    {/* Menu Categories */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {menuCategories.map((category) => (
                            <motion.button
                                key={category.name}
                                className="px-6 py-2 rounded-full border border-orange-500/30 hover:bg-orange-500/20 transition-colors text-sm"
                                whileHover={{ scale: 1.05, borderColor: 'rgba(249, 115, 22, 0.6)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {category.name} ({category.count})
                            </motion.button>
                        ))}
                    </div>

                    {/* Dishes Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredDishes.map((dish, index) => (
                            <motion.div
                                key={dish.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
                                    <img
                                        src={dish.image}
                                        alt={dish.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-amber-950 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                    <motion.span
                                        className="absolute top-4 left-4 px-3 py-1 bg-orange-500 rounded-full text-xs font-medium"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        {dish.tag}
                                    </motion.span>
                                    <div className="absolute bottom-4 right-4 text-2xl font-bold group-hover:text-orange-300 transition-colors">{dish.price}</div>
                                </div>
                                <h3 className="font-semibold text-lg mb-1 group-hover:text-orange-300 transition-colors">{dish.name}</h3>
                                <p className="text-sm text-amber-200/60">{dish.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <motion.button
                            className="px-8 py-4 border border-orange-500/30 rounded-full font-semibold hover:bg-orange-500/20 transition-colors"
                            whileHover={{ scale: 1.05, borderColor: 'rgba(249, 115, 22, 0.6)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View Full Menu
                        </motion.button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gradient-to-r from-orange-900/50 to-amber-900/50 relative overflow-hidden">
                {/* Background glow effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.05 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center cursor-pointer"
                            >
                                <div className="text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="text-amber-200/60 mt-2">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&h=700&fit=crop"
                                alt="Chef"
                                className="rounded-2xl"
                            />
                            <div className="absolute -bottom-8 -right-8 p-6 bg-orange-500 rounded-2xl max-w-xs hidden md:block">
                                <p className="font-serif italic text-lg">"Cooking is an art, but all art requires knowing something about the techniques and materials."</p>
                                <p className="mt-2 font-semibold">— Chef Marco Rossi</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-orange-400 uppercase tracking-widest text-sm font-medium">Our Story</span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6">
                                A Legacy of
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                                    Culinary Excellence
                                </span>
                            </h2>
                            <p className="text-amber-200/70 mb-6 leading-relaxed">
                                For over 15 years, Flavor has been the pinnacle of fine dining in New York City.
                                Our commitment to exceptional cuisine begins with sourcing the finest ingredients
                                from local farms and artisanal producers.
                            </p>
                            <p className="text-amber-200/70 mb-8 leading-relaxed">
                                Led by three-time Michelin-starred Chef Marco Rossi, our kitchen team creates
                                dishes that honor traditional techniques while embracing innovative approaches.
                            </p>
                            <motion.button
                                className="relative px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full font-semibold overflow-hidden"
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(249, 115, 22, 0.4)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10">Learn More About Us</span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-amber-900/30">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-orange-400 uppercase tracking-widest text-sm font-medium">Testimonials</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4">
                            What Our{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                                Guests Say
                            </span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -8, scale: 1.02, borderColor: 'rgba(249, 115, 22, 0.3)' }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl bg-amber-950/50 border border-orange-500/10 cursor-pointer"
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                                    ))}
                                </div>
                                <p className="text-amber-200/80 mb-6 leading-relaxed">"{testimonial.content}"</p>
                                <div className="font-semibold">{testimonial.name}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reservation CTA */}
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
                                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&h=600&fit=crop"
                                alt="Restaurant"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-amber-950/90" />
                        </div>
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                                Reserve Your Table Tonight
                            </h2>
                            <p className="text-xl text-amber-200/70 mb-10">
                                Experience an unforgettable evening of exquisite cuisine and impeccable service.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <motion.button
                                    className="relative px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full font-semibold flex items-center gap-2 overflow-hidden"
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(249, 115, 22, 0.5)' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Calendar className="w-5 h-5 relative z-10" />
                                    <span className="relative z-10">Book a Table</span>
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400"
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.button>
                                <motion.button
                                    className="px-8 py-4 border border-orange-500/30 rounded-full font-semibold hover:bg-orange-500/20 transition-colors flex items-center gap-2"
                                    whileHover={{ scale: 1.05, borderColor: 'rgba(249, 115, 22, 0.6)' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Phone className="w-5 h-5" />
                                    Call Us
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-orange-500/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <UtensilsCrossed className="w-6 h-6 text-orange-400" />
                            <span className="text-xl font-serif font-bold">Flavor</span>
                        </div>
                        <div className="flex gap-4">
                            <motion.a
                                href="#"
                                className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 hover:bg-orange-500/30 transition-colors"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Instagram className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                                href="#"
                                className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 hover:bg-orange-500/30 transition-colors"
                                whileHover={{ scale: 1.2, rotate: -5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Facebook className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                                href="#"
                                className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 hover:bg-orange-500/30 transition-colors"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Twitter className="w-5 h-5" />
                            </motion.a>
                        </div>
                        <div className="text-amber-200/60 text-sm">
                            © 2025 Flavor Restaurant. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Flavor
