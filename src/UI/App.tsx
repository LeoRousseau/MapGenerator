import "./App.css";
import { RightPane } from "./components/rightPane";

function App() {
  return (
    <>
      <div className="global-container">
        <div id="canvas"></div>
        <div className="ui">
          <RightPane></RightPane>
        </div>
      </div>
    </>
  );
}

export default App;
