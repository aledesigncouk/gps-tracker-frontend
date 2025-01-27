import React, { useState, useContext, use, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useStore } from "@store/ContextStore";
import { Button } from "react-bootstrap";
import Modal from "@components/Modal";

import "react-datepicker/dist/react-datepicker.css";
import styles from "@styles/DateRangeSelector.module.scss";

const DateRangeSelector = () => {
  const { startDate, setStartDate, endDate, setEndDate } = useStore();
  const [start, setStart] = useState<Date | null>();
  const [end, setEnd] = useState<Date | null>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleButtonClick = () => {
    if (start && end) {
      setStartDate(start);
      setEndDate(end);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStart(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        dateFormat={"dd / MM / yyyy"}
      />
      <DatePicker
        selected={endDate}
        onChange={(date: Date) => setEnd(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        dateFormat={"dd / MM / yyyy"}
      />
      <Button variant="primary" onClick={handleButtonClick}>
        Show Track
      </Button>
      <Modal
        title="Error"
        content="Please select a start and end date."
        isOpen={isModalOpen}
        setModal={setIsModalOpen}
      />
    </>
  );
};

export default DateRangeSelector;
