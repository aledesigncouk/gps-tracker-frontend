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

export const setRangeByYear = (year: string): {startDate: string, endDate: string} => {
  const startDate = `${year}-01-01 00:00:00`;
  const endDate = `${year}-12-31 00:00:00`;

  return { startDate, endDate };
}
