import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getMovements } from "@/lib/data";
import { getSession } from "@/lib/session";
import { movementFiltersSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // Ignoramos los parámetros vacíos (?search=&type=) para que no fallen la validación
  const params = Object.fromEntries(
    [...request.nextUrl.searchParams].filter(([, value]) => value.trim() !== ""),
  );

  const result = movementFiltersSchema.safeParse(params);
  if (!result.success) {
    return NextResponse.json(
      { error: "Parámetros inválidos", fieldErrors: z.flattenError(result.error).fieldErrors },
      { status: 400 },
    );
  }

  const movements = await getMovements(session.userId, result.data);

  return NextResponse.json({ movements });
}
