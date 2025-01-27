import React, { useState } from "react";
import styles from "@styles/components/ControlSwitch.module.scss";
import Switch from "react-switch";
import { ControlSwitchEnum } from "@enums/enums";
import { useStore } from "@store/ContextStore";

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
    <div className={styles.container}>
      <label>
        <Switch
          onChange={handleToggle}
          checked={controlSwitch === ControlSwitchEnum.YEAR}
        />
      </label>
    </div>
  );
};

export default ControlSwitch;
