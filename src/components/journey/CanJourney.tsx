"use client";

import { useRef, type ReactNode } from "react";
import type { Flavour } from "@/types";
import { useCanJourney } from "@/animations/useCanJourney";
import CanImage from "@/components/ui/CanImage";
import LayeredCan from "@/components/journey/LayeredCan";
import { LABEL_X } from "@/components/journey/CanSlot";

type CanJourneyProps = {
  flavour: Flavour;
  children: ReactNode;
};

export default function CanJourney({ flavour, children }: CanJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canRef = useRef<HTMLDivElement>(null);

  useCanJourney(containerRef, canRef);

  return (
    <div ref={containerRef} className="relative overflow-x-clip">
      {children}

      <div
        ref={canRef}
        className="pointer-events-none invisible absolute left-0 top-0 z-20"
      >
        <div
          data-can-inner
          className="relative h-full w-full [filter:drop-shadow(0_0_1.5px_rgb(255_255_255/0.3))_drop-shadow(0_30px_40px_rgb(0_0_0/0.6))]"
        >
          {flavour.label ? (
            <LayeredCan
              label={flavour.label}
              alt={`${flavour.name} can`}
              labelX={LABEL_X.hero}
            />
          ) : (
            <CanImage flavour={flavour} preload sizes="(min-width: 768px) 30vw, 60vw" />
          )}
        </div>
      </div>
    </div>
  );
}
