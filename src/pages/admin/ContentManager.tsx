import { useState, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Edit2, Trash2, Eye, EyeOff, GripVertical, X, Save, RefreshCw } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { adminApi } from '../../lib/api'

export interface FieldConfig {
    name: string
    label: string
    type: 'text' | 'textarea' | 'number' | 'select' | 'tags' | 'image' | 'toggle' | 'date'
    required?: boolean
    options?: { value: string; label: string }[]
    placeholder?: string
    defaultValue?: unknown
}

interface ContentManagerProps {
    title: string
    endpoint: string
    fields: FieldConfig[]
    columns: { key: string; label: string; render?: (item: Record<string, unknown>) => ReactNode }[]
    itemName?: string
}

const ContentManager = ({ title, endpoint, fields, columns, itemName = 'item' }: ContentManagerProps) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [items, setItems] = useState<Record<string, unknown>[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [editItem, setEditItem] = useState<Record<string, unknown> | null>(null)
    const [formData, setFormData] = useState<Record<string, unknown>>({})
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [tagInputValues, setTagInputValues] = useState<Record<string, string>>({})

    useEffect(() => {
        fetchItems()
    }, [])

    const fetchItems = async () => {
        setLoading(true)
        try {
            const response = await adminApi.get(`/admin/content/${endpoint}`)
            setItems(response.data || [])
        } catch (err) {
            console.error('Error fetching items:', err)
        } finally {
            setLoading(false)
        }
    }

    const openCreateModal = () => {
        const defaultData: Record<string, unknown> = {}
        fields.forEach(field => {
            defaultData[field.name] = field.defaultValue ?? (field.type === 'tags' ? [] : field.type === 'toggle' ? true : field.type === 'number' ? 0 : '')
        })
        setFormData(defaultData)
        setTagInputValues({})
        setEditItem(null)
        setShowModal(true)
        setError('')
    }

    const openEditModal = (item: Record<string, unknown>) => {
        setFormData({ ...item })
        setTagInputValues({})
        setEditItem(item)
        setShowModal(true)
        setError('')
    }

    const closeModal = () => {
        setShowModal(false)
        setEditItem(null)
        setFormData({})
        setTagInputValues({})
        setError('')
    }

    const handleSave = async () => {
        setSaving(true)
        setError('')
        try {
            if (editItem) {
                await adminApi.put(`/admin/content/${endpoint}/${editItem._id}`, formData)
            } else {
                await adminApi.post(`/admin/content/${endpoint}`, formData)
            }
            await fetchItems()
            closeModal()
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to save')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm(`Are you sure you want to delete this ${itemName}?`)) return
        try {
            await adminApi.delete(`/admin/content/${endpoint}/${id}`)
            await fetchItems()
        } catch (err) {
            console.error('Error deleting item:', err)
        }
    }

    const handleToggleActive = async (id: string) => {
        try {
            await adminApi.patch(`/admin/content/${endpoint}/${id}/toggle`)
            await fetchItems()
        } catch (err) {
            console.error('Error toggling item:', err)
        }
    }

    const handleFieldChange = (name: string, value: unknown) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleTagInputChange = (name: string, value: string) => {
        setTagInputValues(prev => ({ ...prev, [name]: value }))
    }

    const handleTagKeyDown = (name: string, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            const value = tagInputValues[name]?.trim()
            if (value) {
                const currentTags = (formData[name] as string[]) || []
                if (!currentTags.includes(value)) {
                    setFormData(prev => ({ ...prev, [name]: [...currentTags, value] }))
                }
                setTagInputValues(prev => ({ ...prev, [name]: '' }))
            }
        }
    }

    const removeTag = (name: string, tagToRemove: string) => {
        const currentTags = (formData[name] as string[]) || []
        setFormData(prev => ({ ...prev, [name]: currentTags.filter(t => t !== tagToRemove) }))
    }

    const filteredItems = items.filter(item => {
        if (!searchQuery) return true
        return Object.values(item).some(val =>
            String(val).toLowerCase().includes(searchQuery.toLowerCase())
        )
    })

    const inputClass = `w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${isDark ? 'bg-white/[0.03] border-white/[0.1] text-white placeholder:text-white/30' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'}`

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/30' : 'text-gray-400'}`} />
                    <input
                        type="text"
                        placeholder={`Search ${title.toLowerCase()}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full pl-12 pr-4 py-2.5 rounded-xl border transition-all ${isDark ? 'bg-white/[0.03] border-white/[0.1] text-white placeholder:text-white/30' : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'} outline-none focus:ring-2 focus:ring-violet-500/50`}
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={fetchItems}
                        className={`p-2.5 rounded-xl transition-all ${isDark ? 'bg-white/5 hover:bg-white/10 text-white/60' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                        onClick={openCreateModal}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Add {itemName}
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-white border border-gray-200 shadow-sm'}`}>
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className={`text-center py-20 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                        <p>No {title.toLowerCase()} found</p>
                        <button onClick={openCreateModal} className="mt-4 text-violet-500 hover:underline">
                            Create your first {itemName}
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className={`border-b ${isDark ? 'border-white/[0.05]' : 'border-gray-100'}`}>
                                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                        #
                                    </th>
                                    {columns.map(col => (
                                        <th key={col.key} className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                            {col.label}
                                        </th>
                                    ))}
                                    <th className={`px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((item, index) => (
                                    <motion.tr
                                        key={item._id as string}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className={`border-b last:border-0 ${isDark ? 'border-white/[0.05] hover:bg-white/[0.02]' : 'border-gray-100 hover:bg-gray-50'} transition-colors`}
                                    >
                                        <td className={`px-6 py-4 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                                            {index + 1}
                                        </td>
                                        {columns.map(col => (
                                            <td key={col.key} className={`px-6 py-4 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                                                {col.render ? col.render(item) : String(item[col.key] ?? '')}
                                            </td>
                                        ))}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                {item.isActive !== undefined && (
                                                    <button
                                                        onClick={() => handleToggleActive(item._id as string)}
                                                        className={`p-2 rounded-lg transition-colors ${item.isActive
                                                            ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                                                            : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
                                                            }`}
                                                        title={item.isActive ? 'Active - Click to deactivate' : 'Inactive - Click to activate'}
                                                    >
                                                        {item.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => openEditModal(item)}
                                                    className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}
                                                    title="Edit"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item._id as string)}
                                                    className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={closeModal}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className={`relative w-[95vw] max-w-2xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl ${isDark ? 'bg-[#0a0a1a] border border-white/10' : 'bg-white border border-gray-200'}`}
                        >
                            {/* Modal Header */}
                            <div className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {editItem ? `Edit ${itemName}` : `Add ${itemName}`}
                                </h3>
                                <button onClick={closeModal} className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10 text-white/60' : 'hover:bg-gray-100 text-gray-500'}`}>
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {error && (
                                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                        {error}
                                    </div>
                                )}

                                {fields.map(field => (
                                    <div key={field.name}>
                                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                                            {field.label} {field.required && <span className="text-red-400">*</span>}
                                        </label>

                                        {field.type === 'textarea' ? (
                                            <textarea
                                                value={String(formData[field.name] || '')}
                                                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                                                placeholder={field.placeholder}
                                                rows={4}
                                                className={inputClass}
                                                required={field.required}
                                            />
                                        ) : field.type === 'select' ? (
                                            <select
                                                value={String(formData[field.name] || '')}
                                                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                                                className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${isDark ? 'bg-[#1a1a2e] border-white/[0.1] text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                                                required={field.required}
                                                style={isDark ? { colorScheme: 'dark' } : {}}
                                            >
                                                <option value="" className={isDark ? 'bg-[#1a1a2e] text-white' : ''}>Select {field.label}</option>
                                                {field.options?.map(opt => (
                                                    <option key={opt.value} value={opt.value} className={isDark ? 'bg-[#1a1a2e] text-white' : ''}>{opt.label}</option>
                                                ))}
                                            </select>
                                        ) : field.type === 'tags' ? (
                                            <div>
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    {((formData[field.name] as string[]) || []).map((tag, idx) => (
                                                        <span
                                                            key={idx}
                                                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${isDark ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' : 'bg-violet-100 text-violet-700 border border-violet-200'}`}
                                                        >
                                                            {tag}
                                                            <button
                                                                type="button"
                                                                onClick={() => removeTag(field.name, tag)}
                                                                className={`ml-1 hover:text-red-400 transition-colors`}
                                                            >
                                                                <X className="w-3 h-3" />
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
                                                <input
                                                    type="text"
                                                    value={tagInputValues[field.name] || ''}
                                                    onChange={(e) => handleTagInputChange(field.name, e.target.value)}
                                                    onKeyDown={(e) => handleTagKeyDown(field.name, e)}
                                                    placeholder={field.placeholder || 'Type a tag and press Enter'}
                                                    className={inputClass}
                                                />
                                                <p className={`mt-1 text-xs ${isDark ? 'text-white/40' : 'text-gray-400'}`}>Press Enter to add a tag</p>
                                            </div>
                                        ) : field.type === 'toggle' ? (
                                            <button
                                                type="button"
                                                onClick={() => handleFieldChange(field.name, !formData[field.name])}
                                                className={`relative w-14 h-8 rounded-full transition-colors ${formData[field.name] ? 'bg-violet-600' : isDark ? 'bg-white/20' : 'bg-gray-300'}`}
                                            >
                                                <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${formData[field.name] ? 'left-7' : 'left-1'}`} />
                                            </button>
                                        ) : field.type === 'number' ? (
                                            <input
                                                type="number"
                                                value={String(formData[field.name] || 0)}
                                                onChange={(e) => handleFieldChange(field.name, Number(e.target.value))}
                                                placeholder={field.placeholder}
                                                className={inputClass}
                                                required={field.required}
                                            />
                                        ) : field.type === 'date' ? (
                                            <input
                                                type="date"
                                                value={formData[field.name] ? new Date(formData[field.name] as string).toISOString().split('T')[0] : ''}
                                                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                                                className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${isDark ? 'bg-[#1a1a2e] border-white/[0.1] text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                                                style={isDark ? { colorScheme: 'dark' } : {}}
                                                required={field.required}
                                            />
                                        ) : (
                                            <input
                                                type={field.type === 'image' ? 'url' : 'text'}
                                                value={String(formData[field.name] || '')}
                                                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                                                placeholder={field.placeholder}
                                                className={inputClass}
                                                required={field.required}
                                            />
                                        )}

                                        {field.type === 'image' && formData[field.name] && (
                                            <img
                                                src={String(formData[field.name])}
                                                alt="Preview"
                                                className="mt-2 w-32 h-20 object-cover rounded-lg"
                                                onError={(e) => (e.currentTarget.style.display = 'none')}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Modal Footer */}
                            <div className={`flex items-center justify-end gap-3 px-6 py-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                                <button
                                    onClick={closeModal}
                                    className={`px-4 py-2.5 rounded-xl font-medium transition-all ${isDark ? 'text-white/60 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all disabled:opacity-50"
                                >
                                    {saving ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            {editItem ? 'Update' : 'Create'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ContentManager
