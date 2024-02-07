import { ColorBlendingMode } from "../../config/type";

export function getColor(island: string, layer: string, blendingMode: ColorBlendingMode): string {
  switch (blendingMode) {
    case "Islands":
      return island;
    case "Layers":
      return layer;
    case "Blend":
      return blendColors(island, layer);
  }
}

export function blendColors(color1: string, color2: string) {
  if (color1.length == 4) color1 = color1[1] + color1[1] + color1[2] + color1[2] + color1[3] + color1[3];
  else color1 = color1.substring(1);
  if (color2.length == 4) color2 = color2[1] + color2[1] + color2[2] + color2[2] + color2[3] + color2[3];
  else color2 = color2.substring(1);

  const _color1 = [
    parseInt(color1[0] + color1[1], 16),
    parseInt(color1[2] + color1[3], 16),
    parseInt(color1[4] + color1[5], 16),
  ];
  const _color2 = [
    parseInt(color2[0] + color2[1], 16),
    parseInt(color2[2] + color2[3], 16),
    parseInt(color2[4] + color2[5], 16),
  ];

  const color3 = _color1.map((c, i) => (c + _color2[i]) / 2);
  return "#" + toHex(color3[0]) + toHex(color3[1]) + toHex(color3[2]);
}

function toHex(num: number): string {
  let hex = Math.round(num).toString(16);
  if (hex.length == 1) hex = "0" + hex;
  return hex;
}

export function createFromNumber(n: number): string {
  return "#" + toHex(n) + toHex(n) + toHex(n);
}
