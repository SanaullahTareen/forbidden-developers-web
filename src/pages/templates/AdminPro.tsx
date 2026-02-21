import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Menu, X, BarChart3, PieChart, TrendingUp, Users, Settings, LogOut, ChevronLeft, Activity, AlertCircle, CheckCircle, Clock } from 'lucide-react';

// Animated counter component for dashboard stats
const AnimatedCounter = ({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) => {
    const [count, setCount] = useState(0);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);
            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// Floating particle component for ambient effects
const FloatingParticle = ({ delay, duration, size, left, top }: { delay: number; duration: number; size: number; left: string; top: string }) => (
    <motion.div
        className="absolute rounded-full bg-gradient-to-r from-violet-500/20 to-slate-500/20 blur-sm"
        style={{ width: size, height: size, left, top }}
        animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
        }}
        transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    />
);

export default function AdminPro() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');

    const widgets = [
        { label: 'Total Users', value: '12,543', change: '+12%', icon: <Users className="w-8 h-8" />, color: 'from-violet-600 to-purple-600' },
        { label: 'Revenue', value: '$84,392', change: '+8.2%', icon: <TrendingUp className="w-8 h-8" />, color: 'from-blue-600 to-cyan-600' },
        { label: 'Conversions', value: '4,239', change: '+23%', icon: <CheckCircle className="w-8 h-8" />, color: 'from-green-600 to-emerald-600' },
        { label: 'Pending', value: '87', change: '-5%', icon: <AlertCircle className="w-8 h-8" />, color: 'from-orange-600 to-amber-600' }
    ];

    const chartData = [
        { name: 'Jan', value: 65 },
        { name: 'Feb', value: 78 },
        { name: 'Mar', value: 92 },
        { name: 'Apr', value: 81 },
        { name: 'May', value: 95 },
        { name: 'Jun', value: 87 },
    ];

    const recentActivity = [
        { type: 'User signup', desc: 'New user registered', time: '2 mins ago', icon: <Users className="w-5 h-5" /> },
        { type: 'Purchase', desc: 'Order #12451 completed', time: '15 mins ago', icon: <CheckCircle className="w-5 h-5" /> },
        { type: 'System alert', desc: 'Database backup completed', time: '1 hour ago', icon: <AlertCircle className="w-5 h-5" /> },
        { type: 'Settings', desc: 'Admin account updated', time: '3 hours ago', icon: <Settings className="w-5 h-5" /> }
    ];

    const users = [
        { id: '001', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Admin', status: 'Active', joined: '2024-01-15' },
        { id: '002', name: 'Michael Chen', email: 'michael@example.com', role: 'Editor', status: 'Active', joined: '2024-02-20' },
        { id: '003', name: 'Emma Davis', email: 'emma@example.com', role: 'Viewer', status: 'Inactive', joined: '2024-03-10' },
        { id: '004', name: 'James Miller', email: 'james@example.com', role: 'Editor', status: 'Active', joined: '2024-04-05' },
    ];

    return (
        <div className="bg-slate-950 text-white h-screen overflow-hidden flex flex-col relative">
            {/* Floating Particles Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <FloatingParticle delay={0} duration={8} size={6} left="10%" top="20%" />
                <FloatingParticle delay={1} duration={10} size={4} left="80%" top="15%" />
                <FloatingParticle delay={2} duration={9} size={8} left="20%" top="70%" />
                <FloatingParticle delay={3} duration={11} size={5} left="70%" top="60%" />
                <FloatingParticle delay={4} duration={7} size={6} left="50%" top="30%" />
                <FloatingParticle delay={5} duration={12} size={4} left="90%" top="80%" />
                <FloatingParticle delay={1.5} duration={8} size={7} left="5%" top="50%" />
                <FloatingParticle delay={2.5} duration={10} size={5} left="60%" top="85%" />
            </div>

            {/* Back Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="fixed top-6 left-6 z-50"
            >
                <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        to="/templates"
                        className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-full transition-all text-sm shadow-lg shadow-violet-500/25"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Back
                    </Link>
                </motion.div>
            </motion.div>

            {/* Header */}
            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur px-6 py-4 sticky top-0 z-40">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg flex items-center justify-center font-bold">
                            AP
                        </div>
                        <h1 className="text-2xl font-bold">AdminPro</h1>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 hover:bg-slate-800 rounded-lg transition-all relative"
                        >
                            <Activity className="w-6 h-6" />
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                            />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)" }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/25"
                        >
                            <Users className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 hover:bg-slate-800 rounded-lg transition-all"
                        >
                            <LogOut className="w-6 h-6" />
                        </motion.button>
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden"
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden gap-6 p-6">
                {/* Sidebar */}
                <motion.aside
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden md:flex flex-col w-64 bg-slate-900/50 backdrop-blur rounded-lg border border-slate-800 p-6 overflow-y-auto"
                >
                    <nav className="space-y-2 flex-1">
                        {[
                            { id: 'dashboard', icon: <BarChart3 className="w-5 h-5" />, label: 'Dashboard' },
                            { id: 'analytics', icon: <TrendingUp className="w-5 h-5" />, label: 'Analytics' },
                            { id: 'users', icon: <Users className="w-5 h-5" />, label: 'Users' },
                            { id: 'reports', icon: <PieChart className="w-5 h-5" />, label: 'Reports' },
                            { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
                        ].map((item) => (
                            <motion.button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                whileHover={{ x: 4 }}
                                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${activeTab === item.id
                                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                                    : 'text-gray-300 hover:bg-slate-800'
                                    }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </motion.button>
                        ))}
                    </nav>
                </motion.aside>

                {/* Main Content */}
                <motion.main
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 overflow-y-auto"
                >
                    {activeTab === 'dashboard' && (
                        <div className="space-y-6">
                            {/* Widgets Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {widgets.map((widget, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`bg-gradient-to-br ${widget.color} p-6 rounded-lg overflow-hidden relative group cursor-pointer shadow-lg`}
                                    >
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300" />
                                        <motion.div
                                            className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            initial={false}
                                        />
                                        <div className="relative z-10">
                                            <div className="text-white/70 text-sm mb-2">{widget.label}</div>
                                            <div className="text-3xl font-bold mb-2">
                                                {widget.label === 'Total Users' && <AnimatedCounter value={12543} />}
                                                {widget.label === 'Revenue' && <AnimatedCounter value={84392} prefix="$" />}
                                                {widget.label === 'Conversions' && <AnimatedCounter value={4239} />}
                                                {widget.label === 'Pending' && <AnimatedCounter value={87} />}
                                            </div>
                                            <motion.div
                                                className="text-sm text-green-300 font-semibold"
                                                animate={{ opacity: [0.7, 1, 0.7] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                {widget.change}
                                            </motion.div>
                                        </div>
                                        <motion.div
                                            className="absolute top-4 right-4 text-white/20"
                                            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            {widget.icon}
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Charts Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Line Chart */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(139, 92, 246, 0.15)" }}
                                    className="col-span-1 lg:col-span-2 bg-slate-900/50 backdrop-blur rounded-lg border border-slate-800 p-6 transition-all duration-300"
                                >
                                    <h3 className="text-lg font-semibold mb-6">Revenue Trend</h3>
                                    <div className="flex items-end justify-between gap-2 h-48">
                                        {chartData.map((data, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${data.value}%` }}
                                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                                className="flex-1 bg-gradient-to-t from-violet-600 to-purple-600 rounded-t-lg group hover:from-violet-500 hover:to-purple-500 transition-all relative"
                                                title={`${data.name}: ${data.value}%`}
                                            >
                                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {data.value}%
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between mt-4 text-xs text-gray-400">
                                        {chartData.map((data) => (
                                            <span key={data.name}>{data.name}</span>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Pie Chart / Distribution */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(139, 92, 246, 0.15)" }}
                                    className="bg-slate-900/50 backdrop-blur rounded-lg border border-slate-800 p-6 transition-all duration-300"
                                >
                                    <h3 className="text-lg font-semibold mb-6">Distribution</h3>
                                    <div className="flex items-center justify-center h-48">
                                        <div className="space-y-3 w-full">
                                            {[
                                                { label: 'Desktop', value: 65, color: 'from-violet-600' },
                                                { label: 'Mobile', value: 25, color: 'from-purple-600' },
                                                { label: 'Tablet', value: 10, color: 'from-indigo-600' }
                                            ].map((item, i) => (
                                                <div key={i}>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span>{item.label}</span>
                                                        <span className="font-semibold">{item.value}%</span>
                                                    </div>
                                                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${item.value}%` }}
                                                            transition={{ delay: i * 0.2, duration: 0.6 }}
                                                            className={`h-full bg-gradient-to-r ${item.color} to-cyan-600`}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Two Column Layout */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Recent Activity */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(139, 92, 246, 0.15)" }}
                                    className="bg-slate-900/50 backdrop-blur rounded-lg border border-slate-800 p-6 transition-all duration-300"
                                >
                                    <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
                                    <div className="space-y-4">
                                        {recentActivity.map((activity, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.6 + i * 0.1 }}
                                                className="flex gap-4 p-3 rounded-lg hover:bg-slate-800/50 transition-all"
                                            >
                                                <div className="text-violet-400">{activity.icon}</div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-semibold text-sm">{activity.type}</div>
                                                    <div className="text-xs text-gray-400">{activity.desc}</div>
                                                </div>
                                                <div className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Quick Stats */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(139, 92, 246, 0.15)" }}
                                    className="bg-slate-900/50 backdrop-blur rounded-lg border border-slate-800 p-6 transition-all duration-300"
                                >
                                    <h3 className="text-lg font-semibold mb-6">Performance</h3>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'Page Load Time', value: '1.2s', status: 'Good' },
                                            { label: 'Uptime', value: '99.9%', status: 'Excellent' },
                                            { label: 'CPU Usage', value: '42%', status: 'Normal' },
                                            { label: 'Memory Usage', value: '68%', status: 'Normal' }
                                        ].map((stat, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-all">
                                                <div>
                                                    <div className="text-sm font-semibold">{stat.label}</div>
                                                    <div className="text-xs text-gray-400">{stat.value}</div>
                                                </div>
                                                <span className={`text-xs px-2 py-1 rounded ${stat.status === 'Good' || stat.status === 'Excellent'
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : 'bg-yellow-500/20 text-yellow-400'
                                                    }`}>
                                                    {stat.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Users Table */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(139, 92, 246, 0.15)" }}
                                className="bg-slate-900/50 backdrop-blur rounded-lg border border-slate-800 p-6 transition-all duration-300"
                            >
                                <h3 className="text-lg font-semibold mb-6">Recent Users</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-slate-700">
                                                <th className="text-left py-3 px-4 font-semibold text-gray-300">ID</th>
                                                <th className="text-left py-3 px-4 font-semibold text-gray-300">Name</th>
                                                <th className="text-left py-3 px-4 font-semibold text-gray-300">Email</th>
                                                <th className="text-left py-3 px-4 font-semibold text-gray-300">Role</th>
                                                <th className="text-left py-3 px-4 font-semibold text-gray-300">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user) => (
                                                <tr key={user.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-all">
                                                    <td className="py-3 px-4 text-gray-400">{user.id}</td>
                                                    <td className="py-3 px-4">{user.name}</td>
                                                    <td className="py-3 px-4 text-gray-400 text-xs">{user.email}</td>
                                                    <td className="py-3 px-4">
                                                        <span className="px-2 py-1 rounded text-xs bg-violet-500/20 text-violet-300">
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span className={`px-2 py-1 rounded text-xs ${user.status === 'Active'
                                                            ? 'bg-green-500/20 text-green-300'
                                                            : 'bg-gray-500/20 text-gray-300'
                                                            }`}>
                                                            {user.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        </div>
                    )}

                    {/* Placeholder for other tabs */}
                    {activeTab !== 'dashboard' && (
                        <div className="flex items-center justify-center h-96">
                            <div className="text-center">
                                <div className="text-4xl font-bold mb-4 capitalize">{activeTab}</div>
                                <p className="text-gray-400">Content for {activeTab} section coming soon</p>
                            </div>
                        </div>
                    )}
                </motion.main>
            </div>
        </div>
    );
}
