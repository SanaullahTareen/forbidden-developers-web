import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, Calendar, Users, Clock, CheckCircle, XCircle, Trash2, RefreshCw } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import AdminLayout from './AdminLayout'

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

const CallsAdmin = () => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [calls, setCalls] = useState<ScheduleCall[]>([])
    const [loading, setLoading] = useState(true)

    const API_BASE = 'http://localhost:5000/api'

    const getAuthHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    })

    useEffect(() => {
        fetchCalls()
    }, [])

    const fetchCalls = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${API_BASE}/schedule`, { headers: getAuthHeaders() })
            const data = await res.json()
            if (data.success) setCalls(data.data)
        } catch (error) {
            console.error('Error fetching calls:', error)
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (id: string, status: string) => {
        try {
            const res = await fetch(`${API_BASE}/schedule/${id}`, {
                method: 'PATCH',
                headers: getAuthHeaders(),
                body: JSON.stringify({ status })
            })
            if (res.ok) fetchCalls()
        } catch (error) {
            console.error('Error updating status:', error)
        }
    }

    const deleteCall = async (id: string) => {
        if (!confirm('Are you sure you want to delete this scheduled call?')) return
        try {
            const res = await fetch(`${API_BASE}/schedule/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            })
            if (res.ok) fetchCalls()
        } catch (error) {
            console.error('Error deleting call:', error)
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
            case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
            case 'confirmed': return 'bg-green-500/20 text-green-400 border-green-500/30'
            case 'completed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
            case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30'
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
        }
    }

    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Scheduled Calls</h1>
                    <p className={`mt-1 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{calls.length} calls total</p>
                </div>
                <button
                    onClick={fetchCalls}
                    className={`p-2.5 rounded-xl transition-all ${isDark ? 'bg-white/5 hover:bg-white/10 text-white/60' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                >
                    <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : calls.length === 0 ? (
                <div className={`text-center py-20 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                    <Phone className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No scheduled calls yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {calls.map((call) => (
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
                                            onClick={() => updateStatus(call._id, 'confirmed')}
                                            className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                                            title="Confirm Call"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                        </button>
                                    )}
                                    {call.status === 'confirmed' && (
                                        <button
                                            onClick={() => updateStatus(call._id, 'completed')}
                                            className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                                            title="Mark Completed"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                        </button>
                                    )}
                                    {call.status !== 'cancelled' && call.status !== 'completed' && (
                                        <button
                                            onClick={() => updateStatus(call._id, 'cancelled')}
                                            className="p-2 rounded-lg bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 transition-colors"
                                            title="Cancel Call"
                                        >
                                            <XCircle className="w-4 h-4" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteCall(call._id)}
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

export default CallsAdmin
