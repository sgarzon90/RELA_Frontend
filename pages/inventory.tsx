import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../lib/api";
import { Trash2, Edit, X, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../hooks/use-toast";
import { FileInput } from "../components/ui/file-input";

export default function Inventory() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({
    tipo: "",
    color: "",
    talla: "",
    cantidad: 0,
    precio: 0,
  });
  const [foto, setFoto] = useState<File | null>(null);
  const [editing, setEditing] = useState<any | null>(null);
  const [editingFoto, setEditingFoto] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // ✅ para modal de foto
  const { toast } = useToast();

  const load = async () => setItems((await getProducts()) as any[]);
  useEffect(() => {
    load();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    if (foto) {
      formData.append("foto", foto);
    }

    await createProduct(formData);
    setForm({ tipo: "", color: "", talla: "", cantidad: 0, precio: 0 });
    setFoto(null);
    await load();
  };

  const onDelete = async (id: number) => {
    if (confirm("¿Seguro que deseas eliminar este producto?")) {
      try {
        await deleteProduct(id);
        await load();
        toast({
          title: "Producto eliminado",
          description: "El producto se ha eliminado correctamente.",
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

    const formData = new FormData();
    Object.entries(editing).forEach(([key, value]) => {
      if (key !== "fotoUrl") {
        formData.append(key, String(value));
      }
    });

    if (editingFoto) {
      formData.append("foto", editingFoto);
    }

    await updateProduct(editing.id, formData);
    setEditing(null);
    setEditingFoto(null);
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
            className="grid md:grid-cols-7 gap-3 items-end"
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
              <select
                className="input"
                value={form.talla}
                onChange={(e) => setForm({ ...form, talla: e.target.value })}
                required
              >
                <option value="">Seleccionar</option>
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
            <FileInput
              label="Foto"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFoto(e.target.files ? e.target.files[0] : null)
              }
            />
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
                <th>Foto</th>
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
                  <td>
                    {p.fotoUrl ? (
                      <button
                        onClick={() =>
                          setSelectedImage(`http://localhost:4000/uploads/${p.fotoUrl}`)
                        }
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <ImageIcon size={16} /> Ver
                      </button>
                    ) : (
                      <span className="text-gray-400 italic">Sin foto</span>
                    )}
                  </td>
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
            >
              <motion.div
                className="bg-white rounded-lg shadow-lg p-4 relative max-w-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 text-gray-600 hover:text-black"
                >
                  <X size={20} />
                </button>
                <img
                  src={selectedImage}
                  alt="Foto del producto"
                  className="max-h-[70vh] mx-auto rounded"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
