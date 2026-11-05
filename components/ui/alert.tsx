import type { ReactNode } from "react";
import { CheckCircleIcon, ErrorIcon, InfoIcon } from "@/components/icons";

export type AlertVariant = "success" | "error" | "info";

// Estilos compartidos entre las alertas en línea y los toasts
export const ALERT_STYLES = {
  success: { Icon: CheckCircleIcon, color: "text-[#15803d]" },
  error: { Icon: ErrorIcon, color: "text-error" },
  info: { Icon: InfoIcon, color: "text-info" },
} satisfies Record<AlertVariant, { Icon: typeof InfoIcon; color: string }>;

const BOX_STYLES: Record<AlertVariant, string> = {
  success: "border-[#15803d]/25 bg-[#15803d]/8",
  error: "border-error/25 bg-error/8",
  info: "border-info/25 bg-info/8",
};

type AlertProps = {
  variant?: AlertVariant;
  children: ReactNode;
  className?: string;
};

export function Alert({ variant = "info", children, className = "" }: AlertProps) {
  const { Icon, color } = ALERT_STYLES[variant];

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={`flex items-start gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm ${BOX_STYLES[variant]} ${color} ${className}`}
    >
      <Icon className="mt-px size-[18px] shrink-0" />
      <p className="leading-[1.35]">{children}</p>
    </div>
  );
}
