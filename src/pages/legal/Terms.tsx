import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, FileText, Scale, AlertTriangle, CreditCard, Ban, RefreshCw, Gavel, Globe, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const sections = [
    {
        icon: FileText,
        title: 'Acceptance of Terms',
        content: `By accessing and using Forbidden Dev's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.

These terms apply to all visitors, users, and others who access or use our services. We reserve the right to update these terms at any time, and your continued use of our services following any changes constitutes acceptance of those changes.`,
    },
    {
        icon: ShieldCheck,
        title: 'Use of Services',
        content: `Our services are intended for lawful purposes only. You agree not to use our services:

• To violate any applicable laws or regulations
• To infringe upon the rights of others
• To transmit harmful code, malware, or viruses
• To attempt unauthorized access to our systems
• To interfere with or disrupt our services
• To collect user data without proper consent
• For any fraudulent or deceptive activities`,
    },
    {
        icon: Scale,
        title: 'Intellectual Property',
        content: `All content, features, and functionality of our services, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software, are the exclusive property of Forbidden Dev or its licensors and are protected by international copyright, trademark, and other intellectual property laws.

You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our services without prior written consent.`,
    },
    {
        icon: CreditCard,
        title: 'Payment Terms',
        content: `For paid services, you agree to provide accurate billing information and authorize us to charge your payment method for all fees incurred.

• All fees are quoted in USD unless otherwise specified
• Payments are due according to your service agreement
• Late payments may incur additional fees
• Disputed charges must be reported within 30 days
• Refunds are subject to our refund policy
• Prices may change with 30 days' notice`,
    },
    {
        icon: AlertTriangle,
        title: 'Limitation of Liability',
        content: `To the fullest extent permitted by law, Forbidden Dev shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses.

Our total liability shall not exceed the amount you paid us in the twelve (12) months preceding the event giving rise to the liability. Some jurisdictions do not allow these limitations, so they may not apply to you.`,
    },
    {
        icon: Ban,
        title: 'Termination',
        content: `We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.

Upon termination:
• Your right to use our services will immediately cease
• We may delete your account and associated data
• Outstanding payment obligations remain in effect
• Provisions that should survive termination will remain in effect`,
    },
    {
        icon: RefreshCw,
        title: 'Modifications to Services',
        content: `We reserve the right to modify, suspend, or discontinue any part of our services at any time without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of our services.

We may also update these Terms from time to time. We will notify you of any material changes by posting the new Terms on this page and updating the "Last Updated" date.`,
    },
    {
        icon: Gavel,
        title: 'Governing Law & Disputes',
        content: `These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.

Any disputes arising from these Terms or your use of our services shall be resolved through binding arbitration in San Francisco, California, except where prohibited by law. You agree to waive your right to a jury trial or to participate in a class action.`,
    },
]

const Terms = () => {
    const heroRef = useRef<HTMLDivElement>(null)
    const isHeroInView = useInView(heroRef, { once: true })
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0">
                    <div className={`absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:60px_60px] ${isDark ? 'opacity-100' : 'opacity-50'}`} />
                    <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] ${isDark ? 'bg-violet-600/15' : 'bg-violet-600/10'}`} />
                    <div className={`absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] ${isDark ? 'bg-purple-600/10' : 'bg-purple-600/5'}`} />
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
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-violet-400 bg-violet-500/10 rounded-full border border-violet-500/20">
                                <Scale className="w-4 h-4" />
                                Terms of Service
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                            Terms of{' '}
                            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                                Service
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`text-lg mb-4 ${isDark ? 'text-white/60' : 'text-gray-600'}`}
                        >
                            Please read these terms carefully before using our services. By using Forbidden Dev, you agree to be bound by these terms.
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

            {/* Table of Contents */}
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
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${isDark ? 'from-violet-500/20 to-purple-500/20' : 'from-violet-100 to-purple-100'} flex items-center justify-center flex-shrink-0`}>
                                            <Icon className="w-6 h-6 text-violet-500" />
                                        </div>
                                        <div>
                                            <span className={`text-sm font-medium ${isDark ? 'text-violet-400' : 'text-violet-600'}`}>Section {index + 1}</span>
                                            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {section.title}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className={`ml-16 p-6 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-gray-50 border border-gray-200'}`}>
                                        <div className={`whitespace-pre-line leading-relaxed ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                                            {section.content}
                                        </div>
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
                        className={`relative p-12 rounded-3xl overflow-hidden ${isDark ? 'bg-gradient-to-br from-violet-600/20 to-purple-600/20 border border-white/10' : 'bg-gradient-to-br from-violet-100 to-purple-100 border border-violet-200'}`}
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-center md:text-left">
                                <div className={`w-14 h-14 mx-auto md:mx-0 rounded-2xl bg-gradient-to-br ${isDark ? 'from-violet-500/20 to-purple-500/20' : 'from-violet-100 to-purple-100'} flex items-center justify-center mb-4`}>
                                    <Globe className="w-7 h-7 text-violet-500" />
                                </div>
                                <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    Have questions about our terms?
                                </h2>
                                <p className={`${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                    Our legal team is available to clarify any questions. Contact legal@forbiddendev.com
                                </p>
                            </div>
                            <a
                                href="mailto:legal@forbiddendev.com"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-violet-500/25 transition-all whitespace-nowrap"
                            >
                                <FileText className="w-5 h-5" />
                                Contact Legal Team
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Terms
