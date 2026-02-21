import AdminLayout from './AdminLayout'
import ContentManager from './ContentManager'

const StatsAdmin = () => {
    return (
        <AdminLayout>
            <ContentManager
                title="Stats"
                endpoint="stats"
                itemName="stat"
                fields={[
                    { name: 'value', label: 'Value', type: 'number', required: true, placeholder: '150' },
                    { name: 'suffix', label: 'Suffix', type: 'text', defaultValue: '+', placeholder: '+, %, etc.' },
                    { name: 'label', label: 'Label', type: 'text', required: true, placeholder: 'e.g., Projects Delivered' },
                    { name: 'description', label: 'Description', type: 'text', placeholder: 'e.g., Across various industries' },
                    { name: 'order', label: 'Order', type: 'number', defaultValue: 0 },
                    { name: 'isActive', label: 'Active', type: 'toggle', defaultValue: true },
                ]}
                columns={[
                    {
                        key: 'value', label: 'Value', render: (item) => (
                            <span className="text-xl font-bold">{String(item.value)}{String(item.suffix)}</span>
                        )
                    },
                    { key: 'label', label: 'Label' },
                    { key: 'description', label: 'Description' },
                    { key: 'order', label: 'Order' },
                ]}
            />
        </AdminLayout>
    )
}

export default StatsAdmin
