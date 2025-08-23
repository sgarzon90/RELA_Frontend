// Importa los módulos necesarios de React, Next.js y otras bibliotecas.
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getUsers, createUser, updateUser, deleteUser } from "../lib/api";
import { Trash2, Edit, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../hooks/use-toast";

// Define el componente de la página de usuarios.
export default function Users() {
  // Define los estados para los usuarios, el formulario y el modo de edición.
  const [users, setUsers] = useState<any[]>([]);
  const [form, setForm] = useState({ email: "", password: "" });
  const [editing, setEditing] = useState<any | null>(null);
  const { toast } = useToast();

  // Carga los usuarios desde la API.
  const load = async () => setUsers((await getUsers()) as any[]);
  useEffect(() => {
    load();
  }, []);

  // Maneja el envío del formulario para crear un nuevo usuario.
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser(form);
    setForm({ email: "", password: "" });
    await load();
  };

  // Maneja la eliminación de un usuario.
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

  // Maneja la actualización de un usuario.
  const onUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    await updateUser(editing.id, editing);
    setEditing(null);
    await load();
  };

  // Renderiza la página de usuarios.
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 grid gap-6">
        {/* Formulario para agregar un nuevo usuario. */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Agregar usuario</h2>
          <form onSubmit={onSubmit} className="grid md:grid-cols-3 gap-3 items-end">
            {/* Campos del formulario */}
          </form>
        </div>

        {/* Tabla que muestra los usuarios. */}
        <div className="card overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Usuarios</h2>
          <table className="w-full text-sm">
            {/* Encabezados y cuerpo de la tabla */}
          </table>
        </div>

        {/* Modal para editar un usuario. */}
        <AnimatePresence>
          {editing && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Contenido del modal de edición */}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
