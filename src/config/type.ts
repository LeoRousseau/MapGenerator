export type ConfigType = {
  islands: {
    maxCount: number;
    colors: string[];
  };
  elevationLayer: ElevationLayerData[];
};

export type ElevationLayerData = {
  elevation: number;
  color: string;
  stroke: number;
};
