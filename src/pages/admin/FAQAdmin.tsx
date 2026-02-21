import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, RefreshCw, Save, X, HelpCircle, ChevronUp, ChevronDown, Filter } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { adminApi } from '../../lib/api'
import AdminLayout from './AdminLayout'

interface FAQ {
    _id: string
    question: string
    answer: string
    category: string
    order: number
    isActive: boolean
    createdAt: string
}

const categories = [
    { value: 'general', label: 'General' },
    { value: 'services', label: 'Services' },
    { value: 'pricing', label: 'Pricing' },
    { value: 'technical', label: 'Technical' },
    { value: 'support', label: 'Support' },
]

const FAQAdmin = () => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [faqs, setFaqs] = useState<FAQ[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [activeFilter, setActiveFilter] = useState<string>('all')

    const [formData, setFormData] = useState({
        question: '',
        answer: '',
        category: 'general',
        order: 0,
        isActive: true
    })

    useEffect(() => {
        fetchFAQs()
    }, [])

    const fetchFAQs = async () => {
        setLoading(true)
        try {
            const response = await adminApi.get('/admin/content/faqs')
            setFaqs(response.data?.data || response.data || [])
        } catch (err) {
            console.error('Error fetching FAQs:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setError('')

        try {
            if (editingFAQ) {
                await adminApi.put(`/admin/content/faqs/${editingFAQ._id}`, formData)
                setSuccess('FAQ updated successfully!')
            } else {
                await adminApi.post('/admin/content/faqs', formData)
                setSuccess('FAQ created successfully!')
            }
            fetchFAQs()
            closeModal()
            setTimeout(() => setSuccess(''), 3000)
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to save FAQ')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this FAQ?')) return

        try {
            await adminApi.delete(`/admin/content/faqs/${id}`)
            setSuccess('FAQ deleted successfully!')
            fetchFAQs()
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError('Failed to delete FAQ')
        }
    }

    const handleReorder = async (id: string, direction: 'up' | 'down') => {
        const index = faqs.findIndex(f => f._id === id)
        if (index === -1) return
        if (direction === 'up' && index === 0) return
        if (direction === 'down' && index === faqs.length - 1) return

        const newFaqs = [...faqs]
        const swapIndex = direction === 'up' ? index - 1 : index + 1

        // Swap orders
        const tempOrder = newFaqs[index].order
        newFaqs[index].order = newFaqs[swapIndex].order
        newFaqs[swapIndex].order = tempOrder

        try {
            await Promise.all([
                adminApi.put(`/admin/content/faqs/${newFaqs[index]._id}`, { order: newFaqs[index].order }),
                adminApi.put(`/admin/content/faqs/${newFaqs[swapIndex]._id}`, { order: newFaqs[swapIndex].order })
            ])
            fetchFAQs()
        } catch (err) {
            console.error('Error reordering FAQs:', err)
        }
    }

    const openModal = (faq?: FAQ) => {
        if (faq) {
            setEditingFAQ(faq)
            setFormData({
                question: faq.question,
                answer: faq.answer,
                category: faq.category,
                order: faq.order,
                isActive: faq.isActive
            })
        } else {
            setEditingFAQ(null)
            setFormData({
                question: '',
                answer: '',
                category: 'general',
                order: faqs.length,
                isActive: true
            })
        }
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        setEditingFAQ(null)
        setError('')
    }

    // Filter FAQs by category
    const filteredFaqs = useMemo(() => {
        if (activeFilter === 'all') return faqs
        return faqs.filter(faq => faq.category === activeFilter)
    }, [faqs, activeFilter])

    // Count FAQs per category
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { all: faqs.length }
        categories.forEach(cat => {
            counts[cat.value] = faqs.filter(f => f.category === cat.value).length
        })
        return counts
    }, [faqs])

    const inputClass = `w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-green-500/50 ${isDark ? 'bg-[#0a0a1a] border-white/[0.1] text-white placeholder:text-white/30' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'}`
    const labelClass = `block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`

    return (
        <AdminLayout>
            <div className="max-w-5xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>FAQ Management</h1>
                        <p className={`mt-1 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Manage frequently asked questions</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={fetchFAQs}
                            className={`p-2.5 rounded-xl transition-all ${isDark ? 'bg-white/5 hover:bg-white/10 text-white/60' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            onClick={() => openModal()}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all"
                        >
                            <Plus className="w-4 h-4" />
                            Add FAQ
                        </button>
                    </div>
                </div>

                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                    >
                        {success}
                    </motion.div>
                )}

                {/* Category Filters */}
                {faqs.length > 0 && (
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Filter className={`w-4 h-4 ${isDark ? 'text-white/50' : 'text-gray-500'}`} />
                            <span className={`text-sm font-medium ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Filter by Category</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setActiveFilter('all')}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeFilter === 'all'
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25'
                                        : isDark
                                            ? 'bg-white/[0.05] text-white/60 hover:bg-white/[0.1]'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                All ({categoryCounts.all})
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.value}
                                    onClick={() => setActiveFilter(cat.value)}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeFilter === cat.value
                                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25'
                                            : isDark
                                                ? 'bg-white/[0.05] text-white/60 hover:bg-white/[0.1]'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {cat.label} ({categoryCounts[cat.value] || 0})
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* FAQs List */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : faqs.length === 0 ? (
                    <div className={`text-center py-20 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-gray-50 border border-gray-200'}`}>
                        <HelpCircle className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-white/20' : 'text-gray-300'}`} />
                        <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>No FAQs Yet</h3>
                        <p className={`mb-6 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Create your first FAQ to help users find answers quickly.</p>
                        <button
                            onClick={() => openModal()}
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium"
                        >
                            Add Your First FAQ
                        </button>
                    </div>
                ) : filteredFaqs.length === 0 ? (
                    <div className={`text-center py-16 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-gray-50 border border-gray-200'}`}>
                        <Filter className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-white/20' : 'text-gray-300'}`} />
                        <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>No FAQs in this category</h3>
                        <p className={`mb-4 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                            No FAQs found in "{categories.find(c => c.value === activeFilter)?.label || activeFilter}".
                        </p>
                        <button
                            onClick={() => setActiveFilter('all')}
                            className={`px-4 py-2 rounded-xl text-sm font-medium ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-all`}
                        >
                            View All FAQs
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredFaqs.map((faq, index) => (
                            <motion.div
                                key={faq._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`p-6 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-white border border-gray-200'}`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex flex-col gap-1">
                                        <button
                                            onClick={() => handleReorder(faq._id, 'up')}
                                            disabled={index === 0}
                                            className={`p-1 rounded transition-all ${index === 0 ? 'opacity-30' : isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                                        >
                                            <ChevronUp className={`w-4 h-4 ${isDark ? 'text-white/60' : 'text-gray-500'}`} />
                                        </button>
                                        <button
                                            onClick={() => handleReorder(faq._id, 'down')}
                                            disabled={index === filteredFaqs.length - 1}
                                            className={`p-1 rounded transition-all ${index === filteredFaqs.length - 1 ? 'opacity-30' : isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                                        >
                                            <ChevronDown className={`w-4 h-4 ${isDark ? 'text-white/60' : 'text-gray-500'}`} />
                                        </button>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'}`}>
                                                {categories.find(c => c.value === faq.category)?.label || faq.category}
                                            </span>
                                            {!faq.isActive && (
                                                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700'}`}>
                                                    Inactive
                                                </span>
                                            )}
                                        </div>
                                        <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            {faq.question}
                                        </h3>
                                        <p className={`${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                            {faq.answer}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => openModal(faq)}
                                            className={`p-2 rounded-lg transition-all ${isDark ? 'hover:bg-white/10 text-white/60' : 'hover:bg-gray-100 text-gray-500'}`}
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(faq._id)}
                                            className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Modal */}
                <AnimatePresence>
                    {showModal && (
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
                                className={`w-full max-w-2xl p-6 rounded-2xl ${isDark ? 'bg-[#0a0a1a] border border-white/10' : 'bg-white border border-gray-200'}`}
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {editingFAQ ? 'Edit FAQ' : 'Add New FAQ'}
                                    </h2>
                                    <button onClick={closeModal} className={`p-2 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>
                                        <X className={`w-5 h-5 ${isDark ? 'text-white/60' : 'text-gray-500'}`} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-4">
                                        <div>
                                            <label className={labelClass}>Question *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.question}
                                                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                                className={inputClass}
                                                placeholder="What is your question?"
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClass}>Answer *</label>
                                            <textarea
                                                required
                                                rows={4}
                                                value={formData.answer}
                                                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                                className={`${inputClass} resize-none`}
                                                placeholder="Provide a detailed answer..."
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className={labelClass}>Category</label>
                                                <select
                                                    value={formData.category}
                                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                    className={inputClass}
                                                >
                                                    {categories.map(cat => (
                                                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className={labelClass}>Status</label>
                                                <select
                                                    value={formData.isActive ? 'active' : 'inactive'}
                                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })}
                                                    className={inputClass}
                                                >
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                                            {error}
                                        </div>
                                    )}

                                    <div className="flex gap-3 mt-6">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className={`flex-1 py-3 rounded-xl font-medium transition-all ${isDark ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {saving ? (
                                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <Save className="w-4 h-4" />
                                                    {editingFAQ ? 'Update FAQ' : 'Create FAQ'}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </AdminLayout>
    )
}

export default FAQAdmin
