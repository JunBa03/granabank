import type { Metadata } from "next";
import Link from "next/link";
import { BalanceCard } from "@/components/balance-card";
import { BellIcon, SearchIcon } from "@/components/icons";
import { MovementItem } from "@/components/movement-item";
import { StateMessage } from "@/components/ui/state-message";
import { verifySession } from "@/lib/dal";
import { getMovements, getUserSummary } from "@/lib/data";

export const metadata: Metadata = {
  title: "Inicio",
};

const LATEST_MOVEMENTS_LIMIT = 5;

export default async function HomePage() {
  const { userId } = await verifySession();

  // Las dos consultas son independientes, así que las hacemos en paralelo
  const [user, movements] = await Promise.all([
    getUserSummary(userId),
    getMovements(userId, { limit: LATEST_MOVEMENTS_LIMIT }),
  ]);

  if (!user) {
    throw new Error("No se encontró el usuario de la sesión");
  }

  return (
    <main className="flex flex-col gap-6 px-6 pt-12 pb-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm leading-[1.25] font-medium text-text-medium">Hola</p>
          <h1 className="font-slab text-2xl leading-[1.17] font-semibold">{user.name}</h1>
        </div>

        <div className="flex items-center gap-4 text-[#1a1a1a]">
          <Link href="/movements" aria-label="Buscar movimientos">
            <SearchIcon className="size-6" />
          </Link>
          <button type="button" aria-label="Notificaciones">
            <BellIcon className="size-6" />
          </button>
        </div>
      </header>

      <BalanceCard
        holderName={user.name}
        balanceCents={user.balanceCents}
        currency={user.currency}
        cardLast4={user.cardLast4}
        cardExpiry={user.cardExpiry}
      />

      <section className="flex flex-col gap-4">
        <h2 className="font-slab text-xl leading-[1.17] font-semibold">Últimos movimientos</h2>

        {movements.length === 0 ? (
          <StateMessage
            title="Todavía no tenés movimientos"
            description="Cuando hagas o recibas un pago, lo vas a ver acá."
          />
        ) : (
          <ul className="flex flex-col gap-3">
            {movements.map((movement) => (
              <li key={movement.id}>
                <MovementItem movement={movement} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
