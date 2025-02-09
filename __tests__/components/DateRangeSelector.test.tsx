import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useStore } from "@store/ContextStore";
import DateRangeSelector from "@components/DateRangeSelector";

jest.mock("@store/ContextStore", () => ({
  useStore: jest.fn(),
}));

describe("DateRangeSelector Component", () => {
  let mockSetStartDate, mockSetEndDate, mockSetRunFetchData;

  beforeEach(() => {
    mockSetStartDate = jest.fn();
    mockSetEndDate = jest.fn();
    mockSetRunFetchData = jest.fn();

    (useStore as jest.Mock).mockReturnValue({
      startDate: null,
      setStartDate: mockSetStartDate,
      endDate: null,
      setEndDate: mockSetEndDate,
      setRunFetchData: mockSetRunFetchData,
    });
  });

  it("renders date pickers and button", () => {
    render(<DateRangeSelector />);

    expect(screen.getByTestId("start-date")).toBeInTheDocument();
    expect(screen.getByTestId("end-date")).toBeInTheDocument();
    expect(screen.getByTestId("fetch-button")).toBeInTheDocument();
  });

  it("calls setStartDate when selecting a start date", () => {
    render(<DateRangeSelector />);
    const startDateInput = screen.getByTestId("start-date");
    
    fireEvent.change(startDateInput, { target: { value: "01 / 01 / 2024" } });
    expect(mockSetStartDate).toHaveBeenCalled();
  });

  it("calls setEndDate when selecting an end date", () => {
    render(<DateRangeSelector />);
    const endDateInput = screen.getByTestId("end-date");
    
    fireEvent.change(endDateInput, { target: { value: "05 / 01 / 2024" } });
    expect(mockSetEndDate).toHaveBeenCalled();
  });

  it("triggers fetch when clicking the button", () => {
    render(<DateRangeSelector />);
    const fetchButton = screen.getByTestId("fetch-button");
    
    fireEvent.click(fetchButton);
    expect(mockSetRunFetchData).toHaveBeenCalledWith(true);
  });
});
