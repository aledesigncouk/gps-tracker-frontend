export const getTrackByYear = async (start) => {
  const response = await fetch(
    `/api/TrackByYear?start=${encodeURIComponent(start)}`,
  );

  const result = await response.json();
  return result;
};

export const getTrackByRange = async (start, end) => {
  const response = await fetch(
    `/api/TrackByRange?start=${encodeURIComponent(
      start,
    )}?end=${encodeURIComponent(end)}`,
  );

  const result = await response.json();
  return result;
};

export const getYears = async () => {
  const response = await fetch("/api/GetYears");

  const result = await response.json();
  return result;
};
