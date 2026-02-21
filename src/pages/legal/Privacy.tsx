import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, Shield, Eye, Lock, Database, Globe, Bell, UserCheck, FileText, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const sections = [
    {
        icon: Database,
        title: 'Information We Collect',
        content: [
            'Personal information you provide (name, email, phone number)',
            'Account credentials and authentication data',
            'Payment and billing information',
            'Communication preferences and history',
            'Device information and browser type',
            'IP address and location data',
        ],
    },
    {
        icon: Eye,
        title: 'How We Use Your Information',
        content: [
            'To provide and maintain our services',
            'To process transactions and send related information',
            'To send promotional communications (with your consent)',
            'To respond to your comments and questions',
            'To analyze usage patterns and improve our services',
            'To detect, prevent, and address technical issues',
        ],
    },
    {
        icon: Lock,
        title: 'Data Security',
        content: [
            'We implement industry-standard encryption (SSL/TLS)',
            'Regular security audits and penetration testing',
            'Strict access controls and authentication measures',
            'Secure data centers with 24/7 monitoring',
            'Employee training on data protection best practices',
            'Incident response procedures for potential breaches',
        ],
    },
    {
        icon: Globe,
        title: 'Data Sharing & Third Parties',
        content: [
            'We do not sell your personal information',
            'Limited sharing with trusted service providers',
            'Compliance with legal obligations when required',
            'Business transfers during mergers or acquisitions',
            'Aggregated, anonymized data for analytics',
            'Third-party integrations only with your consent',
        ],
    },
    {
        icon: UserCheck,
        title: 'Your Rights & Choices',
        content: [
            'Access and review your personal data',
            'Request correction of inaccurate information',
            'Delete your account and associated data',
            'Opt-out of marketing communications',
            'Export your data in a portable format',
            'Object to certain data processing activities',
        ],
    },
    {
        icon: Bell,
        title: 'Updates to This Policy',
        content: [
            'We may update this policy periodically',
            'Significant changes will be communicated via email',
            'Continued use constitutes acceptance of changes',
            'Previous versions available upon request',
            'Last updated date shown at top of policy',
            'We encourage regular review of this policy',
        ],
    },
]

const Privacy = () => {
    const heroRef = useRef<HTMLDivElement>(null)
    const isHeroInView = useInView(heroRef, { once: true })
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0">
                    <div className={`absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] ${isDark ? 'opacity-100' : 'opacity-50'}`} />
                    <div className={`absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] ${isDark ? 'bg-blue-600/15' : 'bg-blue-600/10'}`} />
                    <div className={`absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] ${isDark ? 'bg-cyan-600/10' : 'bg-cyan-600/5'}`} />
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
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20">
                                <Shield className="w-4 h-4" />
                                Privacy Policy
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                            Your privacy is{' '}
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                our priority
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`text-lg mb-4 ${isDark ? 'text-white/60' : 'text-gray-600'}`}
                        >
                            We are committed to protecting your personal information and being transparent about what data we collect and how we use it.
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

            {/* Quick Navigation */}
            <section className={`py-8 border-y ${isDark ? 'bg-[#020010] border-white/[0.05]' : 'bg-gray-50 border-gray-200'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <div className="flex flex-wrap gap-3">
                        {sections.map((section, index) => (
                            <motion.a
                                key={section.title}
                                href={`#section-${index}`}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isDark ? 'bg-white/[0.03] border border-white/[0.05] text-white/60 hover:text-white hover:bg-white/[0.08]' : 'bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300'}`}
                            >
                                {section.title}
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <section className={`py-20 ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <div className="max-w-4xl mx-auto space-y-16">
                        {sections.map((section, index) => {
                            const Icon = section.icon
                            return (
                                <motion.div
                                    key={section.title}
                                    id={`section-${index}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="scroll-mt-32"
                                >
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${isDark ? 'from-blue-500/20 to-cyan-500/20' : 'from-blue-100 to-cyan-100'} flex items-center justify-center flex-shrink-0`}>
                                            <Icon className="w-6 h-6 text-blue-500" />
                                        </div>
                                        <div>
                                            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {section.title}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className={`ml-16 p-6 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-gray-50 border border-gray-200'}`}>
                                        <ul className="space-y-3">
                                            {section.content.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`} />
                                                    <span className={`${isDark ? 'text-white/70' : 'text-gray-600'}`}>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className={`py-20 ${isDark ? 'bg-[#020010]' : 'bg-gray-50'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`relative p-12 rounded-3xl overflow-hidden ${isDark ? 'bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-white/10' : 'bg-gradient-to-br from-blue-100 to-cyan-100 border border-blue-200'}`}
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-center md:text-left">
                                <div className={`w-14 h-14 mx-auto md:mx-0 rounded-2xl bg-gradient-to-br ${isDark ? 'from-blue-500/20 to-cyan-500/20' : 'from-blue-100 to-cyan-100'} flex items-center justify-center mb-4`}>
                                    <Mail className="w-7 h-7 text-blue-500" />
                                </div>
                                <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    Questions about our privacy practices?
                                </h2>
                                <p className={`${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                    Our privacy team is here to help. Contact us at privacy@forbiddendev.com
                                </p>
                            </div>
                            <a
                                href="mailto:privacy@forbiddendev.com"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all whitespace-nowrap"
                            >
                                <Mail className="w-5 h-5" />
                                Contact Privacy Team
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Privacy
