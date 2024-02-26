export type ConfigType = {
  islands: IslandData;
  elevationLayer: ElevationLayerData[];
  water: { color: string };
};

export type ColorBlendingMode = "Islands" | "Blend" | "Layers";

export type IslandData = {
  colorBlending: ColorBlendingMode;
  maxCount: number;
  colors: string[];
};

export type ElevationLayerData = {
  elevation: number;
  color: string;
  stroke: number;
};
