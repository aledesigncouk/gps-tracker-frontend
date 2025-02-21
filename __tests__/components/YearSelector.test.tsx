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
    render(<YearSelector />);

    await waitFor(() => {
      expect(screen.getByTestId('year-selector')).toBeInTheDocument;
    });
  });

  it('renders the dropdown with available years', async () => {
    const years = ['2021', '2022', '2023', '2024'];

    render(<YearSelector />);

    await waitFor(() => {
      const dropdownToggle = screen.getByRole('button', { name: /select year/i });
      fireEvent.click(dropdownToggle);

      years.forEach(year => {
        expect(screen.getByText(year)).toBeInTheDocument();
      });
    });
  });

  it('fires setStartDate and setEndDate functions when a year is selected', async () => {
    setRangeByYear.mockReturnValue({
      startDate: '2023-01-01',
      endDate: '2023-12-31',
    });

    render(<YearSelector />);

    await waitFor(() => {
      const dropdownToggle = screen.getByRole('button', { name: /select year/i });
      fireEvent.click(dropdownToggle);

      const yearItem = screen.getByText('2023');
      fireEvent.click(yearItem);

      expect(setStartDate).toHaveBeenCalledWith(new Date('2023-01-01'));
      expect(setEndDate).toHaveBeenCalledWith(new Date('2023-12-31'));
    });
  });

  it('does not call setStartDate or setEndDate if no year is selected', async () => {

    render(<YearSelector />);

    await waitFor(() => {
      const dropdownToggle = screen.getByRole('button', { name: /select year/i });
      fireEvent.click(dropdownToggle);
      fireEvent.click(document.body);

      expect(setStartDate).not.toHaveBeenCalled();
      expect(setEndDate).not.toHaveBeenCalled();
    });
  });

  it('handles error when getYears fails', async () => {
    getYears.mockRejectedValueOnce(new Error('Failed to fetch years'));

    render(<YearSelector />);

    await waitFor(() => {
      const dropdownToggle = screen.getByRole('button', { name: /select year/i });
      expect(dropdownToggle).toHaveTextContent('Select year');
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

    render(<YearSelector />);

    await waitFor(() => {
      const dropdownToggle = screen.getByRole('button', { name: /select year/i });
      fireEvent.click(dropdownToggle);

      const year2021 = screen.getByText('2021');
      fireEvent.click(year2021);

      expect(setStartDate).toHaveBeenCalledWith(new Date('2021-01-01'));
      expect(setEndDate).toHaveBeenCalledWith(new Date('2021-12-31'));

      const year2022 = screen.getByText('2022');
      fireEvent.click(year2022);

      expect(setStartDate).toHaveBeenCalledWith(new Date('2022-01-01'));
      expect(setEndDate).toHaveBeenCalledWith(new Date('2022-12-31'));

    })

  });
});

describe('YearSelector component', () => {
  it('match the snapshot', async () => {
    await waitFor(() => {
      const { asFragment } = render(<YearSelector />);
      expect(asFragment()).toMatchSnapshot();
    })
  });
});
