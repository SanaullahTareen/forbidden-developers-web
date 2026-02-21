import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, User, Mail, Phone, Clock, Building2, MessageSquare, Send, CheckCircle } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

interface ScheduleCallModalProps {
    isOpen: boolean
    onClose: () => void
}

const ScheduleCallModal = ({ isOpen, onClose }: ScheduleCallModalProps) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        preferredTime: '',
        timezone: '',
        topic: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch('http://localhost:5000/api/schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (data.success) {
                setSubmitted(true)
                // Reset after showing success
                setTimeout(() => {
                    setSubmitted(false)
                    setFormData({ name: '', email: '', phone: '', company: '', preferredTime: '', timezone: '', topic: '' })
                    onClose()
                }, 3000)
            } else {
                console.error('Form submission failed:', data.message, data.errors)
                alert(`Form submission failed: ${data.message || JSON.stringify(data.errors)}`)
            }
        } catch (error) {
            console.error('Form submission error:', error)
            alert(`Network error: ${error}`)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const timeSlots = [
        '9:00 AM - 10:00 AM',
        '10:00 AM - 11:00 AM',
        '11:00 AM - 12:00 PM',
        '2:00 PM - 3:00 PM',
        '3:00 PM - 4:00 PM',
        '4:00 PM - 5:00 PM',
    ]

    const timezones = [
        'UTC-12:00 (Baker Island)',
        'UTC-11:00 (Pago Pago)',
        'UTC-10:00 (Hawaii)',
        'UTC-09:00 (Alaska)',
        'UTC-08:00 (Pacific Time - Los Angeles)',
        'UTC-07:00 (Mountain Time - Denver)',
        'UTC-06:00 (Central Time - Chicago)',
        'UTC-05:00 (Eastern Time - New York)',
        'UTC-04:00 (Atlantic Time)',
        'UTC-03:00 (Buenos Aires)',
        'UTC-02:00 (Mid-Atlantic)',
        'UTC-01:00 (Azores)',
        'UTC+00:00 (London, Dublin)',
        'UTC+01:00 (Paris, Berlin)',
        'UTC+02:00 (Cairo, Johannesburg)',
        'UTC+03:00 (Moscow, Riyadh)',
        'UTC+03:30 (Tehran)',
        'UTC+04:00 (Dubai)',
        'UTC+04:30 (Kabul)',
        'UTC+05:00 (Karachi)',
        'UTC+05:30 (Mumbai, New Delhi)',
        'UTC+05:45 (Kathmandu)',
        'UTC+06:00 (Dhaka)',
        'UTC+06:30 (Yangon)',
        'UTC+07:00 (Bangkok, Jakarta)',
        'UTC+08:00 (Singapore, Hong Kong)',
        'UTC+09:00 (Tokyo, Seoul)',
        'UTC+09:30 (Adelaide)',
        'UTC+10:00 (Sydney)',
        'UTC+11:00 (Solomon Islands)',
        'UTC+12:00 (Auckland)',
        'UTC+13:00 (Samoa)',
    ]

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className={`absolute inset-0 ${isDark ? 'bg-black/80' : 'bg-black/50'} backdrop-blur-xl`}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl md:rounded-3xl shadow-2xl ${isDark ? 'bg-[#0a0a1a]/95 border border-white/[0.08] backdrop-blur-xl' : 'bg-white/95 border border-gray-200 backdrop-blur-xl'}`}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}
                        >
                            <X className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-700'}`} />
                        </button>

                        {/* Header */}
                        <div className={`px-6 md:px-8 pt-8 pb-6 border-b ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 ${isDark ? 'bg-violet-500/10 text-violet-400' : 'bg-violet-100 text-violet-600'}`}>
                                <Calendar className="w-3 h-3" />
                                Schedule a Call
                            </div>
                            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Let's talk about your project
                            </h3>
                            <p className={`mt-2 text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                Fill out the form and we'll call you at your preferred time.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
                            {submitted ? (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="py-12 text-center"
                                >
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                        <CheckCircle className="w-8 h-8 text-emerald-500" />
                                    </div>
                                    <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        Call Scheduled!
                                    </h4>
                                    <p className={`mt-2 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                        We'll call you at your preferred time.
                                    </p>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {/* Name */}
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                                                <User className="w-4 h-4 inline mr-2" />
                                                Your Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/30' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'}`}
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                                                <Mail className="w-4 h-4 inline mr-2" />
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/30' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'}`}
                                                placeholder="john@company.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {/* Phone */}
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                                                <Phone className="w-4 h-4 inline mr-2" />
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/30' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'}`}
                                                placeholder="+1 (555) 123-4567"
                                            />
                                        </div>

                                        {/* Company */}
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                                                <Building2 className="w-4 h-4 inline mr-2" />
                                                Company
                                            </label>
                                            <input
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/30' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'}`}
                                                placeholder="Acme Inc."
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {/* Preferred Time */}
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                                                <Clock className="w-4 h-4 inline mr-2" />
                                                Preferred Time *
                                            </label>
                                            <select
                                                name="preferredTime"
                                                value={formData.preferredTime}
                                                onChange={handleChange}
                                                required
                                                className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50 appearance-none cursor-pointer ${isDark ? 'bg-[#1a1a2e] border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='${isDark ? '%23ffffff' : '%23374151'}'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1rem' }}
                                            >
                                                <option value="" className={isDark ? 'bg-[#1a1a2e] text-white' : 'bg-white text-gray-900'}>Select time</option>
                                                {timeSlots.map(slot => (
                                                    <option key={slot} value={slot} className={isDark ? 'bg-[#1a1a2e] text-white' : 'bg-white text-gray-900'}>{slot}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Timezone */}
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                                                🌍 Timezone *
                                            </label>
                                            <select
                                                name="timezone"
                                                value={formData.timezone}
                                                onChange={handleChange}
                                                required
                                                className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50 appearance-none cursor-pointer ${isDark ? 'bg-[#1a1a2e] border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='${isDark ? '%23ffffff' : '%23374151'}'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1rem' }}
                                            >
                                                <option value="" className={isDark ? 'bg-[#1a1a2e] text-white' : 'bg-white text-gray-900'}>Select timezone</option>
                                                {timezones.map(tz => (
                                                    <option key={tz} value={tz} className={isDark ? 'bg-[#1a1a2e] text-white' : 'bg-white text-gray-900'}>{tz}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Topic */}
                                    <div>
                                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                                            <MessageSquare className="w-4 h-4 inline mr-2" />
                                            What would you like to discuss?
                                        </label>
                                        <textarea
                                            name="topic"
                                            value={formData.topic}
                                            onChange={handleChange}
                                            rows={3}
                                            className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/30' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'}`}
                                            placeholder="Brief description of your project or questions..."
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                Scheduling...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                Schedule My Call
                                            </>
                                        )}
                                    </motion.button>

                                    <p className={`text-xs text-center ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
                                        We respect your privacy. Your information is secure.
                                    </p>
                                </>
                            )}
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ScheduleCallModal
