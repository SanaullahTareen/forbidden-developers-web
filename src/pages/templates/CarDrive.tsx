import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Menu, X, ArrowRight, Star, Zap, Shield, TrendingUp, Send, Facebook, Twitter, Instagram, Linkedin, ChevronLeft, Gauge, Car, Fuel, Settings, Award } from 'lucide-react';

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

// Floating Particle
const FloatingParticle = ({ delay = 0 }: { delay?: number }) => (
    <motion.div
        className="absolute w-1 h-1 bg-blue-500/40 rounded-full"
        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
        animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
        }}
        transition={{ duration: 4 + Math.random() * 2, delay, repeat: Infinity }}
    />
);

// Speedometer Component
const Speedometer = ({ speed }: { speed: number }) => {
    const [currentSpeed, setCurrentSpeed] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => setCurrentSpeed(speed), 500);
            return () => clearTimeout(timer);
        }
    }, [isInView, speed]);

    return (
        <div ref={ref} className="relative w-32 h-16 overflow-hidden">
            <div className="absolute inset-0 border-t-4 border-l-4 border-r-4 border-blue-500/30 rounded-t-full" />
            <motion.div
                className="absolute bottom-0 left-1/2 w-1 h-14 bg-gradient-to-t from-blue-500 to-cyan-400 origin-bottom rounded-full"
                animate={{ rotate: -90 + (currentSpeed / 200) * 180 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{ translateX: '-50%' }}
            />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-sm font-bold text-blue-400">
                {currentSpeed} MPH
            </div>
        </div>
    );
};

