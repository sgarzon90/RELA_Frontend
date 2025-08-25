import { Trash2, Edit } from 'lucide-react';
import { useState } from 'react';

interface SalesTableProps {
  sales: any[];
  onEdit: (sale: any) => void;
  onDelete: (id: number) => void;
}

export default function SalesTable({ sales, onEdit, onDelete }: SalesTableProps) {
  const [search, setSearch] = useState('');

  const filteredSales = sales.filter((sale) =>
    sale.cliente.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Ventas Recientes</h2>
        <input
          type="text"
          placeholder="Buscar por cliente..."
          className="border rounded-xl px-3 py-2 w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-600">
              <th className="py-3 px-6 font-medium">ID</th>
              <th className="py-3 px-6 font-medium">Cliente</th>
              <th className="py-3 px-6 font-medium">Producto</th>
              <th className="py-3 px-6 font-medium">Cant.</th>
              <th className="py-3 px-6 font-medium">Fecha</th>
              <th className="py-3 px-6 font-medium">Pago</th>
              <th className="py-3 px-6 font-medium">Total</th>
              <th className="py-3 px-6 font-medium">Saldo</th>
              <th className="py-3 px-6 font-medium">Estado</th>
              <th className="py-3 px-6 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredSales.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">{s.id}</td>
                <td className="py-4 px-6">{s.cliente}</td>
                <td className="py-4 px-6">
                  {s.producto?.tipo?.nombre} {s.producto?.color?.nombre} {s.producto?.talla}
                </td>
                <td className="py-4 px-6">{s.cantidad}</td>
                <td className="py-4 px-6">{new Date(s.fecha).toLocaleString()}</td>
                <td className="py-4 px-6">{s.formaPago}</td>
                <td className="py-4 px-6">${Number(s.total).toLocaleString()}</td>
                <td className="py-4 px-6">${Number(s.saldoPendiente).toLocaleString()}</td>
                <td className="py-4 px-6">{s.status}</td>
                <td className="py-4 px-6 flex gap-4">
                  <button
                    onClick={() => onEdit(s)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(s.id)}
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
