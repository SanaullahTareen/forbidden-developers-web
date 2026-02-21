import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    MessageCircle, X, Send, Bot, User, Sparkles,
    Minimize2, Maximize2, Volume2, VolumeX,
    Loader2, Zap, Code, Smartphone, Brain, Globe
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// =====================================================
// KNOWLEDGE BASE - Everything FD Bot knows
// =====================================================
const COMPANY_INFO = {
    name: 'Forbidden Developers',
    tagline: 'Where Innovation Meets Excellence',
    shortDesc: 'A cutting-edge software development agency',
    team: '50+ expert developers, designers, and AI specialists',
    founded: '2020',
    projectsDelivered: '200+',
    industries: ['Fintech', 'Healthcare', 'E-commerce', 'Education', 'Enterprise'],
}

const SERVICES = {
    web: {
        name: 'Web Development',
        description: 'Modern websites, web apps, e-commerce, APIs',
        tech: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Vue.js'],
        timeline: '10-15 days',
        features: ['Custom Web Applications', 'E-commerce Solutions', 'Progressive Web Apps', 'API Development', 'CMS Development'],
    },
    mobile: {
        name: 'Mobile App Development',
        description: 'iOS, Android, and cross-platform apps',
        tech: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
        timeline: '10-15 days',
        features: ['iOS Apps', 'Android Apps', 'Cross-Platform Apps', 'App Store Optimization'],
    },
    ai: {
        name: 'AI & Machine Learning',
        description: 'Custom AI models, chatbots, NLP, computer vision',
        tech: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI'],
        timeline: '10-15 days',
        features: ['Custom AI Models', 'Machine Learning', 'NLP Solutions', 'Computer Vision', 'Predictive Analytics', 'AI Chatbots'],
    },
    design: {
        name: 'UI/UX Design',
        description: 'Beautiful, user-centered designs',
        tech: ['Figma', 'Adobe XD', 'Sketch'],
        timeline: '7-10 days',
        features: ['UI Design', 'UX Research', 'Prototyping', 'Design Systems', 'Brand Identity'],
    },
}

// Suppress unused variable warning - these are for reference
void SERVICES
void COMPANY_INFO

