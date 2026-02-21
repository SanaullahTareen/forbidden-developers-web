import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code, Smartphone, Brain, Palette, Server, Rocket, ArrowUpRight, LucideIcon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { contentApi } from '../lib/api'

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
    Code, Smartphone, Brain, Palette, Server, Rocket
}

interface Service {
    _id: string
    icon: string
    title: string
    description: string
    tags: string[]
    color: string
    shadowColor: string
    order: number
}

// Fallback services in case API fails
const fallbackServices: Omit<Service, '_id'>[] = [
    {
        icon: 'Code',
        title: 'Web Development',
        description: 'Bespoke web applications built with cutting-edge technologies. From complex platforms to elegant landing pages.',
        tags: ['React', 'Next.js', 'TypeScript', 'Node.js'],
        color: 'from-violet-500 to-purple-600',
        shadowColor: 'shadow-violet-500/20',
        order: 0
    },
    {
        icon: 'Smartphone',
        title: 'Mobile Apps',
        description: 'Native and cross-platform mobile experiences that users love. Intuitive, fast, and beautifully designed.',
        tags: ['React Native', 'Flutter', 'iOS', 'Android'],
        color: 'from-blue-500 to-cyan-500',
        shadowColor: 'shadow-blue-500/20',
        order: 1
    },
    {
        icon: 'Brain',
        title: 'AI & Machine Learning',
        description: 'Intelligent solutions that transform data into insights. Custom AI models, automation, and smart integrations.',
        tags: ['OpenAI', 'TensorFlow', 'Python', 'NLP'],
        color: 'from-emerald-500 to-teal-500',
        shadowColor: 'shadow-emerald-500/20',
        order: 2
    },
    {
        icon: 'Palette',
        title: 'UI/UX Design',
        description: 'User-centered design that converts. Beautiful interfaces backed by research and user psychology.',
        tags: ['Figma', 'Prototyping', 'User Research', 'Design Systems'],
        color: 'from-pink-500 to-rose-500',
        shadowColor: 'shadow-pink-500/20',
        order: 3
    },
    {
        icon: 'Server',
        title: 'Backend & APIs',
        description: 'Robust, scalable backend systems. Microservices, APIs, and database architecture that performs.',
        tags: ['GraphQL', 'REST', 'PostgreSQL', 'Redis'],
        color: 'from-orange-500 to-amber-500',
        shadowColor: 'shadow-orange-500/20',
        order: 4
    },
    {
        icon: 'Rocket',
        title: 'DevOps & Cloud',
        description: 'Infrastructure that scales. CI/CD pipelines, cloud architecture, and deployment automation.',
        tags: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
        color: 'from-indigo-500 to-violet-500',
        shadowColor: 'shadow-indigo-500/20',
        order: 5
    },
]

interface ServiceCardProps {
    service: Service | Omit<Service, '_id'>
    index: number
    isDark: boolean
}

const ServiceCard = ({ service, index, isDark }: ServiceCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(cardRef, { once: true, margin: '-50px' })
    const Icon = iconMap[service.icon] || Code

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] }}
            className="group relative"
        >
            <div className={`relative h-full p-6 md:p-8 rounded-2xl md:rounded-3xl backdrop-blur-sm overflow-hidden transition-all duration-500 ${isDark ? 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1]' : 'bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200'}`}>
                {/* Gradient hover effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                {/* Icon */}
                <div className={`relative inline-flex p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br ${service.color} ${service.shadowColor} shadow-xl mb-4 md:mb-6`}>
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>

                {/* Title with arrow */}
                <div className="flex items-center justify-between mb-3 md:mb-4">
                    <h3 className={`text-lg md:text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {service.title}
                    </h3>
                    <ArrowUpRight className={`w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 ${isDark ? 'text-white/20 group-hover:text-white/60' : 'text-gray-300 group-hover:text-gray-500'}`} />
                </div>

                {/* Description */}
                <p className={`text-sm md:text-base leading-relaxed mb-4 md:mb-6 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                    {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                        <span
                            key={tag}
                            className={`px-2 md:px-3 py-1 text-xs font-medium rounded-full border ${isDark ? 'text-white/50 bg-white/[0.03] border-white/[0.05]' : 'text-gray-500 bg-gray-50 border-gray-100'}`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Corner accent */}
                <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${service.color} rounded-full opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`} />
            </div>
        </motion.div>
    )
}

const Services = () => {
    const { theme } = useTheme()
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
    const isDark = theme === 'dark'
    const [services, setServices] = useState<(Service | Omit<Service, '_id'>)[]>(fallbackServices)

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await contentApi.get('/content/services')
                if (response.data && response.data.length > 0) {
                    setServices(response.data)
                }
            } catch (error) {
                console.error('Failed to fetch services:', error)
                // Keep fallback services
            }
        }
        fetchServices()
    }, [])

    return (
        <section id="services" ref={sectionRef} className={`relative py-20 md:py-32 overflow-hidden ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
            {/* Background elements */}
            <div className="absolute inset-0">
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] rounded-full blur-[150px] ${isDark ? 'bg-violet-600/10' : 'bg-violet-400/20'}`} />
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                {/* Section header */}
                <div className="max-w-3xl mb-12 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="mb-4"
                    >
                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-full border ${isDark ? 'text-violet-400 bg-violet-500/10 border-violet-500/20' : 'text-violet-600 bg-violet-100 border-violet-200'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-violet-400' : 'bg-violet-500'}`} />
                            What We Do
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                    >
                        Services that drive{' '}
                        <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                            growth
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={`text-base md:text-lg ${isDark ? 'text-white/40' : 'text-gray-500'}`}
                    >
                        From concept to deployment, we offer comprehensive development services
                        to bring your vision to life with precision and creativity.
                    </motion.p>
                </div>

                {/* Services grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {services.map((service, index) => (
                        <ServiceCard key={service.title} service={service} index={index} isDark={isDark} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services
