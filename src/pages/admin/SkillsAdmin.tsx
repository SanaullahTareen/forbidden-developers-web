import AdminLayout from './AdminLayout'
import ContentManager from './ContentManager'

const iconOptions = [
    { value: 'Brain', label: 'Brain' },
    { value: 'Cpu', label: 'CPU' },
    { value: 'Users', label: 'Users' },
    { value: 'Zap', label: 'Zap' },
    { value: 'Shield', label: 'Shield' },
    { value: 'Clock', label: 'Clock' },
    { value: 'Heart', label: 'Heart' },
    { value: 'Coffee', label: 'Coffee' },
    { value: 'Laptop', label: 'Laptop' },
    { value: 'Rocket', label: 'Rocket' },
    { value: 'Star', label: 'Star' },
    { value: 'Award', label: 'Award' },
]

const SkillsAdmin = () => {
    return (
        <AdminLayout>
            <ContentManager
                title="Skills (Why Choose Us)"
                endpoint="skills"
                itemName="skill"
                fields={[
                    { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'e.g., AI Innovation' },
                    { name: 'description', label: 'Description', type: 'text', required: true, placeholder: 'e.g., Cutting-edge AI & ML solutions' },
                    { name: 'icon', label: 'Icon', type: 'select', required: true, options: iconOptions },
                    { name: 'order', label: 'Order', type: 'number', defaultValue: 0 },
                    { name: 'isActive', label: 'Active', type: 'toggle', defaultValue: true },
                ]}
                columns={[
                    { key: 'icon', label: 'Icon' },
                    { key: 'title', label: 'Title' },
                    { key: 'description', label: 'Description' },
                    { key: 'order', label: 'Order' },
                ]}
            />
        </AdminLayout>
    )
}

export default SkillsAdmin
