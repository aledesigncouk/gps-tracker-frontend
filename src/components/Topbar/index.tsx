import { JSX } from "react";
import { useStore } from "@store/ContextStore";
import YearSelector from "@components/YearSelector";
import ControlSwitch from "@components/ControlSwitch";
import DateRangeSelector from "@/components/DateRangeSelector";
import { ControlSwitchEnum } from "@enums/enums";

import styles from "@styles/components/Topbar.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import RangeDatesContextStore from "@/store/ContextRangeDates";

const Topbar = (): JSX.Element => {
  const { controlSwitch, setControlSwitch } = useStore();

  return (
    <RangeDatesContextStore>
      <div className={styles.topbar} data-testid="topbar">
        <ControlSwitch onToggle={setControlSwitch} />
        {controlSwitch === ControlSwitchEnum.RANGE ? (
          <DateRangeSelector />
        ) : (
          <YearSelector />
        )}
      </div>
    </RangeDatesContextStore>
  );
};

export default Topbar;
