import { ConfigType } from "./type";

export const defaultConfig: ConfigType = {
  islands: {
    colorBlending: "Islands",
    maxCount: 1,
    colors: [
      "#CDCF6A",
      "#9AB875",
      "#4AD583",
      "#4ABCD5",
      "#614AD5",
      "#B3727B",
      "#CAB3C4",
      "#969FBE",
      "#96BEB0",
      "#E49460",
    ],
  },
  elevationLayer: [
    {
      elevation: 0.1,
      color: "#E46060",
      stroke: 3,
    },
    {
      elevation: 0.3,
      color: "#74E460",
      stroke: 2,
    },
    {
      elevation: 0.5,
      color: "#96BEB0",
      stroke: 1,
    },
  ],
  water: {
    color: "#97CBD6",
  }
};
