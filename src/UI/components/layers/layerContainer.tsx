import { Layer, LayerProps } from "./layer";
import './layerContainer.css'

const layers: LayerProps[] = [
  {
    elevation: 0,
    color: "#CDCF6A",
    strokeThickness: 1,
  },
  {
    elevation: 100,
    color: "#9AB875",
    strokeThickness: 0,
  }
];

export const LayerContainer = () => {
  return (
    <div className="layer-container">
      <div className="layer-array">
        {layers.map((l) => (
          <Layer data={l}></Layer>
        ))}
      </div>
    </div>
  );
};
