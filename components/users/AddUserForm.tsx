interface AddUserFormProps {
  form: any;
  setForm: (form: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AddUserForm({
  form,
  setForm,
  onSubmit,
}: AddUserFormProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Agregar Usuario</h2>
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end"
      >
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
        <button className="btn-primary w-full md:w-auto" type="submit">
          Guardar
        </button>
      </form>
    </div>
  );
}
