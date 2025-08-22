import { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

export function FileInput({
  label,
  onChange,
}: {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label>{label}</Label>
      <button
        type="button"
        className="p-2 rounded-md hover:bg-gray-100"
        onClick={() => inputRef.current?.click()}
      >
        <Upload size={20} />
      </button>
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
