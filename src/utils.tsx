export const getTrackByRange = async (start, end) => {

  const response = await fetch(
    `/api/TrackByRange?start=${
      start}&end=${end}`
  );

  const result = await response.json();
  return result;
};

export const getYears = async () => {
  const response = await fetch("/api/GetYears");

  const result = await response.json();
  return result;
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
