import { useEffect, useState } from "react";
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
import { useToast } from "../hooks/use-toast";
import AttributeForm from "@/components/attributes/AttributeForm";
import AttributeTable from "@/components/attributes/AttributeTable";
import EditAttributeModal from "@/components/attributes/EditAttributeModal";

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

  const onUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    if (editing.type === "tipo") {
      await updateTipo(editing.id, { nombre: editing.nombre });
    } else {
      await updateColor(editing.id, { nombre: editing.nombre });
    }
    setEditing(null);
    await load();
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow rounded-lg p-6 dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4">Tipos de Producto</h2>
            <AttributeForm
              value={tipo}
              setValue={setTipo}
              onSubmit={onAddTipo}
              placeholder="Nuevo tipo"
            />
            <AttributeTable
              items={tipos}
              onEdit={(item) => setEditing({ ...item, type: "tipo" })}
              onDelete={onDeleteTipo}
            />
          </div>
          <div className="bg-white shadow rounded-lg p-6 dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4">Colores</h2>
            <AttributeForm
              value={color}
              setValue={setColor}
              onSubmit={onAddColor}
              placeholder="Nuevo color"
            />
            <AttributeTable
              items={colors}
              onEdit={(item) => setEditing({ ...item, type: "color" })}
              onDelete={onDeleteColor}
            />
          </div>
        </div>
        <EditAttributeModal
          editing={editing}
          setEditing={setEditing}
          onUpdate={onUpdate}
        />
      </div>
    </>
  );
}
