import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    ArrowLeft, ArrowRight, Palette, Sparkles, Layers, PenTool, Camera,
    Lightbulb, Users, Star, Menu, X, Play, ChevronRight, Award,
    Figma, Framer, Dribbble, Instagram
} from 'lucide-react'

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true })

    useEffect(() => {
        if (isInView) {
            let start = 0
            const end = value
            const incrementTime = (duration * 1000) / end
            const timer = setInterval(() => {
                start += 1
                setCount(start)
                if (start >= end) clearInterval(timer)
            }, Math.max(incrementTime, 20))
            return () => clearInterval(timer)
        }
    }, [isInView, value, duration])

    return <span ref={ref}>{count}{suffix}</span>
}

// Floating Particle Component
const FloatingParticle = ({ delay = 0, size = 4, color = 'bg-purple-400' }: { delay?: number; size?: number; color?: string }) => (
    <motion.div
        className={`absolute ${color} rounded-full opacity-40 blur-sm`}
        style={{ width: size, height: size }}
        initial={{ y: '100vh', x: Math.random() * 100 + '%' }}
        animate={{
            y: '-100vh',
            x: [Math.random() * 100 + '%', Math.random() * 100 + '%', Math.random() * 100 + '%'],
        }}
        transition={{
            duration: Math.random() * 15 + 20,
            repeat: Infinity,
            delay: delay,
            ease: 'linear',
        }}
    />
)

