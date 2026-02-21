import AdminLayout from './AdminLayout'
import ContentManager from './ContentManager'

const categoryOptions = [
    { value: 'Web', label: 'Web' },
    { value: 'Mobile', label: 'Mobile' },
    { value: 'AI', label: 'AI' },
    { value: 'Design', label: 'Design' },
    { value: 'Other', label: 'Other' },
]

const colorOptions = [
    { value: 'violet', label: 'Violet' },
    { value: 'blue', label: 'Blue' },
    { value: 'emerald', label: 'Emerald' },
    { value: 'pink', label: 'Pink' },
    { value: 'orange', label: 'Orange' },
    { value: 'cyan', label: 'Cyan' },
]

const ProjectsAdmin = () => {
    return (
        <AdminLayout>
            <ContentManager
                title="Projects"
                endpoint="projects"
                itemName="project"
                fields={[
                    { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'e.g., NeoBank' },
                    { name: 'subtitle', label: 'Subtitle', type: 'text', required: true, placeholder: 'e.g., Fintech Platform' },
                    { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Project description...' },
                    { name: 'image', label: 'Image URL', type: 'image', required: true, placeholder: 'https://...' },
                    { name: 'tags', label: 'Tags', type: 'tags', placeholder: 'React Native, Node.js' },
                    { name: 'category', label: 'Category', type: 'select', required: true, options: categoryOptions },
                    { name: 'color', label: 'Color Theme', type: 'select', options: colorOptions, defaultValue: 'violet' },
                    { name: 'year', label: 'Year', type: 'text', defaultValue: new Date().getFullYear().toString() },
                    { name: 'link', label: 'Project Link', type: 'text', placeholder: 'https://...' },
                    { name: 'order', label: 'Order', type: 'number', defaultValue: 0 },
                    { name: 'isActive', label: 'Active', type: 'toggle', defaultValue: true },
                ]}
                columns={[
                    {
                        key: 'image', label: 'Image', render: (item) => (
                            <img src={String(item.image)} alt="" className="w-16 h-10 object-cover rounded" />
                        )
                    },
                    { key: 'title', label: 'Title' },
                    { key: 'subtitle', label: 'Subtitle' },
                    {
                        key: 'category', label: 'Category', render: (item) => (
                            <span className="px-2 py-0.5 text-xs rounded bg-blue-500/20 text-blue-400">{String(item.category)}</span>
                        )
                    },
                    { key: 'year', label: 'Year' },
                ]}
            />
        </AdminLayout>
    )
}

export default ProjectsAdmin
