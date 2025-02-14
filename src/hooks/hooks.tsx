import { useState, useEffect } from "react";
import { formatDate, getTrackByRange } from "@utils/utils";
import { validateTrackData } from "@utils/utils";
import { Track } from "@/interfaces/interfaces";
import { useRangeDatesStore } from "@/store/ContextRangeDates";

export const useFetchTrack = () => {
  const [track, setTrack] = useState<Track | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { startDate, endDate } = useRangeDatesStore();

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
      } 
    };

    fetchData();

  }, [startDate, endDate]);

  return { track, error };
};
