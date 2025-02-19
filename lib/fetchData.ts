import psychoactivesFallback from "@/assets/data/psychoactives.json";
import risksFallback from "@/assets/data/data.json";
import combosFallback from "@/assets/data/combos.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchAndCache = async (url: string, key: string): Promise<string> => {
  const hash = await getHash();
  const savedHash = await AsyncStorage.getItem(key + "_hash");
  const out = await AsyncStorage.getItem(key);
  if (savedHash === hash[key]) {
    if (out) {
      return out;
    }
  }
  const response = await fetch(url);
  const data = await response.text();
  await AsyncStorage.setItem(key, data);
  await AsyncStorage.setItem(key + "_hash", hash[key]);
  return data;
};

const fetchFromCache = async (
  key: string,
  fallback: string
): Promise<string> => {
  const cache = await AsyncStorage.getItem(key);
  if (cache) {
    return cache;
  } else {
    return fallback;
  }
};

const getHash = async (): Promise<any> => {
  const response = await fetch("https://psychcombo.com/hash.json");
  const data = await response.json();
  return data;
};

export const cachedPsychs = async (): Promise<any> => {
  const API_URL = "https://psychcombo.com/psychoactives.json";
  const network = fetchAndCache(API_URL, "psychoactives");
  const fallback = fetchFromCache(
    "psychoactives",
    JSON.stringify(psychoactivesFallback)
  );
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

export const gridState = async (): Promise<any> => {
  return fetchFromCache(
    "chosenPsychs",
    JSON.stringify(["alcohol", "cannabis", "cocaine", "ketamine"])
  );
};

export const saveGridState = async (state: any): Promise<void> => {
  return AsyncStorage.setItem("chosenPsychs", JSON.stringify(state));
};
