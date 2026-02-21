import { motion } from 'framer-motion'
import fdLogo from '../assets/FD Logo transparent 2x1.png'

const LoadingScreen = () => {
    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030014] overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Animated background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

            {/* Floating orbs */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/20 blur-[120px]"
                animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-fuchsia-600/20 blur-[100px]"
                animate={{
                    x: [0, -40, 0],
                    y: [0, 40, 0],
                    scale: [1.2, 1, 1.2],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute top-1/2 right-1/3 w-[250px] h-[250px] rounded-full bg-green-600/15 blur-[80px]"
                animate={{
                    x: [0, 30, 0],
                    y: [0, -50, 0],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Logo container with rings */}
                <div className="relative">
                    {/* Outer rotating ring */}
                    <motion.div
                        className="absolute inset-0 w-48 h-48 -m-8 rounded-full border border-violet-500/20"
                        style={{ borderStyle: 'dashed' }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Middle pulsing ring */}
                    <motion.div
                        className="absolute inset-0 w-40 h-40 -m-4 rounded-full border-2 border-violet-500/30"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Inner glowing ring */}
                    <motion.div
                        className="absolute inset-0 w-36 h-36 -m-2 rounded-full"
                        style={{
                            background: 'conic-gradient(from 0deg, transparent, rgba(139, 92, 246, 0.4), transparent)',
                        }}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Logo */}
                    <motion.div
                        className="relative w-32 h-32 flex items-center justify-center"
                        animate={{
                            y: [0, -8, 0],
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <motion.img
                            src={fdLogo}
                            alt="Forbidden Developers"
                            className="h-24 w-auto object-contain drop-shadow-2xl"
                            animate={{
                                filter: [
                                    'drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))',
                                    'drop-shadow(0 0 40px rgba(139, 92, 246, 0.8))',
                                    'drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))',
                                ],
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>
                </div>

                {/* Loading bar */}
                <div className="mt-12 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 rounded-full"
                        style={{ backgroundSize: '200% 100%' }}
                        animate={{
                            x: ['-100%', '100%'],
                            backgroundPosition: ['0% 0%', '100% 0%'],
                        }}
                        transition={{
                            x: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                            backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" },
                        }}
                    />
                </div>

                {/* Loading text with dots animation */}
                <motion.div
                    className="mt-6 flex items-center gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <span className="text-sm text-white/50 font-medium tracking-wider uppercase">Loading</span>
                    <div className="flex gap-0.5">
                        {[0, 1, 2].map((i) => (
                            <motion.span
                                key={i}
                                className="text-sm text-violet-400 font-medium"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                            >
                                .
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* Subtle tagline */}
                <motion.p
                    className="mt-4 text-xs text-white/20 font-light tracking-widest uppercase"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    Crafting Digital Excellence
                </motion.p>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-violet-500/10" />
            <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-violet-500/10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-violet-500/10" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-violet-500/10" />

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-violet-400/60 rounded-full"
                    style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${10 + Math.random() * 80}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </motion.div>
    )
}

export default LoadingScreen
