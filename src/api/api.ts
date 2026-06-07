import { Track } from "../types/types";

export const getTrackByRange = async (start: string, end: string): Promise<Track> => {
  const response = await fetch(`/api/TrackByRange?start=${start}&end=${end}`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

export const getYears = async (): Promise<string[]> => {
  const response = await fetch("/api/GetYears");
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  return data.years.map(String);
};
