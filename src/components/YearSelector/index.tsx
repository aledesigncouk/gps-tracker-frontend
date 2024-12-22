import { useState, useEffect } from "react";
import { getYears } from "src/utils";

interface YearSelectorProps {
  onSelect: (value: string) => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState<string>("select");
  const [years, setYears] = useState<string[]>([]);

  // Fetch years on component mount
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const result = await getYears(); // Wait for the Promise to resolve
        setYears(Array.isArray(result) ? result : []); // Ensure result is an array
      } catch (error) {
        console.error("Failed to fetch years:", error); // Handle errors gracefully
        setYears([]); // Fallback to an empty array
      }
    };

    fetchYears();
  }, []); // Empty dependency array ensures this runs only once

  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(value);
    onSelect(value);
  };

  return (
    <div>
      <label htmlFor="dropdown">Choose an option:</label>
      <select
        id="dropdown"
        value={selected}
        onChange={handleChange}
        style={{ marginLeft: "10px", padding: "5px" }}
      >
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
