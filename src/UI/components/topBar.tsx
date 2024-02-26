import "./topBar.css";
import { SimpleButton } from "./simpleButton";
import { generateMap } from "../../map/generateMap";
import { downloadSVGAsText } from "../../map/download/download";
import { applyStyleToMap } from "../../map/drawer/style";

export function TopBar() {
  return <div className="topbar-container">
    <SimpleButton title="Reset settings" onClick={()=> console.log('clicked')}></SimpleButton>
    <div className="topbar-delimiter" ></div>
    <SimpleButton title="Apply settings" onClick={()=> applyStyleToMap()}></SimpleButton>
    <div className="topbar-delimiter"></div>
    <SimpleButton title="Regenerate" onClick={()=> generateMap()}></SimpleButton>
    <div className="topbar-delimiter"></div>
    <SimpleButton title="Download" onClick={()=> downloadSVGAsText()}></SimpleButton>
  </div>;
}
