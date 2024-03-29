import { ElevationLayerData } from "../../../config/type";
import "./layer.css";

export type LayerProps = {
  elevation: number;
  color: string;
  stroke: number;
  onDelete: (index: number) => void;
  onChange: (index: number, data: Partial<ElevationLayerData>) => void;
  index: number;
};

export function Layer(layerData: { data: LayerProps }) {
  return (
    <div className="layer">
      <div className="layer-item">
        <div className="layer-item-title">Elevation</div>
        <input
          className="layer-item-input-number"
          defaultValue={layerData.data.elevation}
          type="number"
          disabled={layerData.data.index === 0}
          onBlur={(e) => layerData.data.onChange(layerData.data.index, { elevation: e.target.valueAsNumber })}
        ></input>
      </div>
      <div className="layer-item">
        <div className="layer-item-title">Color</div>
        <input
          className="layer-item-input-color"
          defaultValue={layerData.data.color}
          onBlur={(e) => layerData.data.onChange(layerData.data.index, { color: e.target.value })}
          type="color"
        ></input>
      </div>
      <div className="layer-item">
        <div className="layer-item-title">Stroke</div>
        <input
          className="layer-item-input-number"
          defaultValue={layerData.data.stroke}
          onBlur={(e) => layerData.data.onChange(layerData.data.index, { stroke: e.target.valueAsNumber })}
          type="number"
        ></input>
      </div>
      <div
        className={"layer-item-delete" + (layerData.data.index ? "" : " disabled")}
        onClick={() => layerData.data.index && layerData.data.onDelete(layerData.data.index)}
      >
        <svg viewBox="0 0 1024 1024" fill="currentColor" height="20px" width="20px">
          <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" />
        </svg>
      </div>
    </div>
  );
}
