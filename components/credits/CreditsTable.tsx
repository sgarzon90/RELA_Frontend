import { useState } from 'react';

interface CreditsTableProps {
  pending: any[];
  abonos: { [key: number]: number };
  setAbonos: (abonos: { [key: number]: number }) => void;
  addAbono: (saleId: number) => void;
}

export default function CreditsTable({
  pending,
  abonos,
  setAbonos,
  addAbono,
}: CreditsTableProps) {
  const [search, setSearch] = useState('');

  const filteredPending = pending.filter((sale) =>
    sale.cliente.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Créditos Pendientes</h2>
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
              <th className="py-3 px-6 font-medium">Venta</th>
              <th className="py-3 px-6 font-medium">Cliente</th>
              <th className="py-3 px-6 font-medium">Producto</th>
              <th className="py-3 px-6 font-medium">Total</th>
              <th className="py-3 px-6 font-medium">Saldo</th>
              <th className="py-3 px-6 font-medium">Abonar</th>
              <th className="py-3 px-6 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPending.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">#{s.id}</td>
                <td className="py-4 px-6">{s.cliente}</td>
                <td className="py-4 px-6">
                  {s.producto?.tipo?.nombre} {s.producto?.color?.nombre}{" "}
                  {s.producto?.talla}
                </td>
                <td className="py-4 px-6">${Number(s.total).toLocaleString()}</td>
                <td className="py-4 px-6">
                  ${Number(s.saldoPendiente).toLocaleString()}
                </td>
                <td className="py-4 px-6">
                  <input
                    type="number"
                    className="input"
                    placeholder="Monto"
                    value={abonos[s.id] || ""}
                    onChange={(e) =>
                      setAbonos({ ...abonos, [s.id]: e.target.valueAsNumber })
                    }
                  />
                </td>
                <td className="py-4 px-6">
                  <button
                    className="btn-primary"
                    onClick={() => addAbono(s.id)}
                  >
                    Abonar
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
