import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, Terminal, Copy, Check, ChevronRight, Code2, Zap, Shield, Clock, Key, Globe, Database, Server, Webhook } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const endpoints = [
    {
        method: 'GET',
        path: '/api/v1/projects',
        description: 'List all projects',
        color: 'green',
    },
    {
        method: 'POST',
        path: '/api/v1/projects',
        description: 'Create a new project',
        color: 'blue',
    },
    {
        method: 'GET',
        path: '/api/v1/projects/:id',
        description: 'Get project by ID',
        color: 'green',
    },
    {
        method: 'PUT',
        path: '/api/v1/projects/:id',
        description: 'Update a project',
        color: 'yellow',
    },
    {
        method: 'DELETE',
        path: '/api/v1/projects/:id',
        description: 'Delete a project',
        color: 'red',
    },
    {
        method: 'GET',
        path: '/api/v1/analytics',
        description: 'Get analytics data',
        color: 'green',
    },
    {
        method: 'POST',
        path: '/api/v1/webhooks',
        description: 'Create webhook subscription',
        color: 'blue',
    },
    {
        method: 'GET',
        path: '/api/v1/users/me',
        description: 'Get current user',
        color: 'green',
    },
]

const features = [
    {
        icon: Zap,
        title: 'Lightning Fast',
        description: 'Average response time under 50ms with global CDN distribution.',
    },
    {
        icon: Shield,
        title: 'Secure by Default',
        description: 'OAuth 2.0 authentication with API key support and rate limiting.',
    },
    {
        icon: Clock,
        title: '99.99% Uptime',
        description: 'Enterprise-grade reliability with automatic failover and scaling.',
    },
    {
        icon: Globe,
        title: 'Global Availability',
        description: 'Edge locations across 50+ regions for minimal latency worldwide.',
    },
]

const sdks = [
    { name: 'JavaScript', icon: '🟨', command: 'npm install @forbidden-dev/sdk' },
    { name: 'Python', icon: '🐍', command: 'pip install forbidden-dev-sdk' },
    { name: 'Ruby', icon: '💎', command: 'gem install forbidden-dev' },
    { name: 'Go', icon: '🔵', command: 'go get github.com/forbidden-dev/sdk-go' },
    { name: 'PHP', icon: '🐘', command: 'composer require forbidden-dev/sdk' },
    { name: 'Java', icon: '☕', command: 'implementation "com.forbidden-dev:sdk:1.0"' },
]

const codeExample = `// Initialize the Forbidden Dev SDK
import { ForbiddenDev } from '@forbidden-dev/sdk';

const client = new ForbiddenDev({
  apiKey: process.env.FORBIDDEN_DEV_API_KEY,
  environment: 'production'
});

// Fetch all projects
const projects = await client.projects.list({
  limit: 10,
  status: 'active'
});

// Create a new project
const newProject = await client.projects.create({
  name: 'My New Project',
  description: 'Built with Forbidden Dev API',
  settings: {
    notifications: true,
    analytics: true
  }
});

console.log('Project created:', newProject.id);`

