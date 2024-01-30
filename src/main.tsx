import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './UI/App.tsx'
import { generateMap } from './map/generateMap.ts';
import * as Renderer from './map/drawer/renderer.ts'

window.addEventListener("load", () => {
  console.log("page is fully loaded");
  setTimeout(() => {
    Renderer.initialize(1000, 1000);
    generateMap();
  }, 10);

});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
