// Importa los módulos necesarios de React y otros componentes.
import { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

// Define el componente de entrada de archivos.
export function FileInput({
  label,
  onChange,
}: {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  // Crea una referencia para el elemento de entrada de archivo.
  const inputRef = useRef<HTMLInputElement>(null);

  // Renderiza el componente.
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label>{label}</Label>
      {/* Botón que activa el clic en el campo de entrada de archivo oculto. */}
      <button
        type="button"
        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => inputRef.current?.click()}
      >
        <Upload size={20} />
      </button>
      {/* Campo de entrada de archivo oculto. */}
      <input
        ref={inputRef}
        id="picture"
        type="file"
        className="hidden"
        onChange={onChange}
      />
    </div>
  );
}
