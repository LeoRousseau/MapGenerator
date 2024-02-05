import "./topBar.css";
import { SimpleButton } from "./simpleButton";
import { generateMap } from "../../map/generateMap";
import { downloadSVGAsText } from "../../map/download/download";

export function TopBar() {
  return <div className="topbar-container">
    <SimpleButton title="Reset settings" onClick={()=> console.log('clicked')}></SimpleButton>
    <div className="topbar-delimiter" ></div>
    <SimpleButton title="Apply settings" onClick={()=> console.log('clicked')}></SimpleButton>
    <div className="topbar-delimiter"></div>
    <SimpleButton title="Regenerate" onClick={()=> generateMap()}></SimpleButton>
    <div className="topbar-delimiter"></div>
    <SimpleButton title="Download" onClick={()=> downloadSVGAsText()}></SimpleButton>
  </div>;
}
