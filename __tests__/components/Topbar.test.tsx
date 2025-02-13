import React from "react";
import { render, screen } from "@testing-library/react";
import { useControlSwitchStore } from "@store/ControlSwitchContext";
import { ControlSwitchEnum } from "@enums/enums";
import Topbar from "@components/Topbar";
import userEvent from "@testing-library/user-event";

jest.mock("@store/ControlSwitchContext", () => ({
  useControlSwitchStore: jest.fn(),
}));

jest.mock("@components/YearSelector", () => () => <div data-testid="year-selector">YearSelector</div>);
jest.mock("@components/ControlSwitch", () => ({ onToggle }) => (
  <button data-testid="control-switch" onClick={() => onToggle(ControlSwitchEnum.YEAR)}>
    ControlSwitch
  </button>
));
jest.mock("@/components/DateRangeSelector", () => () => <div data-testid="date-range-selector">DateRangeSelector</div>);

describe("Topbar Component", () => {
  let mockSetControlSwitch;

  beforeEach(() => {
    mockSetControlSwitch = jest.fn();

    (useControlSwitchStore as jest.Mock).mockReturnValue({
      controlSwitch: ControlSwitchEnum.RANGE,
      setControlSwitch: mockSetControlSwitch,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Topbar with ControlSwitch", () => {
    (useControlSwitchStore as jest.Mock).mockReturnValue({ controlSwitch: ControlSwitchEnum.RANGE, setControlSwitch: mockSetControlSwitch });
    render(<Topbar />);
    expect(screen.getByTestId("topbar")).toBeInTheDocument();
    expect(screen.getByTestId("control-switch")).toBeInTheDocument();
  });

  it("renders DateRangeSelector when controlSwitch is RANGE", () => {
    (useControlSwitchStore as jest.Mock).mockReturnValue({ controlSwitch: ControlSwitchEnum.RANGE, setControlSwitch: mockSetControlSwitch });
    render(<Topbar />);
    expect(screen.getByTestId("date-range-selector")).toBeInTheDocument();
    expect(screen.queryByTestId("year-selector")).not.toBeInTheDocument();
  });

  it("renders YearSelector when controlSwitch is YEAR", () => {
    (useControlSwitchStore as jest.Mock).mockReturnValue({ controlSwitch: ControlSwitchEnum.YEAR, setControlSwitch: mockSetControlSwitch });
    render(<Topbar />);
    expect(screen.getByTestId("year-selector")).toBeInTheDocument();
    expect(screen.queryByTestId("date-range-selector")).not.toBeInTheDocument();
  });

  it("toggles controlSwitch when ControlSwitch is clicked", async () => {
    (useControlSwitchStore as jest.Mock).mockReturnValue({ controlSwitch: ControlSwitchEnum.RANGE, setControlSwitch: mockSetControlSwitch });
    render(<Topbar />);

    const controlSwitchButton = screen.getByTestId("control-switch");
    await userEvent.click(controlSwitchButton);

    expect(mockSetControlSwitch).toHaveBeenCalledWith(ControlSwitchEnum.YEAR);
  });
});
