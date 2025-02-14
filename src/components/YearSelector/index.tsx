import { useRangeDatesStore } from "@store/ContextRangeDates";
import { useState, useEffect } from "react";
import { getYears, setRangeByYear } from "@utils/utils";

import styles from "@styles/components/YearSelector.module.scss";

const YearSelector: React.FC = () => {
  const { setStartDate, setEndDate } = useRangeDatesStore(); // selected year
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [years, setYears] = useState<string[]>([]); // list of available years

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const result = await getYears();
        setYears(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Failed to fetch years:", error);
        setYears([]);
      }
    };

    fetchYears();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedYear(value);
    const { startDate, endDate } = setRangeByYear(value);
    setStartDate(new Date(startDate));
    setEndDate(new Date(endDate));
  };

  return (
    <div data-testid="year-selector" className={styles.yearContainer}>
      <label className={styles.yearLabel} htmlFor="dropdown">Choose a year:</label>
      <select
        id="dropdown"
        className={styles.yearDropdown}
        value={selectedYear}
        onChange={handleChange}
        style={{ marginLeft: "10px", padding: "5px" }}
      >
        <option value="empty">Select year</option>
        {years.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearSelector;
