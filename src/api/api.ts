"use server";
import { Track } from "../types/types";
import { fetchApi } from "../utils/fetchApi";

export const getTrackByRange = async (start: string, end: string): Promise<Track> => {
  const response = await fetchApi(
    `/track?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`
  );
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

export const getYears = async (): Promise<string[]> => {
  const response = await fetchApi("/years");
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  return data.years.map(String);
};