const API = () => {
    const heroRef = useRef<HTMLDivElement>(null)
    const isHeroInView = useInView(heroRef, { once: true })
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [copiedCode, setCopiedCode] = useState(false)
    const [copiedSdk, setCopiedSdk] = useState<string | null>(null)

    const copyCode = () => {
        navigator.clipboard.writeText(codeExample)
        setCopiedCode(true)
        setTimeout(() => setCopiedCode(false), 2000)
    }

    const copySdk = (command: string) => {
        navigator.clipboard.writeText(command)
        setCopiedSdk(command)
        setTimeout(() => setCopiedSdk(null), 2000)
    }

    const methodColors: Record<string, string> = {
        green: 'bg-green-500/10 text-green-400',
        blue: 'bg-blue-500/10 text-blue-400',
        yellow: 'bg-yellow-500/10 text-yellow-400',
        red: 'bg-red-500/10 text-red-400',
    }

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0">
                    <div className={`absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:60px_60px] ${isDark ? 'opacity-100' : 'opacity-50'}`} />
                    <div className={`absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] ${isDark ? 'bg-purple-600/15' : 'bg-purple-600/10'}`} />
                    <div className={`absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] ${isDark ? 'bg-violet-600/10' : 'bg-violet-600/5'}`} />
                </div>

                <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            to="/"
                            className={`inline-flex items-center gap-2 mb-8 text-sm font-medium transition-colors ${isDark ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Link>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6 }}
                                className="mb-6"
                            >
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/20">
                                    <Terminal className="w-4 h-4" />
                                    API Reference
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                            >
                                Build with our{' '}
                                <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                                    powerful API
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className={`text-lg mb-8 ${isDark ? 'text-white/60' : 'text-gray-600'}`}
                            >
                                RESTful API with comprehensive documentation, official SDKs, and webhooks support for seamless integration.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="flex flex-wrap gap-4"
                            >
                                <a
                                    href="#"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                                >
                                    <Key className="w-5 h-5" />
                                    Get API Key
                                </a>
                                <a
                                    href="#"
                                    className={`inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-full transition-all ${isDark ? 'bg-white/[0.05] text-white hover:bg-white/[0.1]' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                                >
                                    View Full Docs
                                    <ChevronRight className="w-4 h-4" />
                                </a>
                            </motion.div>
                        </div>

                        {/* Code Example */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className={`rounded-2xl overflow-hidden ${isDark ? 'bg-[#0d0d1a] border border-white/[0.05]' : 'bg-gray-900'}`}
                        >
                            <div className={`flex items-center justify-between px-4 py-3 ${isDark ? 'bg-white/[0.02]' : 'bg-gray-800'}`}>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <button
                                    onClick={copyCode}
                                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                                >
                                    {copiedCode ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                    {copiedCode ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                            <pre className="p-4 text-sm overflow-x-auto">
                                <code className="text-gray-300 whitespace-pre">{codeExample}</code>
                            </pre>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className={`py-16 ${isDark ? 'bg-[#020010]' : 'bg-gray-50'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon
                            return (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`p-6 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-white border border-gray-200 shadow-sm'}`}
                                >
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${isDark ? 'from-purple-500/20 to-violet-500/20' : 'from-purple-100 to-violet-100'} flex items-center justify-center mb-4`}>
                                        <Icon className="w-6 h-6 text-purple-500" />
                                    </div>
                                    <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                                    <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{feature.description}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Endpoints */}
            <section className={`py-20 ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            API Endpoints
                        </h2>
                        <p className={`${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                            Explore our RESTful API endpoints
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-4 max-w-4xl mx-auto">
                        {endpoints.map((endpoint, index) => (
                            <motion.div
                                key={endpoint.path + endpoint.method}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className={`group p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all ${isDark ? 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05]' : 'bg-white border border-gray-200 hover:shadow-md'}`}
                            >
                                <span className={`px-3 py-1 rounded-lg text-xs font-bold ${methodColors[endpoint.color]}`}>
                                    {endpoint.method}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <code className={`text-sm font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>{endpoint.path}</code>
                                    <p className={`text-xs mt-0.5 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{endpoint.description}</p>
                                </div>
                                <ChevronRight className={`w-4 h-4 ${isDark ? 'text-white/20 group-hover:text-white/50' : 'text-gray-300 group-hover:text-gray-500'} transition-colors`} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SDKs */}
            <section className={`py-20 ${isDark ? 'bg-[#020010]' : 'bg-gray-50'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Official SDKs
                        </h2>
                        <p className={`${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                            Use our official libraries in your favorite language
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sdks.map((sdk, index) => (
                            <motion.div
                                key={sdk.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className={`p-5 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-white border border-gray-200 shadow-sm'}`}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-2xl">{sdk.icon}</span>
                                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{sdk.name}</span>
                                </div>
                                <div className={`flex items-center gap-2 p-3 rounded-xl font-mono text-xs ${isDark ? 'bg-black/30' : 'bg-gray-100'}`}>
                                    <code className={`flex-1 truncate ${isDark ? 'text-white/70' : 'text-gray-700'}`}>{sdk.command}</code>
                                    <button
                                        onClick={() => copySdk(sdk.command)}
                                        className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-200'}`}
                                    >
                                        {copiedSdk === sdk.command ? (
                                            <Check className="w-4 h-4 text-green-400" />
                                        ) : (
                                            <Copy className={`w-4 h-4 ${isDark ? 'text-white/40' : 'text-gray-400'}`} />
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Webhooks */}
            <section className={`py-20 ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${isDark ? 'from-purple-500/20 to-violet-500/20' : 'from-purple-100 to-violet-100'} flex items-center justify-center mb-6`}>
                                <Webhook className="w-7 h-7 text-purple-500" />
                            </div>
                            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Real-time Webhooks
                            </h2>
                            <p className={`mb-6 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                Get instant notifications for events in your projects. Configure webhooks to receive real-time updates.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    'Project status changes',
                                    'Deployment completions',
                                    'Error notifications',
                                    'Usage alerts',
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-purple-500/10 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-purple-400" />
                                        </div>
                                        <span className={`${isDark ? 'text-white/70' : 'text-gray-600'}`}>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {[
                                { icon: Server, title: 'HTTP POST', desc: 'Receive JSON payloads' },
                                { icon: Shield, title: 'Signature Verification', desc: 'HMAC-SHA256 signed' },
                                { icon: Clock, title: 'Retry Logic', desc: 'Automatic retries' },
                                { icon: Database, title: 'Event Logs', desc: '30 days retention' },
                            ].map((item, index) => {
                                const Icon = item.icon
                                return (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`p-5 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-gray-50 border border-gray-200'}`}
                                    >
                                        <Icon className={`w-6 h-6 mb-3 ${isDark ? 'text-purple-400' : 'text-purple-500'}`} />
                                        <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                                        <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{item.desc}</p>
                                    </motion.div>
                                )
                            })}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={`py-20 ${isDark ? 'bg-[#020010]' : 'bg-gray-50'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`relative p-12 rounded-3xl overflow-hidden text-center ${isDark ? 'bg-gradient-to-br from-purple-600/20 to-violet-600/20 border border-white/10' : 'bg-gradient-to-br from-purple-100 to-violet-100 border border-purple-200'}`}
                    >
                        <Code2 className={`w-12 h-12 mx-auto mb-6 ${isDark ? 'text-purple-400' : 'text-purple-500'}`} />
                        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Ready to start building?
                        </h2>
                        <p className={`mb-8 max-w-xl mx-auto ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                            Get your API key and start building amazing integrations in minutes.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                            >
                                <Key className="w-5 h-5" />
                                Get API Key
                            </a>
                            <Link
                                to="/resources/documentation"
                                className={`inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full transition-all ${isDark ? 'bg-white/[0.05] text-white hover:bg-white/[0.1]' : 'bg-white text-gray-900 hover:bg-gray-50 shadow-md'}`}
                            >
                                Read the Docs
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default API
