import { SVG, Svg } from "@svgdotjs/svg.js";

const divID = "#canvas";
let mapSVG: Svg;
const size = {
  width: 100,
  height: 100,
};

export function getDimension() {
  return size;
}

export function clear() {
  mapSVG?.clear();
}

export function initialize(width: number, height: number) {
  size.width = width;
  size.height = height;
  mapSVG = SVG().addTo(divID).viewbox(0, 0, width, height).size(800, 800);
}

export function getSVG(): Svg {
  return mapSVG;
}
