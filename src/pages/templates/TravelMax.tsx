import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Menu, X, Plane, MapPin, Calendar, Users, ArrowRight, Star, Compass, Hotel, Send, Facebook, Twitter, Instagram, Linkedin, ChevronLeft } from 'lucide-react';

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
    const [count, setCount] = useState(0);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const incrementTime = (duration * 1000) / end;
            const timer = setInterval(() => {
                start += Math.ceil(end / 50);
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(start);
                }
            }, incrementTime);
            return () => clearInterval(timer);
        }
    }, [isInView, value, duration]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

// Floating Particle Component
const FloatingParticle = ({ delay = 0, size = 'sm' }: { delay?: number; size?: 'sm' | 'md' | 'lg' }) => {
    const sizes = { sm: 'w-1 h-1', md: 'w-2 h-2', lg: 'w-3 h-3' };
    return (
        <motion.div
            className={`absolute ${sizes[size]} rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 opacity-60`}
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
            style={{ left: Math.random() * 100 + '%' }}
        />
    );
};

export default function TravelMax() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState(0);

    const destinations = [
        {
            name: 'Bali Paradise',
            country: 'Indonesia',
            price: '$1,299',
            image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=500&fit=crop',
            days: '7 Days',
            rating: 4.9,
            description: 'Experience tropical beauty with pristine beaches and ancient temples.'
        },
        {
            name: 'Paris Dreams',
            country: 'France',
            price: '$1,599',
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=500&fit=crop',
            days: '5 Days',
            rating: 4.8,
            description: 'Romantic getaway featuring iconic landmarks and world-class dining.'
        },
        {
            name: 'Tokyo Adventure',
            country: 'Japan',
            price: '$1,449',
            image: 'https://images.unsplash.com/photo-1540959375944-7049f642e9a0?w=600&h=500&fit=crop',
            days: '6 Days',
            rating: 4.9,
            description: 'Discover modern metropolis blended with ancient traditions.'
        },
        {
            name: 'New York Buzz',
            country: 'USA',
            price: '$999',
            image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=500&fit=crop',
            days: '4 Days',
            rating: 4.7,
            description: 'Experience the city that never sleeps with endless entertainment.'
        }
    ];

    const features = [
        { icon: <Plane className="w-8 h-8" />, title: 'Best Flight Deals', desc: 'Lowest prices guaranteed on flights worldwide' },
        { icon: <Hotel className="w-8 h-8" />, title: 'Hotel Packages', desc: '5-star accommodations with exclusive discounts' },
        { icon: <Compass className="w-8 h-8" />, title: 'Expert Guides', desc: 'Experienced local guides for unforgettable tours' },
        { icon: <Plane className="w-8 h-8" />, title: 'Visa Support', desc: 'Complete visa assistance for hassle-free travel' }
    ];

    const testimonials = [
        {
            name: 'Jessica Williams',
            role: 'Traveler',
            text: 'Best vacation ever! The package was perfect and service was incredible.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
        },
        {
            name: 'David Martinez',
            role: 'Adventure Seeker',
            text: 'Amazing destinations and professional tour guides made my trip unforgettable.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
        },
        {
            name: 'Lisa Chen',
            role: 'Family Traveler',
            text: 'Great deals and family-friendly activities. Highly recommended!',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
        }
    ];

    return (
        <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 text-gray-900 overflow-hidden">
            {/* Floating Particles */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {[...Array(20)].map((_, i) => (
                    <FloatingParticle key={i} delay={i * 0.8} size={i % 3 === 0 ? 'lg' : i % 2 === 0 ? 'md' : 'sm'} />
                ))}
            </div>

            {/* Back Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="fixed top-6 left-6 z-50"
            >
                <motion.div
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        to="/templates"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full transition-all shadow-lg hover:shadow-cyan-500/50"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Back to Gallery
                    </Link>
                </motion.div>
            </motion.div>

            {/* Navigation */}
            <nav className="fixed w-full top-0 bg-white/95 backdrop-blur border-b border-cyan-100 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                        TravelMax
                    </div>
                    <div className="hidden md:flex gap-8">
                        {['Destinations', 'Packages', 'Guides', 'Contact'].map((item) => (
                            <motion.a
                                key={item}
                                href="#"
                                className="text-gray-700 hover:text-cyan-600 transition relative"
                                whileHover={{ y: -2 }}
                            >
                                {item}
                                <motion.div
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </motion.a>
                        ))}
                    </div>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden"
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
                {mobileMenuOpen && (
                    <div className="md:hidden flex flex-col gap-4 px-6 py-4 bg-white/80">
                        {['Destinations', 'Packages', 'Guides', 'Contact'].map((item) => (
                            <a key={item} href="#" className="text-gray-700 hover:text-cyan-600">
                                {item}
                            </a>
                        ))}
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                {/* Animated Gradient Blobs */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute top-20 -left-20 w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl"
                        animate={{
                            x: [0, 50, 0],
                            y: [0, 30, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute top-40 right-0 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl"
                        animate={{
                            x: [0, -30, 0],
                            y: [0, 50, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    />
                    <motion.div
                        className="absolute bottom-0 left-1/3 w-72 h-72 bg-teal-300/30 rounded-full blur-3xl"
                        animate={{
                            x: [0, 40, 0],
                            y: [0, -30, 0],
                            scale: [1, 1.15, 1],
                        }}
                        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-blue-100 to-transparent opacity-50" />
                <div className="relative max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <motion.h1
                            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Explore the World
                        </motion.h1>
                        <motion.p
                            className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Discover breathtaking destinations and create unforgettable memories with our curated travel packages.
                        </motion.p>
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <motion.button
                                className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30 transition-all"
                                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(6, 182, 212, 0.5)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Book Now <Plane className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                className="px-8 py-4 border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 rounded-lg font-semibold transition-all"
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(6, 182, 212, 0.1)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View All Destinations
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Search Section */}
            <section className="py-12 px-6 bg-white -mt-8 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg border-2 border-cyan-200"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                                <MapPin className="w-5 h-5 text-cyan-600" />
                                <input type="text" placeholder="Where to?" className="flex-1 outline-none text-sm" />
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                                <Calendar className="w-5 h-5 text-cyan-600" />
                                <input type="text" placeholder="When?" className="flex-1 outline-none text-sm" />
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                                <Users className="w-5 h-5 text-cyan-600" />
                                <select className="flex-1 outline-none text-sm">
                                    <option>1 Traveler</option>
                                    <option>2+ Travelers</option>
                                </select>
                            </div>
                            <motion.button
                                className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold shadow-lg shadow-cyan-500/30 transition-all"
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Search
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Destinations */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-4xl font-bold mb-12 text-center"
                    >
                        Featured <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Destinations</span>
                    </motion.h2>

                    <div className="flex flex-col lg:flex-row gap-8 items-center">
                        <motion.div
                            key={destinations[selectedDestination].name}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex-1"
                        >
                            <img
                                src={destinations[selectedDestination].image}
                                alt={destinations[selectedDestination].name}
                                className="rounded-lg w-full h-96 object-cover shadow-lg"
                            />
                        </motion.div>

                        <div className="flex-1">
                            <motion.div
                                key={destinations[selectedDestination].name + 'info'}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin className="w-5 h-5 text-cyan-600" />
                                    <span className="text-cyan-600 font-semibold">{destinations[selectedDestination].country}</span>
                                </div>
                                <h3 className="text-4xl font-bold mb-4">{destinations[selectedDestination].name}</h3>
                                <p className="text-gray-700 text-lg mb-6">{destinations[selectedDestination].description}</p>

                                <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-gray-200">
                                    <div>
                                        <div className="text-2xl font-bold text-cyan-600">{destinations[selectedDestination].days}</div>
                                        <div className="text-sm text-gray-600">Duration</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-cyan-600">{destinations[selectedDestination].price}</div>
                                        <div className="text-sm text-gray-600">Per Person</div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                            <span className="text-lg font-bold">{destinations[selectedDestination].rating}</span>
                                        </div>
                                        <div className="text-sm text-gray-600">Rating</div>
                                    </div>
                                </div>

                                <motion.button
                                    className="w-full px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold shadow-lg shadow-cyan-500/30 transition-all flex items-center justify-center gap-2"
                                    whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(6, 182, 212, 0.5)' }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Book This Trip <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </motion.div>
                        </div>
                    </div>

                    {/* Destination Thumbnails */}
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {destinations.map((dest, idx) => (
                            <motion.button
                                key={dest.name}
                                onClick={() => setSelectedDestination(idx)}
                                whileHover={{ scale: 1.05 }}
                                className={`relative h-32 rounded-lg overflow-hidden border-4 transition-all ${selectedDestination === idx
                                    ? 'border-cyan-600 shadow-lg'
                                    : 'border-gray-200 hover:border-cyan-400'
                                    }`}
                            >
                                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/30 flex items-end p-2">
                                    <span className="text-white text-sm font-semibold">{dest.name}</span>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center">Why Choose TravelMax</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 40px rgba(6, 182, 212, 0.15)' }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 hover:border-cyan-400 transition-all cursor-pointer"
                            >
                                <motion.div
                                    className="text-cyan-600 mb-4"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                    {feature.icon}
                                </motion.div>
                                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-600 text-sm">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 px-6 bg-gradient-to-r from-cyan-600 to-blue-600 relative overflow-hidden">
                {/* Background Glow Effects */}
                <motion.div
                    className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 5, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-0 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
                    transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                />
                <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8 relative z-10">
                    {[
                        { value: 50, suffix: 'K+', label: 'Happy Travelers' },
                        { value: 150, suffix: '+', label: 'Destinations' },
                        { value: 98, suffix: '%', label: 'Satisfaction' }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center text-white"
                        >
                            <div className="text-4xl font-bold mb-2">
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="text-white/80">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center">Traveler Reviews</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 40px rgba(6, 182, 212, 0.15)' }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-lg bg-white shadow-md border border-cyan-100 cursor-pointer"
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.1 + idx * 0.05 }}
                                        >
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        </motion.div>
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-6">{testimonial.text}</p>
                                <div className="flex items-center gap-4">
                                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                                    <div>
                                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-gradient-to-r from-cyan-600 to-blue-600">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold mb-6 text-white"
                    >
                        Start Your Adventure Today
                    </motion.h2>
                    <p className="text-lg text-white/90 mb-8">
                        Subscribe to get exclusive travel deals and early access to new destinations.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="flex-1 px-6 py-3 rounded-lg bg-white/20 border border-white/50 text-white placeholder-white/70 focus:outline-none focus:border-white"
                        />
                        <motion.button
                            className="px-8 py-3 bg-white text-cyan-600 rounded-lg font-semibold shadow-lg transition-all flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 255, 255, 0.5)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Subscribe <Send className="w-4 h-4" />
                        </motion.button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="text-xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                TravelMax
                            </div>
                            <p className="text-gray-400 text-sm">Your gateway to the world.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Explore</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-cyan-400">All Destinations</a></li>
                                <li><a href="#" className="hover:text-cyan-400">Packages</a></li>
                                <li><a href="#" className="hover:text-cyan-400">Deals</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-cyan-400">About</a></li>
                                <li><a href="#" className="hover:text-cyan-400">Blog</a></li>
                                <li><a href="#" className="hover:text-cyan-400">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Follow</h4>
                            <div className="flex gap-4">
                                <Facebook className="w-5 h-5 text-gray-400 hover:text-cyan-400 cursor-pointer" />
                                <Twitter className="w-5 h-5 text-gray-400 hover:text-cyan-400 cursor-pointer" />
                                <Instagram className="w-5 h-5 text-gray-400 hover:text-cyan-400 cursor-pointer" />
                                <Linkedin className="w-5 h-5 text-gray-400 hover:text-cyan-400 cursor-pointer" />
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
                        <p>&copy; 2024 TravelMax. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
