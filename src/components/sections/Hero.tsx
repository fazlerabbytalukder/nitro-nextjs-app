"use client";

import { useRef } from "react";
import { heroCopy, socialLinks } from "@/data/site";
import { f, fMin, fy, vars } from "@/lib/frame";
import { useHeroIntro } from "@/animations/useHeroIntro";
import CanSlot from "@/components/journey/CanSlot";
import Button from "@/components/ui/Button";
import SocialIcons from "@/components/ui/SocialIcons";

const WORD = "NITRO";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  useHeroIntro(sectionRef);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="bg-spotlight h-frame relative overflow-hidden"
      style={vars({
        "--word-y": fy(441),
        "--word-size": f(580),
        "--can-dy": f(47),
        "--can-w": f(340),
        "--row-y": fy(892),
        "--copy-w": f(464),
        "--copy-size": fMin(16, 13),
        "--btn-gap": f(33),
      })}
    >
      <h1 className="sr-only">Nitro Energy Drink</h1>

      <div className="pb-12 pt-28 md:pb-16 md:pt-36 lg:absolute lg:inset-x-0 lg:top-(--word-y) lg:-translate-y-1/2 lg:p-0">
        <div className="relative">
          <p
            aria-hidden
            className="overflow-hidden whitespace-nowrap py-[0.04em] text-center font-display text-[30vw] font-black italic leading-[0.85] tracking-[-0.03em] lg:text-(length:--word-size)"
          >
            {WORD.split("").map((letter, index) => (
              <span
                key={index}
                data-hero-letter
                className="text-nitro-gradient inline-block bg-size-[500%_100%] pr-[0.03em]"
                style={{ backgroundPositionX: `${(index / (WORD.length - 1)) * 100}%` }}
              >
                {letter}
              </span>
            ))}
          </p>

          <CanSlot
            name="hero"
            rotate={90}
            className="absolute left-1/2 top-[calc(50%+var(--can-dy))] w-(--can-w) -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>

      <div className="frame relative grid gap-6 pb-12 md:grid-cols-[1fr_auto] md:items-end md:pb-16 lg:absolute lg:inset-x-0 lg:top-(--row-y) lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:pb-0">
        <p
          data-hero-fade
          className="text-sm uppercase leading-[1.5] text-white md:max-w-md lg:max-w-(--copy-w) lg:text-(length:--copy-size)"
        >
          {heroCopy}
        </p>

        <div
          data-hero-fade
          className="flex gap-3 md:col-start-1 md:row-start-2 lg:col-start-auto lg:row-start-auto lg:gap-(--btn-gap)"
        >
          <Button href="#lineup" variant="light" className="flex-1 md:flex-none">
            Buy Now
          </Button>
          <Button href="#story" variant="outline" className="flex-1 border-white md:flex-none">
            More info
          </Button>
        </div>

        <div
          data-hero-fade
          className="flex md:col-start-2 md:row-start-1 md:justify-end lg:col-start-auto lg:row-start-auto"
        >
          <SocialIcons links={socialLinks} />
        </div>
      </div>
    </section>
  );
}
