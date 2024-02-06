import { ConfigType } from "./type";

export const defaultConfig: ConfigType = {
  islands: {
    maxCount: 5,
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
      elevation: 0,
      color: "#CDCF6A", // NOT USED
      stroke: 3,
    },
    {
      elevation: 0.3,
      color: "#9AB875", // NOT USED
      stroke: 2,
    },
  ],
};
