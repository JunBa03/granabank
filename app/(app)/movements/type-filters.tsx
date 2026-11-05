import { MOVEMENT_TYPE_LABELS } from "@/lib/movement-types";
import { MOVEMENT_TYPES, type MovementType } from "@/lib/validations";

const FILTERS: { value: MovementType | null; label: string }[] = [
  { value: null, label: "Todos" },
  ...MOVEMENT_TYPES.map((type) => ({ value: type, label: MOVEMENT_TYPE_LABELS[type].filter })),
];

type TypeFiltersProps = {
  selected: MovementType | null;
  onChange: (type: MovementType | null) => void;
};

export function TypeFilters({ selected, onChange }: TypeFiltersProps) {
  return (
    <div role="group" aria-label="Filtrar por tipo" className="flex gap-2 overflow-x-auto">
      {FILTERS.map(({ value, label }) => {
        const isActive = selected === value;
        return (
          <button
            key={label}
            type="button"
            onClick={() => onChange(value)}
            aria-pressed={isActive}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition-[background-color,border-color,color,transform] duration-200 active:scale-95 ${
              isActive
                ? "border-primary bg-primary/10 text-primary"
                : "border-transparent text-text-medium hover:bg-stroke-2/30 hover:text-text-primary"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
