import { SVG, Svg } from "@svgdotjs/svg.js";
import { MapParameters, NumberMap } from "./types";
import * as ElevationMap from "./elevationMap";
import { getBorders, getFilteredMap } from "./mapUtils";

window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  generateMap({ dimension: [1000, 1000] }, "#app");
});

let mapSVG: Svg;

function generateMap(params: MapParameters, divID: string) {
  mapSVG = SVG().addTo(divID).size(params.dimension[0], params.dimension[1]);
  generateBackground(params.dimension[0], params.dimension[1]);
  const elevationMap = ElevationMap.create(100, 100);
  const seaLevel = getBorders(getFilteredMap(elevationMap, 0.1));
  displayElevationMap(seaLevel);
}

function generateBackground(width: number, height: number) {
  mapSVG.rect(width, height).fill("#CBEAEE");
}

function displayElevationMap(elevationMap: NumberMap) {
  for (let x = 0; x < elevationMap.length; x++) {
    for (let y = 0; y < elevationMap[x].length; y++) {
      console.log(elevationMap[x][y]);
      mapSVG
        .rect(10, 10)
        .move(10 * x, 10 * y)
        .fill(elevationMap[x][y] > 0 ? "#89F590" : "#FFFFFF");
    }
  }
}

function displayElevationMap2(elevationMap: NumberMap) {
  let txt = "";
  for (let x = 0; x < elevationMap.length; x++) {
    for (let y = 0; y < elevationMap[x].length; y++) {
      console.log(elevationMap[x][y]);
      txt = txt + (elevationMap[x][y] > 0 ? Math.round(elevationMap[x][y]) : "&nbsp;" + "&nbsp;" + "&nbsp;");
    }
    txt = txt + "<br>";
  }
  document.write(txt);
}