// Lumina - Light Theme Creative Agency Template
const Lumina = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const heroRef = useRef<HTMLDivElement>(null)

    const navItems = ['Work', 'Services', 'About', 'Process', 'Contact']

    const services = [
        { icon: PenTool, title: 'Brand Identity', description: 'Crafting unique visual identities that capture your brand essence' },
        { icon: Palette, title: 'UI/UX Design', description: 'Creating intuitive digital experiences that delight users' },
        { icon: Camera, title: 'Photography', description: 'Professional photography that tells your brand story' },
        { icon: Layers, title: 'Web Design', description: 'Beautiful, responsive websites that convert visitors' },
    ]

    const works = [
        { title: 'Bloom Botanics', category: 'Brand Identity', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop', color: 'from-emerald-200 to-teal-200' },
        { title: 'Nova Studios', category: 'Web Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop', color: 'from-violet-200 to-purple-200' },
        { title: 'Artisan Coffee', category: 'Photography', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop', color: 'from-amber-200 to-orange-200' },
        { title: 'Urban Fitness', category: 'UI/UX Design', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop', color: 'from-rose-200 to-pink-200' },
    ]

    const process = [
        { step: '01', title: 'Discovery', description: 'We learn about your brand, goals, and vision' },
        { step: '02', title: 'Strategy', description: 'Creating a roadmap for your success' },
        { step: '03', title: 'Design', description: 'Bringing ideas to life with creativity' },
        { step: '04', title: 'Delivery', description: 'Launching your project to the world' },
    ]

    const testimonials = [
        { name: 'Anna Mitchell', role: 'CEO, Bloom Botanics', content: 'Lumina transformed our brand completely. Their attention to detail is unmatched.', avatar: 'A' },
        { name: 'David Park', role: 'Founder, Nova Studios', content: 'Working with Lumina was a dream. They understood our vision perfectly.', avatar: 'D' },
    ]

    return (
        <div className="min-h-screen bg-[#fafafa] text-gray-900 overflow-x-hidden">
            {/* Floating Particles */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {[...Array(20)].map((_, i) => (
                    <FloatingParticle
                        key={i}
                        delay={i * 1.5}
                        size={Math.random() * 6 + 2}
                        color={i % 3 === 0 ? 'bg-purple-400' : i % 3 === 1 ? 'bg-pink-400' : 'bg-violet-400'}
                    />
                ))}
            </div>

            {/* Floating Back Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link
                    to="/templates"
                    className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-all text-sm shadow-sm group"
                >
                    <motion.span whileHover={{ x: -3 }} transition={{ duration: 0.2 }}>
                        <ArrowLeft className="w-4 h-4" />
                    </motion.span>
                    Back to Templates
                </Link>
            </motion.div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-semibold tracking-tight">Lumina</span>
                        </div>

                        <div className="hidden md:flex items-center gap-10">
                            {navItems.map((item) => (
                                <motion.a
                                    key={item}
                                    href="#"
                                    className="text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium relative"
                                    whileHover={{ y: -2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {item}
                                    <motion.span
                                        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                                        whileHover={{ width: '100%' }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.a>
                            ))}
                        </div>

                        <div className="hidden md:flex items-center gap-4">
                            <motion.button
                                className="px-6 py-2.5 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors relative overflow-hidden"
                                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(139, 92, 246, 0.4)' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="relative z-10">Get in Touch</span>
                            </motion.button>
                        </div>

                        <button className="md:hidden text-gray-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6"
                    >
                        {navItems.map((item) => (
                            <a key={item} href="#" className="block py-3 text-gray-600 hover:text-gray-900 transition-colors">
                                {item}
                            </a>
                        ))}
                        <button className="w-full mt-4 px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium">
                            Get in Touch
                        </button>
                    </motion.div>
                )}
            </nav>

            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-40 pb-20">
                {/* Animated Gradient Blobs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl opacity-40"
                        animate={{
                            x: [0, 50, 0],
                            y: [0, 30, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-violet-200 to-fuchsia-200 rounded-full blur-3xl opacity-40"
                        animate={{
                            x: [0, -40, 0],
                            y: [0, -20, 0],
                            scale: [1, 1.15, 1],
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    />
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="mb-6"
                            >
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-600 text-sm font-medium">
                                    <Award className="w-4 h-4" />
                                    Award-winning design studio
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight"
                            >
                                We create
                                <br />
                                <span className="text-gray-400">beautiful</span>
                                <br />
                                experiences
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-lg text-gray-500 max-w-md mb-10"
                            >
                                A creative studio focused on brand identity, digital experiences, and visual storytelling for forward-thinking brands.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="flex flex-wrap gap-4"
                            >
                                <motion.button
                                    className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium transition-all flex items-center gap-2 relative overflow-hidden"
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <motion.span
                                        className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    <span className="relative z-10 flex items-center gap-2">
                                        View Our Work
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </motion.button>
                                <motion.button
                                    className="px-8 py-4 border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                                    whileHover={{ scale: 1.05, borderColor: '#a855f7' }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Play className="w-5 h-5" />
                                    Watch Reel
                                </motion.button>
                            </motion.div>
                        </div>

                        {/* Hero Image Grid */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <motion.div
                                        className="aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=500&fit=crop" alt="Design" className="w-full h-full object-cover" />
                                    </motion.div>
                                    <motion.div
                                        className="aspect-square rounded-3xl bg-gradient-to-br from-purple-100 to-pink-100 p-6 flex items-end relative overflow-hidden"
                                        whileHover={{ scale: 1.02, y: -4 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 opacity-0"
                                            whileHover={{ opacity: 0.5 }}
                                        />
                                        <span className="text-xl font-semibold text-purple-900 relative z-10">
                                            <AnimatedCounter value={50} suffix="+" /> Awards
                                        </span>
                                    </motion.div>
                                </div>
                                <div className="space-y-4 pt-12">
                                    <motion.div
                                        className="aspect-square rounded-3xl bg-gradient-to-br from-violet-100 to-fuchsia-100 p-6 flex items-end relative overflow-hidden"
                                        whileHover={{ scale: 1.02, y: -4 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-br from-violet-200 to-fuchsia-200 opacity-0"
                                            whileHover={{ opacity: 0.5 }}
                                        />
                                        <span className="text-xl font-semibold text-violet-900 relative z-10">
                                            <AnimatedCounter value={200} suffix="+" /> Projects
                                        </span>
                                    </motion.div>
                                    <motion.div
                                        className="aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-rose-100 to-pink-100"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=500&fit=crop" alt="Design" className="w-full h-full object-cover" />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Clients Marquee */}
            <section className="py-12 border-y border-gray-100 overflow-hidden">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="flex gap-16 whitespace-nowrap"
                >
                    {[...Array(2)].map((_, idx) => (
                        <div key={idx} className="flex gap-16 items-center">
                            {['Google', 'Spotify', 'Airbnb', 'Netflix', 'Stripe', 'Shopify', 'Figma', 'Notion'].map((brand) => (
                                <span key={brand} className="text-2xl font-semibold text-gray-300">{brand}</span>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* Services Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16"
                    >
                        <div>
                            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">What we do</span>
                            <h2 className="text-4xl md:text-5xl font-bold mt-2 tracking-tight">Our Services</h2>
                        </div>
                        <p className="text-gray-500 max-w-md">
                            We offer a comprehensive range of creative services to help brands stand out in today's competitive landscape.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {services.map((service, index) => {
                            const Icon = service.icon
                            return (
                                <motion.div
                                    key={service.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className="group p-8 rounded-3xl bg-white border border-gray-100 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-100/50 transition-all cursor-pointer"
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <motion.div
                                            className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-pink-500 group-hover:text-white transition-all duration-300"
                                            whileHover={{ rotate: [0, -10, 10, 0] }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <Icon className="w-6 h-6" />
                                        </motion.div>
                                        <ArrowRight className="w-6 h-6 text-gray-300 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-700 transition-colors">{service.title}</h3>
                                    <p className="text-gray-500">{service.description}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Work Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Portfolio</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-2 tracking-tight">Selected Work</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {works.map((work, index) => (
                            <motion.div
                                key={work.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group cursor-pointer"
                            >
                                <div className={`aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br ${work.color} mb-6 relative`}>
                                    <img
                                        src={work.image}
                                        alt={work.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6"
                                    >
                                        <motion.span
                                            className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-purple-700"
                                            initial={{ y: 20, opacity: 0 }}
                                            whileHover={{ y: 0, opacity: 1 }}
                                        >
                                            View Project
                                        </motion.span>
                                    </motion.div>
                                </div>
                                <span className="text-sm text-gray-400 group-hover:text-purple-400 transition-colors">{work.category}</span>
                                <h3 className="text-2xl font-semibold mt-1 group-hover:text-purple-700 transition-colors">{work.title}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">How we work</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-2 tracking-tight">Our Process</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {process.map((step, index) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-6xl font-bold text-gray-100 mb-4">{step.step}</div>
                                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                <p className="text-gray-500">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Testimonials</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-2 tracking-tight">What Clients Say</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-3xl bg-white/5 border border-white/10"
                            >
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <p className="text-xl text-white/80 mb-8 leading-relaxed">"{testimonial.content}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center font-semibold">
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

            {/* CTA Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Let's create
                            <br />
                            <span className="text-gray-400">something amazing</span>
                        </h2>
                        <p className="text-xl text-gray-500 max-w-xl mx-auto mb-10">
                            Ready to take your brand to the next level? We'd love to hear from you.
                        </p>
                        <motion.button
                            className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium text-lg relative overflow-hidden"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(168, 85, 247, 0.6)' }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <motion.span
                                className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                            <span className="relative z-10">Start a Project</span>
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold">Lumina</span>
                        </div>
                        <div className="flex gap-6">
                            <motion.a href="#" className="text-gray-400 hover:text-purple-500 transition-colors" whileHover={{ y: -3, scale: 1.2 }}><Instagram className="w-5 h-5" /></motion.a>
                            <motion.a href="#" className="text-gray-400 hover:text-pink-500 transition-colors" whileHover={{ y: -3, scale: 1.2 }}><Dribbble className="w-5 h-5" /></motion.a>
                            <motion.a href="#" className="text-gray-400 hover:text-violet-500 transition-colors" whileHover={{ y: -3, scale: 1.2 }}><Figma className="w-5 h-5" /></motion.a>
                        </div>
                        <div className="text-gray-400 text-sm">
                            © 2025 Lumina Studio. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Lumina
