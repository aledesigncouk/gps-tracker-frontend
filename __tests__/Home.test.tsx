import { act, render, screen } from "@testing-library/react";
import Home from "@pages/index";
import StoreProvider from "@store/ContextStore";

describe("Home Page", () => {
  it("renders a heading", async () => {
    await act(async () => {
      render(
        <StoreProvider>
          <Home />
        </StoreProvider>
      );
    });
    const heading = await screen.getByRole("heading", {
      name: /welcome to next\.js/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
