import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, Cookie, Settings, BarChart3, Target, Shield, ToggleLeft, ToggleRight, Check, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const cookieTypes = [
    {
        id: 'essential',
        icon: Shield,
        title: 'Essential Cookies',
        description: 'These cookies are necessary for the website to function properly. They enable basic functions like page navigation, secure area access, and remembering your preferences. The website cannot function properly without these cookies.',
        examples: ['Session management', 'Security tokens', 'Load balancing', 'User preferences'],
        required: true,
        color: 'green',
    },
    {
        id: 'analytics',
        icon: BarChart3,
        title: 'Analytics Cookies',
        description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our services and user experience.',
        examples: ['Page views tracking', 'User journey analysis', 'Performance metrics', 'Error reporting'],
        required: false,
        color: 'blue',
    },
    {
        id: 'functional',
        icon: Settings,
        title: 'Functional Cookies',
        description: 'These cookies enable enhanced functionality and personalization, such as remembering your preferences, language settings, and customized features.',
        examples: ['Language preferences', 'Theme settings', 'Video preferences', 'Chat widget state'],
        required: false,
        color: 'purple',
    },
    {
        id: 'marketing',
        icon: Target,
        title: 'Marketing Cookies',
        description: 'These cookies are used to track visitors across websites to display relevant and engaging advertisements. They also help measure the effectiveness of advertising campaigns.',
        examples: ['Ad personalization', 'Conversion tracking', 'Retargeting', 'Social media pixels'],
        required: false,
        color: 'orange',
    },
]

const faqs = [
    {
        q: 'What are cookies?',
        a: 'Cookies are small text files stored on your device when you visit a website. They help websites remember information about your visit, making your next visit easier and the site more useful.',
    },
    {
        q: 'How long do cookies stay on my device?',
        a: 'Session cookies are deleted when you close your browser. Persistent cookies remain on your device for a set period (ranging from days to years) or until you delete them.',
    },
    {
        q: 'Can I delete cookies?',
        a: 'Yes, you can delete cookies through your browser settings. However, this may affect your experience on our site and require you to re-enter certain information.',
    },
    {
        q: 'Do you use third-party cookies?',
        a: 'Yes, we use cookies from trusted third parties for analytics and marketing purposes. These partners are bound by strict data protection agreements.',
    },
]

