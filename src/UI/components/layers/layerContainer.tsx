import { Layer } from "./layer";
import "./layerContainer.css";
import { useDispatch, useSelector } from "react-redux";
import { ConfigType, ElevationLayerData } from "../../../config/type";
import { ConfigStore } from "../../../config/store";
import { addLayer, removeLayer, updateLayer } from "../../../config/configSlice";

export const LayerContainer = () => {
  const layers = useSelector<ConfigStore, ConfigType["elevationLayer"]>((state) => state.config.elevationLayer);
  const dispatch = useDispatch();

  const deleteLayer = (index: number) => {
    dispatch(removeLayer(index));
  };

  const _addLayer = () => {
    if (layers.length >= 6) return;
    dispatch(addLayer());
  };

  const _updateLayer = (index: number, data: Partial<ElevationLayerData>) => {
    dispatch(updateLayer({ index, data }));
  };

  return (
    <div className="layer-container">
      <div className="layer-array">
        {layers.map((l, i) => (
          <Layer
            data={{ ...l, onDelete: deleteLayer, index: i, onChange: _updateLayer }}
            key={l.elevation + "," + i}
          ></Layer>
        ))}
      </div>
      <div className={layers.length < 6 ? "layer-add-button" : "layer-add-button disabled"} onClick={_addLayer}>
        Add Layer
      </div>
    </div>
  );
};