// =====================================================
// INTENT PATTERNS - How we understand user messages
// =====================================================
const INTENTS: { [key: string]: string[] } = {
    // Greetings
    greeting: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'good afternoon', 'howdy', 'greetings', 'sup', 'yo', 'hola', 'what\'s up', 'whats up'],

    // Farewells
    farewell: ['bye', 'goodbye', 'see you', 'later', 'take care', 'cya', 'gtg', 'gotta go', 'talk later'],

    // Company info
    company_info: ['who are you', 'what is forbidden', 'about company', 'about you', 'tell me about forbidden', 'what do you do', 'your company', 'forbidden developers', 'about fd', 'your team', 'who runs this'],

    // Services - General
    services_general: ['services', 'what can you do', 'what you offer', 'offerings', 'what do you provide', 'help with', 'what do you build', 'what can you build', 'what you make', 'your services', 'tell me about your services', 'what services'],

    // Services - AI/ML specific
    services_ai: ['ai', 'artificial intelligence', 'machine learning', 'ml model', 'deep learning', 'neural', 'nlp', 'computer vision', 'chatbot', 'predictive', 'ai model', 'train model', 'ai solution', 'ai development'],

    // Services - Web specific
    services_web: ['website', 'web development', 'web app', 'webapp', 'react', 'frontend', 'backend', 'full stack', 'fullstack', 'ecommerce', 'e-commerce', 'web dev', 'build website', 'create website', 'make website', 'need website', 'want website'],

    // Services - Mobile specific
    services_mobile: ['mobile', 'ios', 'android', 'react native', 'flutter', 'smartphone', 'phone app', 'mobile app', 'app development', 'build app', 'create app', 'make app', 'need app', 'want app'],

    // Services - Design specific
    services_design: ['design', 'ui', 'ux', 'user interface', 'user experience', 'prototype', 'figma', 'ui/ux', 'uiux', 'redesign'],

    // Timeline/Delivery
    timeline: ['how long', 'time', 'delivery', 'timeline', 'deadline', 'when', 'duration', 'days', 'weeks', 'fast', 'quick', 'how fast', 'turnaround', 'deliver', 'how many days', 'timeframe', 'time frame'],

    // Pricing
    pricing: ['price', 'cost', 'budget', 'expensive', 'cheap', 'afford', 'payment', 'quote', 'estimate', 'how much', 'pricing', 'rate', 'rates', 'charge', 'fee', 'fees', 'investment'],

    // Contact/Hire
    contact: ['contact', 'hire', 'get in touch', 'reach', 'talk', 'call', 'email', 'meeting', 'schedule', 'consultation', 'start project', 'interested', 'work with', 'start a project', 'begin project', 'new project', 'hire you', 'contact you', 'reach out', 'get started', 'let\'s start', 'lets start'],

    // Portfolio/Work
    portfolio: ['portfolio', 'work', 'projects', 'examples', 'case study', 'previous', 'clients', 'showcase', 'past work', 'your work', 'show work', 'see work', 'show projects'],

    // Templates
    templates: ['template', 'themes', 'starter', 'pre-built', 'ready-made', 'technova', 'lumina', 'finedge', 'website templates', 'template gallery'],

    // Hosting/Deployment
    hosting: ['hosting', 'host', 'deploy', 'deployment', 'server', 'cloud', 'aws', 'devops', 'ci/cd', 'cicd'],

    // Support/Maintenance
    support: ['support', 'maintenance', 'help', 'fix', 'bug', 'issue', 'update', '24/7'],

    // Thanks
    thanks: ['thank', 'thanks', 'appreciate', 'helpful', 'great', 'awesome', 'perfect', 'wonderful', 'amazing'],

    // Capabilities
    capabilities: ['can you', 'are you able', 'do you know', 'what can', 'your capabilities', 'what are you', 'who are you'],

    // Human request
    human_request: ['human', 'real person', 'speak to someone', 'agent', 'representative', 'talk to human', 'real human'],

    // Yes/Affirmative
    affirmative: ['yes', 'yeah', 'yep', 'sure', 'ok', 'okay', 'alright', 'yup', 'absolutely', 'definitely'],

    // No/Negative
    negative: ['no', 'nope', 'not really', 'nah', 'no thanks'],
}

