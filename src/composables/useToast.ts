import { ref } from "vue"
import type { Toast } from "../types/types";


const toasts = ref<Toast[]>([]);
let toastIdCounter = 0;

const addToast = (toast: Omit<Toast, "id" | "_timer">) => {
  const id = ++toastIdCounter;
  const newToast: Toast = { ...toast, id };

  toasts.value.push(newToast);

  const duration = toast.duration || 4000;

  newToast._timer = setTimeout(() => {
    removeToast(id);
  }, duration);

  return id
}

const removeToast = (id: number) => {
  const index = toasts.value.findIndex((toast) => toast.id === id);
  if (index > -1) {
    const toast = toasts.value[index];

    if (toast._timer) {
      clearTimeout(toast._timer);
    }

    toasts.value.splice(index, 1)
  }
}

const pauseToast = (id: number) => {
  const toast = toasts.value.find((t) => t.id === id);
  if (toast && toast._timer) {
    clearTimeout(toast._timer);
    toast._timer = undefined;
  }
}

const resumeToast = (id: number) => {
  const toast = toasts.value.find((t) => t.id === id);
  if (toast && !toast._timer) {
    
    const duration = toast.duration || 4000;
    toast._timer = setTimeout(() => {
      removeToast(id);
    }, duration);
  }
}

export const useToast = () => {
    const success = (message: string, duration?: number) => {
        return addToast({ type: "success", message, duration})
    }

    const error = (message: string, duration?: number) => {
        return addToast({ type: "error", message, duration})
    }

    const warning = (message: string, duration?: number) => {
        return addToast({ type: "warning", message, duration})
    }

    return {
        toasts,
        success,
        error,
        warning,
        removeToast,
        resumeToast,
        pauseToast
    }
}