import AdminLayout from './AdminLayout'
import ContentManager from './ContentManager'

const TestimonialsAdmin = () => {
    return (
        <AdminLayout>
            <ContentManager
                title="Testimonials"
                endpoint="testimonials"
                itemName="testimonial"
                fields={[
                    { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'e.g., Sarah Chen' },
                    { name: 'role', label: 'Role', type: 'text', required: true, placeholder: 'e.g., CEO' },
                    { name: 'company', label: 'Company', type: 'text', required: true, placeholder: 'e.g., TechStart Inc' },
                    { name: 'content', label: 'Testimonial', type: 'textarea', required: true, placeholder: 'What they said about us...' },
                    { name: 'image', label: 'Photo URL', type: 'image', placeholder: 'https://...' },
                    { name: 'rating', label: 'Rating (1-5)', type: 'number', defaultValue: 5 },
                    { name: 'order', label: 'Order', type: 'number', defaultValue: 0 },
                    { name: 'isActive', label: 'Active', type: 'toggle', defaultValue: true },
                ]}
                columns={[
                    {
                        key: 'image', label: 'Photo', render: (item) => (
                            <img src={String(item.image) || 'https://i.pravatar.cc/150'} alt="" className="w-10 h-10 rounded-full object-cover" />
                        )
                    },
                    { key: 'name', label: 'Name' },
                    { key: 'role', label: 'Role' },
                    { key: 'company', label: 'Company' },
                    {
                        key: 'rating', label: 'Rating', render: (item) => (
                            <span className="text-amber-400">{'★'.repeat(Number(item.rating))}</span>
                        )
                    },
                ]}
            />
        </AdminLayout>
    )
}

export default TestimonialsAdmin
