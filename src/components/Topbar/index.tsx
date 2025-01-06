import Button from "react-bootstrap/Button";
import YearSelector from "@components/YearSelector";

import { useState } from "react";
import styles from "@styles/Topbar.module.scss";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Topbar = ({ setDataRange, setYear }): JSX.Element => {
  const [inputValue, setInputValue] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleClick = () => {
    setDataRange(inputValue);
  };

  return (
    <>
      <div className={styles.topbar}>
        <YearSelector onSelect={setYear} />
      
				<div>
					From
					<DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
				</div>
				<div>
					To
					<DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
				</div>

				<Button variant='primary' onClick={handleClick}>Show Track</Button>
      </div>
    </>
  );
};

export default Topbar;
