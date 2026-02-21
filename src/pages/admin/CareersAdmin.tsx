import { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, Save, X, Loader2, Briefcase, Users, ChevronRight, Eye, FileText, HelpCircle, Filter } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { adminApi, API_BASE_URL } from '../../lib/api'

// Backend base URL for file serving (without /api)
const BACKEND_URL = API_BASE_URL.replace('/api', '')

// ==================== TYPES ====================
interface CustomQuestion {
    question: string
    type: 'text' | 'textarea' | 'select' | 'yesno'
    options?: string[]
    required: boolean
}

interface Job {
    _id?: string
    title: string
    department: string
    location: string
    type: string
    description: string
    requirements: string[]
    tags: string[]
    salary: string
    customQuestions: CustomQuestion[]
    order: number
    isActive: boolean
    createdAt?: string
}

interface JobApplication {
    _id: string
    jobId: string
    jobTitle: string
    name: string
    email: string
    phone: string
    resumeUrl: string
    resumeFilename: string
    coverLetter: string
    customAnswers: Record<string, string>
    status: string
    notes: string
    createdAt: string
}

// ==================== QUESTION TEMPLATES ====================
const questionTemplates = [
    { question: 'Why are you interested in this position?', type: 'textarea' as const, required: true },
    { question: 'What are your salary expectations?', type: 'text' as const, required: false },
    { question: 'When can you start?', type: 'text' as const, required: true },
    { question: 'Are you authorized to work in this country?', type: 'yesno' as const, required: true },
    { question: 'Do you require visa sponsorship?', type: 'yesno' as const, required: true },
    { question: 'Years of experience', type: 'select' as const, options: ['0-1', '2-3', '4-5', '6-10', '10+'], required: true },
    { question: 'How did you hear about us?', type: 'select' as const, options: ['LinkedIn', 'Indeed', 'Company Website', 'Referral', 'Other'], required: false },
    { question: 'Are you willing to relocate?', type: 'yesno' as const, required: false },
    { question: 'Do you have experience with remote work?', type: 'yesno' as const, required: false },
    { question: 'Describe a challenging project you worked on', type: 'textarea' as const, required: false },
]

const typeOptions = [
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Part-time', label: 'Part-time' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Internship', label: 'Internship' },
]

const statusColors: Record<string, string> = {
    new: 'bg-blue-500/20 text-blue-400',
    reviewing: 'bg-yellow-500/20 text-yellow-400',
    shortlisted: 'bg-purple-500/20 text-purple-400',
    interviewed: 'bg-cyan-500/20 text-cyan-400',
    rejected: 'bg-red-500/20 text-red-400',
    hired: 'bg-green-500/20 text-green-400',
}

