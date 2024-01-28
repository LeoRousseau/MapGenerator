import { Header } from "./header";
import "./rightPane.css";
import { TopBar } from "./topBar";

export function RightPane() {
  return (
    <>
      <div className="pane-container">
        <Header></Header>
        <TopBar></TopBar>
      </div>
    </>
  );
}
