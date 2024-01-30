import React, { useState } from "react";
import { Tab } from "./Tab";
import "./tabs.css";
import { TabContent } from "./tabContent";

type TabsProps = {
  tabs: { label: string; Icon: JSX.Element, Content: React.ComponentType }[];
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
      <TabContent Content={tabs[activeTab].Content}></TabContent>
    </div>
  );
}