// ==================== COMPONENT ====================
const CareersAdmin = () => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    // Jobs state
    const [jobs, setJobs] = useState<Job[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    // Form state
    const [showForm, setShowForm] = useState(false)
    const [editingJob, setEditingJob] = useState<Job | null>(null)
    const [formStep, setFormStep] = useState<1 | 2>(1)
    const [jobForm, setJobForm] = useState<Partial<Job>>({
        title: '',
        department: '',
        location: '',
        type: 'Full-time',
        description: '',
        requirements: [],
        tags: [],
        salary: '',
        customQuestions: [],
        order: 0,
        isActive: true,
    })
    const [requirementInput, setRequirementInput] = useState('')
    const [tagInput, setTagInput] = useState('')

    // Applications state
    const [selectedJob, setSelectedJob] = useState<Job | null>(null)
    const [applications, setApplications] = useState<JobApplication[]>([])
    const [loadingApps, setLoadingApps] = useState(false)
    const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null)
    const [statusFilter, setStatusFilter] = useState<string>('all')

    // ==================== FETCH DATA ====================
    useEffect(() => {
        fetchJobs()
    }, [])

    const fetchJobs = async () => {
        try {
            const res = await adminApi.get('/admin/content/careers')
            setJobs(res.data || [])
        } catch (error) {
            console.error('Failed to fetch jobs:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchApplications = async (jobId: string) => {
        setLoadingApps(true)
        try {
            const res = await adminApi.get(`/admin/content/job-applications?jobId=${jobId}`)
            setApplications(res.data || [])
        } catch (error) {
            console.error('Failed to fetch applications:', error)
        } finally {
            setLoadingApps(false)
        }
    }

    // ==================== JOB CRUD ====================
    const handleJobSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        try {
            if (editingJob?._id) {
                await adminApi.put(`/admin/content/careers/${editingJob._id}`, jobForm)
            } else {
                await adminApi.post('/admin/content/careers', jobForm)
            }
            fetchJobs()
            resetForm()
        } catch (error) {
            console.error('Failed to save job:', error)
        } finally {
            setSaving(false)
        }
    }

    const handleEditJob = (job: Job) => {
        setEditingJob(job)
        setJobForm(job)
        setShowForm(true)
        setFormStep(1)
    }

    const handleDeleteJob = async (id: string) => {
        if (!confirm('Delete this job posting? All applications will also be deleted.')) return
        try {
            await adminApi.delete(`/admin/content/careers/${id}`)
            fetchJobs()
        } catch (error) {
            console.error('Failed to delete job:', error)
        }
    }

    const resetForm = () => {
        setShowForm(false)
        setEditingJob(null)
        setFormStep(1)
        setJobForm({
            title: '',
            department: '',
            location: '',
            type: 'Full-time',
            description: '',
            requirements: [],
            tags: [],
            salary: '',
            customQuestions: [],
            order: 0,
            isActive: true,
        })
        setRequirementInput('')
        setTagInput('')
    }

    // ==================== QUESTIONS HANDLERS ====================
    const addQuestion = (template?: typeof questionTemplates[0]) => {
        const newQuestion: CustomQuestion = template || {
            question: '',
            type: 'text',
            options: [],
            required: false,
        }
        setJobForm({
            ...jobForm,
            customQuestions: [...(jobForm.customQuestions || []), newQuestion],
        })
    }

    const updateQuestion = (index: number, field: string, value: any) => {
        const questions = [...(jobForm.customQuestions || [])]
        questions[index] = { ...questions[index], [field]: value }
        setJobForm({ ...jobForm, customQuestions: questions })
    }

    const removeQuestion = (index: number) => {
        const questions = [...(jobForm.customQuestions || [])]
        questions.splice(index, 1)
        setJobForm({ ...jobForm, customQuestions: questions })
    }

    // ==================== REQUIREMENTS & TAGS ====================
    const addRequirement = () => {
        if (!requirementInput.trim()) return
        setJobForm({
            ...jobForm,
            requirements: [...(jobForm.requirements || []), requirementInput.trim()],
        })
        setRequirementInput('')
    }

    const removeRequirement = (index: number) => {
        const reqs = [...(jobForm.requirements || [])]
        reqs.splice(index, 1)
        setJobForm({ ...jobForm, requirements: reqs })
    }

    const addTag = () => {
        if (!tagInput.trim()) return
        setJobForm({
            ...jobForm,
            tags: [...(jobForm.tags || []), tagInput.trim()],
        })
        setTagInput('')
    }

    const removeTag = (index: number) => {
        const tags = [...(jobForm.tags || [])]
        tags.splice(index, 1)
        setJobForm({ ...jobForm, tags: tags })
    }

    // ==================== APPLICATION HANDLERS ====================
    const viewApplications = (job: Job) => {
        setSelectedJob(job)
        setStatusFilter('all')
        fetchApplications(job._id!)
    }

    const updateApplicationStatus = async (appId: string, status: string) => {
        try {
            await adminApi.patch(`/admin/content/job-applications/${appId}`, { status })
            if (selectedJob) fetchApplications(selectedJob._id!)
        } catch (error) {
            console.error('Failed to update status:', error)
        }
    }

    // Filter applications by status
    const filteredApplications = statusFilter === 'all'
        ? applications
        : applications.filter(app => app.status === statusFilter)

    // Get resume full URL
    const getResumeUrl = (resumeUrl: string) => {
        if (resumeUrl.startsWith('http')) return resumeUrl
        return `${BACKEND_URL}${resumeUrl}`
    }

    // ==================== RENDER ====================
    return (
        <AdminLayout>
            <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Careers Management
                        </h1>
                        <p className={`mt-1 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                            Manage job postings and view applications
                        </p>
                    </div>
                    {!showForm && !selectedJob && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            New Job Posting
                        </button>
                    )}
                    {(showForm || selectedJob) && (
                        <button
                            onClick={() => { resetForm(); setSelectedJob(null); setSelectedApp(null) }}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            <ChevronRight className="w-5 h-5 rotate-180" />
                            Back to Jobs
                        </button>
                    )}
                </div>

                {/* Job Form */}
                <AnimatePresence mode="wait">
                    {showForm && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`p-6 rounded-2xl mb-8 ${isDark ? 'bg-white/[0.02] border border-white/10' : 'bg-white border border-gray-200 shadow-sm'}`}
                        >
                            <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {editingJob ? 'Edit Job Posting' : 'Create New Job Posting'}
                            </h2>

                            {/* Step Indicator */}
                            <div className="flex items-center gap-4 mb-8">
                                <button
                                    onClick={() => setFormStep(1)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${formStep === 1 ? 'bg-cyan-500/20 text-cyan-400' : isDark ? 'text-white/50 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${formStep === 1 ? 'bg-cyan-500 text-white' : isDark ? 'bg-white/10' : 'bg-gray-200'}`}>1</span>
                                    Job Details
                                </button>
                                <ChevronRight className={`w-4 h-4 ${isDark ? 'text-white/20' : 'text-gray-300'}`} />
                                <button
                                    onClick={() => setFormStep(2)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${formStep === 2 ? 'bg-cyan-500/20 text-cyan-400' : isDark ? 'text-white/50 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${formStep === 2 ? 'bg-cyan-500 text-white' : isDark ? 'bg-white/10' : 'bg-gray-200'}`}>2</span>
                                    Custom Questions
                                </button>
                            </div>

                            <form onSubmit={handleJobSubmit}>
                                {/* Step 1: Job Details */}
                                {formStep === 1 && (
                                    <div className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Job Title *</label>
                                                <input
                                                    type="text"
                                                    value={jobForm.title || ''}
                                                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                                                    required
                                                    className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-white border-gray-200'} outline-none focus:ring-2 focus:ring-cyan-500/50`}
                                                    placeholder="e.g., Senior Full-Stack Engineer"
                                                />
                                            </div>
                                            <div>
                                                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Department *</label>
                                                <input
                                                    type="text"
                                                    value={jobForm.department || ''}
                                                    onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                                                    required
                                                    className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-white border-gray-200'} outline-none focus:ring-2 focus:ring-cyan-500/50`}
                                                    placeholder="e.g., Engineering"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div>
                                                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Location *</label>
                                                <input
                                                    type="text"
                                                    value={jobForm.location || ''}
                                                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                                                    required
                                                    className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-white border-gray-200'} outline-none focus:ring-2 focus:ring-cyan-500/50`}
                                                    placeholder="e.g., Remote / San Francisco"
                                                />
                                            </div>
                                            <div>
                                                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Type *</label>
                                                <select
                                                    value={jobForm.type || 'Full-time'}
                                                    onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                                                    className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-[#0a0a1a] border-white/10 text-white' : 'bg-white border-gray-200'} outline-none focus:ring-2 focus:ring-cyan-500/50`}
                                                >
                                                    {typeOptions.map((opt) => (
                                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Salary Range</label>
                                                <input
                                                    type="text"
                                                    value={jobForm.salary || ''}
                                                    onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                                                    className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-white border-gray-200'} outline-none focus:ring-2 focus:ring-cyan-500/50`}
                                                    placeholder="e.g., $120k - $180k"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Description *</label>
                                            <textarea
                                                value={jobForm.description || ''}
                                                onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                                                required
                                                rows={4}
                                                className={`w-full px-4 py-3 rounded-xl border resize-none ${isDark ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-white border-gray-200'} outline-none focus:ring-2 focus:ring-cyan-500/50`}
                                                placeholder="Job description..."
                                            />
                                        </div>

                                        {/* Requirements */}
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Requirements</label>
                                            <div className="flex gap-2 mb-2">
                                                <input
                                                    type="text"
                                                    value={requirementInput}
                                                    onChange={(e) => setRequirementInput(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                                                    className={`flex-1 px-4 py-2 rounded-lg border ${isDark ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-white border-gray-200'} outline-none`}
                                                    placeholder="Add a requirement..."
                                                />
                                                <button type="button" onClick={addRequirement} className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg">
                                                    <Plus className="w-5 h-5" />
                                                </button>
                                            </div>
                                            <div className="space-y-2">
                                                {(jobForm.requirements || []).map((req, i) => (
                                                    <div key={i} className={`flex items-center justify-between px-3 py-2 rounded-lg ${isDark ? 'bg-white/[0.03]' : 'bg-gray-50'}`}>
                                                        <span className={isDark ? 'text-white/80' : 'text-gray-700'}>{req}</span>
                                                        <button type="button" onClick={() => removeRequirement(i)} className="text-red-500 hover:text-red-400">
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Skills/Tags</label>
                                            <div className="flex gap-2 mb-2">
                                                <input
                                                    type="text"
                                                    value={tagInput}
                                                    onChange={(e) => setTagInput(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                                    className={`flex-1 px-4 py-2 rounded-lg border ${isDark ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-white border-gray-200'} outline-none`}
                                                    placeholder="Add a skill tag..."
                                                />
                                                <button type="button" onClick={addTag} className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg">
                                                    <Plus className="w-5 h-5" />
                                                </button>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {(jobForm.tags || []).map((tag, i) => (
                                                    <span key={i} className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-100 text-cyan-700'}`}>
                                                        {tag}
                                                        <button type="button" onClick={() => removeTag(i)} className="hover:text-red-400">
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={jobForm.isActive ?? true}
                                                    onChange={(e) => setJobForm({ ...jobForm, isActive: e.target.checked })}
                                                    className="w-4 h-4 rounded text-cyan-500"
                                                />
                                                <span className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Active (visible to applicants)</span>
                                            </label>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    type="submit"
                                                    disabled={saving || !jobForm.title || !jobForm.department || !jobForm.location}
                                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${isDark ? 'bg-white/10 text-white hover:bg-white/20 disabled:opacity-50' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50'}`}
                                                >
                                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                                    {editingJob ? 'Update Job' : 'Create Job'}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormStep(2)}
                                                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-xl font-medium"
                                                >
                                                    Add Questions
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Custom Questions */}
                                {formStep === 2 && (
                                    <div className="space-y-6">
                                        <div className={`p-4 rounded-xl ${isDark ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-cyan-50 border border-cyan-200'}`}>
                                            <div className="flex items-start gap-3">
                                                <HelpCircle className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <h4 className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Custom Application Questions</h4>
                                                    <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                                        Add questions that applicants must answer. These are in addition to the standard contact info and resume upload.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Question Templates */}
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Quick Add from Templates</label>
                                            <div className="flex flex-wrap gap-2">
                                                {questionTemplates.map((template, i) => (
                                                    <button
                                                        key={i}
                                                        type="button"
                                                        onClick={() => addQuestion(template)}
                                                        className={`px-3 py-1.5 text-sm rounded-lg transition-all ${isDark ? 'bg-white/[0.05] text-white/60 hover:bg-white/[0.1] hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'}`}
                                                    >
                                                        + {template.question.length > 30 ? template.question.slice(0, 30) + '...' : template.question}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Custom Questions List */}
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <label className={`block text-sm font-medium ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                                                    Questions ({(jobForm.customQuestions || []).length})
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => addQuestion()}
                                                    className="flex items-center gap-1 text-sm text-cyan-500 hover:text-cyan-400"
                                                >
                                                    <Plus className="w-4 h-4" /> Add Custom Question
                                                </button>
                                            </div>

                                            {(jobForm.customQuestions || []).length === 0 ? (
                                                <div className={`text-center py-8 rounded-xl ${isDark ? 'bg-white/[0.02] border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
                                                    <HelpCircle className={`w-10 h-10 mx-auto mb-2 ${isDark ? 'text-white/20' : 'text-gray-300'}`} />
                                                    <p className={isDark ? 'text-white/40' : 'text-gray-500'}>No custom questions added yet (optional)</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-3">
                                                    {(jobForm.customQuestions || []).map((q, index) => (
                                                        <div key={index} className={`p-4 rounded-xl ${isDark ? 'bg-white/[0.02] border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
                                                            <div className="flex items-start gap-4">
                                                                <div className="flex-1 space-y-3">
                                                                    <input
                                                                        type="text"
                                                                        value={q.question}
                                                                        onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                                                                        className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-white border-gray-200'} outline-none`}
                                                                        placeholder="Question text"
                                                                    />
                                                                    <div className="flex flex-wrap gap-3">
                                                                        <select
                                                                            value={q.type}
                                                                            onChange={(e) => updateQuestion(index, 'type', e.target.value)}
                                                                            className={`px-3 py-1.5 rounded-lg border text-sm ${isDark ? 'bg-[#0a0a1a] border-white/10 text-white' : 'bg-white border-gray-200'}`}
                                                                        >
                                                                            <option value="text">Short Text</option>
                                                                            <option value="textarea">Long Text</option>
                                                                            <option value="select">Dropdown</option>
                                                                            <option value="yesno">Yes/No</option>
                                                                        </select>
                                                                        <label className="flex items-center gap-2 cursor-pointer">
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={q.required}
                                                                                onChange={(e) => updateQuestion(index, 'required', e.target.checked)}
                                                                                className="w-4 h-4 rounded text-cyan-500"
                                                                            />
                                                                            <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Required</span>
                                                                        </label>
                                                                    </div>
                                                                    {q.type === 'select' && (
                                                                        <input
                                                                            type="text"
                                                                            value={(q.options || []).join(', ')}
                                                                            onChange={(e) => updateQuestion(index, 'options', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                                                                            className={`w-full px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-white border-gray-200'} outline-none`}
                                                                            placeholder="Options (comma-separated): Option 1, Option 2, Option 3"
                                                                        />
                                                                    )}
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeQuestion(index)}
                                                                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                            <button
                                                type="button"
                                                onClick={() => setFormStep(1)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-xl ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-700'}`}
                                            >
                                                <ChevronRight className="w-4 h-4 rotate-180" /> Back
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={saving}
                                                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-xl font-medium disabled:opacity-50"
                                            >
                                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                                {editingJob ? 'Update Job' : 'Create Job'}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Applications View */}
                <AnimatePresence mode="wait">
                    {selectedJob && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div className={`p-6 rounded-2xl mb-6 ${isDark ? 'bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20' : 'bg-gradient-to-r from-cyan-50 to-emerald-50 border border-cyan-200'}`}>
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div>
                                        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedJob.title}</h2>
                                        <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                            {selectedJob.department} • {selectedJob.location} • {applications.length} applications
                                        </p>
                                    </div>
                                    {/* Status Filter */}
                                    <div className="flex items-center gap-2">
                                        <Filter className={`w-4 h-4 ${isDark ? 'text-white/50' : 'text-gray-500'}`} />
                                        <select
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                            className={`px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-[#0a0a1a] border-white/10 text-white' : 'bg-white border-gray-200'}`}
                                        >
                                            <option value="all">All ({applications.length})</option>
                                            <option value="new">New ({applications.filter(a => a.status === 'new').length})</option>
                                            <option value="reviewing">Reviewing ({applications.filter(a => a.status === 'reviewing').length})</option>
                                            <option value="shortlisted">Shortlisted ({applications.filter(a => a.status === 'shortlisted').length})</option>
                                            <option value="interviewed">Interviewed ({applications.filter(a => a.status === 'interviewed').length})</option>
                                            <option value="rejected">Rejected ({applications.filter(a => a.status === 'rejected').length})</option>
                                            <option value="hired">Hired ({applications.filter(a => a.status === 'hired').length})</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {loadingApps ? (
                                <div className="flex items-center justify-center py-12">
                                    <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
                                </div>
                            ) : applications.length === 0 ? (
                                <div className={`text-center py-16 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
                                    <Users className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-white/20' : 'text-gray-300'}`} />
                                    <p className={`text-lg ${isDark ? 'text-white/50' : 'text-gray-500'}`}>No applications yet</p>
                                </div>
                            ) : filteredApplications.length === 0 ? (
                                <div className={`text-center py-16 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
                                    <Filter className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-white/20' : 'text-gray-300'}`} />
                                    <p className={`text-lg ${isDark ? 'text-white/50' : 'text-gray-500'}`}>No applications match this filter</p>
                                    <button onClick={() => setStatusFilter('all')} className="mt-4 text-cyan-400 hover:underline">Show all applications</button>
                                </div>
                            ) : (
                                <div className="grid lg:grid-cols-3 gap-6">
                                    {/* Applications List */}
                                    <div className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto">
                                        {filteredApplications.map((app) => (
                                            <button
                                                key={app._id}
                                                onClick={() => setSelectedApp(app)}
                                                className={`w-full text-left p-4 rounded-xl transition-all ${selectedApp?._id === app._id
                                                    ? isDark ? 'bg-cyan-500/20 border-cyan-500/50' : 'bg-cyan-50 border-cyan-300'
                                                    : isDark ? 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05]' : 'bg-white border-gray-200 hover:bg-gray-50'
                                                    } border`}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{app.name}</span>
                                                    <span className={`px-2 py-0.5 text-xs rounded-full ${statusColors[app.status]}`}>{app.status}</span>
                                                </div>
                                                <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{app.email}</p>
                                                <p className={`text-xs mt-1 ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
                                                    {new Date(app.createdAt).toLocaleDateString()}
                                                </p>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Application Detail */}
                                    <div className="lg:col-span-2">
                                        {selectedApp ? (
                                            <div className={`p-6 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/10' : 'bg-white border border-gray-200 shadow-sm'}`}>
                                                <div className="flex items-start justify-between mb-6">
                                                    <div>
                                                        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedApp.name}</h3>
                                                        <p className={`${isDark ? 'text-white/60' : 'text-gray-600'}`}>{selectedApp.email}</p>
                                                        {selectedApp.phone && <p className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{selectedApp.phone}</p>}
                                                    </div>
                                                    <select
                                                        value={selectedApp.status}
                                                        onChange={(e) => updateApplicationStatus(selectedApp._id, e.target.value)}
                                                        className={`px-3 py-1.5 rounded-lg border text-sm ${statusColors[selectedApp.status]} ${isDark ? 'bg-[#0a0a1a] border-white/10' : 'bg-white border-gray-200'}`}
                                                    >
                                                        <option value="new">New</option>
                                                        <option value="reviewing">Reviewing</option>
                                                        <option value="shortlisted">Shortlisted</option>
                                                        <option value="interviewed">Interviewed</option>
                                                        <option value="rejected">Rejected</option>
                                                        <option value="hired">Hired</option>
                                                    </select>
                                                </div>

                                                {/* Resume */}
                                                <div className={`p-4 rounded-xl mb-6 ${isDark ? 'bg-white/[0.03]' : 'bg-gray-50'}`}>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <FileText className="w-8 h-8 text-cyan-500" />
                                                            <div>
                                                                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedApp.resumeFilename}</p>
                                                                <p className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>Resume</p>
                                                            </div>
                                                        </div>
                                                        <a
                                                            href={getResumeUrl(selectedApp.resumeUrl)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30"
                                                        >
                                                            <Eye className="w-4 h-4" /> View
                                                        </a>
                                                    </div>
                                                </div>

                                                {/* Cover Letter */}
                                                {selectedApp.coverLetter && (
                                                    <div className="mb-6">
                                                        <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Cover Letter</h4>
                                                        <p className={`text-sm whitespace-pre-wrap ${isDark ? 'text-white/60' : 'text-gray-600'}`}>{selectedApp.coverLetter}</p>
                                                    </div>
                                                )}

                                                {/* Custom Answers */}
                                                {selectedApp.customAnswers && Object.keys(selectedApp.customAnswers).length > 0 && (
                                                    <div>
                                                        <h4 className={`font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Application Questions</h4>
                                                        <div className="space-y-4">
                                                            {Object.entries(selectedApp.customAnswers).map(([question, answer]) => (
                                                                <div key={question}>
                                                                    <p className={`text-sm font-medium mb-1 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>{question}</p>
                                                                    <p className={`${isDark ? 'text-white/60' : 'text-gray-600'}`}>{String(answer)}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className={`flex items-center justify-center h-full min-h-[400px] rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
                                                <p className={isDark ? 'text-white/40' : 'text-gray-400'}>Select an application to view details</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Jobs List */}
                {!showForm && !selectedJob && (
                    <>
                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
                            </div>
                        ) : jobs.length === 0 ? (
                            <div className={`text-center py-20 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
                                <Briefcase className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-white/20' : 'text-gray-300'}`} />
                                <p className={`text-lg mb-4 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>No job postings yet</p>
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-xl font-medium"
                                >
                                    Create First Job
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {jobs.map((job) => (
                                    <motion.div
                                        key={job._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`p-5 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/10' : 'bg-white border border-gray-200 shadow-sm'} ${!job.isActive ? 'opacity-60' : ''}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{job.title}</h3>
                                                    <span className={`px-2 py-0.5 text-xs rounded-full ${isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-100 text-cyan-700'}`}>
                                                        {job.type}
                                                    </span>
                                                    {(job.customQuestions?.length || 0) > 0 && (
                                                        <span className={`px-2 py-0.5 text-xs rounded-full ${isDark ? 'bg-violet-500/20 text-violet-400' : 'bg-violet-100 text-violet-700'}`}>
                                                            {job.customQuestions?.length} questions
                                                        </span>
                                                    )}
                                                </div>
                                                <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                                    {job.department} • {job.location}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => viewApplications(job)}
                                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${isDark ? 'bg-white/[0.05] text-white hover:bg-white/[0.1]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                                >
                                                    <Users className="w-4 h-4" /> Applications
                                                </button>
                                                <button onClick={() => handleEditJob(job)} className={`p-2 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>
                                                    <Edit2 className="w-4 h-4 text-blue-500" />
                                                </button>
                                                <button onClick={() => handleDeleteJob(job._id!)} className={`p-2 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </AdminLayout>
    )
}

export default CareersAdmin
