import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    BarChart3,
    ExternalLink,
    Save,
    RefreshCw,
    CheckCircle,

    AlertCircle,
    TrendingUp,
    Users,
    Eye,
    Clock,
    Globe,
    ArrowRight,
    Info
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { adminApi } from '../../lib/api'
import AdminLayout from './AdminLayout'

const AnalyticsAdmin = () => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [gaId, setGaId] = useState('')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [success, setSuccess] = useState('')

    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        setLoading(true)
        try {
            const response = await adminApi.get('/admin/content/settings')
            setGaId(response.data?.googleAnalyticsId || '')
        } catch (err) {
            console.error('Error fetching settings:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        setSuccess('')
        try {
            await adminApi.put('/admin/content/settings', { googleAnalyticsId: gaId })
            setSuccess('Analytics ID saved! Tracking will start on your next page load.')
            setTimeout(() => setSuccess(''), 5000)
        } catch (err) {
            console.error('Error saving:', err)
        } finally {
            setSaving(false)
        }
    }

    const inputClass = `w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${isDark ? 'bg-white/[0.03] border-white/[0.1] text-white placeholder:text-white/30' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'}`
    const cardClass = `p-6 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-white border border-gray-200'}`

    const steps = [
        {
            title: 'Go to Google Analytics',
            description: 'Visit analytics.google.com and sign in with your Google account',
            link: 'https://analytics.google.com'
        },
        {
            title: 'Create a Property',
            description: 'Click Admin → Create Property → Enter your website name and URL',
            link: null
        },
        {
            title: 'Get Measurement ID',
            description: 'Go to Admin → Data Streams → Select your stream → Copy the Measurement ID (starts with G-)',
            link: null
        },
        {
            title: 'Paste ID Below',
            description: 'Enter your Measurement ID in the field below and save',
            link: null
        }
    ]

    const features = [
        { icon: Users, label: 'Active Users', desc: 'Real-time visitor count' },
        { icon: Eye, label: 'Page Views', desc: 'Track popular pages' },
        { icon: Clock, label: 'Session Duration', desc: 'Time spent on site' },
        { icon: Globe, label: 'Traffic Sources', desc: 'Where visitors come from' },
        { icon: TrendingUp, label: 'Trends', desc: 'Growth over time' },
        { icon: BarChart3, label: 'Reports', desc: 'Detailed analytics' }
    ]

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div className="max-w-4xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Website Analytics
                        </h1>
                        <p className={`mt-1 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                            Track your website visitors with Google Analytics
                        </p>
                    </div>
                    <a
                        href="https://analytics.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                    >
                        <BarChart3 className="w-4 h-4" />
                        Open Google Analytics
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>

                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-2"
                    >
                        <CheckCircle className="w-5 h-5" />
                        {success}
                    </motion.div>
                )}

                <div className="space-y-6">
                    {/* Current Status */}
                    <div className={cardClass}>
                        <div className="flex items-center gap-3 mb-4">
                            {gaId ? (
                                <div className="p-2 rounded-lg bg-emerald-500/20">
                                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                                </div>
                            ) : (
                                <div className={`p-2 rounded-lg ${isDark ? 'bg-amber-500/20' : 'bg-amber-100'}`}>
                                    <AlertCircle className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                                </div>
                            )}
                            <div>
                                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {gaId ? 'Analytics Active' : 'Analytics Not Configured'}
                                </h2>
                                <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                    {gaId ? 'Your website is tracking visitor data' : 'Set up Google Analytics to start tracking'}
                                </p>
                            </div>
                        </div>

                        {/* Tracking ID Input */}
                        <div className="space-y-4">
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                                    Google Analytics Measurement ID
                                </label>
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        value={gaId}
                                        onChange={(e) => setGaId(e.target.value)}
                                        className={inputClass}
                                        placeholder="G-XXXXXXXXXX"
                                    />
                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all disabled:opacity-50 whitespace-nowrap"
                                    >
                                        {saving ? (
                                            <RefreshCw className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Save className="w-4 h-4" />
                                        )}
                                        Save
                                    </button>
                                </div>
                                <p className={`mt-2 text-xs ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                                    Your Measurement ID starts with "G-" (e.g., G-ABC123XYZ)
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Access to Analytics Dashboard */}
                    {gaId && (
                        <div className={`${cardClass} border-2 border-violet-500/30`}>
                            <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                📊 View Your Analytics
                            </h2>
                            <p className={`mb-4 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                Click below to open your Google Analytics dashboard and see detailed reports:
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href="https://analytics.google.com/analytics/web/#/report-home"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium hover:shadow-lg transition-all"
                                >
                                    <BarChart3 className="w-4 h-4" />
                                    Dashboard Home
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                                <a
                                    href="https://analytics.google.com/analytics/web/#/realtime"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                >
                                    <Users className="w-4 h-4" />
                                    Real-time Visitors
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                                <a
                                    href="https://analytics.google.com/analytics/web/#/p/reports/dashboard"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                >
                                    <TrendingUp className="w-4 h-4" />
                                    Traffic Reports
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    )}

                    {/* What You Can Track */}
                    <div className={cardClass}>
                        <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            What You Can Track
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {features.map((feature, index) => {
                                const Icon = feature.icon
                                return (
                                    <div
                                        key={index}
                                        className={`p-4 rounded-xl ${isDark ? 'bg-white/[0.03] border border-white/[0.05]' : 'bg-gray-50 border border-gray-100'}`}
                                    >
                                        <Icon className={`w-6 h-6 mb-2 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
                                        <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            {feature.label}
                                        </h3>
                                        <p className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                                            {feature.desc}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Setup Instructions */}
                    <div className={cardClass}>
                        <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            🚀 How to Get Your Tracking ID
                        </h2>
                        <div className="space-y-4">
                            {steps.map((step, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-violet-500/20 text-violet-400' : 'bg-violet-100 text-violet-600'} font-bold`}>
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            {step.title}
                                        </h3>
                                        <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                            {step.description}
                                        </p>
                                        {step.link && (
                                            <a
                                                href={step.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 mt-2 text-sm text-violet-500 hover:text-violet-400 transition-colors"
                                            >
                                                Open Link
                                                <ArrowRight className="w-3 h-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Video Tutorial Link */}
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
                        <div className="flex items-start gap-3">
                            <Info className={`w-5 h-5 mt-0.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                            <div>
                                <p className={`font-medium ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                                    Need help setting up?
                                </p>
                                <p className={`text-sm ${isDark ? 'text-blue-400/70' : 'text-blue-600'}`}>
                                    Search "How to set up Google Analytics 4" on YouTube for video tutorials.
                                    It takes about 5 minutes to complete setup.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AnalyticsAdmin
