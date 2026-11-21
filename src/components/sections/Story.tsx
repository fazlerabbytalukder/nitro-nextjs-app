"use client";

import Image from "next/image";
import { useRef } from "react";
import { storyLines } from "@/data/site";
import { f, fy, vars } from "@/lib/frame";
import { useStoryReveal } from "@/animations/useStoryReveal";
import CanSlot from "@/components/journey/CanSlot";

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  useStoryReveal(sectionRef);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="h-frame relative"
      style={vars({
        "--photo-x": f(64),
        "--photo-y": fy(122),
        "--photo-w": f(884),
        "--photo-h": f(920),
        "--photo-r": f(40),
        "--can-x": f(896),
        "--can-y": f(449),
        "--can-w": f(564),
        "--text-x": f(1258),
        "--text-y": fy(195),
        "--text-size": f(185),
      })}
    >
      <div className="relative mx-auto grid px-5 pb-14 pt-4 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-8 md:px-8 md:py-16 lg:block lg:h-full lg:max-w-(--fw) lg:p-0">
        <div className="relative aspect-5/4 overflow-hidden rounded-3xl md:aspect-884/920 lg:absolute lg:left-(--photo-x) lg:top-(--photo-y) lg:aspect-auto lg:h-(--photo-h) lg:w-(--photo-w) lg:rounded-(--photo-r)">
          <Image
            src="/images/athlete.jpg"
            alt="Footballer dribbling a ball"
            fill
            sizes="(min-width: 768px) 46vw, 100vw"
            className="object-cover object-[center_65%] grayscale md:object-center"
          />

          <CanSlot
            name="story"
            rotate={90}
            className="absolute left-1/2 top-1/2 w-[32vw] -translate-x-1/2 -translate-y-1/2 md:left-[95%] md:w-[24vw] lg:left-(--can-x) lg:top-(--can-y) lg:w-(--can-w)"
          />
        </div>

        <h2
          data-story-text
          className="relative z-30 -mt-[14vw] whitespace-nowrap text-right font-display text-[19vw] font-black uppercase italic leading-[0.93] tracking-[-0.03em] text-nitro md:mt-0 md:text-left md:text-[11vw] lg:absolute lg:left-(--text-x) lg:top-(--text-y) lg:text-(length:--text-size)"
        >
          {storyLines.map((line) => (
            <span key={line} className="block overflow-hidden pr-[0.08em]">
              <span data-story-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
