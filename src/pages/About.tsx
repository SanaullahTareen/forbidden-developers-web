import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, Users, Target, Heart, Award, Sparkles, Globe, Rocket, Code2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const teamMembers = [
    {
        name: 'Alex Chen',
        role: 'CEO & Founder',
        image: 'https://i.pravatar.cc/300?img=11',
        bio: 'Visionary leader with 15+ years in tech innovation',
    },
    {
        name: 'Sarah Miller',
        role: 'CTO',
        image: 'https://i.pravatar.cc/300?img=5',
        bio: 'AI/ML expert, former Google engineer',
    },
    {
        name: 'Marcus Johnson',
        role: 'Design Director',
        image: 'https://i.pravatar.cc/300?img=12',
        bio: 'Award-winning designer, ex-Apple',
    },
    {
        name: 'Emily Zhang',
        role: 'Head of Engineering',
        image: 'https://i.pravatar.cc/300?img=9',
        bio: 'Full-stack architect, 200+ projects delivered',
    },
]

const values = [
    {
        icon: Target,
        title: 'Mission Driven',
        description: 'We exist to transform bold ideas into exceptional digital realities.',
    },
    {
        icon: Heart,
        title: 'Client Obsessed',
        description: 'Your success is our success. We go above and beyond for every project.',
    },
    {
        icon: Sparkles,
        title: 'Innovation First',
        description: 'We embrace cutting-edge technology to deliver future-proof solutions.',
    },
    {
        icon: Users,
        title: 'Team Excellence',
        description: 'Our diverse team brings world-class expertise to every challenge.',
    },
]

const milestones = [
    { year: '2018', title: 'Founded', description: 'Started with a vision to revolutionize digital development' },
    { year: '2020', title: '100+ Projects', description: 'Reached milestone of 100 successful project deliveries' },
    { year: '2022', title: 'Global Expansion', description: 'Opened offices in 5 countries across 3 continents' },
    { year: '2024', title: 'AI Division', description: 'Launched dedicated AI/ML solutions department' },
]

const About = () => {
    const heroRef = useRef<HTMLDivElement>(null)
    const isHeroInView = useInView(heroRef, { once: true })
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0">
                    <div className={`absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] ${isDark ? 'opacity-100' : 'opacity-50'}`} />
                    <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] ${isDark ? 'bg-violet-600/20' : 'bg-violet-600/10'}`} />
                    <div className={`absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] ${isDark ? 'bg-cyan-600/15' : 'bg-cyan-600/10'}`} />
                </div>

                <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    {/* Back button */}
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
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-violet-400 bg-violet-500/10 rounded-full border border-violet-500/20">
                                    <Globe className="w-4 h-4" />
                                    About Us
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                            >
                                Building the{' '}
                                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                                    future of digital
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className={`text-lg mb-8 leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}
                            >
                                We're a team of passionate innovators, designers, and engineers dedicated to crafting
                                exceptional digital experiences that transform businesses and delight users worldwide.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="flex flex-wrap gap-6"
                            >
                                {[
                                    { label: 'Projects Delivered', value: '200+' },
                                    { label: 'Team Members', value: '50+' },
                                    { label: 'Countries', value: '15+' },
                                ].map((stat) => (
                                    <div key={stat.label}>
                                        <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                                            {stat.value}
                                        </div>
                                        <div className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{stat.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Visual element */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className={`relative rounded-3xl overflow-hidden ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-gray-50 border border-gray-200'}`}>
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                                    alt="Team collaboration"
                                    className="w-full h-auto"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#030014]/80' : 'from-white/60'} to-transparent`} />

                                {/* Floating card */}
                                <div className={`absolute bottom-6 left-6 right-6 p-4 rounded-2xl backdrop-blur-xl ${isDark ? 'bg-white/10 border border-white/20' : 'bg-white/80 border border-gray-200'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
                                            <Rocket className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Innovation Hub</div>
                                            <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>Where ideas become reality</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className={`py-20 ${isDark ? 'bg-[#020010]' : 'bg-gray-50'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-cyan-400 bg-cyan-500/10 rounded-full border border-cyan-500/20 mb-4">
                            <Heart className="w-4 h-4" />
                            Our Values
                        </span>
                        <h2 className={`text-3xl sm:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            What drives us forward
                        </h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => {
                            const Icon = value.icon
                            return (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`group p-6 rounded-2xl transition-all duration-300 ${isDark ? 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.1]' : 'bg-white border border-gray-200 hover:shadow-xl hover:border-gray-300'}`}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Icon className="w-6 h-6 text-violet-400" />
                                    </div>
                                    <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{value.title}</h3>
                                    <p className={`text-sm leading-relaxed ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{value.description}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className={`py-20 ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20 mb-4">
                            <Users className="w-4 h-4" />
                            Our Team
                        </span>
                        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Meet the minds behind the magic
                        </h2>
                        <p className={`max-w-2xl mx-auto ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                            A diverse team of experts passionate about pushing the boundaries of what's possible.
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`group relative rounded-2xl overflow-hidden ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-white border border-gray-200 shadow-lg'}`}
                            >
                                <div className="aspect-square overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#030014]' : 'from-black/70'} via-transparent to-transparent`} />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                                    <p className="text-violet-400 text-sm mb-1">{member.role}</p>
                                    <p className="text-white/60 text-sm">{member.bio}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className={`py-20 ${isDark ? 'bg-[#020010]' : 'bg-gray-50'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-4">
                            <Award className="w-4 h-4" />
                            Our Journey
                        </span>
                        <h2 className={`text-3xl sm:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Milestones we're proud of
                        </h2>
                    </motion.div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className={`absolute left-1/2 top-0 bottom-0 w-px ${isDark ? 'bg-white/10' : 'bg-gray-300'} hidden md:block`} />

                        <div className="space-y-12">
                            {milestones.map((milestone, index) => (
                                <motion.div
                                    key={milestone.year}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >
                                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        <div className={`inline-block p-6 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-white border border-gray-200 shadow-lg'}`}>
                                            <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-2">
                                                {milestone.year}
                                            </div>
                                            <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{milestone.title}</h3>
                                            <p className={`${isDark ? 'text-white/50' : 'text-gray-500'}`}>{milestone.description}</p>
                                        </div>
                                    </div>
                                    <div className={`w-4 h-4 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 border-4 ${isDark ? 'border-[#020010]' : 'border-gray-50'} z-10`} />
                                    <div className="flex-1 hidden md:block" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={`py-20 ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`relative p-12 rounded-3xl overflow-hidden ${isDark ? 'bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-white/10' : 'bg-gradient-to-br from-violet-100 to-fuchsia-100 border border-violet-200'}`}
                    >
                        <div className="relative z-10 text-center">
                            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Ready to work with us?
                            </h2>
                            <p className={`mb-8 max-w-xl mx-auto ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                Let's create something extraordinary together. Get in touch and let's discuss your next project.
                            </p>
                            <Link
                                to="/#contact"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-violet-500/25 transition-all"
                            >
                                <Code2 className="w-5 h-5" />
                                Start a Project
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default About
