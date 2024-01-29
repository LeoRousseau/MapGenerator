import { useState } from "react";
import { Tab } from "./Tab";
import "./tabs.css";

type TabsProps = {
  tabs: { label: string; Icon: JSX.Element }[];
};

export function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} onClick={() => handleTabClick(index)} isActive={index === activeTab} Icon={tab.Icon} />
        ))}
      </div>
      <div className="tab-content">Tab {activeTab} is Active</div>
    </div>
  );
}
