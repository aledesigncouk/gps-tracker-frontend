import React, { createContext, useState, ReactNode } from 'react';

interface RangeDatesContextProps {
    startDate: Date | null;
    endDate: Date | null;
    setStartDate: (date: Date | null) => void;
    setEndDate: (date: Date | null) => void;
}

const RangeDatesContext = createContext<RangeDatesContextProps | undefined>(undefined);

export const RangeDatesContextStore: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return (
        <RangeDatesContext.Provider value={{
            startDate: startDate,
            setStartDate: setStartDate,
            endDate: endDate,
            setEndDate: setEndDate,
        }}>
            {children}
        </RangeDatesContext.Provider>
    );
};

export const useRangeDatesStore = () => {
    const context = React.useContext(RangeDatesContext);
    if (context === undefined) {
        throw new Error('useRangeDatesStore must be used within a RangeDatesProvider');
    }
    return context;
};

export default RangeDatesContextStore;