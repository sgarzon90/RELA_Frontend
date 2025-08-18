import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { createSale, getProducts, getSales } from "../lib/api"
import { notifySuccess, notifyError } from "@/lib/notifications"

export default function Sales() {
  const [products, setProducts] = useState<any[]>([])
  const [sales, setSales] = useState<any[]>([])
  const [form, setForm] = useState({
    cliente: "",
    productoId: 0,
    cantidad: 1,
    formaPago: "CONTADO",
  })
  const [loading, setLoading] = useState(false)

  const load = async () => {
    try {
      setProducts((await getProducts()) as any[])
      setSales((await getSales()) as any[])
    } catch (err) {
      console.error("Error cargando datos:", err)
      notifyError("No se pudieron cargar los productos o ventas.", "Error al cargar datos")
    }
  }

  useEffect(() => {
    load()
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createSale({
        ...form,
        productoId: Number(form.productoId),
        cantidad: Number(form.cantidad),
      })

      notifySuccess("La venta fue guardada correctamente.", "✅ Venta registrada")

      setForm({ cliente: "", productoId: 0, cantidad: 1, formaPago: "CONTADO" })
      await load()
    } catch (err: any) {
      console.error("Error en createSale:", err)

      notifyError(
        err?.message && err.message.trim() !== ""
          ? err.message
          : "Ha ocurrido un error al registrar la venta.",
        "❌ No se pudo registrar la venta"
      )
    } finally {
      setLoading(false)
    }
  }

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
                    {p.tipo} - {p.color} - {p.talla} ($
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
              </tr>
            </thead>
            <tbody>
              {sales.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="py-2">{s.id}</td>
                  <td>{s.cliente}</td>
                  <td>
                    {s.producto?.tipo} {s.producto?.color} {s.producto?.talla}
                  </td>
                  <td>{s.cantidad}</td>
                  <td>{new Date(s.fecha).toLocaleString()}</td>
                  <td>{s.formaPago}</td>
                  <td>${Number(s.total).toLocaleString()}</td>
                  <td>${Number(s.saldoPendiente).toLocaleString()}</td>
                  <td>{s.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}
