import { useState, useEffect } from "react";
import {
  formatDate,
  getTrackByRange,
  setRangeByYear,
  validateData,
} from "@utils/utils";

type Track = {
  geometry: {
    coordinates: [number, number][];
  };
};

export const useFetchTrack = (
  controlSwitch: string,
  startDate: Date | null,
  endDate: Date | null,
  selectedYear: string | null
) => {
  const [track, setTrack] = useState<Track | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (controlSwitch === "range" && startDate && endDate) {
          const start = formatDate(startDate);
          const end = formatDate(endDate);
          const result = await getTrackByRange(start, end);
          if (!validateData(result)) throw new Error("Invalid data structure");
          setTrack(result);
        } else if (controlSwitch === "year" && selectedYear) {
          const { startDate: start, endDate: end } =
            setRangeByYear(selectedYear);
          const result = await getTrackByRange(start, end);
          if (!validateData(result)) throw new Error("Invalid data structure");
          setTrack(result);
        }
      } catch (error) {
        setError(error.message);
        setTrack(null);
      }
    };

    fetchData();
  }, [controlSwitch, startDate, endDate, selectedYear]);

  return { track, error };
};
