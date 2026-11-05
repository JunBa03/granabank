import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeftIcon } from "@/components/icons";
import { MOVEMENT_TYPE_STYLES, MovementIcon } from "@/components/movement-icon";
import { verifySession } from "@/lib/dal";
import { getMovementById } from "@/lib/data";
import { formatAmount, formatDateTime } from "@/lib/format";
import { MOVEMENT_TYPE_LABELS } from "@/lib/movement-types";

export const metadata: Metadata = {
  title: "Detalle del movimiento",
};

export default async function MovementDetailPage({ params }: PageProps<"/movements/[id]">) {
  const { userId } = await verifySession();
  const { id } = await params;

  const movement = await getMovementById(userId, id);
  if (!movement) notFound();

  const labels = MOVEMENT_TYPE_LABELS[movement.type];

  const details = [
    { label: "Tipo", value: labels.filter },
    { label: "Fecha", value: formatDateTime(movement.date) },
    { label: "Descripción", value: movement.description ?? "Sin descripción" },
    { label: "N° de operación", value: movement.id.slice(-8).toUpperCase() },
  ];

  return (
    <main className="flex flex-col gap-6 px-6 pt-12 pb-6">
      <header className="flex items-center gap-3">
        <Link
          href="/movements"
          aria-label="Volver a movimientos"
          className="flex size-9 items-center justify-center rounded-full bg-surface-3 text-text-primary transition-colors hover:bg-stroke-2/40"
        >
          <ChevronLeftIcon className="size-6" />
        </Link>
        <h1 className="font-slab text-2xl leading-[1.17] font-semibold">Detalle</h1>
      </header>

      <section className="flex flex-col items-center gap-3 rounded-3xl border border-stroke-2/40 bg-surface-3 px-6 py-8 text-center">
        <MovementIcon type={movement.type} size="lg" />
        <div className="flex flex-col gap-1">
          <p className="font-slab text-xl leading-[1.17] font-semibold">{movement.name}</p>
          <p className="text-sm font-medium text-text-medium">{labels.detail}</p>
        </div>
        <p className={`text-[32px] leading-10 font-semibold ${MOVEMENT_TYPE_STYLES[movement.type].text}`}>
          {formatAmount(movement.amountCents)}
        </p>
      </section>

      <dl className="flex flex-col divide-y divide-stroke-2/40 rounded-2xl border border-stroke-2/40 bg-surface-3 px-4">
        {details.map(({ label, value }) => (
          <div key={label} className="flex items-start justify-between gap-4 py-4">
            <dt className="text-sm text-text-medium">{label}</dt>
            <dd className="text-right text-sm font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
