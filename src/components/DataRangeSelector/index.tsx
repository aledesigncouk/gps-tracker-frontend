import React, { useState, useContext, use } from "react";
import DatePicker from "react-datepicker";
import { useStore } from "@store/ContextStore";

import "react-datepicker/dist/react-datepicker.css";
import styles from "@styles/DateRangeSelector.module.scss";

const DateRangeSelector = () => {
  const { startDate, setStartDate, endDate, setEndDate} = useStore()

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        dateFormat={'dd / MM / yyyy'}
        selectsMultiple={true}
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        dateFormat={'dd / MM / yyyy'}
        selectsMultiple={true}
      />
    </>
  );
};

export default DateRangeSelector;
