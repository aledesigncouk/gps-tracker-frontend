import React, { createContext, useState, ReactNode } from "react";
import { ControlSwitchEnum } from "@enums/enums";
interface StoreType {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  controlSwitch: ControlSwitchEnum;
  setControlSwitch: (value: ControlSwitchEnum) => void;
  runFetchData: boolean;
  setRunFetchData: (value: boolean) => void;
}

const Store = createContext<StoreType | undefined>(undefined);

export const ContextStore = ({ children }: { children: ReactNode }) => {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [runFetchData, setRunFetchData] = useState<boolean>(false);
  const [controlSwitch, setControlSwitch] = useState<ControlSwitchEnum>(
    ControlSwitchEnum.RANGE || ControlSwitchEnum.YEAR);

  return (
    <Store.Provider
      value={{
        selectedYear: selectedYear,
        setSelectedYear: setSelectedYear,
        controlSwitch: controlSwitch,
        setControlSwitch: setControlSwitch,
        runFetchData: runFetchData,
        setRunFetchData: setRunFetchData
      }}
    >
      {children}
    </Store.Provider>
  );
};

export const useStore = () => {
  const context = React.useContext(Store);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};

export default ContextStore;