// =====================================================
// RESPONSE GENERATOR
// =====================================================
const getResponse = (intent: string, userMsg: string): { message: string; suggestions: string[] } => {
    const msg = userMsg.toLowerCase()

    switch (intent) {
        case 'greeting':
            return {
                message: `👋 Hello! Welcome to **Forbidden Developers**!\n\nI'm FD Bot, your AI assistant. I know everything about our services, timelines, and how we can help bring your ideas to life.\n\n**Quick question:** Are you looking to build a website, mobile app, or AI solution?`,
                suggestions: ['I need a website', 'I need a mobile app', 'I need an AI solution', 'Tell me everything!']
            }

        case 'farewell':
            return {
                message: `👋 Goodbye! It was great chatting with you!\n\nRemember, we can deliver your complete project in just **10-15 days!** 🚀\n\nFeel free to come back anytime you need help with web, mobile, or AI development!`,
                suggestions: ['Actually, one more question', 'Take me to contact form']
            }

        case 'company_info':
            return {
                message: `🚀 **Forbidden Developers** - Where Innovation Meets Excellence!\n\nWe're a cutting-edge software agency with **50+ expert developers, designers, and AI specialists**.\n\n📊 **Our Track Record:**\n• 200+ projects delivered\n• Founded in 2020\n• Global remote team\n\n⚡ **What sets us apart:**\n• We deliver complete projects in **10-15 days**\n• Full-stack expertise (Web, Mobile, AI)\n• Hosting & deployment included\n• 24/7 support\n\nWhat would you like to build with us?`,
                suggestions: ['Your services', 'How fast can you deliver?', 'Start a project']
            }

        case 'services_general':
            return {
                message: `✨ **Our Services** - Everything You Need!\n\n🌐 **Web Development**\nWebsites, web apps, e-commerce - delivered in **10-15 days!**\n\n📱 **Mobile Apps**\niOS, Android, cross-platform - delivered in **10-15 days!**\n\n🤖 **AI & Machine Learning**\nCustom AI models, chatbots, ML solutions - delivered in **10-15 days!**\n\n🎨 **UI/UX Design**\nBeautiful, user-centered designs - delivered in **7-10 days!**\n\n☁️ **Plus:** Hosting, deployment, and 24/7 support included!\n\nWhich service interests you?`,
                suggestions: ['Tell me about web dev', 'Tell me about mobile apps', 'Tell me about AI', 'I want to start a project']
            }

        case 'services_ai':
            return {
                message: `🤖 **AI & Machine Learning Services**\n\nWe build intelligent solutions that transform businesses:\n\n• **Custom AI Models** - Trained for your specific needs\n• **Machine Learning Integration** - Smart automation\n• **Natural Language Processing** - Text analysis, chatbots\n• **Computer Vision** - Image/video recognition\n• **Predictive Analytics** - Data-driven insights\n\n⏱️ **Timeline: 10-15 days** for most AI solutions!\n\nYes, we can build an AI solution from scratch and deploy it in under 2 weeks! 🚀\n\nHave an AI project in mind?`,
                suggestions: ['How much does it cost?', 'Start my AI project', 'What about web development?']
            }

        case 'services_web':
            return {
                message: `🌐 **Web Development Services**\n\nWe craft modern, high-performance web solutions:\n\n• **Custom Websites** - Beautiful, responsive sites\n• **Web Applications** - Complex, feature-rich apps\n• **E-commerce** - Complete online stores\n• **APIs** - RESTful & GraphQL backends\n• **CMS Solutions** - Content management systems\n\n**Tech Stack:** React, Next.js, Node.js, TypeScript\n\n⏱️ **Timeline: 10-15 days** for complete websites!\n\n🎁 **Bonus:** Hosting & deployment included!\n\nReady to build your website?`,
                suggestions: ['Start my website project', 'What\'s the cost?', 'Show me templates']
            }

        case 'services_mobile':
            return {
                message: `📱 **Mobile App Development**\n\nWe build apps that users love:\n\n• **iOS Apps** - Native Swift development\n• **Android Apps** - Native Kotlin development\n• **Cross-Platform** - React Native & Flutter\n• **App Store Launch** - We handle publishing\n• **Maintenance** - Ongoing support included\n\n⏱️ **Timeline: 10-15 days** for complete mobile apps!\n\nYes, we can build and launch your app in under 2 weeks! 🚀\n\nWhat kind of app do you want to build?`,
                suggestions: ['Start my app project', 'How much does an app cost?', 'What about web development?']
            }

        case 'services_design':
            return {
                message: `🎨 **UI/UX Design Services**\n\nWe create designs that convert:\n\n• **User Interface Design** - Modern, beautiful aesthetics\n• **UX Research** - Understanding your users\n• **Prototyping** - Interactive mockups\n• **Design Systems** - Consistent brand experience\n• **Brand Identity** - Complete visual identity\n\n**Tools:** Figma, Adobe XD, Sketch\n\n⏱️ **Timeline: 7-10 days** for complete designs!\n\nReady to elevate your product's design?`,
                suggestions: ['Start design project', 'What\'s the cost?', 'What about development?']
            }

        case 'timeline':
            return {
                message: `⚡ **Our Lightning-Fast Delivery**\n\nYes, you read that right - we deliver FAST!\n\n🌐 **Complete Website:** 10-15 days\n📱 **Mobile App:** 10-15 days\n🤖 **AI/ML Solution:** 10-15 days\n🎨 **UI/UX Design:** 7-10 days\n\n**This includes:**\n✅ Development\n✅ Testing\n✅ Deployment\n✅ Hosting setup\n\nWe've perfected our process to deliver quality at speed! 🚀\n\nReady to see how fast we can build your project?`,
                suggestions: ['Start my project now', 'What\'s the cost?', 'How is this possible?']
            }

        case 'pricing':
            return {
                message: `💰 **Investment & Pricing**\n\nWe offer competitive, transparent pricing:\n\n🆓 **Free Consultation** - Let's discuss your needs\n📋 **Custom Quotes** - Tailored to your project\n💳 **Flexible Payment** - Payment plans available\n✅ **No Hidden Costs** - What we quote is what you pay\n\n**What's Included:**\n• Development\n• Design\n• Hosting & deployment\n• 24/7 support\n\nEvery project is unique! Let's chat about yours to get you an accurate quote.\n\nShall I connect you with our team?`,
                suggestions: ['Yes, get me a quote', 'Tell me more about services', 'What\'s the timeline?']
            }

        case 'contact':
            return {
                message: `📬 **Let's Build Something Amazing!**\n\nExcited to hear you want to start! Here's how to begin:\n\n**Step 1:** Fill out our quick contact form\n**Step 2:** Free consultation with our team (within 24 hours)\n**Step 3:** Get your custom quote\n**Step 4:** We start building! 🚀\n\n**Remember:** We deliver complete projects in **10-15 days!**\n\nI can take you directly to the contact form - ready?`,
                suggestions: ['Take me to contact form', 'Tell me more first', 'What happens next?']
            }

        case 'portfolio':
            return {
                message: `🏆 **Our Portfolio**\n\nWe've delivered **200+ successful projects** across:\n\n💳 **Fintech** - Banking & payments\n🏥 **Healthcare** - Medical platforms\n🛒 **E-commerce** - Online stores\n📚 **Education** - Learning platforms\n🏢 **Enterprise** - Business solutions\n\n🎨 **Bonus:** Check out our 13+ premium website templates!\n\nWant to see our work?`,
                suggestions: ['Show me templates', 'Start my project', 'Contact your team']
            }

        case 'templates':
            return {
                message: `🎨 **Premium Website Templates**\n\nWe offer **13+ stunning templates** ready to customize:\n\n• **TechNova** - Tech companies\n• **Lumina** - Creative agencies\n• **FinEdge** - Finance\n• **Flavor** - Restaurants\n• **FitForge** - Fitness\n• **CarDrive** - Automotive\n• **Vogue** - Fashion\n• And more!\n\nAll templates feature:\n✨ Modern animations\n📱 Fully responsive\n⚡ Lightning fast\n🎨 Easy to customize\n\nWant to explore them?`,
                suggestions: ['Show me templates', 'I need a custom website', 'Start my project']
            }

        case 'hosting':
            return {
                message: `☁️ **Hosting & Deployment**\n\nWe handle everything for you:\n\n• **Cloud Hosting** - AWS, Google Cloud, Azure\n• **99.9% Uptime** - Reliable service\n• **CI/CD Pipeline** - Automated deployments\n• **SSL Certificates** - Secure connections\n• **CDN** - Fast global delivery\n• **Backups** - Your data is safe\n\n**Best part:** Hosting is included with our projects! 🎁\n\nQuestions about hosting?`,
                suggestions: ['Start a project', 'What\'s the cost?', 'Tell me about services']
            }

        case 'support':
            return {
                message: `🛡️ **Support & Maintenance**\n\nWe're your long-term tech partner:\n\n• **24/7 Support** - Always here for you\n• **Bug Fixes** - Quick resolution\n• **Updates** - Keep your app current\n• **Security** - Regular patches\n• **Performance** - Optimization included\n\nOur relationship doesn't end at delivery!\n\nReady to start a project with us?`,
                suggestions: ['Start a project', 'Contact support', 'Tell me about pricing']
            }

        case 'thanks':
            return {
                message: `You're very welcome! 😊\n\nI'm always here to help! Remember:\n\n• 🚀 We deliver in **10-15 days**\n• 💪 Full-stack: Web, Mobile, AI\n• ☁️ Hosting included\n• 🛡️ 24/7 support\n\nAnything else you'd like to know?`,
                suggestions: ['Start a project', 'Tell me more about services', 'That\'s all, thanks!']
            }

        case 'capabilities':
            return {
                message: `🤖 **I'm FD Bot - Your AI Assistant!**\n\nI can help you with:\n\n📚 **Information**\n• Our services (Web, Mobile, AI, Design)\n• Timelines (Spoiler: 10-15 days!)\n• Pricing & quotes\n\n🧭 **Navigation**\n• Guide you around the website\n• Take you to contact form\n• Show you templates\n\n💡 **Advice**\n• Help you choose the right service\n• Answer technical questions\n• Explain our process\n\nWhat would you like to know?`,
                suggestions: ['Your services', 'How fast can you deliver?', 'Start a project']
            }

        case 'human_request':
            return {
                message: `👤 **Want to Talk to a Human?**\n\nAbsolutely! Our team responds within **24 hours**.\n\n**Options:**\n1️⃣ Fill out contact form - We'll call you!\n2️⃣ Book a free consultation\n3️⃣ Email us directly\n\nShall I take you to the contact form?`,
                suggestions: ['Take me to contact form', 'I\'ll keep chatting with you', 'Book a call']
            }

        case 'affirmative':
            return {
                message: `Great! 🎉\n\nLet me take you to our contact form so our team can reach out to you!\n\nOur experts will get back to you within **24 hours** to discuss your project.`,
                suggestions: ['Take me to contact form', 'Tell me more first', 'Ask another question']
            }

        case 'negative':
            return {
                message: `No problem! 😊\n\nFeel free to ask me anything else about:\n• Our services\n• Timelines\n• Pricing\n• Templates\n\nI'm here to help!`,
                suggestions: ['Tell me about services', 'How fast can you deliver?', 'Show me templates']
            }

        default:
            // Check for specific keywords in fallback
            if (msg.includes('10') && msg.includes('day')) {
                return {
                    message: `Yes! 🚀 We really do deliver in **10-15 days**!\n\nOur secret? We have a dedicated team of 50+ experts and a streamlined process perfected over 200+ projects.\n\nWe handle:\n✅ Development\n✅ Testing\n✅ Deployment\n✅ Hosting\n\nAll within 10-15 days!\n\nReady to experience our speed?`,
                    suggestions: ['Start my project', 'How much does it cost?', 'I don\'t believe it!']
                }
            }

            if (msg.includes('how') && (msg.includes('work') || msg.includes('process'))) {
                return {
                    message: `📋 **Our Process**\n\n1️⃣ **Consultation** (Free!) - We understand your needs\n2️⃣ **Quote** - Custom pricing within 24 hours\n3️⃣ **Development** - Our team gets to work\n4️⃣ **Review** - You see progress daily\n5️⃣ **Launch** - We deploy everything\n\n**Timeline:** 10-15 days from start to finish!\n\nReady to begin?`,
                    suggestions: ['Start my project', 'What\'s the cost?', 'Tell me about services']
                }
            }

            // Default fallback
            return {
                message: `I want to make sure I help you properly! 🤔\n\n**I can tell you about:**\n• 🌐 Web Development (10-15 days)\n• 📱 Mobile Apps (10-15 days)\n• 🤖 AI Solutions (10-15 days)\n• 💰 Pricing & quotes\n• 📬 How to get started\n\nWhat interests you most?`,
                suggestions: ['Tell me about services', 'How fast can you deliver?', 'Start a project']
            }
    }
}

