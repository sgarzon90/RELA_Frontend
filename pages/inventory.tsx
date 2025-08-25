import { useEffect, useState } from "react";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getTipos,
  getColors,
} from "../lib/api";
import { notifySuccess, notifyError } from "@/lib/notifications";
import { useToast } from "../hooks/use-toast";
import Header from "@/components/Header";
import AddProductForm from "@/components/inventory/AddProductForm";
import ProductTable from "@/components/inventory/ProductTable";
import ProductModals from "@/components/inventory/ProductModals";

export default function Inventory() {
  const [items, setItems] = useState<any[]>([]);
  const [tipos, setTipos] = useState<any[]>([]);
  const [colors, setColors] = useState<any[]>([]);
  const [form, setForm] = useState({
    tipoId: 0,
    colorId: 0,
    talla: "",
    cantidad: 0,
    precio: 0,
  });
  const [foto, setFoto] = useState<File | null>(null);
  const [editing, setEditing] = useState<any | null>(null);
  const [editingFoto, setEditingFoto] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  const load = async () => {
    setItems((await getProducts()) as any[]);
    setTipos((await getTipos()) as any[]);
    setColors((await getColors()) as any[]);
  };

  useEffect(() => {
    load();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    if (foto) {
      formData.append("foto", foto);
    }

    try {
      await createProduct(formData);
      setForm({ tipoId: 0, colorId: 0, talla: "", cantidad: 0, precio: 0 });
      setFoto(null);
      setShowAddForm(false);
      await load();
      notifySuccess(
        "El producto se ha creado correctamente.",
        "✅ Producto creado",
      );
    } catch (error: any) {
      notifyError(error.message, "❌ Error al crear");
    }
  };

  const onDelete = async (id: number) => {
    if (confirm("¿Seguro que deseas eliminar este producto?")) {
      try {
        await deleteProduct(id);
        await load();
        notifySuccess(
          "El producto se ha eliminado correctamente.",
          "✅ Producto eliminado",
        );
      } catch (error: any) {
        notifyError(error.message, "❌ Error al eliminar");
      }
    }
  };

  const onUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    const formData = new FormData();
    Object.entries(editing).forEach(([key, value]) => {
      if (key !== "fotoUrl") {
        formData.append(key, String(value));
      }
    });

    if (editingFoto) {
      formData.append("foto", editingFoto);
    }

    try {
      await updateProduct(editing.id, formData);
      setEditing(null);
      setEditingFoto(null);
      await load();
      notifySuccess(
        "El producto se ha actualizado correctamente.",
        "✅ Producto actualizado",
      );
    } catch (error: any) {
      notifyError(error.message, "❌ Error al actualizar");
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Header title="Inventario" onAddClick={() => setShowAddForm(!showAddForm)} />
        {showAddForm && (
        <AddProductForm
          form={form}
          setForm={setForm}
          tipos={tipos}
          colors={colors}
          onSubmit={onSubmit}
          setFoto={setFoto}
        />
      )}
      <ProductTable
        items={items}
        onEdit={setEditing}
        onDelete={onDelete}
        onViewImage={setSelectedImage}
      />
      <ProductModals
        editing={editing}
        setEditing={setEditing}
        onUpdate={onUpdate}
        tipos={tipos}
        colors={colors}
        setEditingFoto={setEditingFoto}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      </div>
    </>
  );
}
