import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { useStore } from "@store/ContextStore";
import { getYears } from "@utils/utils";
import YearSelector from "@components/YearSelector";

jest.mock("@store/ContextStore", () => ({
  useStore: jest.fn(),
}));

jest.mock("@utils/utils", () => ({
  getYears: jest.fn(),
}));

describe("YearSelector Component", () => {
  let mockSetSelectedYear;

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {}); 
    mockSetSelectedYear = jest.fn();
    useStore.mockReturnValue({
      selectedYear: "2023",
      setSelectedYear: mockSetSelectedYear,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  

  it("renders the YearSelector component", async () => {
    await act(async () => {
      render(<YearSelector />);
    });
    expect(screen.getByTestId("year-selector")).toBeInTheDocument();
    expect(screen.getByLabelText(/choose a year:/i)).toBeInTheDocument();
  });

  it("fetches and displays years", async () => {
    getYears.mockResolvedValue(["2020", "2021", "2022", "2023"]);
    await act(async () => {
      render(<YearSelector />);
    });

    await waitFor(() => {
      expect(screen.getByText("2020")).toBeInTheDocument();
      expect(screen.getByText("2021")).toBeInTheDocument();
      expect(screen.getByText("2022")).toBeInTheDocument();
      expect(screen.getByText("2023")).toBeInTheDocument();
    });
  });

  it("handles year selection", async () => {
    await act(async () => {
      render(<YearSelector />);
    });
    const select = screen.getByLabelText(/choose a year:/i);
    await act(async () => {
      fireEvent.change(select, { target: { value: "2022" } });
    });
    expect(mockSetSelectedYear).toHaveBeenCalledWith("2022");
  });

  it("handles API failure gracefully", async () => {
    getYears.mockRejectedValue(new Error("Failed to fetch years"));
    await act(async () => {
      render(<YearSelector />);
    });
    await waitFor(() => {
      expect(screen.queryByText("2020")).not.toBeInTheDocument();
    });
  });
});
