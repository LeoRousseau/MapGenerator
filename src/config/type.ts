export type ConfigType = {
  islands: IslandData;
  elevationLayer: ElevationLayerData[];
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
