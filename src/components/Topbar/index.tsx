import { useState } from "react";
import { useStore } from "@store/ContextStore";
import Button from "react-bootstrap/Button";
import YearSelector from "@components/YearSelector";
import ControlSwitch from "@components/ControlSwitch";
import DateRangeSelector from "@components/SelectorDataRange";

import styles from "@styles/Topbar.module.scss";
import "react-datepicker/dist/react-datepicker.css";

const Topbar = (): JSX.Element => {
  const [toggleState, setToggleState] = useState(false); // true => Years, false => range
  const { startDate, endDate, selectedYear} = useStore();

  // const handleClick = () => {
  //   setDataRange(inputValue);
  // };

  // console.log('st >', startDate)
  // console.log('nd >', endDate)
  // console.log('yr >', selectedYear)

  const handleInputChange = (toggleState) => {
    setToggleState(!toggleState);
  };

  return (
    <>
      <div className={styles.topbar}>
        <ControlSwitch onToggle={setToggleState} />
        {toggleState ? (
          <YearSelector />
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
