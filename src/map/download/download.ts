import { getSVG } from "../drawer/renderer";

export function downloadSVGAsText() {
  const svg = getSVG().node;
  const base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
  const a = document.createElement("a");
  const e = new MouseEvent("click");
  a.download = "random_vector_map.svg";
  a.href = "data:image/svg+xml;base64," + base64doc;
  a.dispatchEvent(e);
}
