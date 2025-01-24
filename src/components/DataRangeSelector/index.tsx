import React, { useState, useContext, use } from "react";
import DatePicker from "react-datepicker";
import { useStore } from "@store/ContextStore";
import { Button } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import styles from "@styles/DateRangeSelector.module.scss";

const DateRangeSelector = () => {
  const { startDate, setStartDate, endDate, setEndDate } = useStore();

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        dateFormat={"dd / MM / yyyy"}
      />
      <DatePicker
        selected={endDate}
        onChange={(date: Date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        dateFormat={"dd / MM / yyyy"}
      />
      <Button variant="primary" onClick={() => {}}>
        Show Track
      </Button>
    </>
  );
};

export default DateRangeSelector;
