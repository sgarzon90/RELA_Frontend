import Navbar from '../components/Navbar';
export default function Home() { return (<>
  <Navbar />
  <main className="max-w-5xl mx-auto px-4">
    <div className="card"><h1 className="text-2xl font-bold mb-4">Bienvenido 👋</h1>
    <p>Usa el menú para gestionar tu inventario, registrar ventas y administrar créditos.</p></div>
  </main></>);
}