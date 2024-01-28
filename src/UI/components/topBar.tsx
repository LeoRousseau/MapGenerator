import "./topBar.css";
import { SimpleButton } from "./simpleButton";

export function TopBar() {
  return <div className="topbar-container">
    <SimpleButton title="Reset settings" onClick={()=> console.log('clicked')}></SimpleButton>
    <div className="topbar-delimiter" ></div>
    <SimpleButton title="Apply settings" onClick={()=> console.log('clicked')}></SimpleButton>
    <div className="topbar-delimiter"></div>
    <SimpleButton title="Regenerate" onClick={()=> console.log('clicked')}></SimpleButton>
  </div>;
}
