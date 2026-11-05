import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { loginSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = loginSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: "Revisá los datos ingresados",
        fieldErrors: z.flattenError(result.error).fieldErrors,
      },
      { status: 400 },
    );
  }

  const { email, password, remember } = result.data;

  const user = await prisma.user.findUnique({ where: { email } });
  const isValidPassword = user ? await bcrypt.compare(password, user.passwordHash) : false;

  // Mismo mensaje si falla el email o la contraseña, para no revelar qué usuarios existen
  if (!user || !isValidPassword) {
    return NextResponse.json({ error: "Email o contraseña incorrectos" }, { status: 401 });
  }

  await createSession(user.id, remember);

  return NextResponse.json({ ok: true });
}
