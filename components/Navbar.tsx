import Link from 'next/link';
export default function Navbar() {
  return (<nav className="bg-white shadow mb-6"><div className="max-w-5xl mx-auto px-4 py-3 flex gap-4">
    <Link className="font-semibold" href="/">RELA STORE</Link>
    <Link href="/inventory">Inventario</Link>
    <Link href="/sales">Ventas</Link>
    <Link href="/credits">Créditos</Link>
  </div></nav>);
}