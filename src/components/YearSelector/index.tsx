import { useState, useEffect } from "react";
import { getYears } from "src/utils";

interface YearSelectorProps {
  onSelect: (value: string) => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState<string>("select");
  const [years, setYears] = useState<string[]>([]);

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
    setSelected(value);
    onSelect(value);
  };

  return (
    <div>
      <label htmlFor="dropdown">Choose a year:</label>
      <select
        id="dropdown"
        value={selected}
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
