import { formatBalance } from "@/lib/format";

type BalanceCardProps = {
  holderName: string;
  balanceCents: number;
  currency: string;
  cardLast4: string;
  cardExpiry: string;
};

export function BalanceCard({ holderName, balanceCents, currency, cardLast4, cardExpiry }: BalanceCardProps) {
  return (
    <section
      aria-label="Tarjeta y balance"
      className="relative h-[190px] w-full rounded-3xl bg-primary px-6 pt-4 text-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
    >
      <div className="flex items-start justify-between">
        <p className="text-sm leading-[22px] font-medium">Balance</p>

        {/* Logo de la tarjeta: los dos círculos del Figma */}
        <div aria-hidden="true" className="relative h-[24.45px] w-[34px]">
          <span className="absolute left-0 size-[24.45px] rounded-full bg-[#e9231a]" />
          <span className="absolute right-0 size-[24.45px] rounded-full bg-[#e99418]/80" />
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="flex h-[30px] w-12 items-center justify-center rounded-md bg-linear-to-bl from-[#f3e4ff] to-warning text-sm leading-[22px] font-semibold">
          {currency}
        </span>
        <p className="text-[22px] leading-7 font-semibold">{formatBalance(balanceCents)}</p>
      </div>

      <p className="mt-6 flex items-center gap-4 text-[22px] leading-7" aria-label={`Tarjeta terminada en ${cardLast4}`}>
        <span className="font-semibold">****</span>
        <span className="font-semibold">****</span>
        <span className="font-semibold">****</span>
        <span className="font-medium">{cardLast4}</span>
      </p>

      <div className="absolute inset-x-6 bottom-3 flex items-end justify-between">
        <p className="text-base leading-[22px] font-medium">Soy {holderName}</p>
        <div className="text-center">
          <p className="text-[10px] leading-[13px] font-semibold">Exp. Date</p>
          <p className="text-sm leading-[19px] font-medium">{cardExpiry}</p>
        </div>
      </div>
    </section>
  );
}
