import type { CSSProperties } from "react";

export const FRAME_WIDTH = 1920;
export const FRAME_HEIGHT = 1098;

export const f = (px: number) => `calc(var(--fw) * ${px / FRAME_WIDTH})`;
export const fy = (px: number) =>
  `calc(50% + var(--fw) * ${(px - FRAME_HEIGHT / 2) / FRAME_WIDTH})`;

export const fMin = (px: number, min: number) => `max(${min}px, ${f(px)})`;

export const vars = (values: Record<`--${string}`, string>) =>
  values as CSSProperties;
