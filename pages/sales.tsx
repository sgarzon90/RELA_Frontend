import { useEffect, useState } from "react";
import {
  createSale,
  getProducts,
  getSales,
  updateSale,
  deleteSale,
} from "../lib/api";
import { notifySuccess, notifyError } from "@/lib/notifications";
import { useToast } from "../hooks/use-toast";
import AddSaleForm from "@/components/sales/AddSaleForm";
import SalesTable from "@/components/sales/SalesTable";
import EditSaleModal from "@/components/sales/EditSaleModal";

export default function Sales() {
  const [products, setProducts] = useState<any[]>([]);
  const [sales, setSales] = useState<any[]>([]);
  const [form, setForm] = useState({
    cliente: "",
    productoId: 0,
    cantidad: 1,
    formaPago: "CONTADO",
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const { toast } = useToast();

  const load = async () => {
    try {
      setProducts((await getProducts()) as any[]);
      setSales((await getSales()) as any[]);
    } catch (err) {
      console.error("Error cargando datos:", err);
      notifyError("No se pudieron cargar los productos o ventas.", "Error al cargar datos");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createSale({
        ...form,
        productoId: Number(form.productoId),
        cantidad: Number(form.cantidad),
      });
      notifySuccess("La venta fue guardada correctamente.", "✅ Venta registrada");
      setForm({ cliente: "", productoId: 0, cantidad: 1, formaPago: "CONTADO" });
      await load();
    } catch (err: any) {
      console.error("Error en createSale:", err);
      notifyError(
        err?.message && err.message.trim() !== ""
          ? err.message
          : "Ha ocurrido un error al registrar la venta.",
        "❌ No se pudo registrar la venta",
      );
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    try {
      await updateSale(editing.id, {
        ...editing,
        productoId: Number(editing.productoId),
        cantidad: Number(editing.cantidad),
      });
      setEditing(null);
      await load();
      toast({
        title: "Venta actualizada",
        description: "La venta se ha actualizado correctamente.",
      });
    } catch (error: any) {
      toast({
        title: "Error al actualizar",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const onDelete = async (id: number) => {
    if (confirm("¿Seguro que deseas eliminar esta venta?")) {
      try {
        await deleteSale(id);
        await load();
        toast({
          title: "Venta eliminada",
          description: "La venta se ha eliminado correctamente.",
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

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <AddSaleForm
          form={form}
          setForm={setForm}
          products={products}
          onSubmit={onSubmit}
          loading={loading}
        />
        <SalesTable sales={sales} onEdit={setEditing} onDelete={onDelete} />
        <EditSaleModal
          editing={editing}
          setEditing={setEditing}
          onUpdate={onUpdate}
          products={products}
        />
      </div>
    </>
  );
}
