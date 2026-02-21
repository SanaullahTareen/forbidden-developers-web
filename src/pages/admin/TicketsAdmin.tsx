import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, X, Ticket, CheckCircle2, Clock, AlertCircle, Mail, Phone, MessageCircle, Send, Save, Search, Filter, Inbox } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { adminApi } from '../../lib/api'
import AdminLayout from './AdminLayout'

interface SupportTicket {
    _id: string
    name: string
    contactMethod: 'email' | 'phone' | 'whatsapp'
    contactInfo: string
    subject: string
    category: string
    message: string
    status: 'open' | 'in-progress' | 'resolved' | 'closed'
    adminNotes?: string
    createdAt: string
}

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
    open: { label: 'New', color: 'yellow', icon: Inbox },
    'in-progress': { label: 'In Progress', color: 'blue', icon: AlertCircle },
    resolved: { label: 'Resolved', color: 'green', icon: CheckCircle2 },
    closed: { label: 'Closed', color: 'gray', icon: CheckCircle2 }
}

const contactMethodIcons = {
    email: Mail,
    phone: Phone,
    whatsapp: MessageCircle
}

const TicketsAdmin = () => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [tickets, setTickets] = useState<SupportTicket[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)
    const [statusFilter, setStatusFilter] = useState<string>('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const [editData, setEditData] = useState({
        status: 'open',
        adminNotes: ''
    })

    useEffect(() => {
        fetchTickets()
    }, [])

    const fetchTickets = async () => {
        setLoading(true)
        try {
            const response = await adminApi.get('/admin/content/support-tickets')
            setTickets(response.data?.data || response.data || [])
        } catch (err) {
            console.error('Error fetching tickets:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleUpdateTicket = async () => {
        if (!selectedTicket) return
        setSaving(true)
        setError('')

        try {
            await adminApi.patch(`/admin/content/support-tickets/${selectedTicket._id}`, editData)
            setSuccess('Ticket updated successfully!')
            fetchTickets()
            closeModal()
            setTimeout(() => setSuccess(''), 3000)
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update ticket')
        } finally {
            setSaving(false)
        }
    }

    const handleQuickStatus = async (e: React.MouseEvent, id: string, status: string) => {
        e.stopPropagation() // Prevent card click
        try {
            await adminApi.patch(`/admin/content/support-tickets/${id}`, { status })
            setSuccess(`Ticket marked as ${status}!`)
            fetchTickets()
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError('Failed to update status')
        }
    }

    const openModal = (ticket: SupportTicket) => {
        setSelectedTicket(ticket)
        setEditData({
            status: ticket.status,
            adminNotes: ticket.adminNotes || ''
        })
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        setSelectedTicket(null)
        setError('')
    }

    // Advanced search - searches across multiple fields with smart matching
    const searchTickets = (tickets: SupportTicket[], query: string): SupportTicket[] => {
        if (!query.trim()) return tickets

        const searchTerms = query.toLowerCase().trim().split(/\s+/)

        return tickets.filter(ticket => {
            // Create searchable content from all relevant fields
            const searchableContent = [
                ticket.name,
                ticket.contactInfo,
                ticket.subject,
                ticket.message,
                ticket.category,
                ticket.status,
                ticket.adminNotes || ''
            ].join(' ').toLowerCase()

            // All search terms must match somewhere in the content
            return searchTerms.every(term => searchableContent.includes(term))
        }).sort((a, b) => {
            // Prioritize matches in name, subject, then contactInfo
            const aNameMatch = a.name.toLowerCase().includes(query.toLowerCase()) ? 3 : 0
            const bNameMatch = b.name.toLowerCase().includes(query.toLowerCase()) ? 3 : 0
            const aSubjectMatch = a.subject.toLowerCase().includes(query.toLowerCase()) ? 2 : 0
            const bSubjectMatch = b.subject.toLowerCase().includes(query.toLowerCase()) ? 2 : 0
            const aContactMatch = a.contactInfo.toLowerCase().includes(query.toLowerCase()) ? 1 : 0
            const bContactMatch = b.contactInfo.toLowerCase().includes(query.toLowerCase()) ? 1 : 0

            const aScore = aNameMatch + aSubjectMatch + aContactMatch
            const bScore = bNameMatch + bSubjectMatch + bContactMatch

            return bScore - aScore
        })
    }

    // Filter and search tickets
    const filteredTickets = useMemo(() => {
        let result = tickets

        // Apply status filter
        if (statusFilter !== 'all') {
            result = result.filter(t => t.status === statusFilter)
        }

        // Apply search
        if (searchQuery.trim()) {
            result = searchTickets(result, searchQuery)
        }

        return result
    }, [tickets, statusFilter, searchQuery])

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getStatusClasses = (status: string) => {
        const colors: Record<string, string> = {
            open: isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700',
            'in-progress': isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700',
            resolved: isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700',
            closed: isDark ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-600'
        }
        return colors[status] || colors.open
    }

    const inputClass = `w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-green-500/50 ${isDark ? 'bg-[#0a0a1a] border-white/[0.1] text-white placeholder:text-white/30' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'}`
    const labelClass = `block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`

    // Count tickets by status - "open" is the new/pending status
    const newCount = tickets.filter(t => t.status === 'open').length
    const inProgressCount = tickets.filter(t => t.status === 'in-progress').length
    const resolvedCount = tickets.filter(t => t.status === 'resolved').length

    return (
        <AdminLayout>
            <div className="max-w-6xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Support Tickets</h1>
                        <p className={`mt-1 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Manage and respond to support requests</p>
                    </div>
                    <button
                        onClick={fetchTickets}
                        className={`p-2.5 rounded-xl transition-all ${isDark ? 'bg-white/5 hover:bg-white/10 text-white/60' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <button
                        onClick={() => setStatusFilter(statusFilter === 'open' ? 'all' : 'open')}
                        className={`p-4 rounded-2xl transition-all ${statusFilter === 'open' ? 'ring-2 ring-yellow-500' : ''} ${isDark ? 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04]' : 'bg-white border border-gray-200 hover:bg-gray-50'}`}
                    >
                        <Inbox className="w-6 h-6 text-yellow-500 mb-2" />
                        <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{newCount}</p>
                        <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>New</p>
                    </button>
                    <button
                        onClick={() => setStatusFilter(statusFilter === 'in-progress' ? 'all' : 'in-progress')}
                        className={`p-4 rounded-2xl transition-all ${statusFilter === 'in-progress' ? 'ring-2 ring-blue-500' : ''} ${isDark ? 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04]' : 'bg-white border border-gray-200 hover:bg-gray-50'}`}
                    >
                        <AlertCircle className="w-6 h-6 text-blue-500 mb-2" />
                        <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{inProgressCount}</p>
                        <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>In Progress</p>
                    </button>
                    <button
                        onClick={() => setStatusFilter(statusFilter === 'resolved' ? 'all' : 'resolved')}
                        className={`p-4 rounded-2xl transition-all ${statusFilter === 'resolved' ? 'ring-2 ring-green-500' : ''} ${isDark ? 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04]' : 'bg-white border border-gray-200 hover:bg-gray-50'}`}
                    >
                        <CheckCircle2 className="w-6 h-6 text-green-500 mb-2" />
                        <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{resolvedCount}</p>
                        <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Resolved</p>
                    </button>
                </div>

                {/* Search and Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/30' : 'text-gray-400'}`} />
                        <input
                            type="text"
                            placeholder="Search by name, email, phone, subject, message..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all ${isDark ? 'bg-white/[0.03] border-white/[0.1] focus:border-green-500/50 text-white placeholder:text-white/40' : 'bg-white border-gray-200 focus:border-green-500 text-gray-900 placeholder:text-gray-400'} outline-none`}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-white/40 hover:text-white/60' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Filter Dropdown */}
                    <div className="relative">
                        <Filter className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/30' : 'text-gray-400'}`} />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className={`pl-12 pr-10 py-3 rounded-xl border transition-all appearance-none cursor-pointer ${isDark ? 'bg-[#0a0a1a] border-white/[0.1] focus:border-green-500/50 text-white' : 'bg-white border-gray-200 focus:border-green-500 text-gray-900'} outline-none min-w-[180px]`}
                        >
                            <option value="all">All Tickets</option>
                            <option value="open">New Only</option>
                            <option value="in-progress">In Progress Only</option>
                            <option value="resolved">Resolved Only</option>
                        </select>
                    </div>
                </div>

                {/* Results count */}
                {(searchQuery || statusFilter !== 'all') && (
                    <p className={`mb-4 text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                        Showing {filteredTickets.length} of {tickets.length} tickets
                        {searchQuery && ` matching "${searchQuery}"`}
                    </p>
                )}

                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                    >
                        {success}
                    </motion.div>
                )}

                {/* Tickets List */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : filteredTickets.length === 0 ? (
                    <div className={`text-center py-20 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-gray-50 border border-gray-200'}`}>
                        <Ticket className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-white/20' : 'text-gray-300'}`} />
                        <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {searchQuery ? 'No Matching Tickets' : statusFilter === 'all' ? 'No Support Tickets' : `No ${statusConfig[statusFilter]?.label || statusFilter} tickets`}
                        </h3>
                        <p className={`${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                            {searchQuery
                                ? 'Try a different search term or clear the filter.'
                                : statusFilter === 'all'
                                    ? 'Support tickets will appear here when users submit requests.'
                                    : 'Try selecting a different filter.'
                            }
                        </p>
                        {(searchQuery || statusFilter !== 'all') && (
                            <button
                                onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}
                                className="mt-4 px-4 py-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredTickets.map((ticket, index) => {
                            const ContactIcon = contactMethodIcons[ticket.contactMethod] || Mail
                            const StatusIcon = statusConfig[ticket.status]?.icon || Clock
                            return (
                                <motion.div
                                    key={ticket._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => openModal(ticket)}
                                    className={`p-6 rounded-2xl cursor-pointer transition-all hover:scale-[1.01] ${isDark ? 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1]' : 'bg-white border border-gray-200 hover:shadow-lg hover:border-gray-300'}`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusClasses(ticket.status)}`}>
                                                    <StatusIcon className="w-3 h-3 inline mr-1" />
                                                    {statusConfig[ticket.status]?.label || ticket.status}
                                                </span>
                                                <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${isDark ? 'bg-white/10 text-white/70' : 'bg-gray-100 text-gray-600'}`}>
                                                    {ticket.category}
                                                </span>
                                            </div>
                                            <h3 className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {ticket.subject}
                                            </h3>
                                            <p className={`text-sm mb-3 line-clamp-2 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                                {ticket.message}
                                            </p>
                                            <div className="flex items-center flex-wrap gap-4 text-sm">
                                                <span className={isDark ? 'text-white/70' : 'text-gray-700'}>
                                                    {ticket.name}
                                                </span>
                                                <span className={`flex items-center gap-1.5 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                                    <ContactIcon className="w-4 h-4" />
                                                    {ticket.contactInfo}
                                                </span>
                                                <span className={isDark ? 'text-white/40' : 'text-gray-400'}>
                                                    {formatDate(ticket.createdAt)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {ticket.status !== 'resolved' && (
                                                <button
                                                    onClick={(e) => handleQuickStatus(e, ticket._id, 'resolved')}
                                                    className={`p-2 rounded-lg transition-all ${isDark ? 'hover:bg-green-500/10 text-green-400' : 'hover:bg-green-50 text-green-600'}`}
                                                    title="Mark as Resolved"
                                                >
                                                    <CheckCircle2 className="w-5 h-5" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                )}

                {/* Modal */}
                <AnimatePresence>
                    {showModal && selectedTicket && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                            onClick={closeModal}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl ${isDark ? 'bg-[#0a0a1a] border border-white/10' : 'bg-white border border-gray-200'}`}
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        Ticket Details
                                    </h2>
                                    <button onClick={closeModal} className={`p-2 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>
                                        <X className={`w-5 h-5 ${isDark ? 'text-white/60' : 'text-gray-500'}`} />
                                    </button>
                                </div>

                                {/* Ticket Info */}
                                <div className={`p-4 rounded-xl mb-6 ${isDark ? 'bg-white/[0.03]' : 'bg-gray-50'}`}>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <p className={`text-xs mb-1 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>From</p>
                                            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedTicket.name}</p>
                                        </div>
                                        <div>
                                            <p className={`text-xs mb-1 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>Category</p>
                                            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedTicket.category}</p>
                                        </div>
                                        <div>
                                            <p className={`text-xs mb-1 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>Contact Method</p>
                                            <p className={`font-medium flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {(() => {
                                                    const Icon = contactMethodIcons[selectedTicket.contactMethod] || Mail
                                                    return <Icon className="w-4 h-4" />
                                                })()}
                                                {selectedTicket.contactMethod.charAt(0).toUpperCase() + selectedTicket.contactMethod.slice(1)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className={`text-xs mb-1 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>Contact Info</p>
                                            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedTicket.contactInfo}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className={`text-xs mb-1 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>Submitted</p>
                                            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{formatDate(selectedTicket.createdAt)}</p>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <p className={`text-xs mb-1 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>Subject</p>
                                        <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedTicket.subject}</p>
                                    </div>

                                    <div>
                                        <p className={`text-xs mb-1 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>Message</p>
                                        <p className={`whitespace-pre-wrap ${isDark ? 'text-white/80' : 'text-gray-700'}`}>{selectedTicket.message}</p>
                                    </div>
                                </div>

                                {/* Update Form */}
                                <div className="space-y-4">
                                    <div>
                                        <label className={labelClass}>Status</label>
                                        <select
                                            value={editData.status}
                                            onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                                            className={inputClass}
                                        >
                                            <option value="open">New</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="resolved">Resolved</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className={labelClass}>Admin Notes</label>
                                        <textarea
                                            rows={4}
                                            value={editData.adminNotes}
                                            onChange={(e) => setEditData({ ...editData, adminNotes: e.target.value })}
                                            className={`${inputClass} resize-none`}
                                            placeholder="Add internal notes about this ticket..."
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                                        {error}
                                    </div>
                                )}

                                <div className="flex gap-3 mt-6">
                                    <a
                                        href={
                                            selectedTicket.contactMethod === 'email'
                                                ? `mailto:${selectedTicket.contactInfo}?subject=Re: ${encodeURIComponent(selectedTicket.subject)}`
                                                : selectedTicket.contactMethod === 'whatsapp'
                                                    ? `https://wa.me/${selectedTicket.contactInfo.replace(/\D/g, '')}`
                                                    : `tel:${selectedTicket.contactInfo}`
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${isDark ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                                    >
                                        <Send className="w-4 h-4" />
                                        Contact User
                                    </a>
                                    <button
                                        onClick={handleUpdateTicket}
                                        disabled={saving}
                                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {saving ? (
                                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4" />
                                                Update Ticket
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </AdminLayout>
    )
}

export default TicketsAdmin
