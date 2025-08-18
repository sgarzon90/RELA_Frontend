import { toast } from "@/hooks/use-toast"

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
