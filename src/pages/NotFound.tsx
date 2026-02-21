import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Home, ArrowLeft, Search, AlertTriangle } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const NotFound = () => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const navigate = useNavigate()

    // Floating particles animation
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5
    }))

    return (
        <div className={`min-h-screen relative overflow-hidden flex items-center justify-center py-16 px-6 ${isDark ? 'bg-[#030014]' : 'bg-gray-50'}`}>
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient orbs */}
                <motion.div
                    className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20"
                    style={{
                        background: 'radial-gradient(circle, rgba(139,92,246,0.8) 0%, transparent 70%)'
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, 30, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-20"
                    style={{
                        background: 'radial-gradient(circle, rgba(236,72,153,0.8) 0%, transparent 70%)'
                    }}
                    animate={{
                        scale: [1.2, 1, 1.2],
                        x: [0, -30, 0],
                        y: [0, -50, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Floating particles */}
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className={`absolute rounded-full ${isDark ? 'bg-violet-500/30' : 'bg-violet-400/40'}`}
                        style={{
                            width: particle.size,
                            height: particle.size,
                            left: `${particle.x}%`,
                            top: `${particle.y}%`
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: 'easeInOut'
                        }}
                    />
                ))}

                {/* Grid pattern */}
                <div
                    className={`absolute inset-0 ${isDark ? 'opacity-[0.02]' : 'opacity-[0.03]'}`}
                    style={{
                        backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-xl mx-auto">
                {/* Glitch effect 404 */}
                <motion.div
                    className="relative mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h1
                        className={`text-[8rem] md:text-[12rem] font-black leading-none select-none ${isDark ? 'text-white/5' : 'text-gray-900/5'}`}
                        animate={{
                            textShadow: [
                                '0 0 0px transparent',
                                `${isDark ? '0 0 40px rgba(139,92,246,0.3)' : '0 0 40px rgba(139,92,246,0.2)'}`,
                                '0 0 0px transparent'
                            ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        404
                    </motion.h1>

                    {/* Overlapping glitch text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.span
                            className="text-4xl md:text-6xl font-black bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-transparent bg-clip-text"
                            animate={{
                                x: [-2, 2, -2],
                                opacity: [1, 0.8, 1]
                            }}
                            transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 3 }}
                        >
                            FORBIDDEN
                        </motion.span>
                    </div>
                </motion.div>

                {/* Icon */}
                <motion.div
                    className="flex justify-center mb-5"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className={`p-3 rounded-xl ${isDark ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'}`}>
                        <AlertTriangle className={`w-10 h-10 ${isDark ? 'text-red-400' : 'text-red-500'}`} />
                    </div>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h2 className={`text-xl md:text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Access Denied to This Realm
                    </h2>
                    <p className={`text-base mb-6 max-w-sm mx-auto ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                        The page you're looking for has been moved, deleted, or never existed in our dimension.
                    </p>
                </motion.div>

                {/* Action buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <motion.button
                        onClick={() => navigate('/')}
                        className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Home className="w-5 h-5" />
                        Return Home
                    </motion.button>

                    <motion.button
                        onClick={() => navigate(-1)}
                        className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${isDark ? 'bg-white/5 text-white hover:bg-white/10 border border-white/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Go Back
                    </motion.button>
                </motion.div>

                {/* Search suggestion */}
                <motion.div
                    className={`mt-8 p-5 rounded-xl ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-white border border-gray-200'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <Search className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Popular Pages</span>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {[
                            { label: 'Services', path: '/services/web-development' },
                            { label: 'About Us', path: '/about' },
                            { label: 'Projects', path: '/projects' },
                            { label: 'Careers', path: '/careers' },
                            { label: 'Contact', path: '/#contact' }
                        ].map((link) => (
                            <motion.button
                                key={link.path}
                                onClick={() => navigate(link.path)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isDark ? 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {link.label}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Animated lines */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                    <motion.div
                        className="flex gap-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className={`w-1 rounded-full ${isDark ? 'bg-violet-500' : 'bg-violet-400'}`}
                                animate={{
                                    height: [8, 24, 8],
                                    opacity: [0.3, 1, 0.3]
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.15
                                }}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default NotFound
