import { NoiseFunction2D, createNoise2D } from "simplex-noise";
import { NumberMap } from "../types";

export function create(width: number, height: number): NumberMap {
  const noise2D = createNoise2D();
  const elevationMap: NumberMap = [];
  for (let x = 0; x < width; x++) {
    elevationMap[x] = [];
    for (let y = 0; y < height; y++) {
      elevationMap[x][y] = getNoiseValue(x, y, [0.1, 0.1], noise2D, width);
    }
  }
  return elevationMap;
}

export function createEmpty(size: number): NumberMap {
  const result: NumberMap = [];
  for (let x = 0; x < size; x++) {
    result[x] = [];
    for (let y = 0; y < size; y++) {
      result[x][y] = 0;
    }
  }
  return result;
}


function getNoiseValue(x: number, y: number, origin: [number, number], noise: NoiseFunction2D, size: number) {
  const NoiseScale = 1;
  const NoiseOctaves = 20;
  const TextureSize = size;
  const IslandSize = 20;
  let a = 0,
    noisesize = NoiseScale,
    opacity = 1;

  for (let octaves = 0; octaves < NoiseOctaves; octaves++) {
    const xVal = x / (noisesize * TextureSize) + origin[0];
    const yVal = y / (noisesize * TextureSize) - origin[1];
    const z = noise(xVal, yVal);
    a += invlerp(0, 1, z) / opacity;

    noisesize /= 2;
    opacity *= 2;
  }

  return (a -= FallOffMap(x, y, TextureSize, IslandSize));
}

function FallOffMap(x: number, y: number, size: number, islandSize: number): number {
  let gradient = 1;
  gradient /= ((x * y) / (size * size)) * (1 - x / size) * (1 - y / size);
  gradient -= 16;
  gradient /= islandSize;

  return gradient;
}

const clamp = (a: number, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x: number, y: number, a: number) => clamp((a - x) / (y - x));
