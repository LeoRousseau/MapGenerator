import { SVG, Svg } from "@svgdotjs/svg.js";

const divID = "#canvas" ;
let mapSVG: Svg;

export function initialize(width: number, height: number) {
    mapSVG = SVG().addTo(divID).size(width, height);
}

export function getSVG(): Svg {
    return mapSVG;
}