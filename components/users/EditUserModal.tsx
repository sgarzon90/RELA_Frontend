import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface EditUserModalProps {
  editing: any;
  setEditing: (editing: any) => void;
  onUpdate: (e: React.FormEvent) => void;
}

export default function EditUserModal({
  editing,
  setEditing,
  onUpdate,
}: EditUserModalProps) {
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
            <h2 className="text-lg font-semibold mb-4">Editar Usuario</h2>
            <form onSubmit={onUpdate} className="grid gap-3">
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  value={editing.email}
                  onChange={(e) =>
                    setEditing({ ...editing, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="label">
                  Password (dejar en blanco para no cambiar)
                </label>
                <input
                  type="password"
                  className="input"
                  onChange={(e) =>
                    setEditing({ ...editing, password: e.target.value })
                  }
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
