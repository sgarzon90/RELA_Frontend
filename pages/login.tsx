// Importa los módulos necesarios de React, Next.js y otras bibliotecas.
import { useState } from "react"; // Hook de React para manejar el estado.
import { useRouter } from "next/router"; // Hook de Next.js para manejar el enrutamiento.
import { login } from "../lib/api"; // Función para realizar la solicitud de inicio de sesión a la API.
import { useToast } from "../hooks/use-toast"; // Hook personalizado para mostrar notificaciones.

// Define el componente de la página de inicio de sesión.
export default function Login() {
  // Define los estados para el correo electrónico y la contraseña.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Inicializa el enrutador de Next.js.
  const router = useRouter();
  // Inicializa el hook para mostrar notificaciones.
  const { toast } = useToast();

  // Maneja el envío del formulario de inicio de sesión.
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario.
    try {
      // Llama a la función de inicio de sesión con el correo electrónico y la contraseña.
      const data = await login({ email, password });
      // Guarda el token de acceso en el almacenamiento local.
      localStorage.setItem("token", data.access_token);
      // Redirige al usuario a la página de inicio.
      router.push("/");
    } catch (error: any) {
      // Muestra una notificación de error si el inicio de sesión falla.
      toast({
        title: "Error al iniciar sesión",
        description: "El nombre de Usuario o Contraseña incorrecta",
        variant: "destructive",
      });
    }
  };

  // Renderiza el formulario de inicio de sesión.
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Iniciar Sesión</h1>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full btn-primary" type="submit">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}
