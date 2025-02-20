import { render, screen, within } from '@testing-library/react';
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
    const topbar = screen.queryByTestId('topbar');
    const dateRangeSelector = within(topbar).queryByTestId('date-range-selector');
    expect(dateRangeSelector).toBeInTheDocument();
  });

  it('renders the YearSelector component', () => {
    const topbar = screen.queryByTestId('topbar');
    const yearSelector = within(topbar).queryByTestId('year-selector');
    expect(yearSelector).toBeInTheDocument();
  });
});

describe('Topbar component', () => {
  it('match the snapshot', () => {
    const { asFragment } = render(<Topbar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
