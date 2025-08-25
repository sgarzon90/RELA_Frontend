import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { createPayment, getSales } from '../lib/api';
import CreditsTable from '@/components/credits/CreditsTable';

export default function Credits() {
  const [pending, setPending] = useState<any[]>([]);
  const [abonos, setAbonos] = useState<{[key:number]: number}>({});

  const load = async () => {
    setPending(await getSales('PENDIENTE') as any[]);
  };

  useEffect(() => {
    load();
  }, []);

  const addAbono = async (saleId: number) => {
    const monto = Number(abonos[saleId] || 0);
    if (!monto || monto <= 0) return alert('Ingresa un monto válido');
    await createPayment({ saleId, monto });
    setAbonos({ ...abonos, [saleId]: 0 });
    await load();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <CreditsTable
          pending={pending}
          abonos={abonos}
          setAbonos={setAbonos}
          addAbono={addAbono}
        />
      </div>
    </>
  );
}
