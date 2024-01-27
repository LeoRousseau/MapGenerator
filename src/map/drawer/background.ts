import * as Renderer from './renderer'

export function draw(width: number, height: number) {
    Renderer.getSVG().rect(width, height).fill("#CBEAEE");
  }