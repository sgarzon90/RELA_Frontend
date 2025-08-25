import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface EditAttributeModalProps {
  editing: any;
  setEditing: (editing: any) => void;
  onUpdate: (e: React.FormEvent) => void;
}

export default function EditAttributeModal({
  editing,
  setEditing,
  onUpdate,
}: EditAttributeModalProps) {
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
            <h2 className="text-lg font-semibold mb-4">
              Editar {editing.type === "tipo" ? "Tipo" : "Color"}
            </h2>
            <form onSubmit={onUpdate} className="grid gap-3">
              <div>
                <label className="label">Nombre</label>
                <input
                  className="input"
                  value={editing.nombre}
                  onChange={(e) =>
                    setEditing({ ...editing, nombre: e.target.value })
                  }
                  required
                />
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
