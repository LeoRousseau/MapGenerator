import { Header } from "./header";
import "./rightPane.css";
import { SettingsContainer } from "./settings/settingsContainer";
import { TopBar } from "./topBar";

export function RightPane() {
  return (
    <>
      <div className="pane-container">
        <Header></Header>
        <TopBar></TopBar>
        <SettingsContainer></SettingsContainer>
      </div>
    </>
  );
}
