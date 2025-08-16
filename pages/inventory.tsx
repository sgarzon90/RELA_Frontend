import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../lib/api";
import { Trash2, Edit, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Inventory() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({
    tipo: "",
    color: "",
    talla: "",
    cantidad: 0,
    precio: 0,
  });
  const [editing, setEditing] = useState<any | null>(null);

  const load = async () => setItems((await getProducts()) as any[]);
  useEffect(() => {
    load();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProduct({
      ...form,
      cantidad: Number(form.cantidad),
      precio: Number(form.precio),
    });
    setForm({ tipo: "", color: "", talla: "", cantidad: 0, precio: 0 });
    await load();
  };

  const onDelete = async (id: number) => {
    if (confirm("¿Seguro que deseas eliminar este producto?")) {
      await deleteProduct(id);
      await load();
    }
  };

  const onUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    await updateProduct(editing.id, {
      ...editing,
      cantidad: Number(editing.cantidad),
      precio: Number(editing.precio),
    });
    setEditing(null);
    await load();
  };

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 grid gap-6">
        {/* FORMULARIO CREAR */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Agregar producto</h2>
          <form
            onSubmit={onSubmit}
            className="grid md:grid-cols-6 gap-3 items-end"
          >
            <div>
              <label className="label">Tipo</label>
              <input
                className="input"
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="label">Color</label>
              <input
                className="input"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="label">Talla</label>
              <input
                className="input"
                value={form.talla}
                onChange={(e) => setForm({ ...form, talla: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="label">Cantidad</label>
              <input
                type="number"
                className="input"
                value={form.cantidad}
                onChange={(e) =>
                  setForm({ ...form, cantidad: e.target.valueAsNumber })
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
                value={form.precio}
                onChange={(e) =>
                  setForm({ ...form, precio: e.target.valueAsNumber })
                }
                required
              />
            </div>
            <button className="btn-primary" type="submit">
              Guardar
            </button>
          </form>
        </div>

        {/* TABLA INVENTARIO */}
        <div className="card overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Inventario</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="py-2">ID</th>
                <th>Tipo</th>
                <th>Color</th>
                <th>Talla</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="py-2">{p.id}</td>
                  <td>{p.tipo}</td>
                  <td>{p.color}</td>
                  <td>{p.talla}</td>
                  <td>{p.cantidad}</td>
                  <td>${Number(p.precio).toLocaleString()}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => setEditing(p)}
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
                    <input
                      className="input"
                      value={editing.tipo}
                      onChange={(e) =>
                        setEditing({ ...editing, tipo: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="label">Color</label>
                    <input
                      className="input"
                      value={editing.color}
                      onChange={(e) =>
                        setEditing({ ...editing, color: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="label">Talla</label>
                    <input
                      className="input"
                      value={editing.talla}
                      onChange={(e) =>
                        setEditing({ ...editing, talla: e.target.value })
                      }
                      required
                    />
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
