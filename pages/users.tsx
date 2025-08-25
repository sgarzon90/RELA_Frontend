import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getUsers, createUser, updateUser, deleteUser } from "../lib/api";
import { useToast } from "../hooks/use-toast";
import AddUserForm from "@/components/users/AddUserForm";
import UsersTable from "@/components/users/UsersTable";
import EditUserModal from "@/components/users/EditUserModal";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [form, setForm] = useState({ email: "", password: "" });
  const [editing, setEditing] = useState<any | null>(null);
  const { toast } = useToast();

  const load = async () => setUsers((await getUsers()) as any[]);
  useEffect(() => {
    load();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser(form);
    setForm({ email: "", password: "" });
    await load();
  };

  const onDelete = async (id: number) => {
    if (confirm("¿Seguro que deseas eliminar este usuario?")) {
      try {
        await deleteUser(id);
        await load();
        toast({
          title: "Usuario eliminado",
          description: "El usuario se ha eliminado correctamente.",
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
    await updateUser(editing.id, editing);
    setEditing(null);
    await load();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <AddUserForm
          form={form}
          setForm={setForm}
          onSubmit={onSubmit}
        />
        <UsersTable
          users={users}
          onEdit={setEditing}
          onDelete={onDelete}
        />
        <EditUserModal
          editing={editing}
          setEditing={setEditing}
          onUpdate={onUpdate}
        />
      </div>
    </>
  );
}
