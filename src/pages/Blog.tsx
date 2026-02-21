import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowLeft, BookOpen, Calendar, Clock, Search, X, User, Mail, CheckCircle, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { contentApi } from '../lib/api'

interface BlogPost {
    _id: string
    title: string
    slug: string
    excerpt: string
    content: string
    image: string
    category: string
    author: string
    publishedAt: string
    readTime: string
    featured: boolean
    tags: string[]
}

const Blog = () => {
    const heroRef = useRef<HTMLDivElement>(null)
    const isHeroInView = useInView(heroRef, { once: true })
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState<string[]>(['All'])
    const [activeCategory, setActiveCategory] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

    // Newsletter state
    const [email, setEmail] = useState('')
    const [subscribing, setSubscribing] = useState(false)
    const [subscribed, setSubscribed] = useState(false)
    const [subscribeError, setSubscribeError] = useState('')

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const [postsRes, categoriesRes] = await Promise.all([
                    contentApi.get('/content/blog'),
                    contentApi.get('/content/blog/categories')
                ])
                if (postsRes.data) {
                    setPosts(postsRes.data)
                }
                if (categoriesRes.data) {
                    setCategories(categoriesRes.data)
                }
            } catch (error) {
                console.error('Failed to fetch blog posts:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchPosts()
    }, [])

    const filteredPosts = posts.filter(post => {
        const matchesCategory = activeCategory === 'All' || post.category === activeCategory
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const featuredPosts = posts.filter(post => post.featured).slice(0, 2)

    const openPostModal = (post: BlogPost) => {
        setSelectedPost(post)
        document.body.style.overflow = 'hidden'
    }

    const closePostModal = () => {
        setSelectedPost(null)
        document.body.style.overflow = 'auto'
    }

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubscribeError('')

        if (!email) {
            setSubscribeError('Please enter your email address')
            return
        }

        setSubscribing(true)
        try {
            const response = await contentApi.post('/content/newsletter/subscribe', {
                email,
                source: 'blog'
            })
            if (response.data.success) {
                setSubscribed(true)
                setEmail('')
            }
        } catch (error: any) {
            setSubscribeError(error.response?.data?.message || 'Failed to subscribe. Please try again.')
        } finally {
            setSubscribing(false)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0">
                    <div className={`absolute inset-0 bg-[linear-gradient(rgba(251,146,60,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,146,60,0.03)_1px,transparent_1px)] bg-[size:60px_60px] ${isDark ? 'opacity-100' : 'opacity-50'}`} />
                    <div className={`absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full blur-[150px] ${isDark ? 'bg-orange-600/15' : 'bg-orange-600/10'}`} />
                    <div className={`absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full blur-[120px] ${isDark ? 'bg-amber-600/15' : 'bg-amber-600/10'}`} />
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

                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="mb-6"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20">
                                <BookOpen className="w-4 h-4" />
                                Our Blog
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                            Insights &{' '}
                            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                                Knowledge
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`text-lg mb-8 leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}
                        >
                            Deep dives into technology, design, and engineering.
                            Learn from our team's experience building world-class digital products.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className={`relative max-w-md ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/30' : 'text-gray-400'}`} />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all ${isDark ? 'bg-white/[0.03] border-white/[0.1] focus:border-amber-500/50 placeholder:text-white/30' : 'bg-white border-gray-200 focus:border-amber-500 placeholder:text-gray-400'} outline-none`}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
                <section className={`py-12 ${isDark ? 'bg-[#020010]' : 'bg-gray-50'}`}>
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                            Featured Articles
                        </motion.h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            {featuredPosts.map((post, index) => (
                                <motion.article
                                    key={post._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    onClick={() => openPostModal(post)}
                                    className={`group relative rounded-2xl overflow-hidden cursor-pointer ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-white border border-gray-200 shadow-lg'}`}
                                >
                                    <div className="aspect-[16/9] overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#020010]' : 'from-black/60'} via-transparent to-transparent`} />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="px-3 py-1 text-xs font-medium text-amber-400 bg-amber-500/20 rounded-full backdrop-blur-sm">
                                                {post.category}
                                            </span>
                                            <span className="text-white/60 text-sm">{post.readTime}</span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-white/60 text-sm line-clamp-2">{post.excerpt}</p>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* All Posts */}
            <section className={`py-20 ${isDark ? 'bg-[#030014]' : 'bg-white'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    {/* Category filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-2 mb-12"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeCategory === cat
                                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                                    : isDark
                                        ? 'text-white/50 hover:text-white bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08]'
                                        : 'text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : filteredPosts.length === 0 ? (
                        <div className="text-center py-16">
                            <p className={`text-lg ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                No articles found matching your criteria.
                            </p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPosts.map((post, index) => (
                                <motion.article
                                    key={post._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    onClick={() => openPostModal(post)}
                                    className={`group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${isDark ? 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05]' : 'bg-white border border-gray-200 hover:shadow-xl'}`}
                                >
                                    <div className="aspect-[16/10] overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${isDark ? 'text-amber-400 bg-amber-500/10' : 'text-amber-600 bg-amber-50'}`}>
                                                {post.category}
                                            </span>
                                        </div>
                                        <h3 className={`text-lg font-semibold mb-2 group-hover:text-amber-500 transition-colors line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            {post.title}
                                        </h3>
                                        <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                            {post.excerpt}
                                        </p>
                                        <div className={`flex items-center justify-between text-sm ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4" />
                                                {post.author}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                {post.readTime}
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className={`py-20 ${isDark ? 'bg-[#020010]' : 'bg-gray-50'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`relative p-12 rounded-3xl overflow-hidden text-center ${isDark ? 'bg-gradient-to-br from-amber-600/20 to-orange-600/20 border border-white/10' : 'bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200'}`}
                    >
                        <AnimatePresence mode="wait">
                            {subscribed ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="py-8"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', delay: 0.2 }}
                                    >
                                        <CheckCircle className="w-16 h-16 mx-auto text-emerald-500 mb-4" />
                                    </motion.div>
                                    <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        You're Subscribed! 🎉
                                    </h3>
                                    <p className={`${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                        Thanks for subscribing. Check your inbox for awesome content!
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <Mail className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-amber-400' : 'text-amber-500'}`} />
                                    <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        Stay in the loop
                                    </h2>
                                    <p className={`mb-8 max-w-xl mx-auto ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                        Subscribe to our newsletter and get the latest articles, tutorials, and insights delivered to your inbox.
                                    </p>
                                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className={`flex-1 px-4 py-3 rounded-xl border outline-none transition-all ${isDark ? 'bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-amber-500/50' : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-amber-500'}`}
                                        />
                                        <button
                                            type="submit"
                                            disabled={subscribing}
                                            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 min-w-[140px]"
                                        >
                                            {subscribing ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    <span>Subscribing</span>
                                                </>
                                            ) : (
                                                'Subscribe'
                                            )}
                                        </button>
                                    </form>
                                    {subscribeError && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-400 text-sm mt-4"
                                        >
                                            {subscribeError}
                                        </motion.p>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Blog Post Modal */}
            <AnimatePresence>
                {selectedPost && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                            onClick={closePostModal}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl ${isDark ? 'bg-[#0a0a1a] border border-white/10' : 'bg-white'}`}
                        >
                            <button
                                onClick={closePostModal}
                                className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}
                            >
                                <X className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-700'}`} />
                            </button>

                            <div className="relative aspect-video">
                                <img
                                    src={selectedPost.image}
                                    alt={selectedPost.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#0a0a1a]' : 'from-white'} to-transparent`} />
                            </div>

                            <div className="p-6 md:p-8">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600'}`}>
                                        {selectedPost.category}
                                    </span>
                                    <span className={`flex items-center gap-1 text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                                        <Calendar className="w-4 h-4" />
                                        {formatDate(selectedPost.publishedAt)}
                                    </span>
                                    <span className={`flex items-center gap-1 text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                                        <Clock className="w-4 h-4" />
                                        {selectedPost.readTime}
                                    </span>
                                </div>

                                <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {selectedPost.title}
                                </h2>

                                <div className={`flex items-center gap-3 mb-6 pb-6 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-semibold">
                                        {selectedPost.author.charAt(0)}
                                    </div>
                                    <div>
                                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedPost.author}</p>
                                        <p className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>Author</p>
                                    </div>
                                </div>

                                <div
                                    className={`prose prose-lg max-w-none ${isDark ? 'prose-invert' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                                />

                                {selectedPost.tags && selectedPost.tags.length > 0 && (
                                    <div className={`mt-8 pt-6 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                                        <p className={`text-sm font-medium mb-3 ${isDark ? 'text-white/60' : 'text-gray-500'}`}>Tags:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedPost.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className={`px-3 py-1 text-sm rounded-full ${isDark ? 'bg-white/5 text-white/60' : 'bg-gray-100 text-gray-600'}`}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Blog
