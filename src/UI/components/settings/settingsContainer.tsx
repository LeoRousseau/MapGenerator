import "./settingsContainer.css";
import { Tabs } from "../tabs/tabs";
import { LayerIcon } from "../icons/layer";
import { WaterIcon } from "../icons/water";
import { LegendIcon } from "../icons/legend";
import { BuildingsIcon } from "../icons/buildings";

const tabData = [
  { label: "Layers", Icon: LayerIcon },
  { label: "Water", Icon: WaterIcon },
  { label: "Buildings", Icon: BuildingsIcon },
  { label: "Legend", Icon: LegendIcon },
];

export function SettingsContainer() {
  return (
    <div className="settings-container">
      <Tabs tabs={tabData}></Tabs>
    </div>
  );
}
