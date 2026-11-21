import type { RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { SlotName } from "@/components/journey/CanSlot";

export function useCanJourney(
  containerRef: RefObject<HTMLElement | null>,
  canRef: RefObject<HTMLElement | null>,
) {
  useGSAP(
    () => {
      const container = containerRef.current;
      const can = canRef.current;
      if (!container || !can) return;

      const findSlot = (name: SlotName) => {
        const el = container.querySelector<HTMLElement>(
          `[data-can-slot="${name}"]`,
        );
        if (!el) throw new Error(`CanJourney: missing slot "${name}"`);
        return el;
      };

      const slot = (name: SlotName) => {
        const el = findSlot(name);
        const box = () => {
          const a = el.getBoundingClientRect();
          const b = container.getBoundingClientRect();
          return {
            x: a.left - b.left,
            y: a.top - b.top,
            width: a.width,
            height: a.height,
          };
        };

        return {
          x: () => box().x,
          y: () => box().y,
          width: () => box().width,
          height: () => box().height,
          rotation: Number(el.dataset.rotate ?? 0),
        };
      };

      const label = can.querySelector<HTMLElement>("[data-can-label]");
      const labelLeft = (name: SlotName) =>
        `${Number(findSlot(name).dataset.labelX) * 100}%`;

      type Start = { trigger: Element | string; start: string };

      const travel = (
        from: SlotName,
        to: SlotName,
        begin: Start,
        first = false,
      ) => {
        const leg = gsap.timeline({
          defaults: { ease: "power1.inOut", immediateRender: first },
          scrollTrigger: {
            ...begin,
            endTrigger: findSlot(to),
            end: "clamp(center center)",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        leg.fromTo(can, slot(from), slot(to), 0);

        if (label)
          leg.fromTo(
            label,
            { left: labelLeft(from) },
            { left: labelLeft(to) },
            0,
          );

        return leg;
      };

      gsap.set(can, { autoAlpha: 1 });
      const legs = [
        travel(
          "hero",
          "story",
          { trigger: "#story", start: "clamp(top bottom)" },
          true,
        ),
        travel("story", "lineup", {
          trigger: findSlot("story"),
          start: "clamp(center center)",
        }),
      ];

      const syncLegs = () => {
        const current =
          [...legs]
            .reverse()
            .find((leg) => (leg.scrollTrigger?.progress ?? 0) > 0) ?? legs[0];
        current.progress(current.scrollTrigger?.progress ?? 0);
      };
      ScrollTrigger.addEventListener("refresh", syncLegs);

      gsap.from(can.querySelector("[data-can-inner]"), {
        yPercent: -50,
        rotation: -25,
        autoAlpha: 0,
        duration: 1.4,
        delay: 0.4,
        ease: "expo.out",
      });

      document.fonts.ready.then(() => ScrollTrigger.refresh());

      return () => ScrollTrigger.removeEventListener("refresh", syncLegs);
    },
    { scope: containerRef },
  );
}
