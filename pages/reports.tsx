import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getSummary, getTopSellingProducts } from "../lib/api";
import SummaryCard from "@/components/reports/SummaryCard";
import TopSellingProductsChart from "@/components/reports/TopSellingProductsChart";

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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Reportes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <SummaryCard
            title="Ventas Totales"
            value={`$${Number(summary.totalSales).toLocaleString()}`}
          />
          <SummaryCard
            title="Productos Vendidos"
            value={summary.productsSolds}
          />
          <SummaryCard
            title="Saldo Pendiente"
            value={`$${Number(summary.pendingBalance).toLocaleString()}`}
          />
          <SummaryCard
            title="Productos en Stock"
            value={summary.productsInStock}
          />
        </div>
        <TopSellingProductsChart data={topSellingProducts} />
      </div>
    </>
  );
}
