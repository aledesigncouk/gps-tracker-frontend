import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useStore } from "@store/ContextStore";
import { Button } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";

const DateRangeSelector = () => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setRunFetchData,
  } = useStore();
 
  const handleFetch = () => {
    setRunFetchData(true);
  };

  return (
    <>
      <DatePicker
        customInput={<input data-testid="start-date" type="text" />}
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        dateFormat={"dd / MM / yyyy"}
        withPortal
      />
      <DatePicker
        customInput={<input data-testid="end-date" type="text" />}
        selected={endDate}
        onChange={(date: Date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        dateFormat={"dd / MM / yyyy"}
        withPortal
      />
      <Button variant="primary" onClick={handleFetch} data-testid="fetch-button">
        Show Track
      </Button>
    </>
  );
};

export default DateRangeSelector;
