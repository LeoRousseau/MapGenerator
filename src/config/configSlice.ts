import { createSlice } from "@reduxjs/toolkit";
import { defaultConfig } from "./defaultConfig";
import { ColorBlendingMode, ConfigType, ElevationLayerData } from "./type";

const configSlice = createSlice({
  name: "config",
  initialState: defaultConfig,
  reducers: {
    setBlendMode: (state: ConfigType, action: { type: string; payload: ColorBlendingMode }) => {
      state.islands.colorBlending = action.payload;
    },
    setMaxIslandCount: (state: ConfigType, action: { type: string; payload: number }) => {
      state.islands.maxCount = action.payload;
    },
    setIslandColor: (state: ConfigType, action: { type: string; payload: { index: number; color: string } }) => {
      state.islands.colors[action.payload.index] = action.payload.color;
    },
    addLayer: (state: ConfigType) => {
      state.elevationLayer.push({
        elevation: 10,
        color: "#CDCF6A",
        stroke: 0,
      });
    },
    removeLayer: (state: ConfigType, action: { type: string; payload: number }) => {
      state.elevationLayer.splice(action.payload, 1);
    },
    updateLayer: (
      state: ConfigType,
      action: { type: string; payload: { index: number; data: Partial<ElevationLayerData> } }
    ) => {
      const currentData = state.elevationLayer[action.payload.index];
      const newData = action.payload.data;
      state.elevationLayer[action.payload.index] = { ...currentData, ...newData };
    },
    reset: () => defaultConfig, // to fix
  },
});

export const { setBlendMode, setMaxIslandCount, setIslandColor, addLayer, removeLayer, updateLayer, reset } =
  configSlice.actions;
const { reducer } = configSlice;
export default reducer;
