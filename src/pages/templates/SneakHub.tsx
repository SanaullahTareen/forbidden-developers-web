import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Menu, X, ArrowRight, Star, Heart, Zap, TrendingUp, Send, Facebook, Twitter, Instagram, Linkedin, ChevronLeft, ShoppingBag } from 'lucide-react';

// Animated counter component for stats
const AnimatedCounter = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    setCount(target);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);
            return () => clearInterval(timer);
        }
    }, [isInView, target]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

// Floating particle component for ambient effects
const FloatingParticle = ({ delay = 0, duration = 20, size = 4 }: { delay?: number; duration?: number; size?: number }) => (
    <motion.div
        className="absolute rounded-full opacity-30"
        style={{
            width: size,
            height: size,
            background: `linear-gradient(135deg, #ef4444, #f97316)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 10px #ef4444, 0 0 20px #f97316',
        }}
        animate={{
            y: [-20, -100, -20],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
        }}
        transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: 'easeInOut',
        }}
    />
);

export default function SneakHub() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedShoe, setSelectedShoe] = useState(0);
    const [wishlisted, setWishlisted] = useState<Record<number, boolean>>({});

    const shoes = [
        {
            name: 'Thunder Strike',
            category: 'Running',
            price: '$129.99',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=500&fit=crop',
            color: 'Black & Red',
            sizes: ['6', '7', '8', '9', '10', '11', '12']
        },
        {
            name: 'Urban Essence',
            category: 'Lifestyle',
            price: '$99.99',
            image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=500&fit=crop',
            color: 'White & Gray',
            sizes: ['6', '7', '8', '9', '10', '11', '12']
        },
        {
            name: 'Air Velocity',
            category: 'Basketball',
            price: '$159.99',
            image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=600&h=500&fit=crop',
            color: 'Red & White',
            sizes: ['7', '8', '9', '10', '11', '12', '13']
        },
        {
            name: 'Trail Blazer',
            category: 'Outdoor',
            price: '$134.99',
            image: 'https://images.unsplash.com/photo-1517453682296-e95f1c1fc3c9?w=600&h=500&fit=crop',
            color: 'Black & Orange',
            sizes: ['6', '7', '8', '9', '10', '11', '12']
        }
    ];

    const features = [
        { icon: <Zap className="w-8 h-8" />, title: 'Ultra Performance', desc: 'Advanced materials for maximum comfort and speed' },
        { icon: <Heart className="w-8 h-8" />, title: 'Premium Design', desc: 'Cutting-edge aesthetics that turn heads' },
        { icon: <TrendingUp className="w-8 h-8" />, title: 'Lasting Quality', desc: 'Durability tested and athlete-approved' },
        { icon: <Zap className="w-8 h-8" />, title: 'Eco-Friendly', desc: 'Sustainable materials, responsible production' }
    ];

    const testimonials = [
        {
            name: 'Alex Jordan',
            role: 'Professional Runner',
            text: 'Best shoes I\'ve ever worn. Perfect for marathons and daily running.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
        },
        {
            name: 'Lisa Wong',
            role: 'Basketball Player',
            text: 'The support and grip are incredible. Highly recommend SneakHub!',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
        },
        {
            name: 'Marcus Steel',
            role: 'Fitness Enthusiast',
            text: 'Comfortable all day long. Great quality for the price.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
        }
    ];

    return (
        <div className="bg-black text-white overflow-hidden">
            {/* Floating Particles */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {[...Array(15)].map((_, i) => (
                    <FloatingParticle key={i} delay={i * 0.5} duration={15 + Math.random() * 10} size={3 + Math.random() * 4} />
                ))}
            </div>

            {/* Back Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="fixed top-6 left-6 z-50"
            >
                <motion.div
                    whileHover={{ scale: 1.05, x: -3 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        to="/templates"
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full transition-all shadow-lg shadow-red-600/30"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Back to Gallery
                    </Link>
                </motion.div>
            </motion.div>

            {/* Navigation */}
            <nav className="fixed w-full top-0 bg-black/95 backdrop-blur border-b border-red-900/50 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold tracking-widest">
                        <span className="text-red-600">SNEAK</span>HUB
                    </div>
                    <div className="hidden md:flex gap-8">
                        {['Shop', 'Collections', 'Innovation', 'About'].map((item) => (
                            <motion.a
                                key={item}
                                href="#"
                                className="text-gray-300 hover:text-red-500 transition uppercase text-sm tracking-wide relative"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {item}
                                <motion.span
                                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-red-600 to-orange-500"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.a>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-red-600/20 rounded-full transition">
                            <ShoppingBag className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden"
                        >
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
                {mobileMenuOpen && (
                    <div className="md:hidden flex flex-col gap-4 px-6 py-4 bg-black/80">
                        {['Shop', 'Collections', 'Innovation', 'About'].map((item) => (
                            <a key={item} href="#" className="text-gray-300 hover:text-red-500">
                                {item}
                            </a>
                        ))}
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-black to-black" />

                {/* Animated gradient blobs */}
                <motion.div
                    className="absolute top-20 left-10 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.5, 0.3],
                        x: [0, 50, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-80 h-80 bg-orange-600/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.4, 0.2, 0.4],
                        y: [0, -30, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-2xl"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />

                <div className="relative max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <motion.h1
                            className="text-6xl md:text-8xl font-black mb-6 tracking-tighter"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <span className="text-white">STEP INTO</span><br />
                            <motion.span
                                className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600"
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{ duration: 5, repeat: Infinity }}
                                style={{ backgroundSize: '200% 200%' }}
                            >
                                EXCELLENCE
                            </motion.span>
                        </motion.h1>
                        <motion.p
                            className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Performance meets style. Engineered for athletes, designed for everyone.
                        </motion.p>
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <motion.button
                                className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 rounded-lg font-bold flex items-center justify-center gap-2 transition-all uppercase tracking-wide shadow-lg shadow-red-600/40"
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Shop Now <ArrowRight className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                className="px-8 py-4 border-2 border-red-600 text-red-500 hover:bg-red-600/10 rounded-lg font-bold transition-all uppercase tracking-wide"
                                whileHover={{ scale: 1.05, borderColor: '#f97316' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                New Collection
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Shoes */}
            <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-4xl font-black mb-12 text-center tracking-tight"
                    >
                        FEATURED <span className="text-red-600">COLLECTION</span>
                    </motion.h2>

                    <div className="flex flex-col lg:flex-row gap-8 items-center">
                        <motion.div
                            key={shoes[selectedShoe].name}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex-1 relative"
                        >
                            <div className="bg-gradient-to-br from-red-900/20 to-black p-8 rounded-lg">
                                <img
                                    src={shoes[selectedShoe].image}
                                    alt={shoes[selectedShoe].name}
                                    className="rounded-lg w-full h-96 object-cover"
                                />
                            </div>
                        </motion.div>

                        <div className="flex-1">
                            <motion.div
                                key={shoes[selectedShoe].name + 'info'}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <span className="text-red-500 text-sm font-bold uppercase tracking-widest">{shoes[selectedShoe].category}</span>
                                <h3 className="text-4xl font-black mb-4 mt-2">{shoes[selectedShoe].name}</h3>
                                <p className="text-3xl text-red-500 font-bold mb-2">{shoes[selectedShoe].price}</p>
                                <p className="text-gray-400 mb-8">{shoes[selectedShoe].color}</p>

                                <div className="mb-8">
                                    <p className="text-sm font-semibold mb-3">SIZES</p>
                                    <div className="flex gap-2 flex-wrap">
                                        {shoes[selectedShoe].sizes.map((size) => (
                                            <button key={size} className="w-10 h-10 border border-gray-600 hover:border-red-600 rounded-lg transition-all">
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <motion.button
                                        className="flex-1 px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 rounded-lg font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/30"
                                        whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)' }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Add to Cart <ShoppingBag className="w-5 h-5" />
                                    </motion.button>
                                    <motion.button
                                        onClick={() => setWishlisted({ ...wishlisted, [selectedShoe]: !wishlisted[selectedShoe] })}
                                        className={`px-8 py-3 rounded-lg font-bold border-2 transition-all ${wishlisted[selectedShoe]
                                            ? 'bg-red-600 border-red-600 shadow-lg shadow-red-600/30'
                                            : 'border-gray-600 hover:border-red-600'
                                            }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Heart className={wishlisted[selectedShoe] ? 'fill-current' : ''} />
                                    </motion.button>
                                </div>
                            </motion.div>

                            <div className="mt-12 grid grid-cols-2 gap-4">
                                {shoes.map((shoe, idx) => (
                                    <motion.button
                                        key={shoe.name}
                                        onClick={() => setSelectedShoe(idx)}
                                        whileHover={{ scale: 1.02, y: -4, boxShadow: '0 10px 30px rgba(239, 68, 68, 0.2)' }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`p-4 rounded-lg border-2 transition-all ${selectedShoe === idx
                                            ? 'border-red-600 bg-red-600/20 shadow-lg shadow-red-600/20'
                                            : 'border-gray-700 hover:border-red-600'
                                            }`}
                                    >
                                        <div className="text-sm font-bold">{shoe.name}</div>
                                        <div className="text-xs text-gray-400">{shoe.category}</div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-black mb-12 text-center">WHY SNEAKHUB</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 40px rgba(239, 68, 68, 0.15)' }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-lg bg-gradient-to-br from-red-900/20 to-black border border-red-900/50 hover:border-red-500 transition-all cursor-pointer group"
                            >
                                <motion.div
                                    className="text-red-500 mb-4"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                    {feature.icon}
                                </motion.div>
                                <h3 className="text-lg font-bold mb-2 group-hover:text-red-400 transition-colors">{feature.title}</h3>
                                <p className="text-gray-400 text-sm">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 px-6 bg-gradient-to-r from-red-950 to-black relative overflow-hidden">
                {/* Background glow */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-orange-600/10 to-red-600/5"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8 relative">
                    {[
                        { number: 2000000, suffix: '+', label: 'Sneaks Sold' },
                        { number: 500000, suffix: '+', label: 'Happy Athletes' },
                        { number: 150, suffix: '+', label: 'Designs' }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                            className="text-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.div
                                className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-2"
                                style={{ textShadow: '0 0 40px rgba(239, 68, 68, 0.3)' }}
                            >
                                <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                            </motion.div>
                            <div className="text-gray-400 uppercase tracking-wide text-sm">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-black mb-12 text-center">ATHLETE REVIEWS</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 40px rgba(239, 68, 68, 0.1)' }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-lg bg-gradient-to-br from-gray-900 to-black border border-red-900/30 hover:border-red-600/50 transition-all cursor-pointer"
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-red-500 text-red-500" />
                                    ))}
                                </div>
                                <p className="text-gray-300 mb-6 italic">{testimonial.text}</p>
                                <div className="flex items-center gap-4">
                                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                                    <div>
                                        <div className="font-bold">{testimonial.name}</div>
                                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-gradient-to-r from-red-900 to-black">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl font-black mb-6"
                    >
                        DON'T MISS THE DROP
                    </motion.h2>
                    <p className="text-lg text-gray-300 mb-8">
                        Subscribe to get exclusive early access to new releases and limited editions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="flex-1 px-6 py-3 rounded-lg bg-black border border-red-600 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-red-600/30 transition-all"
                        />
                        <motion.button
                            className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 rounded-lg font-bold flex items-center justify-center gap-2 transition-all uppercase tracking-wide shadow-lg shadow-red-600/30"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Notify Me <Send className="w-4 h-4" />
                        </motion.button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black border-t border-red-900/30 py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="text-xl font-black mb-4">
                                <span className="text-red-600">SNEAK</span>HUB
                            </div>
                            <p className="text-gray-500 text-sm">Premium sneakers for champions.</p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 uppercase tracking-wide text-sm">Shop</h4>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li><a href="#" className="hover:text-red-500">All Shoes</a></li>
                                <li><a href="#" className="hover:text-red-500">New Releases</a></li>
                                <li><a href="#" className="hover:text-red-500">Collections</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 uppercase tracking-wide text-sm">Company</h4>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li><a href="#" className="hover:text-red-500">About</a></li>
                                <li><a href="#" className="hover:text-red-500">Blog</a></li>
                                <li><a href="#" className="hover:text-red-500">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 uppercase tracking-wide text-sm">Follow</h4>
                            <div className="flex gap-4">
                                <Facebook className="w-5 h-5 text-gray-500 hover:text-red-500 cursor-pointer" />
                                <Twitter className="w-5 h-5 text-gray-500 hover:text-red-500 cursor-pointer" />
                                <Instagram className="w-5 h-5 text-gray-500 hover:text-red-500 cursor-pointer" />
                                <Linkedin className="w-5 h-5 text-gray-500 hover:text-red-500 cursor-pointer" />
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-600 text-sm">
                        <p>&copy; 2024 SneakHub. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
