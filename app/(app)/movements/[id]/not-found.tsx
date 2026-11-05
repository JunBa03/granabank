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
            className="flex h-10 w-full items-center justify-center rounded-full bg-primary font-slab text-sm text-white transition-[background-color,transform] duration-150 hover:bg-primary-hover active:scale-[0.98]"
          >
            Ver movimientos
          </Link>
        }
      />
    </main>
  );
}
