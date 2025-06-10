import combosFallback from "@/assets/data/combos.json";
import risksFallback from "@/assets/data/risks.json";
import psychoactivesFallback from "@/assets/data/psychoactives.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Application from "expo-application";

const API_BASE_URL = "https://psychcombo.com/apiv1";

function versioned(key: string): string {
  const versionId = Application.nativeBuildVersion;
  const month = new Date().getMonth();
  return `${key}_${versionId}_${month}_hash`;
}

async function getHash(): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/hash.json`);
  return response.json();
}

async function fetchAndCache(url: string, key: string): Promise<string> {
  const hash = await getHash();
  const savedHash = await AsyncStorage.getItem(versioned(key));
  const cachedData = await AsyncStorage.getItem(key);

  if (savedHash === hash[key] && cachedData) {
    return cachedData;
  }

  const response = await fetch(url);
  const data = await response.text();
  await AsyncStorage.setItem(key, data);
  await AsyncStorage.setItem(versioned(key), hash[key]);
  return data;
}

async function fetchFromCache(key: string, fallback: string): Promise<string> {
  return (await AsyncStorage.getItem(key)) || fallback;
}

async function cachedData(
  endpoint: string,
  key: string,
  fallbackData: any
): Promise<any> {
  const API_URL = `${API_BASE_URL}/${endpoint}.json`;
  fetchAndCache(API_URL, key);
  const fallback = fetchFromCache(key, JSON.stringify(fallbackData));
  const result = await fallback;
  return JSON.parse(result);
}

export const cachedPsychs = () =>
  cachedData("psychoactives", "psychoactives", psychoactivesFallback);
export const cachedRisks = () => cachedData("risks", "risks", risksFallback);
export const cachedCombos = () =>
  cachedData("combos", "combos", combosFallback);

export async function gridState(): Promise<any> {
  return fetchFromCache(
    "chosenPsychs",
    JSON.stringify(["alcohol", "cannabis-species", "cocaine", "ketamine"])
  );
}

export async function saveGridState(state: any): Promise<void> {
  return AsyncStorage.setItem("chosenPsychs", JSON.stringify(state));
}
