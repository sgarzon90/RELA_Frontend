// Importa las utilidades `clsx` y `tailwind-merge`.
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// `cn` es una función de utilidad para combinar clases de Tailwind CSS de forma condicional y sin conflictos.
// `clsx` permite unir nombres de clase, incluyendo lógica condicional.
// `twMerge` fusiona las clases de Tailwind, resolviendo conflictos (por ejemplo, `p-2` y `p-4` se convierte en `p-4`).
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