// =====================================================
// INTENT DETECTION
// =====================================================
const detectIntent = (message: string): string => {
    const lowerMsg = message.toLowerCase().trim()

    // Check each intent's patterns
    for (const [intent, patterns] of Object.entries(INTENTS)) {
        for (const pattern of patterns) {
            // Use word boundaries for better matching
            if (lowerMsg.includes(pattern)) {
                return intent
            }
        }
    }

    return 'unknown'
}

// =====================================================
// MESSAGE TYPE
// =====================================================
interface Message {
    id: string
    type: 'user' | 'bot'
    content: string
    timestamp: Date
    suggestions?: string[]
}

// =====================================================
// TYPING INDICATOR
// =====================================================
const TypingIndicator = () => (
    <div className="flex items-center gap-1 px-4 py-3">
        <motion.div
            className="w-2 h-2 bg-purple-400 rounded-full"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
        />
        <motion.div
            className="w-2 h-2 bg-purple-400 rounded-full"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: 0.15 }}
        />
        <motion.div
            className="w-2 h-2 bg-purple-400 rounded-full"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }}
        />
    </div>
)

// =====================================================
// MAIN CHATBOT COMPONENT
// =====================================================
const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [soundEnabled, setSoundEnabled] = useState(true)
    const [unreadCount, setUnreadCount] = useState(0)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    // Play notification sound
    const playSound = useCallback(() => {
        if (soundEnabled) {
            try {
                const audio = new Audio('data:audio/wav;base64,UklGRl9vT19teleWQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU')
                audio.volume = 0.3
                audio.play().catch(() => { })
            } catch {
                // Ignore audio errors
            }
        }
    }, [soundEnabled])

    // Scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // Welcome message
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const welcome: Message = {
                id: '1',
                type: 'bot',
                content: `👋 **Hey there! I'm FD Bot!**\n\nYour AI assistant at **Forbidden Developers**.\n\nI can help you with:\n• 🌐 Web & Mobile Development\n• 🤖 AI & Machine Learning\n• ⏱️ Timelines (Spoiler: **10-15 days!**)\n• 💰 Pricing & quotes\n\nWhat would you like to know?`,
                timestamp: new Date(),
                suggestions: ['What services do you offer?', 'How fast can you deliver?', 'I want to start a project']
            }
            setMessages([welcome])
        }
    }, [isOpen, messages.length])

    // Process and send message
    const processMessage = useCallback(async (userText: string) => {
        if (!userText.trim()) return

        // Add user message
        const userMsg: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: userText.trim(),
            timestamp: new Date()
        }
        setMessages(prev => [...prev, userMsg])
        setInputValue('')
        setIsTyping(true)

        // Simulate thinking
        await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 600))

        // Detect intent and get response
        const intent = detectIntent(userText)
        const response = getResponse(intent, userText)

        // Check for navigation triggers in the user message
        const lowerText = userText.toLowerCase()
        let shouldNavigate = false
        let navTarget = ''

        if (lowerText.includes('take me') || lowerText.includes('go to') || lowerText.includes('show me')) {
            if (lowerText.includes('contact') || lowerText.includes('form')) {
                shouldNavigate = true
                navTarget = '/about#contact'
            } else if (lowerText.includes('template')) {
                shouldNavigate = true
                navTarget = '/templates'
            } else if (lowerText.includes('portfolio') || lowerText.includes('work') || lowerText.includes('project')) {
                // Scroll to portfolio section on home page
                const portfolioEl = document.getElementById('portfolio')
                if (portfolioEl) {
                    portfolioEl.scrollIntoView({ behavior: 'smooth' })
                }
            }
        }

        // Add bot response
        const botMsg: Message = {
            id: (Date.now() + 1).toString(),
            type: 'bot',
            content: response.message,
            timestamp: new Date(),
            suggestions: response.suggestions
        }

        setIsTyping(false)
        setMessages(prev => [...prev, botMsg])
        playSound()

        // Handle navigation
        if (shouldNavigate && navTarget) {
            setTimeout(() => navigate(navTarget), 1500)
        }
    }, [navigate, playSound])

    // Handle send button
    const handleSend = () => {
        if (inputValue.trim()) {
            processMessage(inputValue)
        }
    }

    // Handle suggestion click - process directly
    const handleSuggestionClick = (suggestion: string) => {
        processMessage(suggestion)
    }

    // Handle enter key
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    // Toggle chat
    const toggleChat = () => {
        setIsOpen(!isOpen)
        setIsMinimized(false)
        if (!isOpen) {
            setUnreadCount(0)
            setTimeout(() => inputRef.current?.focus(), 300)
        }
    }

    // Render message with markdown-like formatting
    const renderContent = (content: string) => {
        return content.split('\n').map((line, i) => {
            const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-purple-300">$1</strong>')
            return <span key={i} dangerouslySetInnerHTML={{ __html: formatted }} className="block" />
        })
    }

    return (
        <>
            {/* Chat Bubble Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleChat}
                        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-lg shadow-purple-500/30 flex items-center justify-center group"
                    >
                        {/* Pulse */}
                        <motion.div
                            className="absolute inset-0 rounded-full bg-purple-500"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        {/* Icon */}
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        >
                            <MessageCircle className="w-7 h-7 text-white" />
                        </motion.div>
                        {/* Sparkle */}
                        <motion.div
                            className="absolute -top-1 -right-1"
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <Sparkles className="w-5 h-5 text-yellow-300" />
                        </motion.div>
                        {/* Unread badge */}
                        {unreadCount > 0 && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -left-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
                            >
                                {unreadCount}
                            </motion.div>
                        )}
                        {/* Tooltip */}
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            className="absolute right-20 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg pointer-events-none"
                        >
                            Chat with AI Assistant
                            <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 border-8 border-transparent border-l-gray-900" />
                        </motion.div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            height: isMinimized ? 'auto' : 'min(600px, 80vh)'
                        }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-gray-900 rounded-2xl shadow-2xl shadow-purple-500/20 border border-gray-800 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                                >
                                    <Bot className="w-6 h-6 text-white" />
                                </motion.div>
                                <div>
                                    <h3 className="text-white font-semibold">FD Bot</h3>
                                    <div className="flex items-center gap-1 text-white/70 text-xs">
                                        <motion.div
                                            className="w-2 h-2 bg-green-400 rounded-full"
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        />
                                        Online • AI Assistant
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setSoundEnabled(!soundEnabled)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    {soundEnabled ? (
                                        <Volume2 className="w-4 h-4 text-white/70" />
                                    ) : (
                                        <VolumeX className="w-4 h-4 text-white/70" />
                                    )}
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    {isMinimized ? (
                                        <Maximize2 className="w-4 h-4 text-white/70" />
                                    ) : (
                                        <Minimize2 className="w-4 h-4 text-white/70" />
                                    )}
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={toggleChat}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X className="w-4 h-4 text-white/70" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Messages */}
                        {!isMinimized && (
                            <>
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                                    {messages.map((message) => (
                                        <motion.div
                                            key={message.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`flex items-start gap-2 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                                                {/* Avatar */}
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user'
                                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                                                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                                                    }`}>
                                                    {message.type === 'user' ? (
                                                        <User className="w-4 h-4 text-white" />
                                                    ) : (
                                                        <Bot className="w-4 h-4 text-white" />
                                                    )}
                                                </div>
                                                {/* Bubble */}
                                                <div className={`rounded-2xl px-4 py-3 ${message.type === 'user'
                                                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                                                    : 'bg-gray-800 text-gray-100'
                                                    }`}>
                                                    <div className="text-sm leading-relaxed">
                                                        {renderContent(message.content)}
                                                    </div>
                                                    {/* Suggestions */}
                                                    {message.suggestions && message.type === 'bot' && (
                                                        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-700">
                                                            {message.suggestions.map((suggestion, i) => (
                                                                <motion.button
                                                                    key={i}
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    onClick={() => handleSuggestionClick(suggestion)}
                                                                    className="text-xs px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-full transition-colors"
                                                                >
                                                                    {suggestion}
                                                                </motion.button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Typing indicator */}
                                    {isTyping && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex justify-start"
                                        >
                                            <div className="flex items-start gap-2">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                                    <Bot className="w-4 h-4 text-white" />
                                                </div>
                                                <div className="bg-gray-800 rounded-2xl">
                                                    <TypingIndicator />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Quick Actions */}
                                <div className="px-4 pb-2">
                                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                        {[
                                            { icon: Code, label: 'Web Dev', query: 'Tell me about web development' },
                                            { icon: Smartphone, label: 'Mobile', query: 'Tell me about mobile apps' },
                                            { icon: Brain, label: 'AI/ML', query: 'Tell me about AI services' },
                                            { icon: Zap, label: 'Timeline', query: 'How fast can you deliver?' },
                                            { icon: Globe, label: 'Templates', query: 'Show me templates' },
                                        ].map((item, i) => (
                                            <motion.button
                                                key={i}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleSuggestionClick(item.query)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-full text-xs text-gray-300 whitespace-nowrap transition-colors"
                                            >
                                                <item.icon className="w-3 h-3" />
                                                {item.label}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Input */}
                                <div className="p-4 pt-2 border-t border-gray-800">
                                    <div className="flex items-center gap-2 bg-gray-800 rounded-xl px-4 py-2">
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyDown={handleKeyPress}
                                            placeholder="Ask me anything..."
                                            className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none"
                                        />
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={handleSend}
                                            disabled={!inputValue.trim() || isTyping}
                                            className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isTyping ? (
                                                <Loader2 className="w-4 h-4 text-white animate-spin" />
                                            ) : (
                                                <Send className="w-4 h-4 text-white" />
                                            )}
                                        </motion.button>
                                    </div>
                                    <p className="text-center text-xs text-gray-500 mt-2">
                                        Powered by <span className="text-purple-400">Forbidden Developers</span> AI
                                    </p>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default AIChatbot
