import "./layer.css";

export type LayerProps = {
  elevation: number;
  color: string;
  strokeThickness: number;
};

export function Layer(layerData: { data: LayerProps }) {
  return (
    <div className="layer">
      <div className="layer-item">
        <div className="layer-item-title">Elevation</div>
        <input className="layer-item-input-number" defaultValue={layerData.data.elevation} type="number"></input>
      </div>
      <div className="layer-item">
        <div className="layer-item-title">Color</div>
        <input className="layer-item-input-color" defaultValue={layerData.data.color} type="color"></input>
      </div>
      <div className="layer-item">
        <div className="layer-item-title">Stroke</div>
        <input className="layer-item-input-number" defaultValue={layerData.data.strokeThickness} type="number"></input>
      </div>
    </div>
  );
}
