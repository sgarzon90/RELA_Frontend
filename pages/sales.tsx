import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  createSale,
  getProducts,
  getSales,
  updateSale,
  deleteSale,
} from "../lib/api";
import { notifySuccess, notifyError } from "@/lib/notifications";
import { Trash2, Edit, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../hooks/use-toast";

// Define el componente de la página de ventas.
export default function Sales() {
  // Define los estados para productos, ventas, formulario, etc.
  const [products, setProducts] = useState<any[]>([]);
  const [sales, setSales] = useState<any[]>([]);
  const [form, setForm] = useState({
    cliente: "",
    productoId: 0,
    cantidad: 1,
    formaPago: "CONTADO",
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const { toast } = useToast();

  // Carga los productos y las ventas desde la API.
  const load = async () => {
    try {
      setProducts((await getProducts()) as any[]);
      setSales((await getSales()) as any[]);
    } catch (err) {
      console.error("Error cargando datos:", err);
      notifyError("No se pudieron cargar los productos o ventas.", "Error al cargar datos");
    }
  };

  // Carga los datos cuando el componente se monta.
  useEffect(() => {
    load();
  }, []);

  // Maneja el envío del formulario para crear una nueva venta.
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createSale({
        ...form,
        productoId: Number(form.productoId),
        cantidad: Number(form.cantidad),
      });
      notifySuccess("La venta fue guardada correctamente.", "✅ Venta registrada");
      setForm({ cliente: "", productoId: 0, cantidad: 1, formaPago: "CONTADO" });
      await load();
    } catch (err: any) {
      console.error("Error en createSale:", err);
      notifyError(
        err?.message && err.message.trim() !== ""
          ? err.message
          : "Ha ocurrido un error al registrar la venta.",
        "❌ No se pudo registrar la venta",
      );
    } finally {
      setLoading(false);
    }
  };

  // Maneja la actualización de una venta.
  const onUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    try {
      await updateSale(editing.id, {
        ...editing,
        productoId: Number(editing.productoId),
        cantidad: Number(editing.cantidad),
      });
      setEditing(null);
      await load();
      toast({
        title: "Venta actualizada",
        description: "La venta se ha actualizado correctamente.",
      });
    } catch (error: any) {
      toast({
        title: "Error al actualizar",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Maneja la eliminación de una venta.
  const onDelete = async (id: number) => {
    if (confirm("¿Seguro que deseas eliminar esta venta?")) {
      try {
        await deleteSale(id);
        await load();
        toast({
          title: "Venta eliminada",
          description: "La venta se ha eliminado correctamente.",
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
      <main className="max-w-5xl mx-auto px-4 grid gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Registrar venta</h2>
          <form
            onSubmit={onSubmit}
            className="grid md:grid-cols-6 gap-3 items-end"
          >
            <div className="md:col-span-2">
              <label className="label">Cliente</label>
              <input
                className="input"
                value={form.cliente}
                onChange={(e) => setForm({ ...form, cliente: e.target.value })}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="label">Producto</label>
              <select
                className="input"
                value={form.productoId}
                onChange={(e) =>
                  setForm({ ...form, productoId: Number(e.target.value) })
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
              </select>
            </div>
            <div>
              <label className="label">Cantidad</label>
              <input
                type="number"
                className="input"
                value={form.cantidad}
                min={1}
                onChange={(e) =>
                  setForm({ ...form, cantidad: e.target.valueAsNumber })
                }
                required
              />
            </div>
            <div>
              <label className="label">Forma de pago</label>
              <select
                className="input"
                value={form.formaPago}
                onChange={(e) => setForm({ ...form, formaPago: e.target.value })}
              >
                <option value="CONTADO">Contado</option>
                <option value="CREDITO">Crédito</option>
              </select>
            </div>
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </form>
        </div>

        <div className="card overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Ventas recientes</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="py-2">ID</th>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Cant.</th>
                <th>Fecha</th>
                <th>Pago</th>
                <th>Total</th>
                <th>Saldo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="py-2">{s.id}</td>
                  <td>{s.cliente}</td>
                  <td>
                    {s.producto?.tipo?.nombre} {s.producto?.color?.nombre} {s.producto?.talla}
                  </td>
                  <td>{s.cantidad}</td>
                  <td>{new Date(s.fecha).toLocaleString()}</td>
                  <td>{s.formaPago}</td>
                  <td>${Number(s.total).toLocaleString()}</td>
                  <td>${Number(s.saldoPendiente).toLocaleString()}</td>
                  <td>{s.status}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => setEditing(s)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(s.id)}
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
                    <select
                      className="input"
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
                    </select>
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
                    <select
                      className="input"
                      value={editing.formaPago}
                      onChange={(e) =>
                        setEditing({ ...editing, formaPago: e.target.value })
                      }
                    >
                      <option value="CONTADO">Contado</option>
                      <option value="CREDITO">Crédito</option>
                    </select>
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
