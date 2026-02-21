import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import fdLogo from '../assets/FD Logo transparent 2x1.png'

const navItems = [
    { name: 'Home', href: '/', section: 'home', isPage: false },
    { name: 'Services', href: '/#services', section: 'services', isPage: false },
    { name: 'Work', href: '/#portfolio', section: 'portfolio', isPage: false },
    { name: 'About', href: '/#about', section: 'about', isPage: false },
    { name: 'Contact', href: '/#contact', section: 'contact', isPage: false },
]

const Navbar = () => {
    const { theme, toggleTheme } = useTheme()
    const location = useLocation()
    const navigate = useNavigate()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeItem, setActiveItem] = useState('Home')
    const [isNavigating, setIsNavigating] = useState(false)

    const isDark = theme === 'dark'
    const isHomePage = location.pathname === '/'

    // Smooth scroll to section
    const scrollToSection = useCallback((sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            const offset = 80
            const elementPosition = element.getBoundingClientRect().top + window.scrollY
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            })
        }
    }, [])

    // Handle navigation click
    const handleNavClick = useCallback((item: typeof navItems[0], e?: React.MouseEvent) => {
        setIsNavigating(true)
        setActiveItem(item.name)

        if (item.isPage) {
            navigate(item.href)
            setIsNavigating(false)
        } else if (item.section) {
            if (isHomePage) {
                e?.preventDefault()
                scrollToSection(item.section)
                setTimeout(() => setIsNavigating(false), 500)
            } else {
                navigate('/')
                setTimeout(() => {
                    scrollToSection(item.section!)
                    setIsNavigating(false)
                }, 100)
            }
        }

        setIsMobileMenuOpen(false)
    }, [isHomePage, navigate, scrollToSection])

    // Handle scroll for navbar background (runs on all pages)
    useEffect(() => {
        const handleScrollBackground = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScrollBackground, { passive: true })
        handleScrollBackground()

        return () => window.removeEventListener('scroll', handleScrollBackground)
    }, [])

    // Update active state based on scroll (only on home page)
    useEffect(() => {
        if (!isHomePage || isNavigating) return

        const handleScroll = () => {
            const sections = ['contact', 'about', 'portfolio', 'services', 'home']
            for (const section of sections) {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    if (rect.top <= 150 && rect.bottom > 150) {
                        const navItem = navItems.find(item => item.section === section)
                        if (navItem && activeItem !== navItem.name) {
                            setActiveItem(navItem.name)
                        }
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [isHomePage, isNavigating, activeItem])

    // Update active item when route changes
    useEffect(() => {
        if (location.pathname !== '/') {
            // For other pages, don't highlight any nav item or highlight based on path
            setIsNavigating(false)
        } else if (location.pathname === '/' && !isNavigating) {
            const hash = location.hash?.replace('#', '')
            if (hash) {
                const item = navItems.find(i => i.section === hash)
                if (item) setActiveItem(item.name)
            } else {
                setActiveItem('Home')
            }
        }
    }, [location.pathname, location.hash, isNavigating])

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? 'py-4'
                    : 'py-6'
                    }`}
            >
                {/* Backdrop blur bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isScrolled ? 1 : 0 }}
                    className={`absolute inset-0 backdrop-blur-2xl border-b ${isDark ? 'bg-[#030014]/80 border-white/[0.05]' : 'bg-white/80 border-gray-200'}`}
                />

                <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="relative group flex items-center gap-3"
                        >
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-2"
                            >
                                <img
                                    src={fdLogo}
                                    alt="Forbidden Developers"
                                    className="h-20 w-auto object-contain"
                                />
                            </motion.div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center">
                            <div className={`flex items-center gap-1 p-1.5 rounded-full border backdrop-blur-xl ${isDark ? 'bg-white/[0.03] border-white/[0.08]' : 'bg-white/50 border-gray-200/50 shadow-sm'}`}>
                                {navItems.map((item) => {
                                    const isActive = activeItem === item.name

                                    return (
                                        <button
                                            key={item.name}
                                            onClick={(e) => handleNavClick(item, e)}
                                            className={`relative px-5 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${isActive
                                                ? isDark ? 'text-white' : 'text-gray-900'
                                                : isDark ? 'text-white/50 hover:text-white/80' : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            {isActive && (
                                                <motion.span
                                                    layoutId="activeNavIndicator"
                                                    className={`absolute inset-0 rounded-full ${isDark ? 'bg-white/[0.1]' : 'bg-white shadow-sm'}`}
                                                    transition={{
                                                        type: 'spring',
                                                        stiffness: 400,
                                                        damping: 30
                                                    }}
                                                />
                                            )}
                                            <span className="relative z-10">{item.name}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Theme Toggle & CTA Button */}
                        <div className="hidden md:flex items-center gap-3">
                            {/* Theme Toggle - Hidden, keeping dark mode only */}
                            {/* <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleTheme}
                                className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-white/[0.05] hover:bg-white/[0.1]' : 'bg-gray-100 hover:bg-gray-200'}`}
                            >
                                <AnimatePresence mode="wait">
                                    {isDark ? (
                                        <motion.div
                                            key="sun"
                                            initial={{ scale: 0, rotate: -90 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            exit={{ scale: 0, rotate: 90 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Sun className="w-5 h-5 text-yellow-400" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="moon"
                                            initial={{ scale: 0, rotate: 90 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            exit={{ scale: 0, rotate: -90 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Moon className="w-5 h-5 text-violet-600" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button> */}

                            {/* CTA Button */}
                            <motion.button
                                onClick={(e) => handleNavClick(navItems.find(i => i.name === 'Contact')!, e)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative group px-6 py-2.5 rounded-full font-semibold text-sm overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full" />
                                <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                                <span className="relative text-white">Get in Touch</span>
                            </motion.button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex md:hidden items-center gap-2">
                            {/* Mobile Theme Toggle */}
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleTheme}
                                className={`relative w-10 h-10 flex items-center justify-center rounded-xl border ${isDark ? 'bg-white/[0.05] border-white/[0.08]' : 'bg-gray-100 border-gray-200'}`}
                            >
                                {isDark ? (
                                    <Sun className="w-5 h-5 text-yellow-400" />
                                ) : (
                                    <Moon className="w-5 h-5 text-violet-600" />
                                )}
                            </motion.button>

                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                className={`relative w-10 h-10 flex items-center justify-center rounded-xl border ${isDark ? 'bg-white/[0.05] border-white/[0.08]' : 'bg-gray-100 border-gray-200'}`}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? (
                                    <X className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-700'}`} />
                                ) : (
                                    <Menu className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-700'}`} />
                                )}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={`absolute inset-0 backdrop-blur-2xl ${isDark ? 'bg-[#030014]/95' : 'bg-white/95'}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Menu content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ delay: 0.1 }}
                            className="relative h-full flex flex-col items-center justify-center gap-8 p-8"
                        >
                            {navItems.map((item, i) => {
                                const isActive = activeItem === item.name

                                return (
                                    <motion.button
                                        key={item.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + i * 0.05 }}
                                        onClick={(e) => handleNavClick(item, e)}
                                        className={`text-3xl font-semibold transition-colors ${isActive
                                            ? isDark ? 'text-white' : 'text-gray-900'
                                            : isDark ? 'text-white/40 hover:text-white' : 'text-gray-400 hover:text-gray-700'
                                            }`}
                                    >
                                        {item.name}
                                    </motion.button>
                                )
                            })}

                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                onClick={(e) => handleNavClick(navItems.find(i => i.name === 'Contact')!, e)}
                                className="mt-8 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full font-semibold text-white"
                            >
                                Get in Touch
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Navbar
