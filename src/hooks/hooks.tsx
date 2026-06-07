import { useState, useEffect } from "react";
import { formatDate, validateTrackData } from "@utils/utils";
import { getTrackByRange } from "@api/api";
import { Track } from "@/types/types";
import { useRangeDatesStore } from "@/store/ContextRangeDates";

export const useFetchTrack = () => {
  const [track, setTrack] = useState<Track | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { startDate, endDate } = useRangeDatesStore();

  useEffect(() => {
    if (!startDate || !endDate) return;

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
