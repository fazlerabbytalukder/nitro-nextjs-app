import Image from "next/image";
import type { Flavour } from "@/types";
import { cn } from "@/lib/utils";

type CanImageProps = {
  flavour: Flavour;
  preload?: boolean;
  sizes?: string;
  className?: string;
};

export default function CanImage({
  flavour,
  preload,
  sizes = "(min-width: 768px) 20vw, 40vw",
  className,
}: CanImageProps) {
  return (
    <Image
      src={flavour.image}
      alt={`${flavour.name} can`}
      fill
      preload={preload}
      loading="eager"
      sizes={sizes}
      unoptimized
      className={cn("object-contain select-none", className)}
      style={{ filter: "drop-shadow(0 0 1.5px rgb(255 255 255 / 0.3))" }}
      draggable={false}
    />
  );
}
