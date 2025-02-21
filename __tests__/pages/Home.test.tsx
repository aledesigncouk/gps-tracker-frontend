import { act, render, screen, waitFor } from "@testing-library/react";
import Home from "@pages/index";
import { useRangeDatesStore } from '@store/ContextRangeDates';

jest.mock('@store/ContextRangeDates', () => ({
  useRangeDatesStore: jest.fn(),
}));
describe("Home Page", () => {
  const setStartDate = jest.fn();
  const setEndDate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useRangeDatesStore.mockReturnValue({
      setStartDate,
      setEndDate,
    });
  });

  it("renders the main component", async () => {
    render(<Home />);

    await waitFor(() => {
      const home = screen.getByTestId("main");
      expect(home).toBeInTheDocument();
    })
  });
});

describe('Home component', () => {
  it('match the snapshot', async () => {
    await waitFor(() => {
      const { asFragment } = render(<Home />);
      expect(asFragment()).toMatchSnapshot();
    })
  })
});
