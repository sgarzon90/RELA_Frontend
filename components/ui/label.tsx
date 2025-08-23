// Importa los módulos necesarios de React y otras bibliotecas.
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Define las variantes de estilo para la etiqueta usando `class-variance-authority`.
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

// Define el componente de etiqueta, usando `forwardRef` para pasar la referencia al elemento raíz de la etiqueta.
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    // Combina las variantes de la etiqueta con cualquier clase adicional.
    className={cn(labelVariants(), className)}
    {...props}
  />
));
// Asigna un nombre de visualización al componente para facilitar la depuración.
Label.displayName = LabelPrimitive.Root.displayName;

// Exporta el componente de etiqueta.
export { Label };
