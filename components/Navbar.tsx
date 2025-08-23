// Importa los módulos necesarios de Next.js y otras bibliotecas.
import Link from 'next/link'; // Para la navegación entre páginas.
import { useRouter } from 'next/router'; // Para manejar el enrutamiento.
import { useEffect, useState } from 'react'; // Hooks de React para manejar el estado y los efectos secundarios.
import { jwtDecode } from 'jwt-decode'; // Para decodificar los tokens JWT.

// Define la interfaz para el objeto de usuario.
interface User {
  id: number;
  username: string;
  role: string;
}

// Define el componente de la barra de navegación.
export default function Navbar() {
  // Inicializa el enrutador de Next.js.
  const router = useRouter();
  // Define el estado para el usuario, inicializado como nulo.
  const [user, setUser] = useState<User | null>(null);

  // Hook de efecto que se ejecuta una vez que el componente se monta.
  useEffect(() => {
    // Obtiene el token del almacenamiento local.
    const token = localStorage.getItem('token');
    // Si el token existe, lo decodifica y establece el estado del usuario.
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken as User);
    }
  }, []);

  // Maneja el cierre de sesión del usuario.
  const handleLogout = () => {
    // Elimina el token del almacenamiento local.
    localStorage.removeItem('token');
    // Redirige al usuario a la página de inicio de sesión.
    router.push('/login');
  };

  // Renderiza la barra de navegación.
  return (
    <nav className="bg-white shadow mb-6">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          {/* Enlaces de navegación */}
          <Link className="font-semibold" href="/">RELA STORE</Link>
          <Link href="/inventory">Inventario</Link>
          <Link href="/sales">Ventas</Link>
          <Link href="/credits">Créditos</Link>
          <Link href="/reports">Reportes</Link>
          {/* Muestra el enlace de Usuarios solo si el usuario tiene el rol de 'master'. */}
          {user && user.role === 'master' && <Link href="/users">Usuarios</Link>}
          {user && user.role === 'master' && <Link href="/attributes">Atributos</Link>}
        </div>
        {/* Botón de cierre de sesión */}
        <button onClick={handleLogout} className="text-red-500 hover:text-red-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
