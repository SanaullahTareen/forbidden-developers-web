import AdminLayout from './AdminLayout'
import ContentManager from './ContentManager'

const BlogAdmin = () => {
    return (
        <AdminLayout>
            <ContentManager
                title="Blog Posts"
                endpoint="blog"
                itemName="blog post"
                fields={[
                    { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Article title...' },
                    { name: 'excerpt', label: 'Excerpt', type: 'textarea', required: true, placeholder: 'Short summary...' },
                    { name: 'content', label: 'Content', type: 'textarea', required: true, placeholder: 'Full article content...' },
                    { name: 'image', label: 'Featured Image URL', type: 'image', required: true, placeholder: 'https://...' },
                    { name: 'category', label: 'Category', type: 'text', required: true, placeholder: 'e.g., AI & ML, Development' },
                    { name: 'author', label: 'Author Name', type: 'text', required: true, placeholder: 'e.g., Sarah Chen' },
                    { name: 'readTime', label: 'Read Time', type: 'text', defaultValue: '5 min read' },
                    { name: 'tags', label: 'Tags', type: 'tags', placeholder: 'AI, Web Development, React' },
                    { name: 'featured', label: 'Featured', type: 'toggle', defaultValue: false },
                    { name: 'isPublished', label: 'Published', type: 'toggle', defaultValue: false },
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
                    { key: 'author', label: 'Author' },
                    {
                        key: 'category', label: 'Category', render: (item) => (
                            <span className="px-2 py-0.5 text-xs rounded bg-amber-500/20 text-amber-400">{String(item.category)}</span>
                        )
                    },
                    {
                        key: 'isPublished', label: 'Status', render: (item) => (
                            <span className={`px-2 py-0.5 text-xs rounded ${item.isPublished ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                {item.isPublished ? 'Published' : 'Draft'}
                            </span>
                        )
                    },
                ]}
            />
        </AdminLayout>
    )
}

export default BlogAdmin
