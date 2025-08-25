import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Select from '../ui/select';

interface EditSaleModalProps {
  editing: any;
  setEditing: (editing: any) => void;
  onUpdate: (e: React.FormEvent) => void;
  products: any[];
}

export default function EditSaleModal({
  editing,
  setEditing,
  onUpdate,
  products,
}: EditSaleModalProps) {
  return (
    <AnimatePresence>
      {editing && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative dark:bg-gray-800"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => setEditing(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Editar Venta</h2>
            <form onSubmit={onUpdate} className="grid gap-3">
              <div>
                <label className="label">Cliente</label>
                <input
                  className="input"
                  value={editing.cliente}
                  onChange={(e) =>
                    setEditing({ ...editing, cliente: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="label">Producto</label>
                <Select
                  value={editing.productoId}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      productoId: Number(e.target.value),
                    })
                  }
                  required
                >
                  <option value={0}>Seleccione...</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.tipo.nombre} - {p.color.nombre} - {p.talla} ($
                      {Number(p.precio).toLocaleString()})
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="label">Cantidad</label>
                <input
                  type="number"
                  className="input"
                  value={editing.cantidad}
                  min={1}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      cantidad: e.target.valueAsNumber,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className="label">Forma de pago</label>
                <Select
                  value={editing.formaPago}
                  onChange={(e) =>
                    setEditing({ ...editing, formaPago: e.target.value })
                  }
                >
                  <option value="CONTADO">Contado</option>
                  <option value="CREDITO">Crédito</option>
                </Select>
              </div>
              <button className="btn-primary mt-2" type="submit">
                Actualizar
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
