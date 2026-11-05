import Link from "next/link";
import { MOVEMENT_TYPE_STYLES, MovementIcon } from "@/components/movement-icon";
import { formatAmount } from "@/lib/format";
import { MOVEMENT_TYPE_LABELS } from "@/lib/movement-types";
import type { MovementType } from "@/lib/validations";

type MovementItemProps = {
  movement: {
    id: string;
    name: string;
    type: MovementType;
    amountCents: number;
  };
};

export function MovementItem({ movement }: MovementItemProps) {
  return (
    <Link
      href={`/movements/${movement.id}`}
      className="flex h-[76px] items-center gap-4 rounded-2xl border border-stroke-2/40 bg-surface-3 p-4 transition-colors hover:border-stroke-2"
    >
      <MovementIcon type={movement.type} />

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate text-sm leading-[1.25] font-semibold">{movement.name}</p>
        <p className="text-xs leading-[1.25] font-medium text-text-medium">
          {MOVEMENT_TYPE_LABELS[movement.type].detail}
        </p>
      </div>

      <p className={`text-sm font-semibold ${MOVEMENT_TYPE_STYLES[movement.type].text}`}>
        {formatAmount(movement.amountCents)}
      </p>
    </Link>
  );
}
