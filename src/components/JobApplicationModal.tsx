import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, FileText, CheckCircle, AlertCircle, Loader2, Trash2, ChevronRight, User, HelpCircle } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { contentApi } from '../lib/api'

interface CustomQuestion {
    question: string
    type: 'text' | 'textarea' | 'select' | 'yesno'
    options?: string[]
    required: boolean
}

interface Job {
    _id: string
    title: string
    department: string
    location: string
    type: string
    description: string
    requirements?: string[]
    tags: string[]
    salary?: string
    customQuestions?: CustomQuestion[]
}

interface JobApplicationModalProps {
    isOpen: boolean
    onClose: () => void
    job: Job | null
    isGeneral?: boolean
}

const JobApplicationModal = ({ isOpen, onClose, job, isGeneral = false }: JobApplicationModalProps) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Check if job has custom questions for 2-step flow
    const hasCustomQuestions = !isGeneral && job?.customQuestions && job.customQuestions.length > 0
    const [step, setStep] = useState<1 | 2>(1)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        coverLetter: '',
    })
    const [customAnswers, setCustomAnswers] = useState<Record<string, string>>({})
    const [resumeFile, setResumeFile] = useState<File | null>(null)
    const [dragActive, setDragActive] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0]
            validateAndSetFile(file)
        }
    }, [])

    const validateAndSetFile = (file: File) => {
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ]
        const maxSize = 5 * 1024 * 1024 // 5MB

        if (!allowedTypes.includes(file.type)) {
            setError('Please upload a PDF or Word document')
            return
        }

        if (file.size > maxSize) {
            setError('File size must be less than 5MB')
            return
        }

        setError('')
        setResumeFile(file)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0])
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleCustomAnswerChange = (question: string, value: string) => {
        setCustomAnswers({ ...customAnswers, [question]: value })
    }

    const resetForm = () => {
        setFormData({ name: '', email: '', phone: '', coverLetter: '' })
        setCustomAnswers({})
        setResumeFile(null)
        setSubmitted(false)
        setError('')
        setStep(1)
    }

    const handleClose = () => {
        resetForm()
        onClose()
    }

    const validateStep1 = () => {
        if (!formData.name.trim()) {
            setError('Please enter your full name')
            return false
        }
        if (!formData.email.trim()) {
            setError('Please enter your email')
            return false
        }
        setError('')
        return true
    }

    const handleNextStep = () => {
        if (validateStep1()) {
            setStep(2)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!resumeFile) {
            setError('Please upload your resume')
            return
        }

        // Validate required custom questions
        if (job?.customQuestions) {
            for (const q of job.customQuestions) {
                if (q.required && !customAnswers[q.question]) {
                    setError(`Please answer: ${q.question}`)
                    return
                }
            }
        }

        setSubmitting(true)

        try {
            // Create FormData for file upload
            const submitData = new FormData()
            submitData.append('name', formData.name)
            submitData.append('email', formData.email)
            submitData.append('phone', formData.phone)
            submitData.append('coverLetter', formData.coverLetter)
            submitData.append('resume', resumeFile)
            submitData.append('customAnswers', JSON.stringify(customAnswers))

            if (job && !isGeneral) {
                submitData.append('jobId', job._id)
                submitData.append('jobTitle', job.title)
            } else {
                submitData.append('isGeneralSubmission', 'true')
            }

            await contentApi.post('/content/job-applications', submitData)

            setSubmitted(true)
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to submit application. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                        onClick={handleClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl ${isDark ? 'bg-[#0a0a1a] border border-white/10' : 'bg-white'}`}
                    >
                        {/* Close button */}
                        <button
                            onClick={handleClose}
                            className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}
                        >
                            <X className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-700'}`} />
                        </button>

                        {submitted ? (
                            /* Success State */
                            <div className="p-8 text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', duration: 0.5 }}
                                >
                                    <CheckCircle className="w-20 h-20 mx-auto text-emerald-500 mb-6" />
                                </motion.div>
                                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    Application Submitted!
                                </h3>
                                <p className={`mb-8 ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                                    Thank you for your interest! We'll review your application and get back to you soon.
                                </p>
                                <button
                                    onClick={handleClose}
                                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                                >
                                    Close
                                </button>
                            </div>
                        ) : (
                            /* Application Form */
                            <div className="p-6 md:p-8">
                                <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {isGeneral ? 'Submit Your Resume' : `Apply for ${job?.title}`}
                                </h2>
                                {job && !isGeneral && (
                                    <p className={`text-sm mb-4 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                        {job.department} • {job.location} • {job.type}
                                    </p>
                                )}

                                {/* Step Indicator - only show for jobs with custom questions */}
                                {hasCustomQuestions && (
                                    <div className="flex items-center gap-2 mb-6">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${step === 1 ? 'bg-cyan-500/20 text-cyan-400' : isDark ? 'text-white/50 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
                                        >
                                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${step === 1 ? 'bg-cyan-500 text-white' : isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                                                <User className="w-3.5 h-3.5" />
                                            </span>
                                            Your Info
                                        </button>
                                        <ChevronRight className={`w-4 h-4 ${isDark ? 'text-white/20' : 'text-gray-300'}`} />
                                        <button
                                            type="button"
                                            onClick={() => validateStep1() && setStep(2)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${step === 2 ? 'bg-cyan-500/20 text-cyan-400' : isDark ? 'text-white/50 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
                                        >
                                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${step === 2 ? 'bg-cyan-500 text-white' : isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                                                <HelpCircle className="w-3.5 h-3.5" />
                                            </span>
                                            Questions
                                        </button>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Step 1: Basic Info - always shown if single step, or if step === 1 */}
                                    {(!hasCustomQuestions || step === 1) && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="space-y-6"
                                        >
                                            {/* Basic Info */}
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                                                        Full Name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        required={!hasCustomQuestions}
                                                        className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${isDark ? 'bg-white/[0.03] border-white/[0.1] focus:border-cyan-500/50 text-white' : 'bg-white border-gray-200 focus:border-cyan-500 text-gray-900'}`}
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                                <div>
                                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                                                        Email *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        required={!hasCustomQuestions}
                                                        className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${isDark ? 'bg-white/[0.03] border-white/[0.1] focus:border-cyan-500/50 text-white' : 'bg-white border-gray-200 focus:border-cyan-500 text-gray-900'}`}
                                                        placeholder="john@example.com"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${isDark ? 'bg-white/[0.03] border-white/[0.1] focus:border-cyan-500/50 text-white' : 'bg-white border-gray-200 focus:border-cyan-500 text-gray-900'}`}
                                                    placeholder="+1 (555) 123-4567"
                                                />
                                            </div>

                                            {/* Cover Letter - show in step 1 */}
                                            <div>
                                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                                                    Cover Letter (Optional)
                                                </label>
                                                <textarea
                                                    name="coverLetter"
                                                    value={formData.coverLetter}
                                                    onChange={handleInputChange}
                                                    rows={3}
                                                    className={`w-full px-4 py-3 rounded-xl border transition-all outline-none resize-none ${isDark ? 'bg-white/[0.03] border-white/[0.1] focus:border-cyan-500/50 text-white' : 'bg-white border-gray-200 focus:border-cyan-500 text-gray-900'}`}
                                                    placeholder="Tell us why you'd be a great fit..."
                                                />
                                            </div>

                                            {/* If no custom questions, show resume upload and submit here */}
                                            {!hasCustomQuestions && (
                                                <>
                                                    {/* Resume Upload */}
                                                    <div>
                                                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                                                            Resume *
                                                        </label>
                                                        <div
                                                            onDragEnter={handleDrag}
                                                            onDragLeave={handleDrag}
                                                            onDragOver={handleDrag}
                                                            onDrop={handleDrop}
                                                            onClick={() => fileInputRef.current?.click()}
                                                            className={`relative p-6 rounded-xl border-2 border-dashed text-center cursor-pointer transition-all ${dragActive
                                                                ? 'border-cyan-500 bg-cyan-500/10'
                                                                : isDark
                                                                    ? 'border-white/20 hover:border-white/40 bg-white/[0.02]'
                                                                    : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                                                                }`}
                                                        >
                                                            <input
                                                                ref={fileInputRef}
                                                                type="file"
                                                                accept=".pdf,.doc,.docx"
                                                                onChange={handleFileChange}
                                                                className="hidden"
                                                            />

                                                            {resumeFile ? (
                                                                <div className="flex items-center justify-center gap-3">
                                                                    <FileText className="w-8 h-8 text-cyan-500" />
                                                                    <div className="text-left">
                                                                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                                            {resumeFile.name}
                                                                        </p>
                                                                        <p className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                                                            {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                                                                        </p>
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation()
                                                                            setResumeFile(null)
                                                                        }}
                                                                        className="p-2 rounded-full hover:bg-red-500/20 text-red-500"
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <Upload className={`w-10 h-10 mx-auto mb-3 ${isDark ? 'text-white/40' : 'text-gray-400'}`} />
                                                                    <p className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                                                                        Drop your resume here or click to browse
                                                                    </p>
                                                                    <p className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                                                                        PDF, DOC, DOCX up to 5MB
                                                                    </p>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Error */}
                                                    {error && (
                                                        <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                                                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                                            <span>{error}</span>
                                                        </div>
                                                    )}

                                                    {/* Submit */}
                                                    <button
                                                        type="submit"
                                                        disabled={submitting}
                                                        className="w-full py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                                    >
                                                        {submitting ? (
                                                            <>
                                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                                Submitting...
                                                            </>
                                                        ) : (
                                                            'Submit Application'
                                                        )}
                                                    </button>
                                                </>
                                            )}

                                            {/* Next button for multi-step */}
                                            {hasCustomQuestions && (
                                                <>
                                                    {/* Error */}
                                                    {error && (
                                                        <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                                                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                                            <span>{error}</span>
                                                        </div>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={handleNextStep}
                                                        className="w-full py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
                                                    >
                                                        Continue to Questions
                                                        <ChevronRight className="w-5 h-5" />
                                                    </button>
                                                </>
                                            )}
                                        </motion.div>
                                    )}

                                    {/* Step 2: Custom Questions + Resume */}
                                    {hasCustomQuestions && step === 2 && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6"
                                        >
                                            {/* Custom Questions */}
                                            <div className="space-y-4">
                                                <div className={`p-3 rounded-lg ${isDark ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-cyan-50 border border-cyan-200'}`}>
                                                    <p className={`text-sm ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
                                                        Please answer the following questions to complete your application.
                                                    </p>
                                                </div>
                                                {job?.customQuestions?.map((q, index) => (
                                                    <div key={index}>
                                                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                                                            {q.question} {q.required && <span className="text-red-500">*</span>}
                                                        </label>
                                                        {q.type === 'text' && (
                                                            <input
                                                                type="text"
                                                                value={customAnswers[q.question] || ''}
                                                                onChange={(e) => handleCustomAnswerChange(q.question, e.target.value)}
                                                                required={q.required}
                                                                className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${isDark ? 'bg-white/[0.03] border-white/[0.1] focus:border-cyan-500/50 text-white' : 'bg-white border-gray-200 focus:border-cyan-500 text-gray-900'}`}
                                                            />
                                                        )}
                                                        {q.type === 'textarea' && (
                                                            <textarea
                                                                value={customAnswers[q.question] || ''}
                                                                onChange={(e) => handleCustomAnswerChange(q.question, e.target.value)}
                                                                required={q.required}
                                                                rows={3}
                                                                className={`w-full px-4 py-3 rounded-xl border transition-all outline-none resize-none ${isDark ? 'bg-white/[0.03] border-white/[0.1] focus:border-cyan-500/50 text-white' : 'bg-white border-gray-200 focus:border-cyan-500 text-gray-900'}`}
                                                            />
                                                        )}
                                                        {q.type === 'select' && (
                                                            <select
                                                                value={customAnswers[q.question] || ''}
                                                                onChange={(e) => handleCustomAnswerChange(q.question, e.target.value)}
                                                                required={q.required}
                                                                className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${isDark ? 'bg-[#0a0a1a] border-white/[0.1] focus:border-cyan-500/50 text-white' : 'bg-white border-gray-200 focus:border-cyan-500 text-gray-900'}`}
                                                            >
                                                                <option value="">Select an option</option>
                                                                {q.options?.map((opt) => (
                                                                    <option key={opt} value={opt}>{opt}</option>
                                                                ))}
                                                            </select>
                                                        )}
                                                        {q.type === 'yesno' && (
                                                            <div className="flex gap-4">
                                                                {['Yes', 'No'].map((opt) => (
                                                                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                                                        <input
                                                                            type="radio"
                                                                            name={`question-${index}`}
                                                                            value={opt}
                                                                            checked={customAnswers[q.question] === opt}
                                                                            onChange={(e) => handleCustomAnswerChange(q.question, e.target.value)}
                                                                            required={q.required}
                                                                            className="w-4 h-4 text-cyan-500"
                                                                        />
                                                                        <span className={isDark ? 'text-white/70' : 'text-gray-700'}>{opt}</span>
                                                                    </label>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Resume Upload */}
                                            <div>
                                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                                                    Resume *
                                                </label>
                                                <div
                                                    onDragEnter={handleDrag}
                                                    onDragLeave={handleDrag}
                                                    onDragOver={handleDrag}
                                                    onDrop={handleDrop}
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className={`relative p-6 rounded-xl border-2 border-dashed text-center cursor-pointer transition-all ${dragActive
                                                        ? 'border-cyan-500 bg-cyan-500/10'
                                                        : isDark
                                                            ? 'border-white/20 hover:border-white/40 bg-white/[0.02]'
                                                            : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                                                        }`}
                                                >
                                                    <input
                                                        ref={fileInputRef}
                                                        type="file"
                                                        accept=".pdf,.doc,.docx"
                                                        onChange={handleFileChange}
                                                        className="hidden"
                                                    />

                                                    {resumeFile ? (
                                                        <div className="flex items-center justify-center gap-3">
                                                            <FileText className="w-8 h-8 text-cyan-500" />
                                                            <div className="text-left">
                                                                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                                    {resumeFile.name}
                                                                </p>
                                                                <p className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                                                    {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                                                                </p>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    setResumeFile(null)
                                                                }}
                                                                className="p-2 rounded-full hover:bg-red-500/20 text-red-500"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <Upload className={`w-10 h-10 mx-auto mb-3 ${isDark ? 'text-white/40' : 'text-gray-400'}`} />
                                                            <p className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                                                                Drop your resume here or click to browse
                                                            </p>
                                                            <p className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                                                                PDF, DOC, DOCX up to 5MB
                                                            </p>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Error */}
                                            {error && (
                                                <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                                    <span>{error}</span>
                                                </div>
                                            )}

                                            {/* Navigation buttons */}
                                            <div className="flex gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setStep(1)}
                                                    className={`flex-1 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                                >
                                                    <ChevronRight className="w-5 h-5 rotate-180" />
                                                    Back
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={submitting}
                                                    className="flex-[2] py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                                >
                                                    {submitting ? (
                                                        <>
                                                            <Loader2 className="w-5 h-5 animate-spin" />
                                                            Submitting...
                                                        </>
                                                    ) : (
                                                        'Submit Application'
                                                    )}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </form>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default JobApplicationModal
