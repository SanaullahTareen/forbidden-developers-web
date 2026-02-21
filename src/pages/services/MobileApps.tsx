import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, Smartphone, CheckCircle, Layers, Zap, ArrowRight, Apple, PlayCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const features = [
    'iOS & Android development',
    'Cross-platform with React Native',
    'Native performance optimization',
    'Offline-first architecture',
    'Push notifications',
    'In-app purchases',
    'Biometric authentication',
    'Real-time sync',
]

const technologies = [
    { name: 'React Native', icon: '⚛️' },
    { name: 'Swift', icon: '🍎' },
    { name: 'Kotlin', icon: '🤖' },
    { name: 'Flutter', icon: '🦋' },
    { name: 'Firebase', icon: '🔥' },
    { name: 'Redux', icon: '🔄' },
    { name: 'GraphQL', icon: '◈' },
    { name: 'AWS', icon: '☁️' },
]

const appShowcase = [
    {
        name: 'FinanceTrack',
        category: 'Fintech',
        downloads: '2M+',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=800&fit=crop',
    },
    {
        name: 'HealthHub',
        category: 'Healthcare',
        downloads: '500K+',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=800&fit=crop',
    },
    {
        name: 'ShopEase',
        category: 'E-commerce',
        downloads: '1M+',
        rating: '4.7',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=800&fit=crop',
    },
]

const stats = [
    { value: '50+', label: 'Apps Launched' },
    { value: '10M+', label: 'Total Downloads' },
    { value: '4.8', label: 'Avg App Rating' },
    { value: '99.9%', label: 'Crash-Free Rate' },
]

const MobileApps = () => {
    const heroRef = useRef<HTMLDivElement>(null)
    const isHeroInView = useInView(heroRef, { once: true })
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0">
                    <div className={`absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:60px_60px] ${isDark ? 'opacity-100' : 'opacity-50'}`} />
                    <div className={`absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] ${isDark ? 'bg-purple-600/20' : 'bg-purple-600/10'}`} />
                    <div className={`absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] ${isDark ? 'bg-pink-600/15' : 'bg-pink-600/10'}`} />
                </div>

                <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            to="/"
                            className={`inline-flex items-center gap-2 mb-8 text-sm font-medium transition-colors ${isDark ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Link>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6 }}
                                className="mb-6"
                            >
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/20">
                                    <Smartphone className="w-4 h-4" />
                                    Mobile Development
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                            >
                                Apps that{' '}
                                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    users love
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className={`text-lg mb-8 leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}
                            >
                                Native performance, beautiful design, seamless experience. We build mobile
                                apps that stand out in the App Store and Play Store.
                            </motion.p>

                            {/* Platform badges */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="flex flex-wrap gap-4 mb-8"
                            >
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${isDark ? 'bg-white/[0.05] border border-white/[0.1]' : 'bg-gray-100 border border-gray-200'}`}>
                                    <Apple className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-700'}`} />
                                    <span className={`font-medium ${isDark ? 'text-white/80' : 'text-gray-700'}`}>iOS</span>
                                </div>
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${isDark ? 'bg-white/[0.05] border border-white/[0.1]' : 'bg-gray-100 border border-gray-200'}`}>
                                    <PlayCircle className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-700'}`} />
                                    <span className={`font-medium ${isDark ? 'text-white/80' : 'text-gray-700'}`}>Android</span>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <Link
                                    to="/#contact"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                                >
                                    Build Your App
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        </div>

                        {/* App mockups */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative flex justify-center items-end gap-4"
                        >
                            {appShowcase.map((app, index) => (
                                <motion.div
                                    key={app.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                    className={`relative rounded-3xl overflow-hidden shadow-2xl ${index === 1 ? 'z-10 scale-110' : 'opacity-80'}`}
                                    style={{ width: index === 1 ? '180px' : '140px' }}
                                >
                                    <img
                                        src={app.image}
                                        alt={app.name}
                                        className="w-full h-72 object-cover"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-black/80' : 'from-black/60'} to-transparent`} />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="text-white font-semibold">{app.name}</div>
                                        <div className="text-white/60 text-xs">{app.category}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className={`py-12 ${isDark ? 'bg-[#020010]' : 'bg-gray-50'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    {stat.value}
                                </div>
                                <div className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features & Tech */}
            <section className={`py-20 ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`text-3xl sm:text-4xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}
                            >
                                Full-cycle mobile development
                            </motion.h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={feature}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                        className="flex items-center gap-3"
                                    >
                                        <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                                        <span className={`${isDark ? 'text-white/70' : 'text-gray-600'}`}>{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {technologies.map((tech, index) => (
                                <motion.div
                                    key={tech.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    className={`p-4 rounded-2xl text-center transition-all duration-300 ${isDark ? 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05]' : 'bg-gray-50 border border-gray-200 hover:shadow-lg'}`}
                                >
                                    <span className="text-2xl mb-2 block">{tech.icon}</span>
                                    <span className={`text-sm font-medium ${isDark ? 'text-white/70' : 'text-gray-700'}`}>{tech.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={`py-20 ${isDark ? 'bg-[#020010]' : 'bg-gray-50'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`relative p-12 rounded-3xl overflow-hidden text-center ${isDark ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-white/10' : 'bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200'}`}
                    >
                        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Ready to launch your app?
                        </h2>
                        <p className={`mb-8 max-w-xl mx-auto ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                            Let's turn your app idea into reality. Get a free consultation and project estimate.
                        </p>
                        <Link
                            to="/#contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                        >
                            Get Started
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default MobileApps
