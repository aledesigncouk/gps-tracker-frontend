import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import YearSelector from '@components/YearSelector';
import { useRangeDatesStore } from '@store/ContextRangeDates';
import { getYears, setRangeByYear } from '@utils/utils';

jest.mock('@store/ContextRangeDates', () => ({
  useRangeDatesStore: jest.fn(),
}));

jest.mock('@utils/utils', () => ({
  getYears: jest.fn(),
  setRangeByYear: jest.fn(),
}));

describe('YearSelector component', () => {
  const setStartDate = jest.fn();
  const setEndDate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useRangeDatesStore.mockReturnValue({
      setStartDate,
      setEndDate,
    });

    getYears.mockResolvedValue(['2021', '2022', '2023', '2024']);
  });

  it('renders the YearSelector component', async () => {
    await act(async () => {
      render(<YearSelector />);
    });
    const yearSelector = screen.getByTestId('year-selector');
    expect(yearSelector).toBeInTheDocument();
  });

  it('renders the dropdown with available years', async () => {
    await act(async () => {
      render(<YearSelector />);
    });
    const yearDropdown = screen.getByTestId('year-selector').querySelector('select');

    await waitFor(() => {
      expect(yearDropdown).toHaveTextContent('2021');
      expect(yearDropdown).toHaveTextContent('2022');
      expect(yearDropdown).toHaveTextContent('2023');
      expect(yearDropdown).toHaveTextContent('2024');
    });
  });

  it('fires setStartDate and setEndDate functions when a year is selected', async () => {
    setRangeByYear.mockReturnValue({
      startDate: '2023-01-01',
      endDate: '2023-12-31',
    });

    await act(async () => {
      render(<YearSelector />);
    });
    const yearDropdown = screen.getByTestId('year-selector').querySelector('select');

    await waitFor(() => expect(yearDropdown).toHaveTextContent('2021'));

    await act(async () => {
      fireEvent.change(yearDropdown, { target: { value: '2023' } });
    });

    await waitFor(() => {
      expect(setStartDate).toHaveBeenCalledWith(new Date('2023-01-01'));
      expect(setEndDate).toHaveBeenCalledWith(new Date('2023-12-31'));
    });
  });

  it.skip('does not call setStartDate or setEndDate if an empty value is selected', async () => {
    await act(async () => {
      render(<YearSelector />);
    });
    const yearDropdown = screen.getByTestId('year-selector').querySelector('select');

    await waitFor(() => expect(yearDropdown).toHaveTextContent('2021'));

    await act(async () => {
      fireEvent.change(yearDropdown, { target: { value: 'empty' } });
    });

    expect(setStartDate).not.toHaveBeenCalled();
    expect(setEndDate).not.toHaveBeenCalled();
  });

  it('handles error when getYears fails', async () => {
    getYears.mockRejectedValueOnce(new Error('Failed to fetch years'));

    await act(async () => {
      render(<YearSelector />);
    });

    const yearDropdown = screen.getByTestId('year-selector').querySelector('select');

    await waitFor(() => {
      expect(yearDropdown).toHaveTextContent('Select year');
    });
  });

  it('fires setStartDate and setEndDate with expected values when a different year is selected', async () => {
    setRangeByYear.mockReturnValueOnce({
      startDate: '2021-01-01',
      endDate: '2021-12-31',
    });
    setRangeByYear.mockReturnValueOnce({
      startDate: '2022-01-01',
      endDate: '2022-12-31',
    });

    await act(async () => {
      render(<YearSelector />);
    });
    const yearDropdown = screen.getByTestId('year-selector').querySelector('select');

    await waitFor(() => expect(yearDropdown).toHaveTextContent('2021'));

    await act(async () => {
      fireEvent.change(yearDropdown, { target: { value: '2021' } });
    });
    await waitFor(() => {
      expect(setStartDate).toHaveBeenCalledWith(new Date('2021-01-01'));
      expect(setEndDate).toHaveBeenCalledWith(new Date('2021-12-31'));
    });

    await act(async () => {
      fireEvent.change(yearDropdown, { target: { value: '2022' } });
    });
    await waitFor(() => {
      expect(setStartDate).toHaveBeenCalledWith(new Date('2022-01-01'));
      expect(setEndDate).toHaveBeenCalledWith(new Date('2022-12-31'));
    });
  });
});
