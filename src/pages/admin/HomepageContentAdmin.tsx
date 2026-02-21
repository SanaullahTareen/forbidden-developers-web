import { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'
import { motion } from 'framer-motion'
import { Edit2, Trash2, Save, X, Loader2, Code, Zap, Building2 } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { adminApi } from '../../lib/api'

// ==================== TYPES ====================
interface TechSkill {
    _id?: string
    name: string
    order: number
    isActive: boolean
}

interface WhyChooseUs {
    _id?: string
    title: string
    description: string
    icon: string
    order: number
    isActive: boolean
}

interface TrustedPartner {
    _id?: string
    name: string
    website: string
    order: number
    isActive: boolean
}

// ==================== ICON OPTIONS ====================
const iconOptions = [
    { value: 'Brain', label: 'Brain' },
    { value: 'Cpu', label: 'CPU' },
    { value: 'Users', label: 'Users' },
    { value: 'Zap', label: 'Zap' },
    { value: 'Shield', label: 'Shield' },
    { value: 'Clock', label: 'Clock' },
    { value: 'Heart', label: 'Heart' },
    { value: 'Rocket', label: 'Rocket' },
    { value: 'Star', label: 'Star' },
    { value: 'Award', label: 'Award' },
    { value: 'Code', label: 'Code' },
    { value: 'Globe', label: 'Globe' },
]

// ==================== COMPONENT ====================
const HomepageContentAdmin = () => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [activeTab, setActiveTab] = useState<'tech' | 'whychoose' | 'partners'>('tech')

    // Tech Skills state
    const [techSkills, setTechSkills] = useState<TechSkill[]>([])
    const [techLoading, setTechLoading] = useState(true)
    const [techEditing, setTechEditing] = useState<TechSkill | null>(null)
    const [techForm, setTechForm] = useState<Partial<TechSkill>>({ name: '', order: 0, isActive: true })

    // Why Choose Us state
    const [whyChooseUs, setWhyChooseUs] = useState<WhyChooseUs[]>([])
    const [whyLoading, setWhyLoading] = useState(true)
    const [whyEditing, setWhyEditing] = useState<WhyChooseUs | null>(null)
    const [whyForm, setWhyForm] = useState<Partial<WhyChooseUs>>({ title: '', description: '', icon: 'Brain', order: 0, isActive: true })

    // Trusted Partners state
    const [partners, setPartners] = useState<TrustedPartner[]>([])
    const [partnerLoading, setPartnerLoading] = useState(true)
    const [partnerEditing, setPartnerEditing] = useState<TrustedPartner | null>(null)
    const [partnerForm, setPartnerForm] = useState<Partial<TrustedPartner>>({ name: '', website: '', order: 0, isActive: true })

    const [saving, setSaving] = useState(false)

    // ==================== FETCH DATA ====================
    useEffect(() => {
        fetchTechSkills()
        fetchWhyChooseUs()
        fetchPartners()
    }, [])

    const fetchTechSkills = async () => {
        try {
            const res = await adminApi.get('/admin/content/tech-skills')
            setTechSkills(res.data || [])
        } catch (error) {
            console.error('Failed to fetch tech skills:', error)
        } finally {
            setTechLoading(false)
        }
    }

    const fetchWhyChooseUs = async () => {
        try {
            const res = await adminApi.get('/admin/content/skills')
            setWhyChooseUs(res.data || [])
        } catch (error) {
            console.error('Failed to fetch why choose us:', error)
        } finally {
            setWhyLoading(false)
        }
    }

    const fetchPartners = async () => {
        try {
            const res = await adminApi.get('/admin/content/trusted-partners')
            setPartners(res.data || [])
        } catch (error) {
            console.error('Failed to fetch partners:', error)
        } finally {
            setPartnerLoading(false)
        }
    }

    // ==================== TECH SKILLS CRUD ====================
    const handleTechSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        try {
            if (techEditing?._id) {
                await adminApi.put(`/admin/content/tech-skills/${techEditing._id}`, techForm)
            } else {
                await adminApi.post('/admin/content/tech-skills', techForm)
            }
            fetchTechSkills()
            setTechEditing(null)
            setTechForm({ name: '', order: 0, isActive: true })
        } catch (error) {
            console.error('Failed to save tech skill:', error)
        } finally {
            setSaving(false)
        }
    }

    const handleTechEdit = (skill: TechSkill) => {
        setTechEditing(skill)
        setTechForm(skill)
    }

    const handleTechDelete = async (id: string) => {
        if (!confirm('Delete this tech skill?')) return
        try {
            await adminApi.delete(`/admin/content/tech-skills/${id}`)
            fetchTechSkills()
        } catch (error) {
            console.error('Failed to delete:', error)
        }
    }

    // ==================== WHY CHOOSE US CRUD ====================
    const handleWhySubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        try {
            if (whyEditing?._id) {
                await adminApi.put(`/admin/content/skills/${whyEditing._id}`, whyForm)
            } else {
                await adminApi.post('/admin/content/skills', whyForm)
            }
            fetchWhyChooseUs()
            setWhyEditing(null)
            setWhyForm({ title: '', description: '', icon: 'Brain', order: 0, isActive: true })
        } catch (error) {
            console.error('Failed to save:', error)
        } finally {
            setSaving(false)
        }
    }

    const handleWhyEdit = (item: WhyChooseUs) => {
        setWhyEditing(item)
        setWhyForm(item)
    }

    const handleWhyDelete = async (id: string) => {
        if (!confirm('Delete this item?')) return
        try {
            await adminApi.delete(`/admin/content/skills/${id}`)
            fetchWhyChooseUs()
        } catch (error) {
            console.error('Failed to delete:', error)
        }
    }

    // ==================== PARTNERS CRUD ====================
    const handlePartnerSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        try {
            if (partnerEditing?._id) {
                await adminApi.put(`/admin/content/trusted-partners/${partnerEditing._id}`, partnerForm)
            } else {
                await adminApi.post('/admin/content/trusted-partners', partnerForm)
            }
            fetchPartners()
            setPartnerEditing(null)
            setPartnerForm({ name: '', website: '', order: 0, isActive: true })
        } catch (error) {
            console.error('Failed to save partner:', error)
        } finally {
            setSaving(false)
        }
    }

    const handlePartnerEdit = (partner: TrustedPartner) => {
        setPartnerEditing(partner)
        setPartnerForm(partner)
    }

    const handlePartnerDelete = async (id: string) => {
        if (!confirm('Delete this partner?')) return
        try {
            await adminApi.delete(`/admin/content/trusted-partners/${id}`)
            fetchPartners()
        } catch (error) {
            console.error('Failed to delete:', error)
        }
    }

    // ==================== RENDER ====================
    const tabs = [
        { id: 'tech', label: 'Technology Stack', icon: Code, count: techSkills.length },
        { id: 'whychoose', label: 'Why Companies Choose Us', icon: Zap, count: whyChooseUs.length },
        { id: 'partners', label: 'Trusted Partners', icon: Building2, count: partners.length },
    ]

    return (
        <AdminLayout>
            <div className="p-6 md:p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Homepage Content
                    </h1>
                    <p className={`mt-1 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                        Manage the homepage sections: Technology Stack, Why Choose Us, and Trusted Partners
                    </p>
                </div>

                {/* Tabs */}
                <div className={`flex flex-wrap gap-2 p-1 rounded-xl mb-8 ${isDark ? 'bg-white/[0.03]' : 'bg-gray-100'}`}>
                    {tabs.map((tab) => {
                        const Icon = tab.icon
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as 'tech' | 'whychoose' | 'partners')}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg'
                                    : isDark ? 'text-white/60 hover:text-white hover:bg-white/[0.05]' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                                <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-white/20' : isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                                    {tab.count}
                                </span>
                            </button>
                        )
                    })}
                </div>

                {/* Tech Skills Tab */}
                {activeTab === 'tech' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Form */}
                            <div className={`p-6 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/10' : 'bg-white border border-gray-200 shadow-sm'}`}>
                                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {techEditing ? 'Edit Tech Skill' : 'Add Tech Skill'}
                                </h3>
                                <form onSubmit={handleTechSubmit} className="space-y-4">
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Name *</label>
                                        <input
                                            type="text"
                                            value={techForm.name || ''}
                                            onChange={(e) => setTechForm({ ...techForm, name: e.target.value })}
                                            required
                                            className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-white border-gray-200'} outline-none focus:ring-2 focus:ring-violet-500/50`}
                                            placeholder="e.g., React, Node.js, TensorFlow"
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Order</label>
                                        <input
                                            type="number"
                                            value={techForm.order || 0}
                                            onChange={(e) => setTechForm({ ...techForm, order: parseInt(e.target.value) || 0 })}
                                            className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-white border-gray-200'} outline-none focus:ring-2 focus:ring-violet-500/50`}
                                        />
                                    </div>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={techForm.isActive ?? true}
                                            onChange={(e) => setTechForm({ ...techForm, isActive: e.target.checked })}
                                            className="w-4 h-4 rounded text-violet-500"
                                        />
                                        <span className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Active</span>
                                    </label>
                                    <div className="flex gap-2">
                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className="flex-1 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                            {techEditing ? 'Update' : 'Add'}
                                        </button>
                                        {techEditing && (
                                            <button
                                                type="button"
                                                onClick={() => { setTechEditing(null); setTechForm({ name: '', order: 0, isActive: true }) }}
                                                className={`px-4 py-2 rounded-lg ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-700'}`}
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>

                            {/* List */}
                            <div className="lg:col-span-2">
                                {techLoading ? (
                                    <div className="flex items-center justify-center py-12">
                                        <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
                                    </div>
                                ) : techSkills.length === 0 ? (
                                    <div className={`text-center py-12 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
                                        <Code className={`w-12 h-12 mx-auto mb-3 ${isDark ? 'text-white/20' : 'text-gray-300'}`} />
                                        <p className={isDark ? 'text-white/50' : 'text-gray-500'}>No tech skills added yet</p>
                                    </div>
                                ) : (
                                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
                                        {techSkills.map((skill) => (
                                            <div
                                                key={skill._id}
                                                className={`p-4 rounded-xl flex items-center justify-between ${isDark ? 'bg-white/[0.02] border border-white/10' : 'bg-white border border-gray-200 shadow-sm'} ${!skill.isActive ? 'opacity-50' : ''}`}
                                            >
                                                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{skill.name}</span>
                                                <div className="flex gap-1">
                                                    <button onClick={() => handleTechEdit(skill)} className={`p-1.5 rounded ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>
                                                        <Edit2 className="w-3.5 h-3.5 text-blue-500" />
                                                    </button>
                                                    <button onClick={() => handleTechDelete(skill._id!)} className={`p-1.5 rounded ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>
                                                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Why Choose Us Tab */}
                {activeTab === 'whychoose' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Form */}
                            <div className={`p-6 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/10' : 'bg-white border border-gray-200 shadow-sm'}`}>
                                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {whyEditing ? 'Edit Item' : 'Add Item'}
                                </h3>
                                <form onSubmit={handleWhySubmit} className="space-y-4">
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Title *</label>
                                        <input
                                            type="text"
                                            value={whyForm.title || ''}
                                            onChange={(e) => setWhyForm({ ...whyForm, title: e.target.value })}
                                            required
                                            className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-white border-gray-200'} outline-none focus:ring-2 focus:ring-violet-500/50`}
                                            placeholder="e.g., AI Innovation"
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Description *</label>
                                        <input
                                            type="text"
                                            value={whyForm.description || ''}
                                            onChange={(e) => setWhyForm({ ...whyForm, description: e.target.value })}
                                            required
                                            className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-white border-gray-200'} outline-none focus:ring-2 focus:ring-violet-500/50`}
                                            placeholder="e.g., Cutting-edge AI solutions"
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Icon</label>
                                        <select
                                            value={whyForm.icon || 'Brain'}
                                            onChange={(e) => setWhyForm({ ...whyForm, icon: e.target.value })}
                                            className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-[#0a0a1a] border-white/10 text-white' : 'bg-white border-gray-200'} outline-none focus:ring-2 focus:ring-violet-500/50`}
                                        >
                                            {iconOptions.map((opt) => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Order</label>
                                        <input
                                            type="number"
                                            value={whyForm.order || 0}
                                            onChange={(e) => setWhyForm({ ...whyForm, order: parseInt(e.target.value) || 0 })}
                                            className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-white border-gray-200'} outline-none focus:ring-2 focus:ring-violet-500/50`}
                                        />
                                    </div>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={whyForm.isActive ?? true}
                                            onChange={(e) => setWhyForm({ ...whyForm, isActive: e.target.checked })}
                                            className="w-4 h-4 rounded text-violet-500"
                                        />
                                        <span className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Active</span>
                                    </label>
                                    <div className="flex gap-2">
                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className="flex-1 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                            {whyEditing ? 'Update' : 'Add'}
                                        </button>
                                        {whyEditing && (
                                            <button
                                                type="button"
                                                onClick={() => { setWhyEditing(null); setWhyForm({ title: '', description: '', icon: 'Brain', order: 0, isActive: true }) }}
                                                className={`px-4 py-2 rounded-lg ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-700'}`}
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>

                            {/* List */}
                            <div className="lg:col-span-2">
                                {whyLoading ? (
                                    <div className="flex items-center justify-center py-12">
                                        <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
                                    </div>
                                ) : whyChooseUs.length === 0 ? (
                                    <div className={`text-center py-12 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
                                        <Zap className={`w-12 h-12 mx-auto mb-3 ${isDark ? 'text-white/20' : 'text-gray-300'}`} />
                                        <p className={isDark ? 'text-white/50' : 'text-gray-500'}>No items added yet</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {whyChooseUs.map((item) => (
                                            <div
                                                key={item._id}
                                                className={`p-4 rounded-xl flex items-center justify-between ${isDark ? 'bg-white/[0.02] border border-white/10' : 'bg-white border border-gray-200 shadow-sm'} ${!item.isActive ? 'opacity-50' : ''}`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-violet-500/20' : 'bg-violet-100'}`}>
                                                        <span className={`text-sm ${isDark ? 'text-violet-400' : 'text-violet-600'}`}>{item.icon}</span>
                                                    </div>
                                                    <div>
                                                        <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h4>
                                                        <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{item.description}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1">
                                                    <button onClick={() => handleWhyEdit(item)} className={`p-2 rounded ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>
                                                        <Edit2 className="w-4 h-4 text-blue-500" />
                                                    </button>
                                                    <button onClick={() => handleWhyDelete(item._id!)} className={`p-2 rounded ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>
                                                        <Trash2 className="w-4 h-4 text-red-500" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Trusted Partners Tab */}
                {activeTab === 'partners' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Form */}
                            <div className={`p-6 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/10' : 'bg-white border border-gray-200 shadow-sm'}`}>
                                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {partnerEditing ? 'Edit Partner' : 'Add Partner'}
                                </h3>
                                <form onSubmit={handlePartnerSubmit} className="space-y-4">
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Company Name *</label>
                                        <input
                                            type="text"
                                            value={partnerForm.name || ''}
                                            onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                                            required
                                            className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-white border-gray-200'} outline-none focus:ring-2 focus:ring-violet-500/50`}
                                            placeholder="e.g., TechStart"
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Website URL</label>
                                        <input
                                            type="text"
                                            value={partnerForm.website || ''}
                                            onChange={(e) => setPartnerForm({ ...partnerForm, website: e.target.value })}
                                            className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-white border-gray-200'} outline-none focus:ring-2 focus:ring-violet-500/50`}
                                            placeholder="https://example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Order</label>
                                        <input
                                            type="number"
                                            value={partnerForm.order || 0}
                                            onChange={(e) => setPartnerForm({ ...partnerForm, order: parseInt(e.target.value) || 0 })}
                                            className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-white border-gray-200'} outline-none focus:ring-2 focus:ring-violet-500/50`}
                                        />
                                    </div>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={partnerForm.isActive ?? true}
                                            onChange={(e) => setPartnerForm({ ...partnerForm, isActive: e.target.checked })}
                                            className="w-4 h-4 rounded text-violet-500"
                                        />
                                        <span className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Active</span>
                                    </label>
                                    <div className="flex gap-2">
                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className="flex-1 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                            {partnerEditing ? 'Update' : 'Add'}
                                        </button>
                                        {partnerEditing && (
                                            <button
                                                type="button"
                                                onClick={() => { setPartnerEditing(null); setPartnerForm({ name: '', website: '', order: 0, isActive: true }) }}
                                                className={`px-4 py-2 rounded-lg ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-700'}`}
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>

                            {/* List */}
                            <div className="lg:col-span-2">
                                {partnerLoading ? (
                                    <div className="flex items-center justify-center py-12">
                                        <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
                                    </div>
                                ) : partners.length === 0 ? (
                                    <div className={`text-center py-12 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
                                        <Building2 className={`w-12 h-12 mx-auto mb-3 ${isDark ? 'text-white/20' : 'text-gray-300'}`} />
                                        <p className={isDark ? 'text-white/50' : 'text-gray-500'}>No partners added yet</p>
                                    </div>
                                ) : (
                                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
                                        {partners.map((partner) => (
                                            <div
                                                key={partner._id}
                                                className={`p-4 rounded-xl ${isDark ? 'bg-white/[0.02] border border-white/10' : 'bg-white border border-gray-200 shadow-sm'} ${!partner.isActive ? 'opacity-50' : ''}`}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{partner.name}</span>
                                                    <div className="flex gap-1">
                                                        <button onClick={() => handlePartnerEdit(partner)} className={`p-1.5 rounded ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>
                                                            <Edit2 className="w-3.5 h-3.5 text-blue-500" />
                                                        </button>
                                                        <button onClick={() => handlePartnerDelete(partner._id!)} className={`p-1.5 rounded ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>
                                                            <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                                        </button>
                                                    </div>
                                                </div>
                                                {partner.website && (
                                                    <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-xs text-violet-400 hover:underline">
                                                        {partner.website}
                                                    </a>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </AdminLayout>
    )
}

export default HomepageContentAdmin
