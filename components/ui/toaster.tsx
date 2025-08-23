// Importa los módulos necesarios.
import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

// Define los tipos para las propiedades del Toaster.
type ToasterProps = {
  position?: "top-right" | "top-center" | "bottom-right";
  duration?: number; // Duración global por defecto.
};

// Define el componente Toaster, que muestra las notificaciones.
export function Toaster({
  position = "bottom-right",
  duration = 3000,
}: ToasterProps) {
  const { toasts } = useToast();

  // Define las clases de CSS para las diferentes posiciones del Toaster.
  const positions: Record<string, string> = {
    "top-right": "fixed top-0 right-0 flex flex-col p-4 gap-2 z-[100]",
    "top-center":
      "fixed top-0 left-1/2 -translate-x-1/2 flex flex-col p-4 gap-2 z-[100]",
    "bottom-right": "fixed bottom-0 right-0 flex flex-col p-4 gap-2 z-[100]",
  };

  // Renderiza el proveedor de notificaciones y las notificaciones.
  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        duration: toastDuration,
        ...props
      }) {
        return (
          <Toast
            key={id}
            {...props}
            duration={toastDuration ?? duration} // Usa la duración específica de la notificación o la global.
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-300" />
          </Toast>
        );
      })}

      {/* Renderiza el contenedor de notificaciones con la clase de posición correspondiente. */}
      <ToastViewport className={positions[position]} />
    </ToastProvider>
  );
}
