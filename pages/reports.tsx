import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getSummary, getTopSellingProducts } from "../lib/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Reports() {
  const [summary, setSummary] = useState<any>({});
  const [topSellingProducts, setTopSellingProducts] = useState<any[]>([]);

  useEffect(() => {
    getSummary().then(setSummary);
    getTopSellingProducts().then(setTopSellingProducts);
  }, []);

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 grid gap-6">
        <h1 className="text-2xl font-semibold">Reportes</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold">Ventas Totales</h3>
            <p className="text-2xl">
              ${Number(summary.totalSales).toLocaleString()}
            </p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold">Productos Vendidos</h3>
            <p className="text-2xl">{summary.productsSolds}</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold">Saldo Pendiente</h3>
            <p className="text-2xl">
              ${Number(summary.pendingBalance).toLocaleString()}
            </p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold">Productos en Stock</h3>
            <p className="text-2xl">{summary.productsInStock}</p>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">
            Productos más vendidos
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topSellingProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tipo" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidad" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </>
  );
}
