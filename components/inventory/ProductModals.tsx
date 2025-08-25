import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { FileInput } from '../ui/file-input';

interface ProductModalsProps {
  editing: any;
  setEditing: (editing: any) => void;
  onUpdate: (e: React.FormEvent) => void;
  tipos: any[];
  colors: any[];
  setEditingFoto: (foto: File | null) => void;
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
}

export default function ProductModals({
  editing,
  setEditing,
  onUpdate,
  tipos,
  colors,
  setEditingFoto,
  selectedImage,
  setSelectedImage,
}: ProductModalsProps) {
  return (
    <>
      {/* MODAL EDITAR */}
      <AnimatePresence>
        {editing && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative"
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
              <h2 className="text-lg font-semibold mb-4">Editar producto</h2>
              <form onSubmit={onUpdate} className="grid gap-3">
                <div>
                  <label className="label">Tipo</label>
                  <select
                    className="input"
                    value={editing.tipoId}
                    onChange={(e) =>
                      setEditing({ ...editing, tipoId: Number(e.target.value) })
                    }
                    required
                  >
                    <option value={0}>Seleccione...</option>
                    {tipos.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Color</label>
                  <select
                    className="input"
                    value={editing.colorId}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        colorId: Number(e.target.value),
                      })
                    }
                    required
                  >
                    <option value={0}>Seleccione...</option>
                    {colors.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Talla</label>
                  <select
                    className="input"
                    value={editing.talla}
                    onChange={(e) =>
                      setEditing({ ...editing, talla: e.target.value })
                    }
                    required
                  >
                    <option value="">Seleccionar talla</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>
                <div>
                  <label className="label">Cantidad</label>
                  <input
                    type="number"
                    className="input"
                    value={editing.cantidad}
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
                  <label className="label">Precio (COP)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="input"
                    value={editing.precio}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        precio: e.target.valueAsNumber,
                      })
                    }
                    required
                  />
                </div>
                <FileInput
                  label="Foto"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditingFoto(e.target.files ? e.target.files[0] : null)
                  }
                />
                <button className="btn-primary mt-2" type="submit">
                  Actualizar
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL VER FOTO */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg p-4 relative max-w-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 text-gray-600 hover:text-black"
              >
                <X size={20} />
              </button>
              <img
                src={selectedImage}
                alt="Foto del producto"
                className="max-h-[80vh] mx-auto rounded"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
