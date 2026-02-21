import AdminLayout from './AdminLayout'
import ContentManager from './ContentManager'

const PressAdmin = () => {
    return (
        <AdminLayout>
            <ContentManager
                title="Press Releases"
                endpoint="press-releases"
                itemName="press release"
                fields={[
                    { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Press release headline...' },
                    { name: 'excerpt', label: 'Excerpt', type: 'textarea', required: true, placeholder: 'Short summary...' },
                    { name: 'content', label: 'Full Content', type: 'textarea', placeholder: 'Full press release text...' },
                    { name: 'image', label: 'Image URL', type: 'image', required: true, placeholder: 'https://...' },
                    { name: 'source', label: 'Source', type: 'text', required: true, placeholder: 'e.g., TechCrunch' },
                    { name: 'link', label: 'External Link', type: 'text', placeholder: 'https://...' },
                    { name: 'publishedAt', label: 'Published Date', type: 'date' },
                    { name: 'order', label: 'Order', type: 'number', defaultValue: 0 },
                    { name: 'isActive', label: 'Active', type: 'toggle', defaultValue: true },
                ]}
                columns={[
                    {
                        key: 'image', label: 'Image', render: (item) => (
                            <img src={String(item.image)} alt="" className="w-20 h-12 object-cover rounded" />
                        )
                    },
                    {
                        key: 'title', label: 'Title', render: (item) => (
                            <span className="line-clamp-1 max-w-xs">{String(item.title)}</span>
                        )
                    },
                    {
                        key: 'source', label: 'Source', render: (item) => (
                            <span className="px-2 py-0.5 text-xs rounded bg-rose-500/20 text-rose-400">{String(item.source)}</span>
                        )
                    },
                    {
                        key: 'publishedAt', label: 'Date', render: (item) => (
                            item.publishedAt ? new Date(item.publishedAt as string).toLocaleDateString() : '-'
                        )
                    },
                ]}
            />
        </AdminLayout>
    )
}

export default PressAdmin
