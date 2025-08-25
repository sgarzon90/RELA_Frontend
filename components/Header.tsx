import { Plus } from 'lucide-react';

interface HeaderProps {
  title: string;
  onAddClick: () => void;
}

export default function Header({ title, onAddClick }: HeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <button
        onClick={onAddClick}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors"
      >
        <Plus size={18} />
        <span>Agregar Producto</span>
      </button>
    </div>
  );
}
