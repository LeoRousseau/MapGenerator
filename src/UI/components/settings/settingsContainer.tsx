import "./settingsContainer.css";
import { Tabs } from "../tabs/tabs";
import { LayerIcon } from "../icons/layer";
import { WaterIcon } from "../icons/water";
import { LegendIcon } from "../icons/legend";
import { BuildingsIcon } from "../icons/buildings";
import { LayerContainer } from "../layers/layerContainer";


const defaultComp = () => {
  return <div>default</div>
};

const tabData = [
  { label: "Layers", Icon: LayerIcon, Content: LayerContainer },
  { label: "Water", Icon: WaterIcon, Content: defaultComp },
  { label: "Buildings", Icon: BuildingsIcon, Content: defaultComp },
  { label: "Legend", Icon: LegendIcon, Content: defaultComp },
];

export function SettingsContainer() {
  return (
    <div className="settings-container">
      <Tabs tabs={tabData}></Tabs>
    </div>
  );
}
