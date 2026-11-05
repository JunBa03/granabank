import type { ReactNode } from "react";
import { BottomNav } from "@/components/bottom-nav";

// Layout de las pantallas privadas: contenido + barra de navegación inferior
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex flex-1 flex-col">{children}</div>
      <BottomNav />
    </>
  );
}
