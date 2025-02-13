import { useStore } from "@store/ContextStore";
import { useState, useEffect } from "react";
import { getYears } from "@utils/utils";

import styles from "@styles/components/YearSelector.module.scss";

const YearSelector: React.FC = () => {
  const { selectedYear, setSelectedYear } = useStore(); // selected year
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

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedYear(value);
  };

  return (
    <div data-testid="year-selector" className={styles.yearContainer}>
      <label htmlFor="dropdown">Choose a year:</label>
      <select
        id="dropdown"
        className={styles.yearDropdown}
        value={selectedYear}
        onChange={handleChange}
        style={{ marginLeft: "10px", padding: "5px" }}
      >
        <option value="empty">Years</option>
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
