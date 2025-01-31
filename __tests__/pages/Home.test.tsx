import { act, render, screen } from "@testing-library/react";
import Home from "@pages/index";
import StoreProvider from "@store/ContextStore";

describe("Home Page", () => {
  it("renders the main component", async () => {
    await act(async () => {
      render(
        <StoreProvider>
          <Home />
        </StoreProvider>
      );
    });
    const home = await screen.getByTestId("ain");
    expect(home).toBeInTheDocument();
  });
});
