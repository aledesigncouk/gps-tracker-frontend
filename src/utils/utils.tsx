type Coordinate = [number, number];

interface Geometry {
  type: "LineString";
  coordinates: Coordinate[];
}

interface Properties {
  year: number;
}

interface Track {
  type: "Feature";
  properties: Properties;
  geometry: Geometry;
}

export const getTrackByRange = async (
  start: string,
  end: string
): Promise<Track> => {
  const response = await fetch(`/api/TrackByRange?start=${start}&end=${end}`);

  const data = await response.json();
  return data;
};

export const getYears = async (): Promise<string[]> => {
  const response = await fetch("/api/GetYears");

  const data = await response.json();
  return data;
};

// format the dates to be MySQL friendly
export const formatDate = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
};

export const setRangeByYear = (
  year: string
): { startDate: string; endDate: string } => {
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;

  return { startDate, endDate };
};

export const validateTrackData = (data: Track): boolean => {
  if (
    data &&
    data.type === "Feature" &&
    data.properties &&
    typeof data.properties.year === "number" &&
    data.geometry &&
    data.geometry.type === "LineString" &&
    Array.isArray(data.geometry.coordinates) &&
    data.geometry.coordinates.every(
      (coord) =>
        Array.isArray(coord) &&
        coord.length === 2 &&
        coord.every((val) => typeof val === "number")
    )
  ) {
    return true;
  }
  return false;
};

const validateYearsData = (data: string[]): boolean => {
  if (Array.isArray(data) && data.every((year) => typeof year === "string")) {
    return true;
  }
  return false;
};
