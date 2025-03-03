import React from "react";
import { getMonth, getYear } from 'date-fns';
import range from "lodash/range";
import DatePicker from "react-datepicker";
import { useRangeDatesStore } from "@store/ContextRangeDates";
import { Row, Col } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";

const DateRangeSelector = () => {

  const { startDate, endDate, setStartDate, setEndDate } = useRangeDatesStore();

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
    <Row className="g-3">
      <Col xs={12} sm={5}>
        <label className="startDate-label">Start Date</label>
        <DatePicker
          data-testid="startDate-picker"
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
          className="startDate-picker-input col-12"
          customInput={<input data-testid="startDate-input" type="text" />}
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat={"dd / MM / yyyy"}
          withPortal
        />
      </Col>

      <Col xs={12} sm={5}>
        <label className="endDate-label">End Date</label>
        <DatePicker
          data-testid="endDate-picker"
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
          className="enddate-picker-input col-12"
          customInput={<input data-testid="endDate-input" type="text" />}
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat={"dd / MM / yyyy"}
          withPortal
        />
      </Col>
    </Row>
  );
};

export default DateRangeSelector;
