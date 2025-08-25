interface AttributeFormProps {
  value: string;
  setValue: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder: string;
}

export default function AttributeForm({
  value,
  setValue,
  onSubmit,
  placeholder,
}: AttributeFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        required
      />
      <button className="btn-primary" type="submit">
        Agregar
      </button>
    </form>
  );
}
