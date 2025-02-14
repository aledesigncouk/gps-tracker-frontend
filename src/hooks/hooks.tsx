import { useState, useEffect } from "react";
import { formatDate, getTrackByRange, setRangeByYear } from "@utils/utils";

import { validateTrackData, Track } from "@utils/utils";

export const useFetchTrack = (
  startDate: Date | null,
  endDate: Date | null,
  selectedYear: string | null,
  runFetchData: boolean,
  setRunFetchData: (value: boolean) => void
) => {
  const [track, setTrack] = useState<Track | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTrackByRange(formatDate(startDate), formatDate(endDate));

        if (validateTrackData(result)) {
          setTrack(result);
        }
        setError(null);
      } catch (error) {
        setError(error.message);
        setTrack(null);
      } finally {
        setRunFetchData(false);
      }
    };

    if (runFetchData || selectedYear) {
      fetchData();
    }
  }, [selectedYear, runFetchData]);

  return { track, error };
};
