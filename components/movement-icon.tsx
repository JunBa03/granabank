import { ArrowDownIcon, ArrowUpIcon, SwapVertIcon } from "@/components/icons";
import type { MovementType } from "@/lib/validations";

// Cada tipo tiene su color del DS: Info (azul), Granate y Warning (amarillo).
// Las clases van escritas completas para que Tailwind las detecte.
export const MOVEMENT_TYPE_STYLES = {
  SUBSCRIPTION: { Icon: SwapVertIcon, text: "text-info", background: "bg-info/15" },
  RECEIVED: { Icon: ArrowDownIcon, text: "text-primary", background: "bg-primary/15" },
  SENT: { Icon: ArrowUpIcon, text: "text-warning", background: "bg-warning/15" },
} satisfies Record<MovementType, { Icon: typeof SwapVertIcon; text: string; background: string }>;

type MovementIconProps = {
  type: MovementType;
  size?: "md" | "lg";
};

export function MovementIcon({ type, size = "md" }: MovementIconProps) {
  const { Icon, text, background } = MOVEMENT_TYPE_STYLES[type];
  const boxSize = size === "lg" ? "size-16 rounded-2xl" : "size-11 rounded-xl";
  const iconSize = size === "lg" ? "size-8" : "size-6";

  return (
    <div className={`flex shrink-0 items-center justify-center ${boxSize} ${background} ${text}`}>
      <Icon className={iconSize} />
    </div>
  );
}