const Cookies = () => {
    const heroRef = useRef<HTMLDivElement>(null)
    const isHeroInView = useInView(heroRef, { once: true })
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [preferences, setPreferences] = useState({
        essential: true,
        analytics: true,
        functional: true,
        marketing: false,
    })

    const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
        green: {
            bg: isDark ? 'from-green-500/20 to-emerald-500/20' : 'from-green-100 to-emerald-100',
            text: 'text-green-500',
            border: isDark ? 'border-green-500/20' : 'border-green-200',
        },
        blue: {
            bg: isDark ? 'from-blue-500/20 to-cyan-500/20' : 'from-blue-100 to-cyan-100',
            text: 'text-blue-500',
            border: isDark ? 'border-blue-500/20' : 'border-blue-200',
        },
        purple: {
            bg: isDark ? 'from-violet-500/20 to-purple-500/20' : 'from-violet-100 to-purple-100',
            text: 'text-violet-500',
            border: isDark ? 'border-violet-500/20' : 'border-violet-200',
        },
        orange: {
            bg: isDark ? 'from-orange-500/20 to-amber-500/20' : 'from-orange-100 to-amber-100',
            text: 'text-orange-500',
            border: isDark ? 'border-orange-500/20' : 'border-orange-200',
        },
    }

    const togglePreference = (id: string) => {
        if (id === 'essential') return // Can't toggle essential cookies
        setPreferences(prev => ({ ...prev, [id]: !prev[id as keyof typeof prev] }))
    }

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0">
                    <div className={`absolute inset-0 bg-[linear-gradient(rgba(251,146,60,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,146,60,0.03)_1px,transparent_1px)] bg-[size:60px_60px] ${isDark ? 'opacity-100' : 'opacity-50'}`} />
                    <div className={`absolute top-0 right-1/3 w-[600px] h-[600px] rounded-full blur-[150px] ${isDark ? 'bg-orange-600/15' : 'bg-orange-600/10'}`} />
                    <div className={`absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full blur-[120px] ${isDark ? 'bg-amber-600/10' : 'bg-amber-600/5'}`} />
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

                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="mb-6"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-orange-400 bg-orange-500/10 rounded-full border border-orange-500/20">
                                <Cookie className="w-4 h-4" />
                                Cookie Policy
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                            Cookie{' '}
                            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                                Policy
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`text-lg mb-4 ${isDark ? 'text-white/60' : 'text-gray-600'}`}
                        >
                            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. Learn about the cookies we use and manage your preferences.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}
                        >
                            Last updated: December 23, 2025
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Cookie Preferences */}
            <section className={`py-20 ${isDark ? 'bg-[#020010]' : 'bg-gray-50'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Manage Your Preferences
                        </h2>
                        <p className={`max-w-2xl mx-auto ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                            Choose which cookies you allow us to use. Essential cookies cannot be disabled as they are necessary for the website to function.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {cookieTypes.map((cookie, index) => {
                            const Icon = cookie.icon
                            const colors = colorClasses[cookie.color]
                            const isEnabled = preferences[cookie.id as keyof typeof preferences]

                            return (
                                <motion.div
                                    key={cookie.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`p-6 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-white border border-gray-200 shadow-sm'}`}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                                                <Icon className={`w-6 h-6 ${colors.text}`} />
                                            </div>
                                            <div>
                                                <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                    {cookie.title}
                                                </h3>
                                                {cookie.required && (
                                                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${isDark ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-600'}`}>
                                                        Required
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => togglePreference(cookie.id)}
                                            disabled={cookie.required}
                                            className={`transition-colors ${cookie.required ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                        >
                                            {isEnabled ? (
                                                <ToggleRight className={`w-10 h-10 ${colors.text}`} />
                                            ) : (
                                                <ToggleLeft className={`w-10 h-10 ${isDark ? 'text-white/20' : 'text-gray-300'}`} />
                                            )}
                                        </button>
                                    </div>
                                    <p className={`text-sm mb-4 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                        {cookie.description}
                                    </p>
                                    <div className={`p-3 rounded-xl ${isDark ? 'bg-black/20' : 'bg-gray-50'}`}>
                                        <p className={`text-xs font-medium mb-2 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>Examples:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {cookie.examples.map((example) => (
                                                <span
                                                    key={example}
                                                    className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-white/[0.05] text-white/50' : 'bg-white text-gray-600'}`}
                                                >
                                                    {example}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-center gap-4 mt-10"
                    >
                        <button className={`px-6 py-3 rounded-full font-medium transition-all ${isDark ? 'bg-white/[0.05] text-white hover:bg-white/[0.1]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                            Reject All Optional
                        </button>
                        <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-orange-500/25 transition-all">
                            Save Preferences
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* How We Use Cookies */}
            <section className={`py-20 ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Frequently Asked Questions
                            </h2>
                        </motion.div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={faq.q}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className={`p-6 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-gray-50 border border-gray-200'}`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${isDark ? 'from-orange-500/20 to-amber-500/20' : 'from-orange-100 to-amber-100'} flex items-center justify-center flex-shrink-0`}>
                                            <Info className="w-4 h-4 text-orange-500" />
                                        </div>
                                        <div>
                                            <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{faq.q}</h3>
                                            <p className={`${isDark ? 'text-white/60' : 'text-gray-600'}`}>{faq.a}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Browser Settings */}
            <section className={`py-20 ${isDark ? 'bg-[#020010]' : 'bg-gray-50'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`relative p-12 rounded-3xl overflow-hidden ${isDark ? 'bg-gradient-to-br from-orange-600/20 to-amber-600/20 border border-white/10' : 'bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200'}`}
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-center md:text-left">
                                <div className={`w-14 h-14 mx-auto md:mx-0 rounded-2xl bg-gradient-to-br ${isDark ? 'from-orange-500/20 to-amber-500/20' : 'from-orange-100 to-amber-100'} flex items-center justify-center mb-4`}>
                                    <Settings className="w-7 h-7 text-orange-500" />
                                </div>
                                <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    Manage Cookies in Your Browser
                                </h2>
                                <p className={`max-w-xl ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                    You can also manage cookies through your browser settings. Most browsers allow you to view, delete, and block cookies from websites.
                                </p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-3">
                                {['Chrome', 'Firefox', 'Safari', 'Edge'].map((browser) => (
                                    <a
                                        key={browser}
                                        href="#"
                                        className={`px-5 py-2.5 rounded-full font-medium transition-all ${isDark ? 'bg-white/[0.05] text-white hover:bg-white/[0.1]' : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'}`}
                                    >
                                        {browser}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Cookies
