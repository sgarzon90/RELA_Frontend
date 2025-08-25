import { ChevronDown } from "lucide-react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export default function Select({ children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className="input appearance-none pr-8"
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
        <ChevronDown size={20} />
      </div>
    </div>
  );
}