export default function CarDrive() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(0);

    const cars = [
        {
            name: 'Velocity GT',
            category: 'Sports',
            price: '$89,999',
            image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop',
            specs: '0-60 in 3.2s | 550 HP | AWD',
            speed: 180,
            hp: 550,
            mpg: 22
        },
        {
            name: 'Urban Rover',
            category: 'SUV',
            price: '$45,999',
            image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=600&fit=crop',
            specs: '7 Seater | Hybrid | All-Terrain',
            speed: 130,
            hp: 320,
            mpg: 35
        },
        {
            name: 'Elite Sedan',
            category: 'Luxury',
            price: '$78,999',
            image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
            specs: 'Leather | Tech Suite | Premium Audio',
            speed: 155,
            hp: 450,
            mpg: 28
        },
        {
            name: 'EcoElite',
            category: 'Electric',
            price: '$52,999',
            image: 'https://images.unsplash.com/photo-1560958089-b8a63c51c446?w=800&h=600&fit=crop',
            specs: '500 mi Range | Fast Charging | Autonomous',
            speed: 140,
            hp: 400,
            mpg: 120
        }
    ];

    const features = [
        { icon: <TrendingUp className="w-8 h-8" />, title: 'Competitive Pricing', desc: 'Best prices in the market with flexible financing' },
        { icon: <Shield className="w-8 h-8" />, title: 'Warranty Included', desc: '5-year comprehensive coverage on all vehicles' },
        { icon: <Zap className="w-8 h-8" />, title: 'Fast Delivery', desc: 'Same-day delivery available in select areas' },
        { icon: <TrendingUp className="w-8 h-8" />, title: 'Trade-In Value', desc: 'Get the best value for your old vehicle' }
    ];

    const testimonials = [
        {
            name: 'James Mitchell',
            role: 'Business Owner',
            text: 'Amazing service! Got my dream car with ease.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
        },
        {
            name: 'Sarah Chen',
            role: 'Entrepreneur',
            text: 'The financing options were perfect for my needs.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
        },
        {
            name: 'Marcus Johnson',
            role: 'Professional',
            text: 'Professional team made the process smooth and quick.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
        }
    ];

    return (
        <div className="bg-slate-950 text-white overflow-hidden min-h-screen">
            {/* Floating Particles */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <FloatingParticle key={i} delay={i * 0.2} />
                ))}
            </div>

            {/* Back Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="fixed top-6 left-6 z-50"
            >
                <Link
                    to="/templates"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-lg shadow-blue-500/25"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Back to Gallery
                </Link>
            </motion.div>

            {/* Navigation */}
            <nav className="fixed w-full top-0 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <motion.div
                        className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Car className="w-8 h-8 text-blue-500" />
                        CarDrive
                    </motion.div>
                    <div className="hidden md:flex gap-8">
                        {['Models', 'Deals', 'Service', 'Contact'].map((item) => (
                            <motion.a
                                key={item}
                                href="#"
                                className="text-gray-300 hover:text-blue-400 transition"
                                whileHover={{ y: -2 }}
                            >
                                {item}
                            </motion.a>
                        ))}
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:block px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition-all"
                    >
                        Get Started
                    </motion.button>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden"
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden flex flex-col gap-4 px-6 py-4 bg-slate-900/95 backdrop-blur"
                    >
                        {['Models', 'Deals', 'Service', 'Contact'].map((item) => (
                            <a key={item} href="#" className="text-gray-300 hover:text-blue-400">
                                {item}
                            </a>
                        ))}
                    </motion.div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden min-h-[90vh] flex items-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-slate-950 to-slate-950" />
                <motion.div
                    className="absolute top-20 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 6, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-20 left-10 w-72 h-72 bg-cyan-600/20 rounded-full blur-[80px]"
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />

                <div className="relative max-w-7xl mx-auto w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm mb-6"
                            >
                                <Zap className="w-4 h-4" />
                                2025 Collection Now Available
                            </motion.span>
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                    Drive Your
                                </span>
                                <br />
                                Dreams
                            </h1>
                            <p className="text-xl text-gray-300 mb-8 max-w-lg">
                                Premium vehicles with unbeatable prices, flexible financing, and expert service. Your journey starts here.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                                >
                                    Browse Models <ArrowRight className="w-5 h-5" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 rounded-lg font-semibold transition-all"
                                >
                                    Schedule Test Drive
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Hero Car Image with Effects */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative">
                                <motion.img
                                    src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=500&fit=crop"
                                    alt="Featured Car"
                                    className="rounded-2xl w-full object-cover shadow-2xl shadow-blue-500/20"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                />
                                {/* Floating Stats */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="absolute -bottom-6 -left-6 bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-xl p-4"
                                >
                                    <div className="text-xs text-gray-400 mb-1">Top Speed</div>
                                    <div className="text-2xl font-bold text-blue-400">180 MPH</div>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    className="absolute -top-6 -right-6 bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-xl p-4"
                                >
                                    <div className="text-xs text-gray-400 mb-1">Horsepower</div>
                                    <div className="text-2xl font-bold text-cyan-400">550 HP</div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Cars */}
            <section className="py-20 px-6 bg-slate-900 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 to-slate-900" />
                <div className="max-w-7xl mx-auto relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase">Our Collection</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-2">
                            Featured <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Vehicles</span>
                        </h2>
                    </motion.div>

                    {/* Car Carousel */}
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <motion.div
                            key={cars[selectedCar].name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="flex-1 relative"
                        >
                            <div className="relative group">
                                <motion.img
                                    src={cars[selectedCar].image}
                                    alt={cars[selectedCar].name}
                                    className="rounded-2xl w-full h-96 object-cover shadow-2xl shadow-blue-500/20"
                                    whileHover={{ scale: 1.02 }}
                                />
                                {/* Glow effect */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Car Specs Overlay */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-xl rounded-xl p-4 border border-slate-700"
                                >
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <Gauge className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                                            <div className="text-xs text-gray-400">Top Speed</div>
                                            <div className="text-lg font-bold text-white">{cars[selectedCar].speed}</div>
                                        </div>
                                        <div>
                                            <Settings className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                                            <div className="text-xs text-gray-400">Power</div>
                                            <div className="text-lg font-bold text-white">{cars[selectedCar].hp}</div>
                                        </div>
                                        <div>
                                            <Fuel className="w-5 h-5 text-green-400 mx-auto mb-1" />
                                            <div className="text-xs text-gray-400">Efficiency</div>
                                            <div className="text-lg font-bold text-white">{cars[selectedCar].mpg}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        <div className="flex-1 flex flex-col justify-center">
                            <motion.div
                                key={cars[selectedCar].name + 'info'}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm mb-4">
                                    <Car className="w-4 h-4" />
                                    {cars[selectedCar].category}
                                </span>
                                <h3 className="text-4xl md:text-5xl font-bold mb-4">{cars[selectedCar].name}</h3>
                                <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6">{cars[selectedCar].price}</p>
                                <p className="text-gray-400 mb-8 text-lg">{cars[selectedCar].specs}</p>

                                {/* Speedometer */}
                                <div className="mb-8">
                                    <Speedometer speed={cars[selectedCar].speed} />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold mb-8 flex items-center gap-2 transition-all"
                                >
                                    View Details <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </motion.div>

                            <div className="grid grid-cols-2 gap-4">
                                {cars.map((car, idx) => (
                                    <motion.button
                                        key={car.name}
                                        onClick={() => setSelectedCar(idx)}
                                        whileHover={{ scale: 1.03, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`p-4 rounded-xl border-2 transition-all text-left ${selectedCar === idx
                                            ? 'border-blue-500 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 shadow-lg shadow-blue-500/20'
                                            : 'border-slate-700 hover:border-blue-400/50 bg-slate-800/50'
                                            }`}
                                    >
                                        <div className="font-semibold">{car.name}</div>
                                        <div className="text-xs text-gray-400">{car.category}</div>
                                        <div className="text-sm text-blue-400 mt-1">{car.price}</div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-6 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
                <div className="max-w-7xl mx-auto relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase">Why Us</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-2">Why Choose <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">CarDrive</span></h2>
                    </motion.div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                            >
                                <motion.div
                                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform"
                                    whileHover={{ rotate: 5 }}
                                >
                                    {feature.icon}
                                </motion.div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                                <p className="text-gray-400">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 px-6 bg-slate-900 relative">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px]" />
                </div>
                <div className="max-w-7xl mx-auto relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase">Testimonials</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-2">Customer <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Reviews</span></h2>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15 }}
                                whileHover={{ y: -5 }}
                                className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 hover:border-blue-500/30 transition-all backdrop-blur-sm"
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.1 * i }}
                                        >
                                            <Star className="w-5 h-5 fill-blue-400 text-blue-400" />
                                        </motion.div>
                                    ))}
                                </div>
                                <p className="text-gray-300 mb-6 leading-relaxed">{testimonial.text}</p>
                                <div className="flex items-center gap-4">
                                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full ring-2 ring-blue-500/30" />
                                    <div>
                                        <div className="font-semibold">{testimonial.name}</div>
                                        <div className="text-sm text-blue-400">{testimonial.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-slate-950 to-cyan-900/30" />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-blue-500/10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-cyan-500/10"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <div className="max-w-7xl mx-auto relative">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: 10000, suffix: '+', label: 'Cars Sold', icon: <Car className="w-6 h-6" /> },
                            { number: 4.9, suffix: '★', label: 'Customer Rating', icon: <Star className="w-6 h-6" /> },
                            { number: 50, suffix: '+', label: 'Branches', icon: <Shield className="w-6 h-6" /> },
                            { number: 98, suffix: '%', label: 'Satisfaction', icon: <Award className="w-6 h-6" /> }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="text-center p-6 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-blue-500/30 transition-all"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-blue-400 mx-auto mb-4">
                                    {stat.icon}
                                </div>
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                                    <AnimatedCounter end={stat.number} duration={2} />{stat.suffix}
                                </div>
                                <div className="text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-slate-900 to-cyan-900/30" />
                <motion.div
                    className="absolute top-20 right-20 w-72 h-72 bg-blue-600/20 rounded-full blur-[80px]"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 5, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-20 left-20 w-72 h-72 bg-cyan-600/20 rounded-full blur-[80px]"
                    animate={{ scale: [1.3, 1, 1.3] }}
                    transition={{ duration: 7, repeat: Infinity }}
                />
                <div className="max-w-4xl mx-auto text-center relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm mb-6">
                            <Zap className="w-4 h-4" />
                            Limited Time Offers
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Ready to Drive Home Your <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Dream Car</span>?
                        </h2>
                        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                            Get exclusive deals, personalized recommendations, and financing options tailored to you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-4 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                            >
                                Get Offers <Send className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 border-t border-slate-800 py-16 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <motion.div
                                className="flex items-center gap-2 text-2xl font-bold mb-4"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Car className="w-8 h-8 text-blue-500" />
                                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">CarDrive</span>
                            </motion.div>
                            <p className="text-gray-400">Premium vehicles for everyone. Your trusted partner for finding the perfect car.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-6 text-lg">Browse</h4>
                            <ul className="space-y-3 text-gray-400">
                                {['All Models', 'New Arrivals', 'Deals', 'Financing'].map((item) => (
                                    <li key={item}>
                                        <motion.a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2" whileHover={{ x: 5 }}>
                                            <ChevronLeft className="w-4 h-4 rotate-180" /> {item}
                                        </motion.a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-6 text-lg">Company</h4>
                            <ul className="space-y-3 text-gray-400">
                                {['About Us', 'Contact', 'Careers', 'Press'].map((item) => (
                                    <li key={item}>
                                        <motion.a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2" whileHover={{ x: 5 }}>
                                            <ChevronLeft className="w-4 h-4 rotate-180" /> {item}
                                        </motion.a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-6 text-lg">Follow Us</h4>
                            <div className="flex gap-4">
                                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                    <motion.a
                                        key={i}
                                        href="#"
                                        whileHover={{ y: -3, scale: 1.1 }}
                                        className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-slate-700 transition-all"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">&copy; 2024 CarDrive. All rights reserved.</p>
                        <div className="flex gap-6 text-sm text-gray-400">
                            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-blue-400 transition-colors">Cookies</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
