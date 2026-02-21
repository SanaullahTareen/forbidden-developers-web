import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { contentApi } from '../lib/api'

interface Testimonial {
    _id?: string
    name: string
    role: string
    company: string
    image: string
    content: string
    rating: number
    order: number
}

const fallbackTestimonials: Testimonial[] = [
    {
        name: 'Sarah Chen',
        role: 'CEO',
        company: 'TechStart Inc',
        image: 'https://i.pravatar.cc/150?img=1',
        content: 'Forbidden Developers transformed our vision into reality. Their expertise in AI and modern web technologies is unmatched. The team delivered beyond our expectations with exceptional attention to detail and innovative solutions.',
        rating: 5,
        order: 0
    },
    {
        name: 'Marcus Rodriguez',
        role: 'CTO',
        company: 'FinanceFlow',
        image: 'https://i.pravatar.cc/150?img=12',
        content: 'Working with Forbidden Developers was a game-changer for our fintech platform. They built our app with incredible attention to security and user experience. The communication throughout was excellent.',
        rating: 5,
        order: 1
    },
    {
        name: 'Emma Wilson',
        role: 'Founder',
        company: 'HealthTech',
        image: 'https://i.pravatar.cc/150?img=5',
        content: 'The best development team we have ever worked with. Their AI/ML implementation was flawless, and the project was delivered ahead of schedule. True professionals who understand complex requirements.',
        rating: 5,
        order: 2
    },
    {
        name: 'David Kim',
        role: 'Product Manager',
        company: 'ShopNow',
        image: 'https://i.pravatar.cc/150?img=13',
        content: 'Incredible work on our 3D e-commerce experience. The immersive features they built increased our conversion rates by 40%. Masters of their craft with cutting-edge technology expertise.',
        rating: 5,
        order: 3
    },
]

interface TrustedPartner {
    _id?: string
    name: string
    website?: string
    order: number
}

const fallbackPartners: TrustedPartner[] = [
    { name: 'TechStart', website: '', order: 0 },
    { name: 'FinanceFlow', website: '', order: 1 },
    { name: 'HealthTech', website: '', order: 2 },
    { name: 'ShopNow', website: '', order: 3 },
    { name: 'CloudSync', website: '', order: 4 },
    { name: 'DataVerse', website: '', order: 5 },
]

const Testimonials = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0)
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials)
    const [partners, setPartners] = useState<TrustedPartner[]>(fallbackPartners)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [testimonialsRes, partnersRes] = await Promise.all([
                    contentApi.get('/content/testimonials'),
                    contentApi.get('/content/trusted-partners')
                ])
                if (testimonialsRes.data && testimonialsRes.data.length > 0) {
                    setTestimonials(testimonialsRes.data)
                }
                if (partnersRes.data && partnersRes.data.length > 0) {
                    setPartners(partnersRes.data)
                }
            } catch (error) {
                console.error('Failed to fetch data:', error)
            }
        }
        fetchData()
    }, [])

    const nextTestimonial = () => {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setDirection(-1)
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    // Auto-advance
    useEffect(() => {
        if (testimonials.length === 0) return
        const timer = setInterval(() => {
            setDirection(1)
            setCurrentIndex((prev) => (prev + 1) % testimonials.length)
        }, 6000)
        return () => clearInterval(timer)
    }, [testimonials.length])

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 100 : -100,
            opacity: 0,
        }),
    }

    return (
        <section ref={sectionRef} className={`relative py-20 md:py-32 overflow-hidden ${isDark ? 'bg-[#020010]' : 'bg-gray-50'}`}>
            {/* Background */}
            <div className="absolute inset-0">
                <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] ${isDark ? 'opacity-100' : 'opacity-0'}`} />
                <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] ${isDark ? 'bg-violet-600/10' : 'bg-violet-600/5'}`} />
                <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] ${isDark ? 'bg-cyan-600/10' : 'bg-cyan-600/5'}`} />
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="mb-4"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            Testimonials
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                    >
                        Loved by{' '}
                        <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                            innovators
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={`text-base md:text-lg ${isDark ? 'text-white/40' : 'text-gray-500'}`}
                    >
                        Hear from the leaders who trusted us to build their digital products.
                    </motion.p>
                </div>

                {/* Testimonial carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="relative max-w-4xl mx-auto"
                >
                    {/* Main testimonial card */}
                    <div className={`relative p-6 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl backdrop-blur-sm overflow-hidden ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-white border border-gray-200 shadow-lg'}`}>
                        {/* Quote icon */}
                        <Quote className={`absolute top-6 sm:top-8 left-6 sm:left-8 w-10 h-10 md:w-12 md:h-12 ${isDark ? 'text-white/5' : 'text-gray-100'}`} />

                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                                {/* Rating */}
                                <div className="flex gap-1 mb-6">
                                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className={`text-lg sm:text-xl md:text-2xl leading-relaxed mb-8 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                                    "{testimonials[currentIndex].content}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-4">
                                    <img
                                        src={testimonials[currentIndex].image}
                                        alt={testimonials[currentIndex].name}
                                        className={`w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                                    />
                                    <div>
                                        <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            {testimonials[currentIndex].name}
                                        </div>
                                        <div className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                                            {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Decorative gradient */}
                        <div className={`absolute -bottom-20 -right-20 w-60 h-60 rounded-full blur-3xl ${isDark ? 'bg-gradient-to-br from-violet-600/20 to-cyan-600/20' : 'bg-gradient-to-br from-violet-600/10 to-cyan-600/10'}`} />
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-6 md:mt-8">
                        {/* Dots */}
                        <div className="flex gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setDirection(i > currentIndex ? 1 : -1)
                                        setCurrentIndex(i)
                                    }}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex
                                        ? isDark ? 'w-8 bg-white' : 'w-8 bg-gray-900'
                                        : isDark ? 'w-1.5 bg-white/20 hover:bg-white/40' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Arrows */}
                        <div className="flex gap-3">
                            <button
                                onClick={prevTestimonial}
                                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all ${isDark ? 'bg-white/[0.03] border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.08]' : 'bg-white border border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-50'}`}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextTestimonial}
                                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all ${isDark ? 'bg-white/[0.03] border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.08]' : 'bg-white border border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-50'}`}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Client logos */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-16 md:mt-20 text-center"
                >
                    <p className={`text-sm mb-8 uppercase tracking-wider ${isDark ? 'text-white/30' : 'text-gray-400'}`}>Trusted by industry leaders</p>
                    <div className={`flex flex-wrap justify-center items-center gap-x-8 md:gap-x-12 gap-y-4 md:gap-y-6`}>
                        {partners.map((partner) => (
                            partner.website ? (
                                <a
                                    key={partner._id || partner.name}
                                    href={partner.website.startsWith('http') ? partner.website : `https://${partner.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-lg md:text-xl font-bold transition-all hover:scale-105 ${isDark ? 'text-white/40 hover:text-white/70' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    {partner.name}
                                </a>
                            ) : (
                                <span
                                    key={partner._id || partner.name}
                                    className={`text-lg md:text-xl font-bold ${isDark ? 'text-white/40' : 'text-gray-400'}`}
                                >
                                    {partner.name}
                                </span>
                            )
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Testimonials
