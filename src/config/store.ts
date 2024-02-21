import { configureStore } from "@reduxjs/toolkit";
import reducer from "./configSlice";
import { ConfigType } from "./type";

const store = configureStore({
  reducer: {
    config: reducer,
  },
});

export type ConfigStore = {config: ConfigType};

store.subscribe(() => {
  console.log(JSON.stringify(store.getState()))
});


export default store;
