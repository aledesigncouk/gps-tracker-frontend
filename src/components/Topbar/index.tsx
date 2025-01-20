import Button from "react-bootstrap/Button";
import YearSelector from "@components/YearSelector";
import ControlSwitch from "@components/ControlSwitch";

import { useState } from "react";
import styles from "@styles/Topbar.module.scss";
import DateRangeSelector from "@components/SelectorDataRange";
import "react-datepicker/dist/react-datepicker.css";

interface TopbarProps {
  // startDate: Date;
  // endDate: Date;
  // setStartDate: (date: Date) => void;
  // setEndDate: (date: Date) => void;
}

const Topbar = (): JSX.Element => {
  const [toggleState, setToggleState] = useState(false); // true => Years, false => range
  const [year, setYear] = useState("");

  // const handleClick = () => {
  //   setDataRange(inputValue);
  // };

  const handleInputChange = (toggleState) => {
    setToggleState(!toggleState);
  };

  return (
    <>
      <div className={styles.topbar}>
        <ControlSwitch onToggle={setToggleState} />

        {toggleState ? (
          <YearSelector onSelect={setYear} />
        ) : (
          <DateRangeSelector />
        )}

        <Button variant="primary" onClick={() => {}}>
          Show Track
        </Button>
      </div>
    </>
  );
};

export default Topbar;
