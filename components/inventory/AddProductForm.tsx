import { FileInput } from '../ui/file-input';
import Select from '../ui/select';

interface AddProductFormProps {
  form: any;
  setForm: (form: any) => void;
  tipos: any[];
  colors: any[];
  onSubmit: (e: React.FormEvent) => void;
  setFoto: (foto: File | null) => void;
}

export default function AddProductForm({
  form,
  setForm,
  tipos,
  colors,
  onSubmit,
  setFoto,
}: AddProductFormProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-8 dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-4">Agregar Producto</h2>
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end"
      >
        <div className="lg:col-span-1">
          <label className="label">Tipo</label>
          <Select
            value={form.tipoId}
            onChange={(e) =>
              setForm({ ...form, tipoId: Number(e.target.value) })
            }
            required
          >
            <option value={0}>Seleccione...</option>
            {tipos.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nombre}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label className="label">Color</label>
          <Select
            value={form.colorId}
            onChange={(e) =>
              setForm({ ...form, colorId: Number(e.target.value) })
            }
            required
          >
            <option value={0}>Seleccione...</option>
            {colors.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label className="label">Talla</label>
          <Select
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
          </Select>
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
        <div className="md:col-span-2 lg:col-span-1">
          <FileInput
            label="Foto"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFoto(e.target.files ? e.target.files[0] : null)
            }
          />
        </div>
        <div className="md:col-span-2 lg:col-span-4 flex justify-end">
          <button className="btn-primary w-full md:w-auto" type="submit">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
