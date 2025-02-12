import React, { createContext, useState, ReactNode } from "react";
import { ControlSwitchEnum } from "@enums/enums";

interface ControlSwitchStoreType {
    controlSwitch: ControlSwitchEnum;
    setControlSwitch: (value: ControlSwitchEnum) => void;
}

const ControlSwitchStore = createContext<ControlSwitchStoreType | undefined>(undefined);

export const ControlSwitchContext = ({ children }: { children: ReactNode }) => {
    const [controlSwitch, setControlSwitch] = useState<ControlSwitchEnum>(
        ControlSwitchEnum.RANGE ?? ControlSwitchEnum.YEAR);

    return (
        <ControlSwitchStore.Provider
            value={{
                controlSwitch: controlSwitch,
                setControlSwitch: setControlSwitch,
            }}
        >
            {children}
        </ControlSwitchStore.Provider>
    );
};

export const useControlSwitchStore = () => {
    const context = React.useContext(ControlSwitchStore);
    if (!context) {
        throw new Error("useStore must be used within a ControlSwitchProvider");
    }
    return context;
};

export default ControlSwitchContext;
