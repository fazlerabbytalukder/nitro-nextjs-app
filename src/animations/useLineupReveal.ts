import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function useLineupReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.from("[data-lineup-can]", {
        y: 80,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        stagger: { each: 0.12, from: "center" },
        scrollTrigger: {
          trigger: scope.current,
          start: "top 45%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from("[data-lineup-info]", {
        y: 20,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: { each: 0.08, from: "center" },
        scrollTrigger: {
          trigger: scope.current,
          start: "top 35%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope },
  );
}
