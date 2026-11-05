import type { ReactNode } from "react";

// A diferencia del layout, el template se vuelve a montar en cada navegación,
// así que la animación de entrada se repite al cambiar de pantalla
export default function AppTemplate({ children }: { children: ReactNode }) {
  return <div className="flex flex-1 animate-enter flex-col">{children}</div>;
}
