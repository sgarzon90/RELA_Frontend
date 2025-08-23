// Importa los módulos necesarios de React y otros componentes.
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { createPayment, getSales } from '../lib/api';

// Define el componente de la página de créditos.
export default function Credits() {
  // Define el estado para las ventas pendientes y los abonos.
  const [pending, setPending] = useState<any[]>([]);
  const [abonos, setAbonos] = useState<{[key:number]: number}>({});

  // Carga las ventas pendientes desde la API.
  const load = async () => {
    setPending(await getSales('PENDIENTE') as any[]);
  };

  // Hook de efecto que carga las ventas pendientes cuando el componente se monta.
  useEffect(() => {
    load();
  }, []);

  // Agrega un abono a una venta.
  const addAbono = async (saleId: number) => {
    const monto = Number(abonos[saleId] || 0);
    if (!monto || monto <= 0) return alert('Ingresa un monto válido');
    await createPayment({ saleId, monto });
    setAbonos({ ...abonos, [saleId]: 0 });
    await load();
  };

  // Renderiza la página de créditos.
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 grid gap-6">
        <div className="card overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Créditos pendientes</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="py-2">Venta</th>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Total</th>
                <th>Saldo</th>
                <th>Abonar</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pending.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="py-2">#{s.id}</td>
                  <td>{s.cliente}</td>
                  <td>{s.producto?.tipo} {s.producto?.color} {s.producto?.talla}</td>
                  <td>${Number(s.total).toLocaleString()}</td>
                  <td>${Number(s.saldoPendiente).toLocaleString()}</td>
                  <td>
                    <input
                      type="number"
                      className="input"
                      placeholder="Monto"
                      value={abonos[s.id] || ''}
                      onChange={e => setAbonos({ ...abonos, [s.id]: e.target.valueAsNumber })}
                    />
                  </td>
                  <td>
                    <button className="btn-primary" onClick={() => addAbono(s.id)}>Abonar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
