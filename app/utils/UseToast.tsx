"use client"

import * as React from "react"
import { toast as sonnerToast, type ExternalToast } from "sonner"

export type ToasterToast = ExternalToast & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
}

type ToastOptions = Omit<ToasterToast, "id">

export function toast({ title, description, ...props }: ToastOptions) {
  const id = Date.now().toString()

  // Combine title and description into Sonner's message + description
  sonnerToast(title || "", {
    description: description || "",
    ...props,
  })

  const dismiss = () => sonnerToast.dismiss(id)
  const update = (options: ToastOptions) =>
    sonnerToast(title || "", { description: description || "", ...options })

  return { id, dismiss, update }
}

export function useToast() {
  // For compatibility with your old reducer-based hook
  const [toasts, setToasts] = React.useState<ToasterToast[]>([])

  // Since Sonner manages state internally, we can just return the wrapper
  return {
    toasts,
    toast,
    dismiss: (toastId?: string) => {
      if (toastId) sonnerToast.dismiss(toastId)
      else sonnerToast.dismiss()
    },
  }
}
