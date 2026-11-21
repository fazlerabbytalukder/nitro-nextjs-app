import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "nitro" | "light" | "outline";

const variants: Record<Variant, string> = {
  nitro: "bg-nitro text-ink hover:bg-white",
  light: "bg-white text-ink hover:bg-nitro",
  outline: "border border-white/40 text-white hover:border-white hover:bg-white/10",
};

type ButtonProps = ComponentProps<"a"> & {
  variant?: Variant;
};

// all buttons here are links
export default function Button({
  variant = "nitro",
  className,
  ...props
}: ButtonProps) {
  return (
    <a
      className={cn(
        "inline-flex h-11 items-center justify-center whitespace-nowrap px-6 text-sm font-medium transition-colors duration-300 md:px-[45px] md:text-base",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
