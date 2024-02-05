import { defaultConfig } from "./defaultConfig";
import { ConfigType } from "./type";

export function getCurrentConfig() : ConfigType {
    return defaultConfig;
}