import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

// Para las páginas: si la sesión no es válida, manda al login.
// cache() hace que se verifique una sola vez por request aunque se llame varias veces.
export const verifySession = cache(async () => {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
});
