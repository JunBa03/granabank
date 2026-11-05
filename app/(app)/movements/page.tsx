import type { Metadata } from "next";
import { verifySession } from "@/lib/dal";
import { MovementsView } from "./movements-view";

export const metadata: Metadata = {
  title: "Movimientos",
};

export default async function MovementsPage() {
  await verifySession();
  return <MovementsView />;
}
