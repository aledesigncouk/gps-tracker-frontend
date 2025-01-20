import React, { createContext, useState, ReactNode } from "react";

interface StoreType {
    startDate: Date;
    setStartDate: (date: Date) => void;
    endDate: Date;
    setEndDate: (date: Date) => void;
}

const Store = createContext<StoreType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    return (
        <Store.Provider value={{ startDate, setStartDate, endDate, setEndDate }}>
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

export default Store;
