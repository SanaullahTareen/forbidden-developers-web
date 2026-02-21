import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Menu, X, ArrowRight, Zap, Wrench, Home, BarChart3, Send, Facebook, Twitter, Instagram, Linkedin, ChevronLeft, Check } from 'lucide-react';

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let startTime: number;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [isInView, end, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
};

// Floating Particle Component
const FloatingParticle = ({ delay, size, initialX, color }: { delay: number; size: number; initialX: number; color: string }) => (
    <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
            width: size,
            height: size,
            background: color,
            left: `${initialX}%`,
            bottom: '-5%',
        }}
        animate={{
            y: [0, -800],
            x: [0, Math.sin(initialX) * 50],
            opacity: [0, 0.6, 0],
            scale: [1, 1.2, 0.8],
        }}
        transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay,
            ease: 'easeOut',
        }}
    />
);

export default function HomeFlow() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(0);

    const services = [
        {
            icon: <Zap className="w-12 h-12" />,
            title: 'Electrical',
            description: 'Professional electrical installations, repairs, and maintenance for your home.'
        },
        {
            icon: <Wrench className="w-12 h-12" />,
            title: 'Plumbing',
            description: 'Expert plumbing services including repairs, installations, and emergency fixes.'
        },
        {
            icon: <Home className="w-12 h-12" />,
            title: 'HVAC',
            description: 'Heating and cooling system installation, maintenance, and emergency repairs.'
        },
        {
            icon: <Wrench className="w-12 h-12" />,
            title: 'General Repairs',
            description: 'Drywall, painting, carpentry, and other general home maintenance services.'
        }
    ];

    const benefits = ['24/7 Emergency Service', 'Licensed & Insured', 'Upfront Pricing', 'Same-Day Service', 'Satisfaction Guaranteed', 'Expert Technicians'];

    const testimonials = [
        {
            name: 'David Thompson',
            role: 'Homeowner',
            text: 'Fast, reliable, and professional. They fixed my plumbing issue in no time!',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
        },
        {
            name: 'Emily Rodriguez',
            role: 'Property Manager',
            text: 'Great service for multiple properties. Highly recommended for maintenance.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
        },
        {
            name: 'Robert Kim',
            role: 'Business Owner',
            text: 'Professional team handled our office renovation perfectly.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
        }
    ];

    return (
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 text-gray-900 overflow-hidden relative">
            {/* Floating Particles */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {[...Array(12)].map((_, i) => (
                    <FloatingParticle
                        key={i}
                        delay={i * 0.8}
                        size={Math.random() * 6 + 3}
                        initialX={Math.random() * 100}
                        color={i % 2 === 0 ? 'rgba(234, 88, 12, 0.3)' : 'rgba(251, 146, 60, 0.25)'}
                    />
                ))}
            </div>

            {/* Back Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="fixed top-6 left-6 z-50"
            >
                <motion.div whileHover={{ scale: 1.05, x: -3 }} whileTap={{ scale: 0.95 }}>
                    <Link
                        to="/templates"
                        className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-full transition-all shadow-lg shadow-orange-600/30"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Back to Gallery
                    </Link>
                </motion.div>
            </motion.div>

            {/* Navigation */}
            <nav className="fixed w-full top-0 bg-white/95 backdrop-blur border-b border-orange-100 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <motion.div
                        className="text-2xl font-bold text-orange-600"
                        whileHover={{ scale: 1.05 }}
                    >
                        HomeFlow
                    </motion.div>
                    <div className="hidden md:flex gap-8">
                        {['Services', 'About', 'Pricing', 'Contact'].map((item) => (
                            <motion.a
                                key={item}
                                href="#"
                                className="text-gray-700 hover:text-orange-600 transition relative"
                                whileHover={{ y: -2 }}
                            >
                                {item}
                                <motion.div
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-600 origin-left"
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
                        {['Services', 'About', 'Pricing', 'Contact'].map((item) => (
                            <a key={item} href="#" className="text-gray-700 hover:text-orange-600">
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
                        className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-orange-400/30 to-amber-400/20 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            x: [0, 30, 0],
                            y: [0, -20, 0],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-yellow-400/25 to-orange-400/20 rounded-full blur-3xl"
                        animate={{
                            scale: [1.2, 1, 1.2],
                            x: [0, -20, 0],
                            y: [0, 30, 0],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-orange-300/20 to-transparent rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 180, 360],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-yellow-100 opacity-50" />
                <div className="relative max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <motion.h1
                            className="text-5xl md:text-7xl font-bold mb-6 text-gray-900"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Your Home, Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Expertise</span>
                        </motion.h1>
                        <motion.p
                            className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Professional home services for every need. Fast, reliable, and always on time.
                        </motion.p>
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <motion.button
                                className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-600/30"
                                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(234, 88, 12, 0.4)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Book Service <ArrowRight className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                className="px-8 py-4 border-2 border-orange-600 text-orange-600 hover:bg-orange-50 rounded-lg font-semibold transition-all"
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(234, 88, 12, 0.1)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Get Free Quote
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Services Showcase */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-4xl font-bold mb-12 text-center text-gray-900"
                    >
                        Our <span className="text-orange-600">Services</span>
                    </motion.h2>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            key={selectedService}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-gradient-to-br from-orange-50 to-yellow-50 p-12 rounded-2xl border-2 border-orange-200"
                        >
                            <div className="text-orange-600 mb-6">{services[selectedService].icon}</div>
                            <h3 className="text-3xl font-bold mb-4 text-gray-900">{services[selectedService].title}</h3>
                            <p className="text-gray-700 text-lg leading-relaxed">{services[selectedService].description}</p>
                            <ul className="mt-8 space-y-3">
                                {['24/7 Availability', 'Expert Technicians', 'Upfront Pricing'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-700">
                                        <Check className="w-5 h-5 text-orange-600 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-4">
                            {services.map((service, idx) => (
                                <motion.button
                                    key={service.title}
                                    onClick={() => setSelectedService(idx)}
                                    whileHover={{ scale: 1.05 }}
                                    className={`p-6 rounded-xl border-2 transition-all ${selectedService === idx
                                        ? 'border-orange-600 bg-orange-100'
                                        : 'border-orange-200 hover:border-orange-400'
                                        }`}
                                >
                                    <div className="text-orange-600 mb-3">{service.icon}</div>
                                    <div className="text-sm font-semibold text-gray-900">{service.title}</div>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 px-6 bg-gradient-to-br from-orange-500 to-amber-500">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center text-white">Why Choose HomeFlow</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-lg bg-white/20 backdrop-blur border border-white/30 flex items-center gap-4 cursor-pointer"
                            >
                                <div className="p-3 bg-white rounded-full shadow-lg">
                                    <Check className="w-6 h-6 text-orange-600" />
                                </div>
                                <span className="text-white font-semibold">{benefit}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 px-6 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-50/50 via-transparent to-amber-50/50" />
                <div className="max-w-7xl mx-auto relative">
                    <div className="grid grid-cols-3 gap-8">
                        {[
                            { number: 5000, label: 'Happy Customers', suffix: '+' },
                            { number: 15000, label: 'Jobs Completed', suffix: '+' },
                            { number: 24, label: 'Hour Availability', suffix: '/7' }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center p-6 rounded-xl bg-white/80 backdrop-blur border border-orange-100 shadow-lg"
                            >
                                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 mb-2">
                                    <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                                </div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">What Our Customers Say</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-lg bg-white border border-orange-100 shadow-lg hover:shadow-xl hover:border-orange-200 transition-all cursor-pointer"
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i} className="text-orange-600">★</span>
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
            <section className="py-20 px-6 bg-gradient-to-r from-orange-600 to-amber-600">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold mb-6 text-white"
                    >
                        Ready to Fix Your Home Issues?
                    </motion.h2>
                    <p className="text-lg text-white/90 mb-8">
                        Schedule a service today and get 10% off your first appointment.
                    </p>
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-3 rounded-lg bg-white/20 border border-white/50 text-white placeholder-white/70 focus:outline-none focus:border-white transition-all focus:bg-white/30"
                        />
                        <motion.button
                            className="px-8 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-lg"
                            whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(255, 255, 255, 0.3)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get Quote <Send className="w-4 h-4" />
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="text-xl font-bold mb-4 text-orange-400">HomeFlow</div>
                            <p className="text-gray-400 text-sm">Professional home services, 24/7.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Services</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-orange-400">Electrical</a></li>
                                <li><a href="#" className="hover:text-orange-400">Plumbing</a></li>
                                <li><a href="#" className="hover:text-orange-400">HVAC</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-orange-400">About</a></li>
                                <li><a href="#" className="hover:text-orange-400">Blog</a></li>
                                <li><a href="#" className="hover:text-orange-400">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Follow</h4>
                            <div className="flex gap-4">
                                <Facebook className="w-5 h-5 text-gray-400 hover:text-orange-400 cursor-pointer" />
                                <Twitter className="w-5 h-5 text-gray-400 hover:text-orange-400 cursor-pointer" />
                                <Instagram className="w-5 h-5 text-gray-400 hover:text-orange-400 cursor-pointer" />
                                <Linkedin className="w-5 h-5 text-gray-400 hover:text-orange-400 cursor-pointer" />
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
                        <p>&copy; 2024 HomeFlow. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
