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

  it.skip('renders the dropdown with available years', async () => {
    const years = ['2021', '2022', '2023', '2024'];
    await act(async () => {
      render(<YearSelector />);
    });
    
    const dropdownToggle = screen.getByRole('button', { name: /select year/i });
    expect(dropdownToggle).toBeInTheDocument();
    
    await waitFor(() => {
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
  
    await act(async () => {
      render(<YearSelector />);
    });
  
    const dropdownToggle = screen.getByRole('button', { name: /select year/i });
    fireEvent.click(dropdownToggle);

    const yearItem = screen.getByText('2023');
    fireEvent.click(yearItem);
  
    await waitFor(() => {
      expect(setStartDate).toHaveBeenCalledWith(new Date('2023-01-01'));
      expect(setEndDate).toHaveBeenCalledWith(new Date('2023-12-31'));
    });
  });
  

  it.skip('does not call setStartDate or setEndDate if no year is selected', async () => {
    await act(async () => {
      render(<YearSelector />);
    });
  
    const dropdownToggle = screen.getByRole('button', { name: /select year/i });
    fireEvent.click(dropdownToggle);
  
    // Simulate no selection (e.g., clicking outside the dropdown, or closing without selecting a year)
    fireEvent.click(document.body);
  
    // Assert that setStartDate and setEndDate are not called
    expect(setStartDate).not.toHaveBeenCalled();
    expect(setEndDate).not.toHaveBeenCalled();
  });
  

  it('handles error when getYears fails', async () => {
    getYears.mockRejectedValueOnce(new Error('Failed to fetch years'));
  
    await act(async () => {
      render(<YearSelector />);
    });
  
    const dropdownToggle = screen.getByRole('button', { name: /select year/i });
    await waitFor(() => {
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
  
    await act(async () => {
      render(<YearSelector />);
    });
  
    const dropdownToggle = screen.getByRole('button', { name: /select year/i });
    fireEvent.click(dropdownToggle);

    const year2021 = screen.getByText('2021');
    fireEvent.click(year2021);
  
    await waitFor(() => {
      expect(setStartDate).toHaveBeenCalledWith(new Date('2021-01-01'));
      expect(setEndDate).toHaveBeenCalledWith(new Date('2021-12-31'));
    });
  
    fireEvent.click(dropdownToggle);
    const year2022 = screen.getByText('2022');
    fireEvent.click(year2022);
  
    await waitFor(() => {
      expect(setStartDate).toHaveBeenCalledWith(new Date('2022-01-01'));
      expect(setEndDate).toHaveBeenCalledWith(new Date('2022-12-31'));
    });
  });
});

describe('YearSelector component', () => {
  it('match the snapshot', () => {
    const { asFragment } = render(<YearSelector />);
    expect(asFragment()).toMatchSnapshot();
  });
});
