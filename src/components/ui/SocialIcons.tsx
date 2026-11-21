import Image from "next/image";
import type { SocialLink } from "@/types";
import { cn } from "@/lib/utils";

// icons from figma
const icons: Record<SocialLink["icon"], { src: string; width: number; height: number }> = {
  facebook: { src: "/images/ui/facebook.svg", width: 24, height: 24 },
  instagram: { src: "/images/ui/instagram.svg", width: 20, height: 20 },
  x: { src: "/images/ui/x.svg", width: 18.2462, height: 19.5 },
  linkedin: { src: "/images/ui/linkedin.svg", width: 24, height: 24 },
};

type SocialIconsProps = {
  links: SocialLink[];
  className?: string;
};

export default function SocialIcons({ links, className }: SocialIconsProps) {
  return (
    <ul className={cn("flex gap-4 md:gap-8", className)}>
      {links.map((link) => {
        const icon = icons[link.icon];

        return (
          <li key={link.icon}>
            <a
              href={link.href}
              aria-label={link.label}
              className="grid size-[42px] place-items-center rounded-full border border-nitro transition-colors hover:bg-nitro/15"
            >
              <Image
                src={icon.src}
                alt=""
                width={icon.width}
                height={icon.height}
                style={{ width: icon.width, height: icon.height }}
                unoptimized
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
