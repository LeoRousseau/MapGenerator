import "./islandSettings.css";
import { useSelector, useDispatch } from "react-redux";
import { setBlendMode, setMaxIslandCount, setIslandColor } from "../../../config/configSlice";
import { ColorBlendingMode, ConfigType } from "../../../config/type";
import { ConfigStore } from "../../../config/store";

export const IslandSettings = () => {
  const island = useSelector<ConfigStore, ConfigType["islands"]>((state) => state.config.islands);
  const dispatch = useDispatch();

  const updateMode = (mode: ColorBlendingMode) => {
    dispatch(setBlendMode(mode));
  };

  const updateMaxCount = (mode: number) => {
    dispatch(setMaxIslandCount(mode));
  };

  const updateColor = (index: number, color: string) => {
    dispatch(setIslandColor({ index, color }));
  };

  return (
    <div className="islands-container">
      <div>
        <div className="mode-container-parent">
          <div className="slider-label">Color blending mode : </div>
          <div className="mode-container">
            <div
              className={"mode-option" + (island.colorBlending === "Islands" ? " mode-selected" : "")}
              onClick={() => updateMode("Islands")}
            >
              Islands
            </div>
            <div
              className={"mode-option" + (island.colorBlending === "Blend" ? " mode-selected" : "")}
              onClick={() => updateMode("Blend")}
            >
              Blend
            </div>
            <div
              className={"mode-option" + (island.colorBlending === "Layers" ? " mode-selected" : "")}
              onClick={() => updateMode("Layers")}
            >
              Layers
            </div>
          </div>
        </div>
      </div>
      <div className="slider">
        <div className="slider-label">Max. number of islands : </div>
        <input
          type="range"
          min="1"
          max="10"
          value={island.maxCount}
          onChange={(e) => updateMaxCount(e.currentTarget.valueAsNumber)}
        ></input>
        <p>{island.maxCount}</p>
      </div>
      <div className="colors-container">
        {Array(island.maxCount)
          .fill(0)
          .map((_v, i) => (
            <div className="color-container" key={i}>
              <div className="color-title">Island #{i + 1}</div>
              <input
                className="input-color"
                defaultValue={island.colors[i]}
                onChange={(e) => updateColor(i, e.target.value)}
                type="color"
              ></input>
            </div>
          ))}
      </div>
    </div>
  );
};
