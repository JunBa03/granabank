import type { MovementType } from "@/lib/validations";

// Textos de cada tipo de movimiento, en un solo lugar
export const MOVEMENT_TYPE_LABELS: Record<MovementType, { filter: string; detail: string }> = {
  SUBSCRIPTION: { filter: "Suscripción", detail: "Pago de suscripción" },
  RECEIVED: { filter: "Recibido", detail: "Pago recibido" },
  SENT: { filter: "Enviado", detail: "Pago enviado" },
};
