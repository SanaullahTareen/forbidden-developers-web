import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Menu, X, ShoppingBag, Heart, Star, Truck, RotateCcw, Shield, Send, Facebook, Twitter, Instagram, Linkedin, ChevronLeft, Search } from 'lucide-react';

// Animated counter component for stats
const AnimatedCounter = ({ target, suffix = '', duration = 2 }: { target: number; suffix?: string; duration?: number }) => {
    const [count, setCount] = useState(0);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const end = target;
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
    }, [target, duration, isInView]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

// Floating particle component for ambient effects
const FloatingParticle = ({ delay = 0, size = 'sm' }: { delay?: number; size?: 'sm' | 'md' | 'lg' }) => {
    const sizeClasses = {
        sm: 'w-1 h-1',
        md: 'w-2 h-2',
        lg: 'w-3 h-3'
    };

    return (
        <motion.div
            className={`absolute ${sizeClasses[size]} rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 opacity-40`}
            initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                scale: 0
            }}
            animate={{
                x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
                y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)],
                scale: [0, 1, 0.5, 1, 0],
                opacity: [0, 0.6, 0.3, 0.6, 0]
            }}
            transition={{
                duration: 15 + Math.random() * 10,
                delay,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    );
};

export default function ShopHub() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [cart, setCart] = useState(0);

    const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Sports'];

    const products = [
        { id: 1, name: 'Wireless Headphones', price: '$129.99', category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', rating: 4.8 },
        { id: 2, name: 'Premium Watch', price: '$249.99', category: 'Electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', rating: 4.9 },
        { id: 3, name: 'Leather Jacket', price: '$189.99', category: 'Fashion', image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=400&fit=crop', rating: 4.7 },
        { id: 4, name: 'Designer Sunglasses', price: '$159.99', category: 'Fashion', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', rating: 4.6 },
        { id: 5, name: 'Smart Lamp', price: '$79.99', category: 'Home', image: 'https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=400&h=400&fit=crop', rating: 4.5 },
        { id: 6, name: 'Coffee Maker', price: '$199.99', category: 'Home', image: 'https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=400&h=400&fit=crop', rating: 4.8 },
        { id: 7, name: 'Yoga Mat', price: '$49.99', category: 'Sports', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop', rating: 4.4 },
        { id: 8, name: 'Fitness Tracker', price: '$149.99', category: 'Sports', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop', rating: 4.7 },
    ];

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    const features = [
        { icon: <Truck className="w-8 h-8" />, title: 'Free Shipping', desc: 'On orders over $50' },
        { icon: <RotateCcw className="w-8 h-8" />, title: '30 Day Returns', desc: 'Easy returns & exchanges' },
        { icon: <Shield className="w-8 h-8" />, title: 'Secure Payment', desc: '100% safe transactions' },
    ];

    return (
        <div className="bg-white text-gray-900 overflow-hidden relative">
            {/* Floating Particles */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {[...Array(20)].map((_, i) => (
                    <FloatingParticle key={i} delay={i * 0.5} size={i % 3 === 0 ? 'lg' : i % 2 === 0 ? 'md' : 'sm'} />
                ))}
            </div>

            {/* Back Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="fixed top-6 left-6 z-50"
            >
                <motion.div
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        to="/templates"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-full transition-all shadow-lg hover:shadow-indigo-500/50"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Back to Gallery
                    </Link>
                </motion.div>
            </motion.div>

            {/* Navigation */}
            <nav className="fixed w-full top-0 bg-white/95 backdrop-blur border-b border-gray-200 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <motion.div
                        className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"
                        whileHover={{ scale: 1.05 }}
                    >
                        ShopHub
                    </motion.div>
                    <div className="hidden md:flex gap-8">
                        {['Shop', 'Categories', 'Deals', 'Contact'].map((item) => (
                            <motion.a
                                key={item}
                                href="#"
                                className="text-gray-700 hover:text-indigo-600 transition relative"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {item}
                                <motion.span
                                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500"
                                    whileHover={{ width: '100%' }}
                                    transition={{ duration: 0.2 }}
                                />
                            </motion.a>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                            <Search className="w-5 h-5 text-gray-400" />
                            <input type="text" placeholder="Search..." className="bg-transparent outline-none w-32 text-sm" />
                        </div>
                        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
                            <ShoppingBag className="w-6 h-6" />
                            {cart > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-pink-600 text-white text-xs rounded-full flex items-center justify-center">{cart}</span>}
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
                    <div className="md:hidden flex flex-col gap-4 px-6 py-4 bg-white">
                        {['Shop', 'Categories', 'Deals', 'Contact'].map((item) => (
                            <a key={item} href="#" className="text-gray-700 hover:text-pink-600">
                                {item}
                            </a>
                        ))}
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50 relative overflow-hidden">
                {/* Animated gradient blobs */}
                <motion.div
                    className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-indigo-300/30 to-violet-300/30 rounded-full blur-3xl"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-violet-300/30 to-purple-300/30 rounded-full blur-3xl"
                    animate={{
                        x: [0, -40, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-300/20 to-indigo-300/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <motion.h1
                            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Shop Your Style
                        </motion.h1>
                        <motion.p
                            className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Discover thousands of products across all categories. Premium quality, unbeatable prices.
                        </motion.p>
                        <motion.button
                            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/50 transition-all inline-flex items-center gap-2 relative overflow-hidden group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="relative z-10 flex items-center gap-2">
                                Explore Now <ShoppingBag className="w-5 h-5" />
                            </span>
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section className="py-12 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="text-center cursor-pointer"
                            >
                                <motion.div
                                    className="inline-flex p-4 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-full mb-4"
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="text-indigo-600">{feature.icon}</div>
                                </motion.div>
                                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold mb-12 text-center"
                    >
                        Featured <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Products</span>
                    </motion.h2>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-3 mb-12 justify-center">
                        {categories.map((cat) => (
                            <motion.button
                                key={cat}
                                onClick={() => setSelectedCategory(cat.toLowerCase())}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-2 rounded-full font-semibold transition-all ${selectedCategory === cat.toLowerCase()
                                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30'
                                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-indigo-600'
                                    }`}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>

                    {/* Products Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-indigo-500/20 transition-all group cursor-pointer"
                            >
                                <div className="relative overflow-hidden bg-gray-100 h-64">
                                    <motion.img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <motion.button
                                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-indigo-50 transition-all"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Heart className="w-5 h-5 text-indigo-600" />
                                    </motion.button>
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileHover={{ opacity: 1, y: 0 }}
                                    >
                                        <motion.button
                                            onClick={() => setCart(cart + 1)}
                                            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-2 rounded-lg font-semibold hover:from-indigo-700 hover:to-violet-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <ShoppingBag className="w-4 h-4" /> Add to Cart
                                        </motion.button>
                                    </motion.div>
                                </div>
                                <div className="p-4">
                                    <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                                    <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                            {product.price}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm text-gray-600">{product.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-20 px-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 relative overflow-hidden">
                {/* Background animated shapes */}
                <motion.div
                    className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                    animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"
                    animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold mb-6 text-white"
                    >
                        Subscribe for Exclusive Deals
                    </motion.h2>
                    <motion.p
                        className="text-lg text-white/90 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Get 15% off your first purchase and stay updated on new arrivals.
                    </motion.p>
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="flex-1 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-900"
                        />
                        <motion.button
                            className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-lg"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Subscribe <Send className="w-4 h-4" />
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <motion.div
                                className="text-xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent"
                                whileHover={{ scale: 1.05 }}
                            >
                                ShopHub
                            </motion.div>
                            <p className="text-gray-400 text-sm">Your one-stop shop for everything.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Shop</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">All Products</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">New Arrivals</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Sale</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Follow</h4>
                            <div className="flex gap-4">
                                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.2, y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Icon className="w-5 h-5 text-gray-400 hover:text-indigo-400 cursor-pointer transition-colors" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
                        <p>&copy; 2024 ShopHub. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
