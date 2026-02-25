import { clamp, rgbToHex } from "./color-math";
import type { ShaderConfig } from "./config";

export function generateIqPalette(config: ShaderConfig, count = 7): string[] {
  const TAU = Math.PI * 2;
  const palette: string[] = [];

  for (let i = 0; i < count; i += 1) {
    const t = count === 1 ? 0 : i / (count - 1);
    const channels = [0, 1, 2].map((idx) => {
      const value = config.iqA[idx] + config.iqB[idx] * Math.cos(TAU * (config.iqC[idx] * t + config.iqD[idx]));
      return Math.round(clamp(value, 0, 1) * 255);
    });
    palette.push(rgbToHex(channels[0], channels[1], channels[2]));
  }

  return palette;
}
