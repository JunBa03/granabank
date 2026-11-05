import Link from "next/link";
import { StateMessage } from "@/components/ui/state-message";

// Se muestra cuando el movimiento no existe o no pertenece al usuario
export default function MovementNotFound() {
  return (
    <main className="flex flex-1 flex-col justify-center px-6">
      <StateMessage
        title="No encontramos este movimiento"
        description="Puede que el link esté mal o que el movimiento ya no exista."
        action={
          <Link
            href="/movements"
            className="flex h-10 w-full items-center justify-center rounded-full bg-primary font-slab text-sm text-white transition-opacity hover:opacity-90"
          >
            Ver movimientos
          </Link>
        }
      />
    </main>
  );
}
