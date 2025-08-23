import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  createTipo,
  getTipos,
  deleteTipo,
  updateTipo,
  createColor,
  getColors,
  deleteColor,
  updateColor,
} from "../lib/api";
import { Trash2, Edit, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../hooks/use-toast";

export default function Attributes() {
  const [tipos, setTipos] = useState<any[]>([]);
  const [colors, setColors] = useState<any[]>([]);
  const [tipo, setTipo] = useState("");
  const [color, setColor] = useState("");
  const [editing, setEditing] = useState<any | null>(null);
  const { toast } = useToast();

  const load = async () => {
    setTipos((await getTipos()) as any[]);
    setColors((await getColors()) as any[]);
  };

  useEffect(() => {
    load();
  }, []);

  const onAddTipo = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTipo({ nombre: tipo });
    setTipo("");
    await load();
  };

  const onAddColor = async (e: React.FormEvent) => {
    e.preventDefault();
    await createColor({ nombre: color });
    setColor("");
    await load();
  };

  const onDeleteTipo = async (id: number) => {
    if (confirm("¿Seguro que deseas eliminar este tipo?")) {
      try {
        await deleteTipo(id);
        await load();
        toast({
          title: "Tipo eliminado",
          description: "El tipo se ha eliminado correctamente.",
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

  const onDeleteColor = async (id: number) => {
    if (confirm("¿Seguro que deseas eliminar este color?")) {
      try {
        await deleteColor(id);
        await load();
        toast({
          title: "Color eliminado",
          description: "El color se ha eliminado correctamente.",
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

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Tipos de producto</h2>
          <form onSubmit={onAddTipo} className="flex gap-2">
            <input
              className="input"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              placeholder="Nuevo tipo"
              required
            />
            <button className="btn-primary" type="submit">
              Agregar
            </button>
          </form>
          <table className="w-full text-sm mt-4">
            <tbody>
              {tipos.map((t) => (
                <tr key={t.id} className="border-t">
                  <td className="py-2">{t.nombre}</td>
                  <td className="text-right flex gap-2 justify-end">
                    <button
                      onClick={() => setEditing({ ...t, type: "tipo" })}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onDeleteTipo(t.id)}
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
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Colores</h2>
          <form onSubmit={onAddColor} className="flex gap-2">
            <input
              className="input"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="Nuevo color"
              required
            />
            <button className="btn-primary" type="submit">
              Agregar
            </button>
          </form>
          <table className="w-full text-sm mt-4">
            <tbody>
              {colors.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="py-2">{c.nombre}</td>
                  <td className="text-right flex gap-2 justify-end">
                    <button
                      onClick={() => setEditing({ ...c, type: "color" })}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onDeleteColor(c.id)}
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
                <h2 className="text-lg font-semibold mb-4">
                  Editar {editing.type === "tipo" ? "Tipo" : "Color"}
                </h2>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (editing.type === "tipo") {
                      await updateTipo(editing.id, { nombre: editing.nombre });
                    } else {
                      await updateColor(editing.id, { nombre: editing.nombre });
                    }
                    setEditing(null);
                    await load();
                  }}
                  className="grid gap-3"
                >
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
      </main>
    </>
  );
}
