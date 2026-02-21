import { useState, useEffect } from 'react'
import { Github, Linkedin, Instagram, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { contentApi } from '../lib/api'
import fdLogo from '../assets/FD Logo transparent 2x1.png'

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
}

const footerLinks = {
    company: [
        { name: 'About', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Blog', href: '/blog' },
        { name: 'Awards', href: '/awards' },
    ],
    services: [
        { name: 'Web Development', href: '/services/web-development' },
        { name: 'Mobile Apps', href: '/services/mobile-apps' },
        { name: 'AI & ML', href: '/services/ai-ml' },
        { name: 'UI/UX Design', href: '/services/ui-ux-design' },
        { name: 'Website Templates', href: '/templates' },
    ],
    resources: [
        { name: 'Case Studies', href: '/resources/case-studies' },
        { name: 'Help Center', href: '/resources/help-center' },
    ],
}

const Footer = () => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const navigate = useNavigate()
    const [clickCount, setClickCount] = useState(0)
    const [settings, setSettings] = useState<SiteSettings | null>(null)

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await contentApi.get('/content/settings')
                if (response.data) {
                    setSettings(response.data)
                }
            } catch (error) {
                console.error('Failed to fetch settings:', error)
            }
        }
        fetchSettings()
    }, [])

    // Secret admin access - triple click on copyright
    const handleCopyrightClick = () => {
        const newCount = clickCount + 1
        setClickCount(newCount)

        if (newCount >= 9) {
            navigate('/fd-admin-portal')
            setClickCount(0)
        }

        // Reset count after 2 seconds of inactivity
        setTimeout(() => setClickCount(0), 2000)
    }

    const socialLinks = [
        { icon: Github, href: settings?.socialLinks?.github || '#', label: 'GitHub' },
        { icon: Linkedin, href: settings?.socialLinks?.linkedin || '#', label: 'LinkedIn' },
        { icon: Instagram, href: settings?.socialLinks?.instagram || '#', label: 'Instagram' },
    ]

    return (
        <footer className={`relative border-t ${isDark ? 'bg-[#020010] border-white/[0.05]' : 'bg-gray-50 border-gray-200'}`}>
            {/* Background pattern */}
            <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px] ${isDark ? 'opacity-100' : 'opacity-0'}`} />

            <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                {/* Main footer */}
                <div className="py-12 md:py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">
                    {/* Brand */}
                    <div className="col-span-2">
                        <a href="#home" className="inline-flex items-center gap-3 mb-6">
                            <img
                                src={fdLogo}
                                alt="Forbidden Developers"
                                className="h-20 w-auto object-contain"
                            />
                        </a>

                        <p className={`text-sm mb-6 max-w-xs leading-relaxed ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                            {settings?.tagline || 'Premium development studio crafting exceptional digital experiences for forward-thinking brands.'}
                        </p>

                        {/* Social links */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        aria-label={social.label}
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isDark ? 'bg-white/[0.03] border border-white/[0.05] text-white/40 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.1]' : 'bg-white border border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'}`}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className={`text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className={`text-sm transition-colors inline-flex items-center gap-1 group ${isDark ? 'text-white/40 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                                    >
                                        {link.name}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className={`text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Services</h4>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className={`text-sm transition-colors inline-flex items-center gap-1 group ${isDark ? 'text-white/40 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                                    >
                                        {link.name}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className={`text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className={`text-sm transition-colors inline-flex items-center gap-1 group ${isDark ? 'text-white/40 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                                    >
                                        {link.name}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className={`text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Contact</h4>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href={`mailto:${settings?.contactEmail || 'hello@forbiddendev.com'}`}
                                    className={`text-sm transition-colors flex items-center gap-2 ${isDark ? 'text-white/40 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    <Mail className="w-4 h-4" />
                                    {settings?.contactEmail || 'hello@forbiddendev.com'}
                                </a>
                            </li>
                            <li>
                                <span className={`text-sm flex items-start gap-2 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    {settings?.address || 'San Francisco, CA'}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className={`py-6 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${isDark ? 'border-white/[0.05]' : 'border-gray-200'}`}>
                    <p
                        onClick={handleCopyrightClick}
                        className={`text-sm select-none cursor-default ${isDark ? 'text-white/30' : 'text-gray-400'}`}
                    >
                        {settings?.copyrightText || '© 2024 Forbidden Developers. All rights reserved.'}
                    </p>

                    <div className={`flex gap-6 text-sm ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
                        <Link to="/privacy" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>Privacy</Link>
                        <Link to="/terms" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
