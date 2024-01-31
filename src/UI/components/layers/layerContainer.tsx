import { useState } from "react";
import { Layer } from "./layer";
import "./layerContainer.css";

const defautLayers = [
  {
    elevation: 0,
    color: "#CDCF6A",
    strokeThickness: 1,
  },
];

export const LayerContainer = () => {
  const [layers, setLayers] = useState(defautLayers);

  const deleteLayer = (index: number) => {
    const newState = [...layers];
    newState.splice(index, 1);
    setLayers(newState);
  };

  const addLayer = () => {
    if (layers.length >= 6) return;
    const newState = [...layers];
    newState.push({
      elevation: 0,
      color: "#CDCF6A",
      strokeThickness: 0,
    });
    setLayers(newState);
  };

  return (
    <div className="layer-container">
      <div className="layer-array">
        {layers.map((l, i) => (
          <Layer data={{ ...l, onDelete: deleteLayer, index: i }} key={i}></Layer>
        ))}
      </div>
      <div className={layers.length < 6 ? "layer-add-button" : "layer-add-button disabled"} onClick={addLayer}>
        Add Layer
      </div>
    </div>
  );
};
