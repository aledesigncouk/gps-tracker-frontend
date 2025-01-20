import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import store from "@store/Store";

import "react-datepicker/dist/react-datepicker.css";
import styles from "@styles/DateRangeSelector.module.scss";

interface DateRangeSelectorProps {
  // startDate: Date;
  // endDate: Date;
  // setStartDate: (date: Date) => void;
  // setEndDate: (date: Date) => void;
}

const DateRangeSelector = ({
  // startDate,
  // endDate,
  // setStartDate,
  // setEndDate,
}) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

const start = startDate.toString();

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsMultiple={true}
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsMultiple={true}
      />
    </>
  );
};

export default DateRangeSelector;
