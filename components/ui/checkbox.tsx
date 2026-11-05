import { CheckIcon } from "@/components/icons";

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <label className="flex w-fit cursor-pointer items-center gap-2 font-slab text-sm leading-[1.25]">
      {/* El input real queda oculto pero accesible (teclado y lectores de pantalla) */}
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="flex size-5 items-center justify-center rounded-md border border-stroke-2 bg-surface-3 text-white transition-colors peer-checked:border-primary peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40"
      >
        {checked && <CheckIcon className="size-3.5" />}
      </span>
      {label}
    </label>
  );
}
