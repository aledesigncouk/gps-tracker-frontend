import { JSX } from "react";
import YearSelector from "@components/YearSelector";
import DateRangeSelector from "@/components/DateRangeSelector";

import styles from "@styles/components/Topbar.module.scss";
import "react-datepicker/dist/react-datepicker.css";

const Topbar = (): JSX.Element => {
  return (
    <div className={styles.topbar} data-testid="topbar">
      <DateRangeSelector />
      <YearSelector />
    </div>
  );
};

export default Topbar;
