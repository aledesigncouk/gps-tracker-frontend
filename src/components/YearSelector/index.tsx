import { useRangeDatesStore } from "@store/ContextRangeDates";
import { useState, useEffect } from "react";
import { getYears, setRangeByYear } from "@utils/utils";
import { Stack, Dropdown } from "react-bootstrap";

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
        setYears([]);
      }
    };

    fetchYears();
  }, []);

  const handleChange = (year: string) => {
    setSelectedYear(year);
    const { startDate, endDate } = setRangeByYear(year);
    setStartDate(new Date(startDate));
    setEndDate(new Date(endDate));
  };

  return (
    <Stack data-testid="year-selector" className="ms-auto">
      <label className="" htmlFor="dropdown">Choose a year:</label>
      <Dropdown onSelect={handleChange}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedYear || "Select year"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {years.map((option, index) => (
            <Dropdown.Item key={index} eventKey={option}>
              {option}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Stack>
  );
};

export default YearSelector;
