import "./tab.css";

type TabProps = {
  label: string;
  onClick: () => void;
  isActive: boolean;
  Icon: JSX.Element;
};

export function Tab({ label, onClick, isActive, Icon }: TabProps) {
  console.log();
  return (
    <div className={`tab ${isActive ? "active" : ""}`} onClick={onClick}>
      {Icon}
      {label}
    </div>
  );
}
