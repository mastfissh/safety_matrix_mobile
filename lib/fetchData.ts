import psychoactivesFallback from "../assets/data/psychoactives.json";
import risksFallback from "../assets/data/data.json";
import combosFallback from "../assets/data/combos.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchAndCache = async (url: string, key: string): Promise<string> => {
  const response = await fetch(url);
  const data = await response.text();
  AsyncStorage.setItem(key, data);
  return data;
};

const fetchFromCache = async (key: string, fallback:string): Promise<string> => {
  const cache = await AsyncStorage.getItem(key);
  if (cache) {
    return cache;
  } else {
    return fallback;
  }
};

export const cachedPsychs = async (): Promise<any> => {
  const API_URL = "https://psychcombo.com/psychoactives.json";
  const network = fetchAndCache(API_URL, "psychoactives");
  const fallback = fetchFromCache("psychoactives", JSON.stringify(psychoactivesFallback));
  const result = await Promise.race([network, fallback]);
  return JSON.parse(result);
};

export const cachedRisks = async (): Promise<any> => {
  const API_URL = "https://psychcombo.com/data.json";
  const network = fetchAndCache(API_URL, "risks");
  const fallback = fetchFromCache("risks", JSON.stringify(risksFallback));
  const result = await Promise.race([network, fallback]);
  return JSON.parse(result);
};

export const cachedCombos = async (): Promise<any> => {
  const API_URL = "https://psychcombo.com/combos.json";
  const network = fetchAndCache(API_URL, "combos");
  const fallback = fetchFromCache("combos", JSON.stringify(combosFallback));
  const result = await Promise.race([network, fallback]);
  return JSON.parse(result);
};