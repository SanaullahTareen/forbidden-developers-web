import { useState, useEffect, ReactNode } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    LayoutDashboard,
    Briefcase,
    FolderKanban,
    BarChart3,
    Zap,
    MessageSquare,
    Users,
    FileText,
    Award,
    Download,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronDown,
    Mail,
    Phone,
    LineChart,
    HelpCircle,
    Ticket
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import fdLogo from '../../assets/FD Logo transparent 2x1.png'

interface AdminLayoutProps {
    children: ReactNode
}

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: Mail, label: 'Messages', href: '/admin/messages' },
    { icon: Phone, label: 'Scheduled Calls', href: '/admin/calls' },
    { type: 'divider', label: 'Content Management' },
    { icon: Briefcase, label: 'Services', href: '/admin/services' },
    { icon: FolderKanban, label: 'Projects', href: '/admin/projects' },
    { icon: BarChart3, label: 'Stats', href: '/admin/stats' },
    { icon: Zap, label: 'Homepage Content', href: '/admin/homepage-content' },
    { icon: MessageSquare, label: 'Testimonials', href: '/admin/testimonials' },
    { type: 'divider', label: 'Pages' },
    { icon: Users, label: 'Careers', href: '/admin/careers' },
    { icon: FileText, label: 'Blog Posts', href: '/admin/blog' },
    { icon: Award, label: 'Awards', href: '/admin/awards' },
    { icon: Download, label: 'Brand Assets', href: '/admin/assets' },
    { type: 'divider', label: 'Support' },
    { icon: HelpCircle, label: 'FAQs', href: '/admin/faqs' },
    { icon: Ticket, label: 'Support Tickets', href: '/admin/tickets' },
    { type: 'divider', label: 'Settings' },
    { icon: LineChart, label: 'Analytics', href: '/admin/analytics' },
    { icon: Settings, label: 'Site Settings', href: '/admin/settings' },
]

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const navigate = useNavigate()
    const location = useLocation()
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
    const [adminUser, setAdminUser] = useState<{ name: string; email: string } | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('adminToken')
        const user = localStorage.getItem('adminUser')

        if (!token) {
            navigate('/fd-admin-portal')
            return
        }

        if (user) {
            setAdminUser(JSON.parse(user))
        }
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
        navigate('/fd-admin-portal')
    }

    const isActive = (href: string) => location.pathname === href

    return (
        <div className={`min-h-screen flex ${isDark ? 'bg-[#030014]' : 'bg-gray-50'}`}>
            {/* Mobile sidebar overlay */}
            {mobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} ${isDark ? 'bg-[#0a0a1a] border-r border-white/10' : 'bg-white border-r border-gray-200'}`}>
                {/* Logo */}
                <div className={`flex flex-col p-4 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                        <img
                            src={fdLogo}
                            alt="Forbidden Developers"
                            className={`${sidebarOpen ? 'h-12' : 'h-10'} w-auto object-contain flex-shrink-0`}
                        />
                        <button
                            onClick={() => setMobileSidebarOpen(false)}
                            className="lg:hidden p-2"
                        >
                            <X className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-900'}`} />
                        </button>
                    </div>
                    {sidebarOpen && (
                        <div className="mt-3 overflow-hidden">
                            <h1 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Admin Panel</h1>
                            <p className={`text-xs truncate ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{adminUser?.email}</p>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-3 space-y-1">
                    {menuItems.map((item, index) => {
                        if (item.type === 'divider') {
                            return sidebarOpen ? (
                                <div key={index} className={`pt-4 pb-2 px-3 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
                                    {item.label}
                                </div>
                            ) : (
                                <div key={index} className={`my-2 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`} />
                            )
                        }

                        const Icon = item.icon!
                        const active = isActive(item.href!)

                        return (
                            <Link
                                key={item.href}
                                to={item.href!}
                                onClick={() => setMobileSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${active
                                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white'
                                    : isDark
                                        ? 'text-white/60 hover:text-white hover:bg-white/5'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                            >
                                <Icon className="w-5 h-5 flex-shrink-0" />
                                {sidebarOpen && <span className="truncate">{item.label}</span>}
                            </Link>
                        )
                    })}
                </nav>

                {/* Footer */}
                <div className={`p-3 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className={`hidden lg:flex w-full items-center justify-center gap-2 px-3 py-2 rounded-xl transition-all ${isDark ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                    >
                        <ChevronDown className={`w-5 h-5 transition-transform ${sidebarOpen ? 'rotate-90' : '-rotate-90'}`} />
                        {sidebarOpen && <span>Collapse</span>}
                    </button>
                    <button
                        onClick={handleLogout}
                        className={`flex w-full items-center gap-3 px-3 py-2.5 mt-2 rounded-xl transition-all ${isDark ? 'text-red-400 hover:bg-red-500/10' : 'text-red-600 hover:bg-red-50'}`}
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
                {/* Top bar */}
                <header className={`sticky top-0 z-30 flex items-center gap-4 px-4 lg:px-8 py-4 border-b ${isDark ? 'bg-[#030014]/80 border-white/10' : 'bg-white/80 border-gray-200'} backdrop-blur-xl`}>
                    <button
                        onClick={() => setMobileSidebarOpen(true)}
                        className="lg:hidden p-2"
                    >
                        <Menu className={`w-6 h-6 ${isDark ? 'text-white' : 'text-gray-900'}`} />
                    </button>
                    <div className="flex-1">
                        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {menuItems.find(item => item.href === location.pathname)?.label || 'Admin'}
                        </h2>
                    </div>
                    <Link
                        to="/"
                        target="_blank"
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${isDark ? 'text-white/60 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                    >
                        View Site →
                    </Link>
                </header>

                {/* Page content */}
                <div className="flex-1 p-4 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default AdminLayout
