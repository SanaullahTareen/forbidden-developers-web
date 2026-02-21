import AdminLayout from './AdminLayout'
import ContentManager from './ContentManager'

const typeOptions = [
    { value: 'ZIP', label: 'ZIP' },
    { value: 'PDF', label: 'PDF' },
    { value: 'PNG', label: 'PNG' },
    { value: 'SVG', label: 'SVG' },
    { value: 'AI', label: 'AI' },
    { value: 'Other', label: 'Other' },
]

const AssetsAdmin = () => {
    return (
        <AdminLayout>
            <ContentManager
                title="Brand Assets"
                endpoint="brand-assets"
                itemName="asset"
                fields={[
                    { name: 'name', label: 'Asset Name', type: 'text', required: true, placeholder: 'e.g., Company Logo Pack' },
                    { name: 'type', label: 'File Type', type: 'select', required: true, options: typeOptions },
                    { name: 'size', label: 'File Size', type: 'text', placeholder: 'e.g., 2.4 MB' },
                    { name: 'downloadUrl', label: 'Download URL', type: 'text', required: true, placeholder: 'https://...' },
                    { name: 'order', label: 'Order', type: 'number', defaultValue: 0 },
                    { name: 'isActive', label: 'Active', type: 'toggle', defaultValue: true },
                ]}
                columns={[
                    { key: 'name', label: 'Name' },
                    {
                        key: 'type', label: 'Type', render: (item) => (
                            <span className="px-2 py-0.5 text-xs rounded bg-blue-500/20 text-blue-400">{String(item.type)}</span>
                        )
                    },
                    { key: 'size', label: 'Size' },
                    { key: 'order', label: 'Order' },
                ]}
            />
        </AdminLayout>
    )
}

export default AssetsAdmin