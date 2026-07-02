import { pause } from "@jsp/shared/utils";

// data.ts
const API_URL = "http://localhost:3009";
const PAUSE = 1500;

const cache = new Map<string, Promise<unknown>>();

export function getData<T>(path: string): Promise<T> {
  if (!cache.has(path)) cache.set(path, fetchData(path));

  return cache.get(path)! as Promise<T>;
}

// no try/cache: it will be used by use
async function fetchData<T>(path: string): Promise<T> {
  await pause(PAUSE);

  const response = await fetch(`${API_URL}${path}`);

  if (!response.ok) throw new Error(`Response status: ${response.status}`);

  return response.json() as Promise<T>;
}
