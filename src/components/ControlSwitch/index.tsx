import React from "react";
import Switch from "react-switch";
import { ControlSwitchEnum } from "@enums/enums";
import { useStore } from "@store/ContextStore";
import styles from "@styles/components/ControlSwitch.module.scss";

interface ControlSwitchProps {
  onToggle: (isSet: ControlSwitchEnum) => void;
}

const ControlSwitch: React.FC<ControlSwitchProps> = ({ onToggle }) => {
  const { controlSwitch, setControlSwitch } = useStore();

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
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
        />
      </label>
    </div>
  );
};

export default ControlSwitch;
