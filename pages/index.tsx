// Importa el componente de la barra de navegación.
import Navbar from '../components/Navbar';

// Define el componente de la página de inicio.
export default function Home() { 
  return (
    <>
      {/* Renderiza el componente de la barra de navegación. */}
      <Navbar />
      {/* Contenido principal de la página. */}
      <main className="max-w-5xl mx-auto px-4">
        <div className="card">
          <h1 className="text-2xl font-bold mb-4">Bienvenido 👋</h1>
          <p>Usa el menú para gestionar tu inventario, registrar ventas, administrar créditos y ver reportes.</p>
        </div>
      </main>
    </>
  );
}
