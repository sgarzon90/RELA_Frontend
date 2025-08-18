import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

// Tipos extendidos para props
type ToasterProps = {
  position?: "top-right" | "top-center" | "bottom-right";
  duration?: number; // duración global por defecto
};

export function Toaster({
  position = "bottom-right",
  duration = 3000,
}: ToasterProps) {
  const { toasts } = useToast();

  // definimos las posiciones posibles
  const positions: Record<string, string> = {
    "top-right": "fixed top-0 right-0 flex flex-col p-4 gap-2 z-[100]",
    "top-center":
      "fixed top-0 left-1/2 -translate-x-1/2 flex flex-col p-4 gap-2 z-[100]",
    "bottom-right": "fixed bottom-0 right-0 flex flex-col p-4 gap-2 z-[100]",
  };

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
            duration={toastDuration ?? duration} // usa el duration global si no se pasa uno específico
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            {/* X de cierre visible */}
            <ToastClose className="text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-300" />
          </Toast>
        );
      })}

      {/* viewport con la clase según la posición */}
      <ToastViewport className={positions[position]} />
    </ToastProvider>
  );
}
