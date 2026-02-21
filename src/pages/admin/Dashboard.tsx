import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
    Mail,
    Phone,
    Calendar,
    Users,
    MessageSquare,
    Clock,
    CheckCircle,
    XCircle,
    Trash2,
    Eye,
    RefreshCw
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import AdminLayout from './AdminLayout'

interface Contact {
    _id: string
    name: string
    email: string
    phone?: string
    company?: string
    message: string
    status: string
    createdAt: string
}

interface ScheduleCall {
    _id: string
    name: string
    email: string
    phone: string
    company?: string
    preferredDate: string
    preferredTime: string
    timezone: string
    projectType: string
    message?: string
    status: string
    createdAt: string
}

const AdminDashboard = () => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState<'contacts' | 'calls'>('contacts')
    const [contacts, setContacts] = useState<Contact[]>([])
    const [calls, setCalls] = useState<ScheduleCall[]>([])
    const [loading, setLoading] = useState(true)

    const API_BASE = 'http://localhost:5000/api'

    useEffect(() => {
        const token = localStorage.getItem('adminToken')

        if (!token) {
            navigate('/fd-admin-portal')
            return
        }

        fetchData()
    }, [navigate])

    const getAuthHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    })

    const fetchData = async () => {
        setLoading(true)
        try {
            const [contactsRes, callsRes] = await Promise.all([
                fetch(`${API_BASE}/contact`, { headers: getAuthHeaders() }),
                fetch(`${API_BASE}/schedule`, { headers: getAuthHeaders() })
            ])

            if (contactsRes.status === 401 || callsRes.status === 401) {
                navigate('/fd-admin-portal')
                return
            }

            const contactsData = await contactsRes.json()
            const callsData = await callsRes.json()

            if (contactsData.success) setContacts(contactsData.data)
            if (callsData.success) setCalls(callsData.data)
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (type: 'contact' | 'call', id: string, status: string) => {
        try {
            const endpoint = type === 'contact'
                ? `${API_BASE}/contact/${id}`
                : `${API_BASE}/schedule/${id}`

            const res = await fetch(endpoint, {
                method: 'PATCH',
                headers: getAuthHeaders(),
                body: JSON.stringify({ status })
            })

            if (res.ok) {
                fetchData()
            }
        } catch (error) {
            console.error('Error updating status:', error)
        }
    }

    const deleteItem = async (type: 'contact' | 'call', id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return

        try {
            const endpoint = type === 'contact'
                ? `${API_BASE}/contact/${id}`
                : `${API_BASE}/schedule/${id}`

            const res = await fetch(endpoint, {
                method: 'DELETE',
                headers: getAuthHeaders()
            })

            if (res.ok) {
                fetchData()
                setShowModal(false)
            }
        } catch (error) {
            console.error('Error deleting item:', error)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
            case 'read': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
            case 'responded': return 'bg-green-500/20 text-green-400 border-green-500/30'
            case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
            case 'confirmed': return 'bg-green-500/20 text-green-400 border-green-500/30'
            case 'completed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
            case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30'
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
        }
    }

    return (
        <AdminLayout>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Total Contacts', value: contacts.length, icon: MessageSquare, color: 'from-blue-500 to-cyan-500' },
                    { label: 'New Messages', value: contacts.filter(c => c.status === 'new').length, icon: Mail, color: 'from-violet-500 to-fuchsia-500' },
                    { label: 'Scheduled Calls', value: calls.length, icon: Phone, color: 'from-emerald-500 to-teal-500' },
                    { label: 'Pending Calls', value: calls.filter(c => c.status === 'pending').length, icon: Calendar, color: 'from-orange-500 to-amber-500' },
                ].map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-6 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200 shadow-sm'}`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{stat.label}</p>
                                <p className={`text-3xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-4 mb-6">
                <div className={`inline-flex rounded-xl p-1 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                    {(['contacts', 'calls'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab
                                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white'
                                : isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            {tab === 'contacts' ? 'Contact Messages' : 'Scheduled Calls'}
                        </button>
                    ))}
                </div>
                <button
                    onClick={fetchData}
                    className={`p-2 rounded-lg transition-colors ${isDark ? 'text-white/60 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                    <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>
            {/* Content */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : activeTab === 'contacts' ? (
                <div className="space-y-4">
                    {contacts.length === 0 ? (
                        <div className={`text-center py-20 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No contact messages yet</p>
                        </div>
                    ) : (
                        contacts.map((contact) => (
                            <motion.div
                                key={contact._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-6 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200 shadow-sm'}`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{contact.name}</h3>
                                            <span className={`px-2 py-0.5 text-xs rounded-full border ${getStatusColor(contact.status)}`}>
                                                {contact.status}
                                            </span>
                                        </div>
                                        <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>{contact.email}</p>
                                        {contact.company && (
                                            <p className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{contact.company}</p>
                                        )}
                                        <p className={`mt-3 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>{contact.message}</p>
                                        <p className={`text-xs mt-3 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                                            <Clock className="w-3 h-3 inline mr-1" />
                                            {formatDate(contact.createdAt)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        {contact.status === 'new' && (
                                            <button
                                                onClick={() => updateStatus('contact', contact._id, 'read')}
                                                className="p-2 rounded-lg bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition-colors"
                                                title="Mark as Read"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        )}
                                        {contact.status !== 'responded' && (
                                            <button
                                                onClick={() => updateStatus('contact', contact._id, 'responded')}
                                                className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                                                title="Mark as Responded"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteItem('contact', contact._id)}
                                            className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {calls.length === 0 ? (
                        <div className={`text-center py-20 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                            <Phone className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No scheduled calls yet</p>
                        </div>
                    ) : (
                        calls.map((call) => (
                            <motion.div
                                key={call._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-6 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200 shadow-sm'}`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{call.name}</h3>
                                            <span className={`px-2 py-0.5 text-xs rounded-full border ${getStatusColor(call.status)}`}>
                                                {call.status}
                                            </span>
                                        </div>
                                        <div className={`text-sm space-y-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                            <p><Mail className="w-3 h-3 inline mr-2" />{call.email}</p>
                                            <p><Phone className="w-3 h-3 inline mr-2" />{call.phone}</p>
                                            <p><Calendar className="w-3 h-3 inline mr-2" />{call.preferredDate} at {call.preferredTime} ({call.timezone})</p>
                                            <p><Users className="w-3 h-3 inline mr-2" />Project: {call.projectType}</p>
                                        </div>
                                        {call.message && (
                                            <p className={`mt-3 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>{call.message}</p>
                                        )}
                                        <p className={`text-xs mt-3 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                                            <Clock className="w-3 h-3 inline mr-1" />
                                            Submitted: {formatDate(call.createdAt)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        {call.status === 'pending' && (
                                            <button
                                                onClick={() => updateStatus('call', call._id, 'confirmed')}
                                                className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                                                title="Confirm Call"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                            </button>
                                        )}
                                        {call.status === 'confirmed' && (
                                            <button
                                                onClick={() => updateStatus('call', call._id, 'completed')}
                                                className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                                                title="Mark Completed"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                            </button>
                                        )}
                                        {call.status !== 'cancelled' && call.status !== 'completed' && (
                                            <button
                                                onClick={() => updateStatus('call', call._id, 'cancelled')}
                                                className="p-2 rounded-lg bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 transition-colors"
                                                title="Cancel Call"
                                            >
                                                <XCircle className="w-4 h-4" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteItem('call', call._id)}
                                            className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            )}
        </AdminLayout>
    )
}

export default AdminDashboard
