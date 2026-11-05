import type { ReactNode } from "react";
import { ErrorIcon, InfoIcon } from "@/components/icons";

type StateMessageProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  variant?: "empty" | "error";
};

// Mensaje para los estados vacío y de error de las listas
export function StateMessage({ title, description, action, variant = "empty" }: StateMessageProps) {
  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className="flex animate-enter flex-col items-center gap-2 rounded-2xl border border-stroke-2/40 bg-surface-3 px-6 py-8 text-center"
    >
      {variant === "error" ? (
        <ErrorIcon className="size-8 text-error" />
      ) : (
        <InfoIcon className="size-8 text-text-medium/60" />
      )}
      <p className={`text-sm font-semibold ${variant === "error" ? "text-error" : ""}`}>{title}</p>
      {description && <p className="text-xs leading-[1.25] text-text-medium">{description}</p>}
      {action && <div className="mt-2 w-full max-w-48">{action}</div>}
    </div>
  );
}
