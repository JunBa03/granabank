import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DIRECT_URL }),
});

const movements = [
  { name: "Adobe", type: "SUBSCRIPTION", amountCents: 12500, date: "2026-11-04T09:15:00-03:00", description: "Creative Cloud - plan mensual" },
  { name: "Ronaldo", type: "RECEIVED", amountCents: 9500, date: "2026-11-03T18:40:00-03:00", description: "Transferencia recibida" },
  { name: "Figma", type: "SUBSCRIPTION", amountCents: 12500, date: "2026-11-02T10:00:00-03:00", description: "Figma Professional - plan mensual" },
  { name: "Juan Perez", type: "SENT", amountCents: 9500, date: "2026-11-01T21:10:00-03:00", description: "Transferencia enviada" },
  { name: "Martin Bozzini", type: "RECEIVED", amountCents: 9500, date: "2026-10-30T13:25:00-03:00", description: "Transferencia recibida" },
  { name: "José Suárez", type: "RECEIVED", amountCents: 9500, date: "2026-10-28T11:05:00-03:00", description: "Transferencia recibida" },
  { name: "Spotify", type: "SUBSCRIPTION", amountCents: 1099, date: "2026-10-27T08:00:00-03:00", description: "Spotify Premium - plan mensual" },
  { name: "Juan Rodríguez", type: "SENT", amountCents: 9500, date: "2026-10-26T19:45:00-03:00", description: "Transferencia enviada" },
  { name: "Julio César", type: "RECEIVED", amountCents: 9500, date: "2026-10-24T16:20:00-03:00", description: "Transferencia recibida" },
  { name: "Mariano Martinez", type: "SENT", amountCents: 9500, date: "2026-10-21T12:30:00-03:00", description: "Transferencia enviada" },
  { name: "Netflix", type: "SUBSCRIPTION", amountCents: 1599, date: "2026-10-20T08:00:00-03:00", description: "Netflix Estándar - plan mensual" },
  { name: "Juan David", type: "RECEIVED", amountCents: 9500, date: "2026-10-19T10:10:00-03:00", description: "Transferencia recibida" },
] as const;

async function main() {
  const passwordHash = await bcrypt.hash("GRANATE1@", 10);

  const user = await prisma.user.upsert({
    where: { email: "soygranate@clublanus.com" },
    update: { passwordHash },
    create: {
      email: "soygranate@clublanus.com",
      passwordHash,
      name: "Granate",
      balanceCents: 97885,
      cardLast4: "1234",
      cardExpiry: "02/30",
    },
  });

  // Borramos y recreamos los movimientos para que el seed se pueda correr varias veces
  await prisma.movement.deleteMany({ where: { userId: user.id } });
  await prisma.movement.createMany({
    data: movements.map((m) => ({ ...m, date: new Date(m.date), userId: user.id })),
  });

  console.log(`Seed ok: 1 usuario, ${movements.length} movimientos`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
