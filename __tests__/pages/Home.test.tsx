import { act, render, screen } from "@testing-library/react";
import Home from "@pages/index";
import { RangeDatesContextStore }  from "@store/ContextRangeDates";

describe("Home Page", () => {
  it("renders the main component", async () => {
    await act(async () => {
      render(
        <RangeDatesContextStore>
          <Home />
        </RangeDatesContextStore>
      );
    });
    const home = await screen.getByTestId("main");
    expect(home).toBeInTheDocument();
  });
});
