import React, { useState } from "react";
import { getMonth, getYear } from 'date-fns';
import range from "lodash/range";
import DatePicker from "react-datepicker";
import { useStore } from "@store/ContextStore";
import Button from "@components/Button";
import Modal from "@components/Modal";

import style from "@styles/components/DateRangeSelector.module.scss";

const DateRangeSelector = () => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setRunFetchData,
  } = useStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleFetch = () => {
    setRunFetchData(true);
  };

  const years = range(2021, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      <div className={style.datePickerWrapper}>
        <label className={style.label}>Start Date</label>
        <DatePicker
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (<div style={{ margin: 10, display: "flex", justifyContent: "center", }}
          >
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {"<"}
            </button>
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value as any)}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {">"}
            </button>
          </div>
          )}
          className={style.dateInput}
          customInput={<input data-testid="start-date" type="text" />}
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat={"dd / MM / yyyy"}
          withPortal
        />
      </div>

      <div className={style.datePickerWrapper}>
        <label className={style.label}>End Date</label>
        <DatePicker
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (<div style={{ margin: 10, display: "flex", justifyContent: "center", }}
          >
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {"<"}
            </button>
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value as any)}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {">"}
            </button>
          </div>
          )}
          className={style.dateInput}
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
      </div>
      <Button className={"btn-primary"} onClick={handleFetch} data-testid="fetch-button" label="Fetch Data" />
      <Modal
        data-testid="modal"
        title="Error"
        content="Please select a start and end date."
        isOpen={isModalOpen}
        setModal={setIsModalOpen}
      />
    </>
  );
};

export default DateRangeSelector;
