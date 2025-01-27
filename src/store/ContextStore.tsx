import React, { createContext, useState, ReactNode } from "react";
import { ControlSwitchEnum } from "@enums/enums";
interface StoreType {
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date;
  setEndDate: (date: Date) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  controlSwitch: ControlSwitchEnum;
  setControlSwitch: (value: ControlSwitchEnum) => void;
}

const Store = createContext<StoreType | undefined>(undefined);

export const ContextStore = ({ children }: { children: ReactNode }) => {
  const [startDate, setStartDate] = useState<Date>(new Date()); // set a default range
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [controlSwitch, setControlSwitch] = useState<ControlSwitchEnum>(
    ControlSwitchEnum.RANGE || ControlSwitchEnum.YEAR);

  return (
    <Store.Provider
      value={{
        startDate: startDate,
        setStartDate: setStartDate,
        endDate: endDate,
        setEndDate: setEndDate,
        selectedYear: selectedYear,
        setSelectedYear: setSelectedYear,
        controlSwitch: controlSwitch,
        setControlSwitch: setControlSwitch,
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
