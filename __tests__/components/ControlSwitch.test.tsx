import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useControlSwitchStore } from "@store/ControlSwitchContext";
import { ControlSwitchEnum } from "@enums/enums";
import ControlSwitch from "@components/ControlSwitch";

jest.mock("@store/ControlSwitchContext", () => ({
  useControlSwitchStore: jest.fn(),
}));

describe("ControlSwitch Component", () => {
  let mockSetControlSwitch;
  let mockOnToggle;

  beforeEach(() => {
    mockSetControlSwitch = jest.fn();
    mockOnToggle = jest.fn();

    (useControlSwitchStore as jest.Mock).mockReturnValue({
      controlSwitch: ControlSwitchEnum.RANGE,
      setControlSwitch: mockSetControlSwitch,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the switch component", () => {
    render(<ControlSwitch onToggle={mockOnToggle} />);
    expect(screen.getByTestId("control-switch")).toBeInTheDocument();
    expect(screen.getByTestId("switch-btn")).toBeInTheDocument();
  });

  it("toggles switch state on click", () => {
    render(<ControlSwitch onToggle={mockOnToggle} />);
    const switchButton = screen.getByTestId("switch-btn");

    fireEvent.click(switchButton);
    expect(mockSetControlSwitch).toHaveBeenCalledWith(ControlSwitchEnum.YEAR);
    expect(mockOnToggle).toHaveBeenCalledWith(ControlSwitchEnum.YEAR);
  });

  it("toggles switch state back on second click", () => {
    (useControlSwitchStore as jest.Mock).mockReturnValue({
      controlSwitch: ControlSwitchEnum.YEAR,
      setControlSwitch: mockSetControlSwitch,
    });

    render(<ControlSwitch onToggle={mockOnToggle} />);
    const switchButton = screen.getByTestId("switch-btn");

    fireEvent.click(switchButton);
    expect(mockSetControlSwitch).toHaveBeenCalledWith(ControlSwitchEnum.RANGE);
    expect(mockOnToggle).toHaveBeenCalledWith(ControlSwitchEnum.RANGE);
  });
});
