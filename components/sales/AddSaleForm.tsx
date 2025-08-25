interface AddSaleFormProps {
  form: any;
  setForm: (form: any) => void;
  products: any[];
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export default function AddSaleForm({
  form,
  setForm,
  products,
  onSubmit,
  loading,
}: AddSaleFormProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Registrar Venta</h2>
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end"
      >
        <div className="lg:col-span-1">
          <label className="label">Cliente</label>
          <input
            className="input"
            value={form.cliente}
            onChange={(e) => setForm({ ...form, cliente: e.target.value })}
            required
          />
        </div>
        <div className="lg:col-span-1">
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
        <div className="md:col-span-2 lg:col-span-4 flex justify-end">
          <button className="btn-primary w-full md:w-auto" type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
