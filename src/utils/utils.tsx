import { Track } from "@/types/types";

export const formatDate = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
};

export const setRangeByYear = (year: string): { startDate: string; endDate: string } => {
  return { startDate: `${year}-01-01`, endDate: `${year}-12-31` };
};

export const validateTrackData = (data: Track): boolean => {
  return (
    !!data &&
    data.type === "Feature" &&
    !!data.properties &&
    (data.properties.year === undefined ||
      typeof data.properties.year === "number" ||
      typeof data.properties.year === "string") &&
    !!data.geometry &&
    data.geometry.type === "LineString" &&
    Array.isArray(data.geometry.coordinates) &&
    data.geometry.coordinates.every(
      (coord) =>
        Array.isArray(coord) && coord.length === 2 && coord.every((val) => typeof val === "number")
    )
  );
};
