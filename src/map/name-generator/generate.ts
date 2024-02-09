import { islandNames, islandSynonyms, islandSynonymsPlural } from "./lists";

export function getIslandName(plural: boolean): string {
  const name = getRandom(islandNames);
  const type = getRandom(plural ? islandSynonymsPlural : islandSynonyms);

  return name + ' ' + type;
}

function getRandom<T>(array: T[]): T {
  return array[Math.floor(array.length * Math.random())];
}
