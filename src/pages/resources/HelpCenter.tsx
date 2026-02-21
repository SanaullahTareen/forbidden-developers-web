import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowLeft, HelpCircle, Search, MessageCircle, Mail, ChevronDown, CheckCircle2, Send, Loader2, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { contentApi } from '../../lib/api'

interface FAQ {
    _id: string
    question: string
    answer: string
    category: string
    order: number
}

const contactMethods = [
    {
        icon: MessageCircle,
        title: 'Live Chat',
        description: 'Chat with our support team',
        action: 'Start Chat',
        availability: 'Available 24/7',
    },
    {
        icon: Mail,
        title: 'Email Support',
        description: 'support@forbiddendev.com',
        action: 'Send Email',
        availability: 'Response within 24h',
    },
]

const HelpCenter = () => {
    const heroRef = useRef<HTMLDivElement>(null)
    const isHeroInView = useInView(heroRef, { once: true })
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const [faqs, setFaqs] = useState<FAQ[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [openQuestion, setOpenQuestion] = useState<string | null>(null)
    const [activeCategory, setActiveCategory] = useState<string>('')

    // Ticket form state
    const [ticketForm, setTicketForm] = useState({
        name: '',
        contactMethod: 'email',
        contactInfo: '',
        subject: '',
        category: 'general',
        message: '',
    })
    const [honeypot, setHoneypot] = useState('') // Spam protection - hidden field
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')
    const [cooldownRemaining, setCooldownRemaining] = useState(0)

    // Spam protection - check cooldown on mount (1 ticket per day)
    useEffect(() => {
        const lastSubmit = localStorage.getItem('lastTicketSubmit')
        if (lastSubmit) {
            const elapsed = Date.now() - parseInt(lastSubmit)
            const cooldownMs = 24 * 60 * 60 * 1000 // 24 hours
            if (elapsed < cooldownMs) {
                setCooldownRemaining(Math.ceil((cooldownMs - elapsed) / 1000))
            }
        }
    }, [])

    // Cooldown timer
    useEffect(() => {
        if (cooldownRemaining > 0) {
            const timer = setInterval(() => {
                setCooldownRemaining(prev => {
                    if (prev <= 1) {
                        clearInterval(timer)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
            return () => clearInterval(timer)
        }
    }, [cooldownRemaining])

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const response = await contentApi.get('/content/faqs')
                if (response.data) {
                    setFaqs(response.data.data || response.data)

                    // Get unique categories
                    const cats = [...new Set((response.data.data || response.data).map((f: FAQ) => f.category))]
                    setCategories(cats as string[])
                    if (cats.length > 0) {
                        setActiveCategory(cats[0] as string)
                    }
                }
            } catch (error) {
                console.error('Failed to fetch FAQs:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchFAQs()
    }, [])

    const filteredFaqs = searchQuery
        ? faqs.filter(faq =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : faqs.filter(faq => faq.category === activeCategory)

    const handleTicketSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        // Spam protection: honeypot check (bots fill hidden fields)
        if (honeypot) {
            // Silently fail for bots
            setSubmitted(true)
            return
        }

        // Spam protection: cooldown check
        if (cooldownRemaining > 0) {
            setError(`Please wait ${Math.floor(cooldownRemaining / 60)}:${(cooldownRemaining % 60).toString().padStart(2, '0')} before submitting another ticket.`)
            return
        }

        // Spam protection: check if already submitted today
        const lastSubmit = localStorage.getItem('lastTicketSubmit')
        const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000)

        if (lastSubmit && parseInt(lastSubmit) > oneDayAgo) {
            const remaining = Math.ceil((parseInt(lastSubmit) + (24 * 60 * 60 * 1000) - Date.now()) / 1000)
            const hours = Math.floor(remaining / 3600)
            const minutes = Math.floor((remaining % 3600) / 60)
            setError(`You can only submit one ticket per day. Please try again in ${hours}h ${minutes}m.`)
            return
        }

        setSubmitting(true)

        try {
            await contentApi.post('/content/support-tickets', {
                ...ticketForm,
                _timestamp: Date.now() // Server can verify this
            })

            // Update spam protection tracking
            localStorage.setItem('lastTicketSubmit', Date.now().toString())
            setCooldownRemaining(24 * 60 * 60) // 24 hour cooldown

            setSubmitted(true)
            setTicketForm({
                name: '',
                contactMethod: 'email',
                contactInfo: '',
                subject: '',
                category: 'general',
                message: '',
            })
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to submit ticket. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    const getContactPlaceholder = () => {
        switch (ticketForm.contactMethod) {
            case 'email': return 'your@email.com'
            case 'phone': return '+1 (555) 123-4567'
            case 'whatsapp': return '+1 (555) 123-4567'
            default: return 'your@email.com'
        }
    }

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0">
                    <div className={`absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:60px_60px] ${isDark ? 'opacity-100' : 'opacity-50'}`} />
                    <div className={`absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] ${isDark ? 'bg-green-600/15' : 'bg-green-600/10'}`} />
                    <div className={`absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] ${isDark ? 'bg-emerald-600/15' : 'bg-emerald-600/10'}`} />
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
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-green-400 bg-green-500/10 rounded-full border border-green-500/20">
                                <HelpCircle className="w-4 h-4" />
                                Help Center
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                            How can we{' '}
                            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                help you?
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`text-lg mb-8 leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}
                        >
                            Find answers to common questions or submit a support ticket.
                        </motion.p>

                        {/* Search */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="relative max-w-xl"
                        >
                            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/30' : 'text-gray-400'}`} />
                            <input
                                type="text"
                                placeholder="Search FAQs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all ${isDark ? 'bg-white/[0.03] border-white/[0.1] focus:border-green-500/50 text-white placeholder:text-white/30' : 'bg-white border-gray-200 focus:border-green-500 text-gray-900 placeholder:text-gray-400'} outline-none text-lg`}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact Methods */}
            <section className={`py-12 ${isDark ? 'bg-[#020010]' : 'bg-gray-50'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {contactMethods.map((method, index) => {
                            const Icon = method.icon
                            return (
                                <motion.div
                                    key={method.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`group p-6 rounded-2xl transition-all ${isDark ? 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05]' : 'bg-white border border-gray-200 hover:shadow-lg'}`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Icon className="w-6 h-6 text-green-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{method.title}</h3>
                                            <p className={`text-sm mb-2 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{method.description}</p>
                                            <p className={`text-xs ${isDark ? 'text-green-400/60' : 'text-green-600'}`}>{method.availability}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className={`py-20 ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Frequently Asked Questions
                        </h2>
                        <p className={`${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                            Quick answers to questions you might have
                        </p>
                    </motion.div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : faqs.length === 0 ? (
                        <div className="text-center py-16">
                            <HelpCircle className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-white/20' : 'text-gray-300'}`} />
                            <p className={`text-lg ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                No FAQs available yet. Submit a ticket below!
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Category Tabs */}
                            {!searchQuery && categories.length > 0 && (
                                <div className="flex flex-wrap justify-center gap-3 mb-10">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' : isDark ? 'bg-white/[0.05] text-white/60 hover:bg-white/[0.1]' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Questions */}
                            <div className="max-w-3xl mx-auto space-y-4">
                                {filteredFaqs.length === 0 ? (
                                    <p className={`text-center py-8 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                        No FAQs found matching your search.
                                    </p>
                                ) : (
                                    filteredFaqs.map((faq, index) => {
                                        const isOpen = openQuestion === faq._id
                                        return (
                                            <motion.div
                                                key={faq._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                                className={`rounded-2xl overflow-hidden ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-white border border-gray-200 shadow-sm'}`}
                                            >
                                                <button
                                                    onClick={() => setOpenQuestion(isOpen ? null : faq._id)}
                                                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                                                >
                                                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{faq.question}</span>
                                                    <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${isDark ? 'text-white/30' : 'text-gray-400'} ${isOpen ? 'rotate-180' : ''}`} />
                                                </button>
                                                <AnimatePresence>
                                                    {isOpen && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                            className={`border-t ${isDark ? 'border-white/[0.05]' : 'border-gray-100'}`}
                                                        >
                                                            <p className={`px-6 py-5 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                                                {faq.answer}
                                                            </p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        )
                                    })
                                )}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Submit Ticket */}
            <section className={`py-20 ${isDark ? 'bg-[#020010]' : 'bg-gray-50'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <div className="max-w-2xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-10"
                        >
                            <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Still need help?
                            </h2>
                            <p className={`${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                Submit a support ticket and we'll get back to you as soon as possible.
                            </p>
                        </motion.div>

                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className={`p-12 rounded-3xl text-center ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-white border border-gray-200 shadow-lg'}`}
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', delay: 0.2 }}
                                    >
                                        <CheckCircle2 className="w-16 h-16 mx-auto text-green-500 mb-4" />
                                    </motion.div>
                                    <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        Ticket Submitted!
                                    </h3>
                                    <p className={`mb-6 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                        We've received your request and will get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all"
                                    >
                                        Submit Another Ticket
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    onSubmit={handleTicketSubmit}
                                    className={`p-8 rounded-3xl ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-white border border-gray-200 shadow-lg'}`}
                                >
                                    {/* Honeypot field - hidden from users, bots will fill it */}
                                    <input
                                        type="text"
                                        name="website"
                                        value={honeypot}
                                        onChange={(e) => setHoneypot(e.target.value)}
                                        style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
                                        tabIndex={-1}
                                        autoComplete="off"
                                        aria-hidden="true"
                                    />

                                    {/* Cooldown warning */}
                                    {cooldownRemaining > 0 && (
                                        <div className="mb-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 flex items-center gap-3">
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>You can only submit one ticket per day. Please wait {Math.floor(cooldownRemaining / 3600)}h {Math.floor((cooldownRemaining % 3600) / 60)}m before submitting another ticket.</span>
                                        </div>
                                    )}

                                    <div className="grid sm:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>Name *</label>
                                            <input
                                                type="text"
                                                required
                                                value={ticketForm.name}
                                                onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                                                className={`w-full px-4 py-3 rounded-xl border transition-all ${isDark ? 'bg-white/[0.03] border-white/[0.1] focus:border-green-500/50 text-white placeholder:text-white/30' : 'bg-gray-50 border-gray-200 focus:border-green-500 text-gray-900'} outline-none`}
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>Preferred Contact Method *</label>
                                            <select
                                                value={ticketForm.contactMethod}
                                                onChange={(e) => setTicketForm({ ...ticketForm, contactMethod: e.target.value, contactInfo: '' })}
                                                className={`w-full px-4 py-3 rounded-xl border transition-all ${isDark ? 'bg-[#0a0a1a] border-white/[0.1] focus:border-green-500/50 text-white' : 'bg-gray-50 border-gray-200 focus:border-green-500 text-gray-900'} outline-none`}
                                            >
                                                <option value="email">Email</option>
                                                <option value="phone">Phone</option>
                                                <option value="whatsapp">WhatsApp</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                                                {ticketForm.contactMethod === 'email' ? 'Email Address' : ticketForm.contactMethod === 'phone' ? 'Phone Number' : 'WhatsApp Number'} *
                                            </label>
                                            <input
                                                type={ticketForm.contactMethod === 'email' ? 'email' : 'tel'}
                                                required
                                                value={ticketForm.contactInfo}
                                                onChange={(e) => setTicketForm({ ...ticketForm, contactInfo: e.target.value })}
                                                className={`w-full px-4 py-3 rounded-xl border transition-all ${isDark ? 'bg-white/[0.03] border-white/[0.1] focus:border-green-500/50 text-white placeholder:text-white/30' : 'bg-gray-50 border-gray-200 focus:border-green-500 text-gray-900'} outline-none`}
                                                placeholder={getContactPlaceholder()}
                                            />
                                        </div>
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>Category</label>
                                            <select
                                                value={ticketForm.category}
                                                onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                                                className={`w-full px-4 py-3 rounded-xl border transition-all ${isDark ? 'bg-[#0a0a1a] border-white/[0.1] focus:border-green-500/50 text-white' : 'bg-gray-50 border-gray-200 focus:border-green-500 text-gray-900'} outline-none`}
                                            >
                                                <option value="general">General</option>
                                                <option value="technical">Technical Support</option>
                                                <option value="billing">Billing</option>
                                                <option value="feature">Feature Request</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>Subject *</label>
                                        <input
                                            type="text"
                                            required
                                            value={ticketForm.subject}
                                            onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                                            className={`w-full px-4 py-3 rounded-xl border transition-all ${isDark ? 'bg-white/[0.03] border-white/[0.1] focus:border-green-500/50 text-white placeholder:text-white/30' : 'bg-gray-50 border-gray-200 focus:border-green-500 text-gray-900'} outline-none`}
                                            placeholder="How can we help?"
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>Message *</label>
                                        <textarea
                                            rows={5}
                                            required
                                            value={ticketForm.message}
                                            onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                                            className={`w-full px-4 py-3 rounded-xl border transition-all resize-none ${isDark ? 'bg-white/[0.03] border-white/[0.1] focus:border-green-500/50 text-white placeholder:text-white/30' : 'bg-gray-50 border-gray-200 focus:border-green-500 text-gray-900'} outline-none`}
                                            placeholder="Describe your issue in detail..."
                                        />
                                    </div>

                                    {error && (
                                        <div className="flex items-center gap-2 p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                            <span>{error}</span>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={submitting || cooldownRemaining > 0}
                                        className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {submitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : cooldownRemaining > 0 ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Wait {Math.floor(cooldownRemaining / 3600)}h {Math.floor((cooldownRemaining % 3600) / 60)}m
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Submit Ticket
                                            </>
                                        )}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center justify-center gap-6 mt-8"
                        >
                            <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                Usually responds within 24h
                            </div>
                            <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                Expert support team
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HelpCenter
