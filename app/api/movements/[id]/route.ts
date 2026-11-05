import { NextResponse, type NextRequest } from "next/server";
import { getMovementById } from "@/lib/data";
import { getSession } from "@/lib/session";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const movement = await getMovementById(session.userId, id);

  if (!movement) {
    return NextResponse.json({ error: "Movimiento no encontrado" }, { status: 404 });
  }

  return NextResponse.json({ movement });
}
