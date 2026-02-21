import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Clock, CheckCircle, Eye, Trash2, RefreshCw, Building2 } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import AdminLayout from './AdminLayout'

interface Contact {
    _id: string
    name: string
    email: string
    phone?: string
    company?: string
    budget?: string
    message: string
    status: string
    createdAt: string
}

const MessagesAdmin = () => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [contacts, setContacts] = useState<Contact[]>([])
    const [loading, setLoading] = useState(true)

    const API_BASE = 'http://localhost:5000/api'

    const getAuthHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    })

    useEffect(() => {
        fetchContacts()
    }, [])

    const fetchContacts = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${API_BASE}/contact`, { headers: getAuthHeaders() })
            const data = await res.json()
            if (data.success) setContacts(data.data)
        } catch (error) {
            console.error('Error fetching contacts:', error)
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (id: string, status: string) => {
        try {
            const res = await fetch(`${API_BASE}/contact/${id}`, {
                method: 'PATCH',
                headers: getAuthHeaders(),
                body: JSON.stringify({ status })
            })
            if (res.ok) fetchContacts()
        } catch (error) {
            console.error('Error updating status:', error)
        }
    }

    const deleteContact = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return
        try {
            const res = await fetch(`${API_BASE}/contact/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            })
            if (res.ok) fetchContacts()
        } catch (error) {
            console.error('Error deleting contact:', error)
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
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
        }
    }

    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Contact Messages</h1>
                    <p className={`mt-1 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{contacts.length} messages total</p>
                </div>
                <button
                    onClick={fetchContacts}
                    className={`p-2.5 rounded-xl transition-all ${isDark ? 'bg-white/5 hover:bg-white/10 text-white/60' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                >
                    <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : contacts.length === 0 ? (
                <div className={`text-center py-20 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                    <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No contact messages yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {contacts.map((contact) => (
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
                                        <p className={`text-sm flex items-center gap-1 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                                            <Building2 className="w-3 h-3" /> {contact.company}
                                        </p>
                                    )}
                                    {contact.budget && (
                                        <p className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>Budget: {contact.budget}</p>
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
                                            onClick={() => updateStatus(contact._id, 'read')}
                                            className="p-2 rounded-lg bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition-colors"
                                            title="Mark as Read"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    )}
                                    {contact.status !== 'responded' && (
                                        <button
                                            onClick={() => updateStatus(contact._id, 'responded')}
                                            className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                                            title="Mark as Responded"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteContact(contact._id)}
                                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </AdminLayout>
    )
}

export default MessagesAdmin
