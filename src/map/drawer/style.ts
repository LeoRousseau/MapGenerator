import store from "../../config/store";
import { Element } from "@svgdotjs/svg.js";
import { getSVG } from "./renderer";
import { MapID } from "./id";
import { ColorBlendingMode, ElevationLayerData } from "../../config/type";
import { blendColors } from "./color";

export function applyStyleToMap() {
  const config = store.getState().config;
  applyBackground(config.water.color);
  applyLayers(config.islands.colors, config.elevationLayer, config.islands.colorBlending);
  applyWater(config.water.color)
}

function applyBackground(color: string) {
  (getSVG().findOne("#" + MapID["background"]) as Element).fill(color);
}

function applyLayers(islandColors: string[], layerDatas: ElevationLayerData[], blending: ColorBlendingMode) {
  const layers = getSVG().find(`path[id^="${MapID['island']}"]`);

  layers.forEach((l) => {
    const indexes = l.id().split("_").slice(2);
    const islandIndex = parseInt(indexes[0]);
    let color = islandColors[islandIndex];
    const stroke = layerDatas[indexes.length - 1].stroke;

    if (blending === "Blend") {
      color = blendColors(islandColors[islandIndex], layerDatas[indexes.length - 1].color);
    } else if (blending === "Layers") {
      color = layerDatas[indexes.length - 1].color;
    }

    l.fill(color).stroke({ color: "#000000a0", width: stroke });
  });
}


function applyWater(color: string) {
  const rivers = getSVG().find(`path[id^="${MapID['river']}"]`);
  rivers.forEach((r) => r.fill(color));

  const lakes = getSVG().find(`path[id^="${MapID['lake']}"]`);
  lakes.forEach((r) => r.fill(color));
}
