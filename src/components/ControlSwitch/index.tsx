import React, { useState } from "react";
import styles from "@styles/components/ControlSwitch.module.scss";
import Switch from "react-switch";

interface ControlSwitchProps {
  onToggle: (isChecked: boolean) => void;
}

const ControlSwitch: React.FC<ControlSwitchProps> = ({ onToggle }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked((prev) => {
      const checkedState = !prev;
      onToggle(checkedState);
      return checkedState;
    });
  };

  return (
    <div className={styles.container}>
      <label>
        <Switch onChange={handleToggle} checked={isChecked} />
      </label>
    </div>
  );
};

export default ControlSwitch;
