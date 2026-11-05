import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email("Ingresá un email válido")),
  password: z.string().min(1, "Ingresá tu contraseña"),
  remember: z.boolean().default(false),
});

export type LoginInput = z.input<typeof loginSchema>;

export const MOVEMENT_TYPES = ["SUBSCRIPTION", "RECEIVED", "SENT"] as const;

export type MovementType = (typeof MOVEMENT_TYPES)[number];

export const movementFiltersSchema = z.object({
  search: z.string().trim().max(50, "La búsqueda es demasiado larga").optional(),
  type: z.enum(MOVEMENT_TYPES, "Tipo de movimiento inválido").optional(),
  limit: z.coerce.number().int().min(1).max(50).optional(),
});

export type MovementFilters = z.infer<typeof movementFiltersSchema>;
