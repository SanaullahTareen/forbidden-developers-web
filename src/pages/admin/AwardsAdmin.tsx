import AdminLayout from './AdminLayout'
import ContentManager from './ContentManager'

const AwardsAdmin = () => {
    return (
        <AdminLayout>
            <ContentManager
                title="Awards & Honors"
                endpoint="awards"
                itemName="award"
                fields={[
                    { name: 'title', label: 'Award Title', type: 'text', required: true, placeholder: 'e.g., Best Digital Agency 2024' },
                    { name: 'organization', label: 'Organization', type: 'text', required: true, placeholder: 'e.g., Awwwards' },
                    { name: 'year', label: 'Year', type: 'text', required: true, placeholder: '2024' },
                    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Award description...' },
                    { name: 'image', label: 'Badge/Logo URL', type: 'image', placeholder: 'https://...' },
                    { name: 'order', label: 'Order', type: 'number', defaultValue: 0 },
                    { name: 'isActive', label: 'Active', type: 'toggle', defaultValue: true },
                ]}
                columns={[
                    { key: 'title', label: 'Award' },
                    { key: 'organization', label: 'Organization' },
                    {
                        key: 'year', label: 'Year', render: (item) => (
                            <span className="px-2 py-0.5 text-xs rounded bg-amber-500/20 text-amber-400">{String(item.year)}</span>
                        )
                    },
                    { key: 'order', label: 'Order' },
                ]}
            />
        </AdminLayout>
    )
}

export default AwardsAdmin
