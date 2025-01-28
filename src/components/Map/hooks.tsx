import { useState, useEffect } from "react";
import { formatDate, getTrackByRange, setRangeByYear } from "@utils/utils";
import { ControlSwitchEnum } from "@enums/enums";
import { validateTrackData } from "@utils/utils";

type Track = {
  geometry: {
    coordinates: [number, number][];
  };
};

export const useFetchTrack = (
  controlSwitch: string,
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
        const { start, end } =
          controlSwitch === ControlSwitchEnum.RANGE
            ? { start: formatDate(startDate), end: formatDate(endDate) }
            : (() => {
                const { startDate, endDate } = setRangeByYear(selectedYear);
                return { start: startDate, end: endDate };
              })();

        const result = await getTrackByRange(start, end);
        
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
