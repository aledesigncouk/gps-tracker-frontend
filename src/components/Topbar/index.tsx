import { useState } from "react";
import { useStore } from "@store/ContextStore";
import Button from "react-bootstrap/Button";
import YearSelector from "@components/YearSelector";
import ControlSwitch from "@components/ControlSwitch";
import DateRangeSelector from "@components/DataRangeSelector";

import styles from "@styles/Topbar.module.scss";
import "react-datepicker/dist/react-datepicker.css";

const Topbar = (): JSX.Element => {
  const [toggleState, setToggleState] = useState(true); // true => Years, false => range

  // const handleClick = () => {
  //   setDataRange(inputValue);
  // };

  // const handleInputChange = (toggleState) => {
  //   setToggleState(!toggleState);
  // };

  return (
    <>
      <div className={styles.topbar}>
        <ControlSwitch onToggle={setToggleState} />
        {toggleState ? <YearSelector /> : <DateRangeSelector />}

        <Button variant="primary" onClick={() => {}}>
          Show Track
        </Button>
      </div>
    </>
  );
};

export default Topbar;
