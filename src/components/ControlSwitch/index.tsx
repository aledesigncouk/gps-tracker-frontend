import React from "react";
import styles from "@styles/components/ControlSwitch.module.scss";
import Switch from "react-switch";
import { ControlSwitchEnum } from "@enums/enums";
import { useControlSwitchStore } from "@store/ControlSwitchContext";

interface ControlSwitchProps {
  onToggle: (isSet: ControlSwitchEnum) => void;
}

const ControlSwitch: React.FC<ControlSwitchProps> = ({ onToggle }) => {
  const { controlSwitch, setControlSwitch } = useControlSwitchStore();

  const handleToggle = () => {
    const newSwitchValue =
      controlSwitch === ControlSwitchEnum.RANGE
        ? ControlSwitchEnum.YEAR
        : ControlSwitchEnum.RANGE;

    setControlSwitch(newSwitchValue);
    onToggle(newSwitchValue);
  };

  return (
    <div className={styles.container} data-testid="control-switch">
      <label>
        <Switch
          data-testid="switch-btn"
          onChange={handleToggle}
          checked={controlSwitch === ControlSwitchEnum.YEAR}
        />
      </label>
    </div>
  );
};

export default ControlSwitch;
