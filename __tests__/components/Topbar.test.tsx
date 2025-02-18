import { render, screen } from '@testing-library/react';
import Topbar from '@components/Topbar';

jest.mock('@components/YearSelector', () => () => <div data-testid="year-selector">Year Selector</div>);
jest.mock('@components/DateRangeSelector', () => () => <div data-testid="date-range-selector">Date Range Selector</div>);

describe('Topbar component', () => {

  beforeEach(() => {
    render(<Topbar />);
  });

  it('renders without crashing', () => {
    const topbar = screen.queryByTestId('topbar');
    expect(topbar).toBeInTheDocument();
  });

  it('renders the DateRangeSelector component', () => {
    const dateRangeSelector = screen.queryByTestId('date-range-selector');
    expect(dateRangeSelector).toBeInTheDocument();
    expect(dateRangeSelector).toHaveTextContent('Date Range Selector');
  });

  it('renders the YearSelector component', () => {
    const yearSelector = screen.queryByTestId('year-selector');
    expect(yearSelector).toBeInTheDocument();
    expect(yearSelector).toHaveTextContent('Year Selector');
  });
});
