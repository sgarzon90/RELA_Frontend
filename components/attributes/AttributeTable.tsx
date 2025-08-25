import { Trash2, Edit } from 'lucide-react';

interface AttributeTableProps {
  items: any[];
  onEdit: (item: any) => void;
  onDelete: (id: number) => void;
}

export default function AttributeTable({
  items,
  onEdit,
  onDelete,
}: AttributeTableProps) {
  return (
    <table className="w-full text-sm mt-4">
      <tbody className="divide-y divide-gray-200">
        {items.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50 transition-colors">
            <td className="py-3 px-4">{item.nombre}</td>
            <td className="py-3 px-4 text-right">
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
