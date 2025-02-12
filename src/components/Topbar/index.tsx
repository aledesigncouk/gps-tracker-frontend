import { JSX } from "react";
import { useControlSwitchStore } from "@store/ControlSwitchContext";
import YearSelector from "@components/YearSelector";
import ControlSwitch from "@components/ControlSwitch";
import DateRangeSelector from "@/components/DateRangeSelector";
import { ControlSwitchEnum } from "@enums/enums";

import styles from "@styles/components/Topbar.module.scss";


const Topbar = (): JSX.Element => {
  const { controlSwitch, setControlSwitch } = useControlSwitchStore();

  return (
    <div className={styles.topbar} data-testid="topbar">
      <ControlSwitch onToggle={setControlSwitch} />
      {controlSwitch === ControlSwitchEnum.RANGE ? (
        <DateRangeSelector />
      ) : (
        <YearSelector />
      )}
    </div>
  );
};

export default Topbar;
