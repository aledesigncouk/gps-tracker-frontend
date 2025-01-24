import { useState } from "react";
import { useStore } from "@store/ContextStore";
import Button from "react-bootstrap/Button";
import YearSelector from "@components/YearSelector";
import ControlSwitch from "@components/ControlSwitch";
import DateRangeSelector from "@components/DataRangeSelector";

import styles from "@styles/Topbar.module.scss";
import "react-datepicker/dist/react-datepicker.css";

const Topbar = (): JSX.Element => {
  const { controlSwitch, setControlSwitch } = useStore();

  return (
    <>
      <div className={styles.topbar}>
        <ControlSwitch onToggle={setControlSwitch} />
        {controlSwitch ? <YearSelector /> : <DateRangeSelector />}
      </div>
    </>
  );
};

export default Topbar;
