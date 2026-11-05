"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { CloseIcon } from "@/components/icons";
import { ALERT_STYLES, type AlertVariant } from "@/components/ui/alert";

type Toast = {
  id: number;
  variant: AlertVariant;
  message: string;
};

type ShowToast = (variant: AlertVariant, message: string) => void;

const ToastContext = createContext<ShowToast | null>(null);

const TOAST_DURATION_MS = 4000;
const MAX_TOASTS = 3;

// Va en el layout raíz: como ese layout no se desmonta al navegar,
// un toast mostrado antes de cambiar de pantalla sigue visible después
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback<ShowToast>(
    (variant, message) => {
      const id = nextId.current++;
      setToasts((current) => [...current.slice(-(MAX_TOASTS - 1)), { id, variant, message }]);
      setTimeout(() => dismiss(id), TOAST_DURATION_MS);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={showToast}>
      {children}

      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 top-4 z-50 mx-auto flex w-full max-w-[414px] flex-col gap-2 px-4"
      >
        {toasts.map((toast) => {
          const { Icon, color } = ALERT_STYLES[toast.variant];
          return (
            <div
              key={toast.id}
              role={toast.variant === "error" ? "alert" : "status"}
              className="pointer-events-auto flex animate-toast items-center gap-3 rounded-2xl border border-stroke-2/50 bg-surface-3 py-3 pr-2 pl-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
            >
              <Icon className={`size-5 shrink-0 ${color}`} />
              <p className="flex-1 text-sm leading-[1.35] font-medium">{toast.message}</p>
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                aria-label="Cerrar notificación"
                className="rounded-full p-1.5 text-text-medium transition-colors hover:bg-surface-1 hover:text-text-primary"
              >
                <CloseIcon className="size-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const showToast = useContext(ToastContext);
  if (!showToast) {
    throw new Error("useToast tiene que usarse dentro de <ToastProvider>");
  }
  return showToast;
}
