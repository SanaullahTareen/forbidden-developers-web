import AdminLayout from './AdminLayout'
import ContentManager from './ContentManager'

const iconOptions = [
    { value: 'Code', label: 'Code' },
    { value: 'Smartphone', label: 'Smartphone' },
    { value: 'Brain', label: 'Brain' },
    { value: 'Palette', label: 'Palette' },
    { value: 'Server', label: 'Server' },
    { value: 'Rocket', label: 'Rocket' },
    { value: 'Globe', label: 'Globe' },
    { value: 'Zap', label: 'Zap' },
    { value: 'Shield', label: 'Shield' },
    { value: 'Database', label: 'Database' },
]

const colorOptions = [
    { value: 'from-violet-500 to-purple-600', label: 'Violet to Purple' },
    { value: 'from-blue-500 to-cyan-500', label: 'Blue to Cyan' },
    { value: 'from-emerald-500 to-teal-500', label: 'Emerald to Teal' },
    { value: 'from-pink-500 to-rose-500', label: 'Pink to Rose' },
    { value: 'from-orange-500 to-amber-500', label: 'Orange to Amber' },
    { value: 'from-indigo-500 to-violet-500', label: 'Indigo to Violet' },
]

const ServicesAdmin = () => {
    return (
        <AdminLayout>
            <ContentManager
                title="Services"
                endpoint="services"
                itemName="service"
                fields={[
                    { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'e.g., Web Development' },
                    { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Describe the service...' },
                    { name: 'icon', label: 'Icon', type: 'select', required: true, options: iconOptions },
                    { name: 'tags', label: 'Tags', type: 'tags', placeholder: 'React, Node.js, TypeScript' },
                    { name: 'color', label: 'Gradient Color', type: 'select', options: colorOptions, defaultValue: 'from-violet-500 to-purple-600' },
                    { name: 'order', label: 'Order', type: 'number', defaultValue: 0 },
                    { name: 'isActive', label: 'Active', type: 'toggle', defaultValue: true },
                ]}
                columns={[
                    { key: 'title', label: 'Title' },
                    {
                        key: 'description', label: 'Description', render: (item) => (
                            <span className="line-clamp-2 max-w-xs">{String(item.description || '').slice(0, 60)}...</span>
                        )
                    },
                    {
                        key: 'tags', label: 'Tags', render: (item) => (
                            <div className="flex flex-wrap gap-1">
                                {((item.tags as string[]) || []).slice(0, 3).map((tag, i) => (
                                    <span key={i} className="px-2 py-0.5 text-xs rounded bg-violet-500/20 text-violet-400">{tag}</span>
                                ))}
                            </div>
                        )
                    },
                    { key: 'order', label: 'Order' },
                ]}
            />
        </AdminLayout>
    )
}

export default ServicesAdmin
