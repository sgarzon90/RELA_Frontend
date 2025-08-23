// Importa la función `toast` del hook `use-toast`.
import { toast } from "@/hooks/use-toast"

// Muestra una notificación de éxito.
export const notifySuccess = (
  message: string,
  title: string = "Éxito",
  duration = 3000
) => {
  toast({
    title,
    description: message,
    duration,
  })
}

// Muestra una notificación de error.
export const notifyError = (
  message: string,
  title: string = "Error",
  duration = 4000
) => {
  toast({
    title,
    description: message,
    variant: "destructive",
    duration,
  })
}

// Muestra una notificación de información.
export const notifyInfo = (
  message: string,
  title: string = "Información",
  duration = 3000
) => {
  toast({
    title,
    description: message,
    duration,
  })
}
