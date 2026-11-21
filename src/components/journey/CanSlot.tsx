import { cn } from "@/lib/utils";

export type SlotName = "hero" | "story" | "lineup";

export const LABEL_X: Record<SlotName, number> = {
  hero: -0.2757,
  story: -2.9532,
  lineup: -1.6355,
};

type CanSlotProps = {
  name: SlotName;
  rotate?: number;
  className?: string;
};

export default function CanSlot({ name, rotate = 0, className }: CanSlotProps) {
  return (
    <div
      aria-hidden
      data-can-slot={name}
      data-rotate={rotate}
      data-label-x={LABEL_X[name]}
      className={cn("pointer-events-none aspect-11/29", className)}
    />
  );
}
