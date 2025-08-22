import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getUsers, createUser, updateUser, deleteUser } from "../lib/api";
import { Trash2, Edit, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../hooks/use-toast";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [form, setForm] = useState({ email: "", password: "" });
  const [editing, setEditing] = useState<any | null>(null);
  const { toast } = useToast();

  const load = async () => setUsers((await getUsers()) as any[]);
  useEffect(() => {
    load();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser(form);
    setForm({ email: "", password: "" });
    await load();
  };

  const onDelete = async (id: number) => {
    if (confirm("¿Seguro que deseas eliminar este usuario?")) {
      try {
        await deleteUser(id);
        await load();
        toast({
          title: "Usuario eliminado",
          description: "El usuario se ha eliminado correctamente.",
        });
      } catch (error: any) {
        toast({
          title: "Error al eliminar",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  const onUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    await updateUser(editing.id, editing);
    setEditing(null);
    await load();
  };

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 grid gap-6">
        {/* FORMULARIO CREAR */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Agregar usuario</h2>
          <form onSubmit={onSubmit} className="grid md:grid-cols-3 gap-3 items-end">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <button className="btn-primary" type="submit">
              Guardar
            </button>
          </form>
        </div>

        {/* TABLA USUARIOS */}
        <div className="card overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Usuarios</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="py-2">ID</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="py-2">{u.id}</td>
                  <td>{u.email}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => setEditing(u)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(u.id)}
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
                <h2 className="text-lg font-semibold mb-4">Editar usuario</h2>
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
                    <label className="label">Password (dejar en blanco para no cambiar)</label>
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
      </main>
    </>
  );
}
