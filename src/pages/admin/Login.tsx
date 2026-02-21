import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Lock, User, Eye, EyeOff, ArrowLeft, Shield } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const AdminLogin = () => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const response = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (data.success) {
                // Store token and admin info in localStorage
                localStorage.setItem('adminToken', data.data.token)
                localStorage.setItem('adminUser', JSON.stringify(data.data.admin))

                // Navigate to admin dashboard
                navigate('/admin/dashboard')
            } else {
                setError(data.message || 'Login failed. Please check your credentials.')
            }
        } catch (err) {
            setError('Unable to connect to server. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 ${isDark ? 'bg-[#030014]' : 'bg-gray-50'}`}>
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] ${isDark ? 'bg-violet-600/20' : 'bg-violet-600/10'}`} />
                <div className={`absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] ${isDark ? 'bg-fuchsia-600/15' : 'bg-fuchsia-600/5'}`} />
                <div className={`absolute inset-0 backdrop-blur-[100px] ${isDark ? 'bg-[#030014]/50' : 'bg-white/50'}`} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Back button */}
                <button
                    onClick={() => navigate('/')}
                    className={`mb-6 inline-flex items-center gap-2 text-sm font-medium transition-colors ${isDark ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </button>

                {/* Card */}
                <div className={`relative rounded-3xl overflow-hidden ${isDark ? 'bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl' : 'bg-white/70 border border-gray-200 backdrop-blur-xl shadow-xl'}`}>
                    {/* Header */}
                    <div className={`p-8 pb-6 border-b ${isDark ? 'border-white/[0.05]' : 'border-gray-100'}`}>
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className={`text-2xl font-bold text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Admin Access
                        </h1>
                        <p className={`text-center mt-2 text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                            Restricted area - Authorized personnel only
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-5">
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/20"
                                >
                                    <p className="text-sm text-red-400 text-center">{error}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Email */}
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                                Email
                            </label>
                            <div className="relative">
                                <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/30' : 'text-gray-400'}`} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${isDark ? 'bg-white/[0.03] border-white/[0.1] text-white placeholder:text-white/30' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'}`}
                                    placeholder="admin@forbiddendev.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                                Password
                            </label>
                            <div className="relative">
                                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/30' : 'text-gray-400'}`} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className={`w-full pl-12 pr-12 py-3.5 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${isDark ? 'bg-white/[0.03] border-white/[0.1] text-white placeholder:text-white/30' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'}`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-white/30 hover:text-white/60' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    <Lock className="w-4 h-4" />
                                    Access Admin Center
                                </>
                            )}
                        </motion.button>
                    </form>
                </div>

                {/* Secret hint - only visible if you inspect */}
                <div className="hidden" data-hint="Looking for something? Nice try! 😏" />
            </motion.div>
        </div>
    )
}

export default AdminLogin
