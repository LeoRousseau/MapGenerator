import store from "../config/store";
import "./App.css";
import { RightPane } from "./components/rightPane";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <div className="global-container">
        <div id="canvas"></div>
        <div className="ui">
          <Provider store={store}>
            <RightPane></RightPane>
          </Provider>
        </div>
      </div>
    </>
  );
}

export default App;
