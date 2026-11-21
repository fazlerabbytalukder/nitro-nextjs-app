import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function useStoryReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.from("[data-story-line]", {
        yPercent: 105,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "[data-story-text]",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope },
  );
}
