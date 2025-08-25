import { Trash2, Edit, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

interface ProductTableProps {
  items: any[];
  onEdit: (item: any) => void;
  onDelete: (id: number) => void;
  onViewImage: (url: string) => void;
}

export default function ProductTable({ items, onEdit, onDelete, onViewImage }: ProductTableProps) {
  const [search, setSearch] = useState('');

  const filteredItems = items.filter(
    (item) =>
      item.tipo.nombre.toLowerCase().includes(search.toLowerCase()) ||
      item.color.nombre.toLowerCase().includes(search.toLowerCase()) ||
      item.talla.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden dark:bg-gray-800">
      <div className="p-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Inventario</h2>
        <input
          type="text"
          placeholder="Buscar..."
          className="border rounded-xl px-3 py-2 w-64 bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr className="text-left text-gray-600 dark:text-gray-300">
              <th className="py-3 px-6 font-medium">ID</th>
              <th className="py-3 px-6 font-medium">Tipo</th>
              <th className="py-3 px-6 font-medium">Color</th>
              <th className="py-3 px-6 font-medium">Talla</th>
              <th className="py-3 px-6 font-medium">Cantidad</th>
              <th className="py-3 px-6 font-medium">Precio</th>
              <th className="py-3 px-6 font-medium">Foto</th>
              <th className="py-3 px-6 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredItems.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="py-4 px-6">{p.id}</td>
                <td className="py-4 px-6">{p.tipo.nombre}</td>
                <td className="py-4 px-6">{p.color.nombre}</td>
                <td className="py-4 px-6">{p.talla}</td>
                <td className="py-4 px-6">{p.cantidad}</td>
                <td className="py-4 px-6">${Number(p.precio).toLocaleString()}</td>
                <td className="py-4 px-6">
                  {p.fotoUrl ? (
                    <button
                      onClick={() =>
                        onViewImage(`http://localhost:4000/uploads/${p.fotoUrl}`)
                      }
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
                    >
                      <ImageIcon size={16} /> Ver
                    </button>
                  ) : (
                    <span className="text-gray-400 italic">Sin foto</span>
                  )}
                </td>
                <td className="py-4 px-6 flex gap-4">
                  <button
                    onClick={() => onEdit(p)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(p.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
