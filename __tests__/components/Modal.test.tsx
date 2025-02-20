import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "@components/Modal";

describe("Modal Component", () => {
  let mockSetModal;

  beforeEach(() => {
    mockSetModal = jest.fn();
    jest.clearAllMocks();
  });

  it("renders the modal when isOpen is true", () => {
    render(<Modal title="Test Title" content="Test Content" isOpen={true} setModal={mockSetModal} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  it("does not render the modal when isOpen is false", () => {
    render(<Modal title="Test Title" content="Test Content" isOpen={false} setModal={mockSetModal} />);
    expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
  });

  it("calls setModal when the close button is clicked", () => {
    render(<Modal title="Test Title" content="Test Content" isOpen={true} setModal={mockSetModal} />);
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    expect(mockSetModal).toHaveBeenCalledWith(false);
  });

  it("calls setModal when the overlay is clicked", () => {
    render(<Modal title="Test Title" content="Test Content" isOpen={true} setModal={mockSetModal} />);
    const overlay = screen.getByText("Test Content").closest("div");
    fireEvent.click(overlay);
    expect(mockSetModal).toHaveBeenCalledWith(false);
  });
});

describe('Modal component ', () => {
  let mockSetModal;
  it('match the snapshot', () => {
    const { asFragment } = render(<Modal title="Test Title" content="Test Content" isOpen={true} setModal={mockSetModal} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

