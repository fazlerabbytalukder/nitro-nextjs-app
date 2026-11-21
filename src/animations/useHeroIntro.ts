import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function useHeroIntro(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from("[data-hero-letter]", {
          yPercent: 110,
          duration: 1.2,
          stagger: 0.06,
        })
        .from(
          "[data-hero-fade]",
          { y: 24, autoAlpha: 0, duration: 1, stagger: 0.1 },
          "-=0.7",
        );
    },
    { scope },
  );
}
