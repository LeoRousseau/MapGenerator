import "./topBar.css";
import { SimpleButton } from "./simpleButton";
import { generateMap } from "../../map/generateMap";
import { downloadSVGAsText } from "../../map/download/download";
import { applyStyleToMap } from "../../map/drawer/style";
import { useDispatch } from "react-redux";
import { reset } from "../../config/configSlice";

export function TopBar() {
  const dispatch = useDispatch();

  const resetSettings = () => dispatch(reset());

  return <div className="topbar-container">
    <SimpleButton title="Reset settings" onClick={()=> resetSettings()}></SimpleButton>
    <SimpleButton title="Apply settings" onClick={()=> applyStyleToMap()}></SimpleButton>
    <SimpleButton title="Regenerate" onClick={()=> generateMap()}></SimpleButton>
    <SimpleButton title="Download" onClick={()=> downloadSVGAsText()}></SimpleButton>
  </div>;
}
