// Importa los módulos necesarios de Next.js y otras bibliotecas.
import Link from 'next/link'; // Para la navegación entre páginas.
import { useRouter } from 'next/router'; // Para manejar el enrutamiento.
import { useEffect, useState } from 'react'; // Hooks de React para manejar el estado y los efectos secundarios.
import { jwtDecode } from 'jwt-decode'; // Para decodificar los tokens JWT.
import { useTheme } from '@/components/ThemeProvider';
import { Moon, Sun } from 'lucide-react';

// Define la interfaz para el objeto de usuario.
interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

// Define el componente de la barra de navegación.
export default function Navbar() {
  // Inicializa el enrutador de Next.js.
  const router = useRouter();
  // Define el estado para el usuario, inicializado como nulo.
  const [user, setUser] = useState<User | null>(null);
  const pathname = router.pathname; // Obtiene la ruta actual.
  const { theme, setTheme } = useTheme();

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

  // Define una función para obtener las clases de los enlaces de navegación.
  const getLinkClassName = (path: string) => {
    return `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      pathname === path
        ? 'bg-gray-900 text-white'
        : 'text-gray-500 hover:bg-gray-700 hover:text-white'
    }`;
  };

  // Renderiza la barra de navegación.
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            {/* Logo o nombre de la tienda */}
            <Link href="/" className="text-lg font-bold text-gray-800 dark:text-white">
              RELA STORE
            </Link>
            {/* Enlaces de navegación */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              <Link href="/inventory" className={getLinkClassName('/inventory')}>
                Inventario
              </Link>
              <Link href="/sales" className={getLinkClassName('/sales')}>
                Ventas
              </Link>
              <Link href="/credits" className={getLinkClassName('/credits')}>
                Créditos
              </Link>
              <Link href="/reports" className={getLinkClassName('/reports')}>
                Reportes
              </Link>
              {user && user.role === 'master' && (
                <Link href="/users" className={getLinkClassName('/users')}>
                  Usuarios
                </Link>
              )}
              {user && user.role === 'master' && (
                <Link href="/attributes" className={getLinkClassName('/attributes')}>
                  Atributos
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Mensaje de bienvenida y botón de cierre de sesión */}
            {user && <span className="text-gray-600 text-sm dark:text-gray-300">Hola, {user.email}</span>}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-red-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Salir</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
