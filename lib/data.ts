import "server-only";
import { prisma } from "@/lib/prisma";
import type { MovementFilters } from "@/lib/validations";

// Capa de acceso a datos: todas las consultas pasan por acá y siempre filtran por usuario

export function getMovements(userId: string, { search, type, limit }: MovementFilters = {}) {
  return prisma.movement.findMany({
    where: {
      userId,
      type,
      name: search ? { contains: search, mode: "insensitive" } : undefined,
    },
    orderBy: { date: "desc" },
    take: limit,
    select: { id: true, name: true, type: true, amountCents: true, date: true },
  });
}

export function getMovementById(userId: string, id: string) {
  // Filtrar por userId evita que alguien vea un movimiento ajeno aunque conozca su id
  return prisma.movement.findFirst({ where: { id, userId } });
}

export function getUserSummary(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, balanceCents: true, currency: true, cardLast4: true, cardExpiry: true },
  });
}
