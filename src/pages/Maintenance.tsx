import { motion } from 'framer-motion'
import { Wrench, Clock, Mail, RefreshCw } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const Maintenance = () => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    // Gear animation particles
    const gears = [
        { size: 80, x: '10%', y: '20%', duration: 8, direction: 1 },
        { size: 60, x: '85%', y: '15%', duration: 6, direction: -1 },
        { size: 100, x: '75%', y: '70%', duration: 10, direction: 1 },
        { size: 50, x: '15%', y: '75%', duration: 5, direction: -1 },
        { size: 40, x: '50%', y: '85%', duration: 7, direction: 1 }
    ]

    // Floating dots
    const dots = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 15 + 10
    }))

    return (
        <div className={`min-h-screen relative overflow-hidden flex items-center justify-center py-16 px-6 ${isDark ? 'bg-[#030014]' : 'bg-gray-50'}`}>
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient orbs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-10"
                    style={{
                        background: 'radial-gradient(circle, rgba(14,165,233,0.8) 0%, transparent 70%)'
                    }}
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-10"
                    style={{
                        background: 'radial-gradient(circle, rgba(168,85,247,0.8) 0%, transparent 70%)'
                    }}
                    animate={{
                        scale: [1.3, 1, 1.3],
                        rotate: [360, 180, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                />

                {/* Animated gears (SVG) */}
                {gears.map((gear, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        style={{ left: gear.x, top: gear.y }}
                        animate={{ rotate: gear.direction * 360 }}
                        transition={{ duration: gear.duration, repeat: Infinity, ease: 'linear' }}
                    >
                        <svg
                            width={gear.size}
                            height={gear.size}
                            viewBox="0 0 24 24"
                            fill="none"
                            className={isDark ? 'text-white/5' : 'text-gray-900/5'}
                        >
                            <path
                                d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            />
                            <path
                                d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            />
                        </svg>
                    </motion.div>
                ))}

                {/* Floating dots */}
                {dots.map((dot) => (
                    <motion.div
                        key={dot.id}
                        className={`absolute rounded-full ${isDark ? 'bg-cyan-500/20' : 'bg-cyan-400/30'}`}
                        style={{
                            width: dot.size,
                            height: dot.size,
                            left: `${dot.x}%`,
                            top: `${dot.y}%`
                        }}
                        animate={{
                            y: [0, -50, 0],
                            x: [0, 20, 0],
                            opacity: [0.2, 0.6, 0.2]
                        }}
                        transition={{
                            duration: dot.duration,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-xl mx-auto">
                {/* Animated wrench icon */}
                <motion.div
                    className="flex justify-center mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className={`relative p-5 rounded-2xl ${isDark ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/20' : 'bg-gradient-to-br from-cyan-50 to-purple-50 border border-cyan-200'}`}
                        animate={{
                            rotate: [0, -10, 10, -10, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    >
                        <Wrench className={`w-12 h-12 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />

                        {/* Pulse ring */}
                        <motion.div
                            className={`absolute inset-0 rounded-3xl ${isDark ? 'border-2 border-cyan-500/50' : 'border-2 border-cyan-400/50'}`}
                            animate={{
                                scale: [1, 1.2],
                                opacity: [0.5, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeOut'
                            }}
                        />
                    </motion.div>
                </motion.div>

                {/* Title with gradient */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h1 className={`text-3xl md:text-5xl font-black mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        We'll Be{' '}
                        <span className="bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 text-transparent bg-clip-text">
                            Right Back
                        </span>
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    className={`text-lg md:text-xl mb-4 ${isDark ? 'text-white/60' : 'text-gray-600'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    Our site is currently undergoing scheduled maintenance
                </motion.p>

                {/* Description */}
                <motion.p
                    className={`text-base mb-8 max-w-md mx-auto ${isDark ? 'text-white/40' : 'text-gray-500'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    We're making some improvements to give you a better experience.
                    This won't take long – check back soon!
                </motion.p>

                {/* Status card */}
                <motion.div
                    className={`p-6 rounded-2xl mb-8 ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-white border border-gray-200 shadow-lg'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <motion.div
                            className="w-3 h-3 rounded-full bg-amber-500"
                            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className={`font-semibold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                            Maintenance in Progress
                        </span>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-sm">
                        <Clock className={`w-4 h-4 ${isDark ? 'text-white/40' : 'text-gray-400'}`} />
                        <span className={isDark ? 'text-white/40' : 'text-gray-500'}>
                            Expected duration: A few hours
                        </span>
                    </div>
                </motion.div>

                {/* Refresh button */}
                <motion.button
                    onClick={() => window.location.reload()}
                    className={`group flex items-center gap-2 mx-auto px-6 py-3 rounded-xl font-medium transition-all ${isDark ? 'bg-white/5 text-white hover:bg-white/10 border border-white/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                    Try Again
                </motion.button>

                {/* Contact info */}
                <motion.div
                    className={`mt-12 pt-8 border-t ${isDark ? 'border-white/5' : 'border-gray-200'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <p className={`text-sm mb-4 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                        Need urgent assistance? Reach out to us:
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <a
                            href="mailto:support@forbiddendev.com"
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isDark ? 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'}`}
                        >
                            <Mail className="w-4 h-4" />
                            Email Us
                        </a>
                    </div>
                </motion.div>

                {/* Brand footer */}
                <motion.div
                    className="mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                >
                    <span className={`text-2xl font-black bg-gradient-to-r from-violet-500 to-fuchsia-500 text-transparent bg-clip-text`}>
                        FORBIDDEN
                    </span>
                    <p className={`text-xs mt-1 ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
                        We'll be back stronger than ever
                    </p>
                </motion.div>

                {/* Animated progress bar */}
                <motion.div
                    className={`mt-8 h-1 rounded-full overflow-hidden mx-auto max-w-xs ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    <motion.div
                        className="h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500"
                        animate={{
                            x: ['-100%', '100%']
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    />
                </motion.div>
            </div>
        </div>
    )
}

export default Maintenance
