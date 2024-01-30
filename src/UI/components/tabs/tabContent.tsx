import "./tab.css";

type TabContentProps = {
  Content: React.ComponentType;
};

export const TabContent = ({ Content }: TabContentProps) => {
  return (
    <div className="tab-content">
      <Content></Content>
    </div>
  );
};
