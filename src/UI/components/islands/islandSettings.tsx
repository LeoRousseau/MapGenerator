import { useState } from "react";
import "./islandSettings.css";

const defaultColor = [
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
];

export const IslandSettings = () => {
  const [value, setValue] = useState(5);
  const [mode, setMode] = useState(0);

  return (
    <div className="islands-container">
      <div>
        <div className="mode-container-parent">
          <div className="slider-label">Color blending mode : </div>
          <div className="mode-container">
            <div className={"mode-option" + (mode === 0 ? " mode-selected" : "")} onClick={() => setMode(0)}>Islands</div>
            <div className={"mode-option" + (mode === 1 ? " mode-selected" : "")} onClick={() => setMode(1)}>Blend</div>
            <div className={"mode-option" + (mode === 2 ? " mode-selected" : "")} onClick={() => setMode(2)}>Layers</div>
          </div>
        </div>
      </div>
      <div className="slider">
        <div className="slider-label">Max. number of islands : </div>
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={(e) => setValue(e.currentTarget.valueAsNumber)}
        ></input>
        <p>{value}</p>
      </div>
      <div className="colors-container">
        {Array(value)
          .fill(0)
          .map((v, i) => (
            <div className="color-container" key={i}>
              <div className="color-title">Island #{i + 1}</div>
              <input className="input-color" defaultValue={defaultColor[i]} type="color"></input>
            </div>
          ))}
      </div>
    </div>
  );
};
