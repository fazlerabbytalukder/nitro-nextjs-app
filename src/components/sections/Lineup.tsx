"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Flavour } from "@/types";
import { cn } from "@/lib/utils";
import { f, fMin, fy, vars } from "@/lib/frame";
import { useLineupReveal } from "@/animations/useLineupReveal";
import CanSlot from "@/components/journey/CanSlot";
import CanImage from "@/components/ui/CanImage";

type LineupProps = {
  flavours: Flavour[];
  featuredId: string;
};

const layoutByDistance = [
  { canW: 256.6, canTop: 203, shadowW: 265, shadowH: 40, infoGap: 35 },
  { canW: 198, canTop: 312, shadowW: 217, shadowH: 32.75, infoGap: 46 },
  { canW: 167.7, canTop: 392, shadowW: 169, shadowH: 25.5, infoGap: 46 },
];

const figmaCentres = [204, 566, 960, 1387, 1718];

const centreFor = (index: number, count: number) =>
  count === figmaCentres.length
    ? figmaCentres[index]
    : 204 + (index * (1718 - 204)) / Math.max(count - 1, 1);

const mobileSizeByDistance = [
  "w-[34vw] md:w-[18vw]",
  "w-[22vw] md:w-[14vw]",
  "w-[22vw] md:w-[12vw]",
];

export default function Lineup({ flavours, featuredId }: LineupProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useLineupReveal(sectionRef);

  const featuredIndex = flavours.findIndex(
    (flavour) => flavour.id === featuredId,
  );

  return (
    <section
      id="lineup"
      ref={sectionRef}
      className="bg-spotlight h-frame relative"
    >
      <h2 className="pt-14 text-center text-xs uppercase md:pt-20 tracking-[0.35em] text-white/50 lg:sr-only">
        The lineup
      </h2>

      <ul className="relative mx-auto grid grid-cols-2 items-end gap-x-6 gap-y-10 px-5 pb-16 pt-10 md:flex md:justify-between md:gap-2 md:px-8 md:pt-16 lg:block lg:h-full lg:max-w-(--fw) lg:p-0">
        {flavours.map((flavour, index) => {
          const distance = Math.abs(index - featuredIndex);
          const isFeatured = distance === 0;
          const layout =
            layoutByDistance[Math.min(distance, layoutByDistance.length - 1)];
          const mobileSize =
            mobileSizeByDistance[
              Math.min(distance, mobileSizeByDistance.length - 1)
            ];

          return (
            <li
              key={flavour.id}
              className={cn(
                "flex flex-col items-center text-center lg:absolute lg:left-(--x) lg:top-(--top) lg:-translate-x-1/2",
                isFeatured && "order-first col-span-2 md:order-none",
              )}
              style={vars({
                "--x": f(centreFor(index, flavours.length)),
                "--top": fy(layout.canTop),
                "--can-w": f(layout.canW),
                "--shadow-w": f(layout.shadowW),
                "--shadow-h": f(layout.shadowH),
                "--info-gap": f(layout.infoGap),
              })}
            >
              <div className="relative isolate">
                {/* shadow under the can */}
                <div
                  aria-hidden
                  className={cn(
                    "absolute left-1/2 top-full -z-10 h-[4vw] w-[110%] -translate-x-1/2 -translate-y-[60%] lg:h-(--shadow-h) lg:w-(--shadow-w)",
                  )}
                >
                  {isFeatured ? (
                    <span className="absolute inset-[-64.75%_-11.28%_-84.75%_-11.28%]">
                      <Image
                        src="/images/ui/shadow-featured.svg"
                        alt=""
                        fill
                        unoptimized
                      />
                    </span>
                  ) : (
                    <Image
                      src="/images/ui/shadow.svg"
                      alt=""
                      fill
                      unoptimized
                    />
                  )}
                </div>

                {isFeatured ? (
                  <CanSlot
                    name="lineup"
                    className={cn(mobileSize, "lg:w-(--can-w)")}
                  />
                ) : (
                  <div
                    data-lineup-can
                    className={cn(
                      "relative aspect-11/29 lg:w-(--can-w)",
                      mobileSize,
                    )}
                  >
                    <CanImage
                      flavour={flavour}
                      sizes="(min-width: 768px) 11vw, 25vw"
                    />
                  </div>
                )}
              </div>

              <div
                data-lineup-info
                className="mt-6 whitespace-nowrap leading-[1.5] lg:mt-(--info-gap)"
                style={vars({
                  "--name-size": fMin(24, 15),
                  "--tag-size": fMin(17, 12),
                })}
              >
                <h3 className="font-display text-base font-black uppercase italic tracking-[-0.02em] md:text-sm lg:text-(length:--name-size)">
                  {flavour.name}
                </h3>
                <p className="text-xs text-white/58 lg:text-(length:--tag-size)">
                  {flavour.tagline}
                </p>
                <p className="mt-0.5 text-base font-extrabold md:text-sm lg:text-(length:--name-size)">
                  {flavour.price.toFixed(2)} $
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
