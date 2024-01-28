import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './UI/App.tsx'
import { generateMap } from './map/generateMap.ts';

window.addEventListener("load", () => {
  console.log("page is fully loaded");
  setTimeout(() => {
    generateMap({ dimension: [1000, 1000] });
  }, 10);

});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
