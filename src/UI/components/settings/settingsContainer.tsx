import "./settingsContainer.css";
import { Tabs } from "../tabs/tabs";
import { LayerIcon } from "../icons/layer";

const tabData = [
  { label: "Layers", Icon: LayerIcon },
  { label: "Water", Icon: LayerIcon },
  { label: "Humans", Icon: LayerIcon },
];

export function SettingsContainer() {
  return (
    <div className="settings-container">
      <Tabs tabs={tabData}></Tabs>
    </div>
  );
}
