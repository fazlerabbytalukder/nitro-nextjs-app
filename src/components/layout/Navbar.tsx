"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/data/site";
import { cn } from "@/lib/utils";
import { f, fMin, vars } from "@/lib/frame";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        (scrolled || menuOpen) && "bg-ink/80 backdrop-blur-md",
      )}
    >
      <nav
        className="frame flex h-16 items-center justify-between md:h-(--nav-h)"
        style={vars({ "--nav-h": fMin(108, 72), "--links-w": f(848) })}
      >
        <Logo />

        <ul className="hidden items-center justify-between text-sm text-white md:flex md:w-(--links-w) lg:text-base">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="transition-colors hover:text-nitro">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button href="#lineup">Buy Now</Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="relative h-10 w-10 md:hidden"
        >
          <span
            className={cn(
              "absolute left-2 right-2 top-1/2 h-0.5 bg-white transition-transform duration-300",
              menuOpen ? "rotate-45" : "-translate-y-1.5",
            )}
          />
          <span
            className={cn(
              "absolute left-2 right-2 top-1/2 h-0.5 bg-white transition-transform duration-300",
              menuOpen ? "-rotate-45" : "translate-y-1.5",
            )}
          />
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          "grid transition-[grid-template-rows] duration-500 md:hidden",
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <ul className="overflow-hidden px-5">
          {navLinks.map((link) => (
            <li key={link.label} className="border-t border-white/10">
              <a
                href={link.href}
                onClick={closeMenu}
                className="block py-4 font-display text-2xl font-bold italic uppercase"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pb-6 pt-2">
            <Button href="#lineup" onClick={closeMenu} className="w-full">
              Buy Now
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
