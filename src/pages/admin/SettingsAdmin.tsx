import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, RefreshCw, AlertTriangle, Wrench } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { adminApi } from '../../lib/api'
import AdminLayout from './AdminLayout'

interface SiteSettings {
    contactEmail: string
    address: string
    socialLinks: {
        github: string
        linkedin: string
        instagram: string
        facebook: string
        youtube: string
    }
    companyName: string
    tagline: string
    footerText: string
    copyrightText: string
    newsletterEnabled: boolean
    ctaTitle: string
    ctaDescription: string
    ctaButtonText: string
    maintenanceMode: boolean
    maintenanceMessage: string
}

const SettingsAdmin = () => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [settings, setSettings] = useState<SiteSettings | null>(null)
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
            setSettings(response.data)
        } catch (err) {
            console.error('Error fetching settings:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        if (!settings) return
        setSaving(true)
        setSuccess('')
        try {
            await adminApi.put('/admin/content/settings', settings)
            setSuccess('Settings saved successfully!')
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            console.error('Error saving settings:', err)
        } finally {
            setSaving(false)
        }
    }

    const handleChange = (field: string, value: string | boolean) => {
        setSettings(prev => prev ? { ...prev, [field]: value } : null)
    }

    const handleSocialChange = (platform: string, value: string) => {
        setSettings(prev => prev ? {
            ...prev,
            socialLinks: { ...prev.socialLinks, [platform]: value }
        } : null)
    }

    const inputClass = `w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${isDark ? 'bg-white/[0.03] border-white/[0.1] text-white placeholder:text-white/30' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'}`
    const labelClass = `block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`
    const sectionClass = `p-6 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-white border border-gray-200'}`

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
                        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Site Settings</h1>
                        <p className={`mt-1 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Manage your website's global settings</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={fetchSettings}
                            className={`p-2.5 rounded-xl transition-all ${isDark ? 'bg-white/5 hover:bg-white/10 text-white/60' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all disabled:opacity-50"
                        >
                            {saving ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Save Settings
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                    >
                        {success}
                    </motion.div>
                )}

                <div className="space-y-6">
                    {/* Contact Information */}
                    <div className={sectionClass}>
                        <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Contact Information</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Contact Email</label>
                                <input
                                    type="email"
                                    value={settings?.contactEmail || ''}
                                    onChange={(e) => handleChange('contactEmail', e.target.value)}
                                    className={inputClass}
                                    placeholder="hello@forbiddendev.com"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className={labelClass}>Address</label>
                                <input
                                    type="text"
                                    value={settings?.address || ''}
                                    onChange={(e) => handleChange('address', e.target.value)}
                                    className={inputClass}
                                    placeholder="San Francisco, CA"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Company Info */}
                    <div className={sectionClass}>
                        <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Company Info</h2>
                        <div className="space-y-4">
                            <div>
                                <label className={labelClass}>Company Name</label>
                                <input
                                    type="text"
                                    value={settings?.companyName || ''}
                                    onChange={(e) => handleChange('companyName', e.target.value)}
                                    className={inputClass}
                                    placeholder="Forbidden Dev"
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Tagline</label>
                                <input
                                    type="text"
                                    value={settings?.tagline || ''}
                                    onChange={(e) => handleChange('tagline', e.target.value)}
                                    className={inputClass}
                                    placeholder="Premium development studio..."
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Footer Text</label>
                                <textarea
                                    value={settings?.footerText || ''}
                                    onChange={(e) => handleChange('footerText', e.target.value)}
                                    className={inputClass}
                                    rows={2}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Copyright Text</label>
                                <input
                                    type="text"
                                    value={settings?.copyrightText || ''}
                                    onChange={(e) => handleChange('copyrightText', e.target.value)}
                                    className={inputClass}
                                    placeholder="© {year} Company. All rights reserved."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className={sectionClass}>
                        <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Social Links</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {['github', 'linkedin', 'instagram', 'facebook', 'youtube'].map((platform) => (
                                <div key={platform}>
                                    <label className={labelClass}>{platform.charAt(0).toUpperCase() + platform.slice(1)}</label>
                                    <input
                                        type="url"
                                        value={settings?.socialLinks?.[platform as keyof typeof settings.socialLinks] || ''}
                                        onChange={(e) => handleSocialChange(platform, e.target.value)}
                                        className={inputClass}
                                        placeholder={`https://${platform}.com/...`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className={sectionClass}>
                        <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Call-to-Action Section</h2>
                        <div className="space-y-4">
                            <div>
                                <label className={labelClass}>CTA Title</label>
                                <input
                                    type="text"
                                    value={settings?.ctaTitle || ''}
                                    onChange={(e) => handleChange('ctaTitle', e.target.value)}
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>CTA Description</label>
                                <textarea
                                    value={settings?.ctaDescription || ''}
                                    onChange={(e) => handleChange('ctaDescription', e.target.value)}
                                    className={inputClass}
                                    rows={2}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>CTA Button Text</label>
                                <input
                                    type="text"
                                    value={settings?.ctaButtonText || ''}
                                    onChange={(e) => handleChange('ctaButtonText', e.target.value)}
                                    className={inputClass}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className={sectionClass}>
                        <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Newsletter</h2>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => handleChange('newsletterEnabled', !settings?.newsletterEnabled)}
                                className={`relative w-14 h-8 rounded-full transition-colors ${settings?.newsletterEnabled ? 'bg-violet-600' : isDark ? 'bg-white/20' : 'bg-gray-300'}`}
                            >
                                <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${settings?.newsletterEnabled ? 'left-7' : 'left-1'}`} />
                            </button>
                            <span className={isDark ? 'text-white/70' : 'text-gray-700'}>
                                Newsletter subscription {settings?.newsletterEnabled ? 'enabled' : 'disabled'}
                            </span>
                        </div>
                    </div>

                    {/* Maintenance Mode */}
                    <div className={`p-6 rounded-2xl ${settings?.maintenanceMode ? (isDark ? 'bg-red-500/10 border-2 border-red-500/30' : 'bg-red-50 border-2 border-red-200') : sectionClass}`}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 rounded-lg ${settings?.maintenanceMode ? 'bg-red-500/20' : isDark ? 'bg-amber-500/20' : 'bg-amber-100'}`}>
                                {settings?.maintenanceMode ? (
                                    <AlertTriangle className={`w-5 h-5 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                                ) : (
                                    <Wrench className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                                )}
                            </div>
                            <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Maintenance Mode</h2>
                            {settings?.maintenanceMode && (
                                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-red-500 text-white animate-pulse">
                                    ACTIVE
                                </span>
                            )}
                        </div>

                        {settings?.maintenanceMode && (
                            <div className={`mb-4 p-3 rounded-lg ${isDark ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-100 border border-red-200'}`}>
                                <p className={`text-sm ${isDark ? 'text-red-300' : 'text-red-700'}`}>
                                    ⚠️ Your website is currently in maintenance mode. All public pages will redirect to the maintenance page. Admin pages remain accessible.
                                </p>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleChange('maintenanceMode', !settings?.maintenanceMode)}
                                    className={`relative w-14 h-8 rounded-full transition-colors ${settings?.maintenanceMode ? 'bg-red-500' : isDark ? 'bg-white/20' : 'bg-gray-300'}`}
                                >
                                    <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${settings?.maintenanceMode ? 'left-7' : 'left-1'}`} />
                                </button>
                                <span className={isDark ? 'text-white/70' : 'text-gray-700'}>
                                    {settings?.maintenanceMode ? 'Site is under maintenance' : 'Site is live'}
                                </span>
                            </div>

                            <div>
                                <label className={labelClass}>Maintenance Message (optional)</label>
                                <textarea
                                    value={settings?.maintenanceMessage || ''}
                                    onChange={(e) => handleChange('maintenanceMessage', e.target.value)}
                                    className={inputClass}
                                    rows={3}
                                    placeholder="Custom message to display on maintenance page..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default SettingsAdmin
