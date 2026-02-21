import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowRight, Mail, Calendar, Sparkles, X, Send, Building2, User, MessageSquare, DollarSign } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import ScheduleCallModal from './ScheduleCallModal'

// Contact Form Modal
const ContactFormModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        budget: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
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
                    setFormData({ name: '', email: '', company: '', budget: '', message: '' })
                    onClose()
                }, 2000)
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
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className={`relative w-full max-w-lg rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl ${isDark ? 'bg-[#0a0a1a]' : 'bg-white'}`}
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
                                <Sparkles className="w-3 h-3" />
                                Get in Touch
                            </div>
                            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Let's discuss your project</h3>
                            <p className={`mt-2 text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Fill out the form below and we'll get back to you within 24 hours.</p>
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
                                        <Send className="w-8 h-8 text-emerald-500" />
                                    </div>
                                    <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Message Sent!</h4>
                                    <p className={`mt-2 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>We'll be in touch soon.</p>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {/* Name */}
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                                                <User className="w-4 h-4 inline mr-2" />
                                                Your Name
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
                                                Email
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

                                        {/* Budget */}
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                                                <DollarSign className="w-4 h-4 inline mr-2" />
                                                Budget Range
                                            </label>
                                            <select
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50 appearance-none cursor-pointer ${isDark ? 'bg-[#1a1a2e] border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='${isDark ? '%23ffffff' : '%23374151'}'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1rem' }}
                                            >
                                                <option value="" className={isDark ? 'bg-[#1a1a2e] text-white' : 'bg-white text-gray-900'}>Select budget</option>
                                                <option value="200-400" className={isDark ? 'bg-[#1a1a2e] text-white' : 'bg-white text-gray-900'}>$200 - $400</option>
                                                <option value="400-600" className={isDark ? 'bg-[#1a1a2e] text-white' : 'bg-white text-gray-900'}>$400 - $600</option>
                                                <option value="600-800" className={isDark ? 'bg-[#1a1a2e] text-white' : 'bg-white text-gray-900'}>$600 - $800</option>
                                                <option value="800-1000" className={isDark ? 'bg-[#1a1a2e] text-white' : 'bg-white text-gray-900'}>$800 - $1,000</option>
                                                <option value="1000-1500" className={isDark ? 'bg-[#1a1a2e] text-white' : 'bg-white text-gray-900'}>$1,000 - $1,500</option>
                                                <option value="1500-2000" className={isDark ? 'bg-[#1a1a2e] text-white' : 'bg-white text-gray-900'}>$1,500 - $2,000</option>
                                                <option value="2000+" className={isDark ? 'bg-[#1a1a2e] text-white' : 'bg-white text-gray-900'}>$2,000+</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                                            <MessageSquare className="w-4 h-4 inline mr-2" />
                                            Project Details
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={4}
                                            className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/30' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'}`}
                                            placeholder="Tell us about your project..."
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
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </motion.button>
                                </>
                            )}
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// Magnetic button effect
const MagneticButton = ({ children, className, href, onClick }: { children: React.ReactNode; className?: string; href?: string; onClick?: () => void }) => {
    const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        x.set((e.clientX - centerX) * 0.15)
        y.set((e.clientY - centerY) * 0.15)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    const springConfig = { stiffness: 150, damping: 15 }
    const springX = useSpring(x, springConfig)
    const springY = useSpring(y, springConfig)

    if (onClick) {
        return (
            <motion.button
                ref={ref}
                style={{ x: springX, y: springY }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={onClick}
                className={className}
            >
                {children}
            </motion.button>
        )
    }

    return (
        <motion.a
            ref={ref}
            href={href}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
        >
            {children}
        </motion.a>
    )
}

const CTA = () => {
    const { theme } = useTheme()
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isScheduleOpen, setIsScheduleOpen] = useState(false)
    const isDark = theme === 'dark'

    return (
        <>
            <section id="contact" ref={sectionRef} className={`relative py-20 md:py-32 overflow-hidden ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
                {/* Background */}
                <div className="absolute inset-0">
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] md:w-[1200px] h-[600px] md:h-[800px] rounded-full blur-[150px] ${isDark ? 'bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-cyan-600/20' : 'bg-gradient-to-r from-violet-400/20 via-fuchsia-400/20 to-cyan-400/20'}`} />
                </div>

                <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        {/* Main card */}
                        <div className="relative p-6 sm:p-8 md:p-16 lg:p-20 rounded-2xl md:rounded-[2.5rem] overflow-hidden">
                            {/* Card background with gradient border */}
                            <div className={`absolute inset-0 rounded-2xl md:rounded-[2.5rem] ${isDark ? 'bg-gradient-to-br from-violet-600/20 via-fuchsia-600/10 to-cyan-600/20' : 'bg-gradient-to-br from-violet-400/30 via-fuchsia-400/20 to-cyan-400/30'}`} />
                            <div className={`absolute inset-[1px] backdrop-blur-xl rounded-2xl md:rounded-[2.5rem] ${isDark ? 'bg-[#0a0a1a]/95' : 'bg-white/95'}`} />

                            {/* Content */}
                            <div className="relative z-10 text-center max-w-3xl mx-auto">
                                {/* Badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 md:mb-8 ${isDark ? 'bg-white/[0.05] border-white/[0.08]' : 'bg-gray-50 border-gray-200'}`}
                                >
                                    <Sparkles className={`w-4 h-4 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
                                    <span className={`text-sm font-medium ${isDark ? 'text-white/70' : 'text-gray-600'}`}>Let's build something amazing</span>
                                </motion.div>

                                {/* Heading */}
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                                >
                                    Ready to bring your
                                    <br className="hidden sm:block" />
                                    <span className="sm:hidden"> </span>
                                    <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                                        vision to life?
                                    </span>
                                </motion.h2>

                                {/* Description */}
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className={`text-base md:text-lg mb-8 md:mb-12 max-w-xl mx-auto ${isDark ? 'text-white/40' : 'text-gray-500'}`}
                                >
                                    Let's discuss your project and explore how we can help you achieve your goals.
                                    Our team is ready to transform your ideas into reality.
                                </motion.p>

                                {/* CTA Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-8 md:mb-12"
                                >
                                    <MagneticButton
                                        onClick={() => setIsFormOpen(true)}
                                        className={`group relative inline-flex items-center gap-3 w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 font-semibold rounded-full overflow-hidden transition-all duration-300 justify-center ${isDark ? 'bg-white text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]' : 'bg-gray-900 text-white hover:shadow-[0_0_40px_rgba(0,0,0,0.2)]'}`}
                                    >
                                        <Mail className="w-5 h-5" />
                                        Get in Touch
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </MagneticButton>

                                    <MagneticButton
                                        onClick={() => setIsScheduleOpen(true)}
                                        className={`group inline-flex items-center gap-3 w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 font-semibold rounded-full border transition-all justify-center ${isDark ? 'text-white border-white/20 hover:bg-white/5' : 'text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                                    >
                                        <Calendar className="w-5 h-5" />
                                        Schedule a Call
                                    </MagneticButton>
                                </motion.div>

                                {/* Trust indicators */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : {}}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                    className={`flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm ${isDark ? 'text-white/30' : 'text-gray-400'}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        Free consultation
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        24-48h response
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        NDA available
                                    </div>
                                </motion.div>
                            </div>

                            {/* Decorative elements */}
                            <div className={`absolute top-0 left-1/4 w-1 h-12 md:h-20 ${isDark ? 'bg-gradient-to-b from-violet-500/50 to-transparent' : 'bg-gradient-to-b from-violet-400/40 to-transparent'}`} />
                            <div className={`absolute bottom-0 right-1/4 w-1 h-12 md:h-20 ${isDark ? 'bg-gradient-to-t from-cyan-500/50 to-transparent' : 'bg-gradient-to-t from-cyan-400/40 to-transparent'}`} />
                            <div className={`hidden md:block absolute top-1/2 left-0 w-20 h-1 ${isDark ? 'bg-gradient-to-r from-violet-500/50 to-transparent' : 'bg-gradient-to-r from-violet-400/40 to-transparent'}`} />
                            <div className={`hidden md:block absolute top-1/2 right-0 w-20 h-1 ${isDark ? 'bg-gradient-to-l from-cyan-500/50 to-transparent' : 'bg-gradient-to-l from-cyan-400/40 to-transparent'}`} />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Contact Form Modal */}
            <ContactFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

            {/* Schedule Call Modal */}
            <ScheduleCallModal isOpen={isScheduleOpen} onClose={() => setIsScheduleOpen(false)} />
        </>
    )
}

export default CTA
