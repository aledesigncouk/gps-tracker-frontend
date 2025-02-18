import { render, screen, fireEvent } from '@testing-library/react';
import DateRangeSelector from '@components/DateRangeSelector';
import { useRangeDatesStore } from '@store/ContextRangeDates';

jest.mock('@store/ContextRangeDates', () => ({
  useRangeDatesStore: jest.fn(),
}));

describe('DateRangeSelector component', () => {
  const setStartDate = jest.fn();
  const setEndDate = jest.fn();

  beforeEach(() => {
    useRangeDatesStore.mockReturnValue({
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-12-31'),
      setStartDate,
      setEndDate,
    });

    render(<DateRangeSelector />);
  });

  it('renders the DateRangeSelector component', () => {
    const startDateInput = screen.getByTestId('startDate-input');
    const endDateInput = screen.getByTestId('endDate-input');

    expect(startDateInput).toBeInTheDocument();
    expect(endDateInput).toBeInTheDocument();
  });

  it('renders the Start Date label correctly', () => {
    const startDateLabel = screen.getByText('Start Date');
    expect(startDateLabel).toBeInTheDocument();
  });

  it('renders the End Date label correctly', () => {
    const endDateLabel = screen.getByText('End Date');
    expect(endDateLabel).toBeInTheDocument();
  });

  it.skip('fires the setStartDate function when the start date is changed', () => {
    const startDateInput = screen.getByTestId('startDate-input');

    fireEvent.change(startDateInput, { target: { value: '10 / 10 / 2023' } });

    expect(setStartDate).toHaveBeenCalledWith(new Date('2023-10-10'));
  });

  it('fires the setEndDate function when the end date is changed', () => {
    const endDateInput = screen.getByTestId('endDate-input');

    fireEvent.change(endDateInput, { target: { value: '25 / 12 / 2023' } });

    expect(setEndDate).toHaveBeenCalledWith(new Date('2023-12-25'));
  });

  it.skip('disables the End Date input if no Start Date is selected', () => {
    // modal warning test
    useRangeDatesStore.mockReturnValue({
      startDate: null,
      endDate: new Date('2023-12-31'),
      setStartDate,
      setEndDate,
    });

    render(<DateRangeSelector />);

    const endDateInput = screen.getByTestId('endDate-input');
    expect(endDateInput).toBeDisabled();
  });

  it.skip('displays the correct year and month in the custom header', () => {
    const customHeader = screen.getByText('January'); // Start of year date
    expect(customHeader).toBeInTheDocument();
  });

  it.skip('changes the month when clicking the month navigation buttons', () => {
    const prevMonthButton = screen.getByText('<');
    const nextMonthButton = screen.getByText('>');

    fireEvent.click(prevMonthButton);
    fireEvent.click(nextMonthButton);

    expect(prevMonthButton).toBeInTheDocument();
    expect(nextMonthButton).toBeInTheDocument();
  });
});
