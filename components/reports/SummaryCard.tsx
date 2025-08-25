interface SummaryCardProps {
  title: string;
  value: string | number;
}

export default function SummaryCard({ title, value }: SummaryCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
      <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
    </div>
  );
}
