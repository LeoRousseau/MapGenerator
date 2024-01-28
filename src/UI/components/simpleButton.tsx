import "./simpleButton.css";

type SimpleButtonProps = {
  title: string;
  onClick: () => void;
};

export function SimpleButton(props: SimpleButtonProps) {
  return <div className="button-container" onClick={props.onClick}>{props.title}</div>;
}
