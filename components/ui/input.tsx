// Importa los módulos necesarios de React.
import * as React from "react";

// Importa la función de utilidad `cn` para combinar clases.
import { cn } from "@/lib/utils";

// Define las propiedades para el componente de entrada.
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

// Define el componente de entrada, usando `forwardRef` para pasar la referencia al elemento de entrada.
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        // Combina las clases de Tailwind CSS.
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
// Asigna un nombre de visualización al componente para facilitar la depuración.
Input.displayName = "Input";

// Exporta el componente de entrada.
export { Input };
