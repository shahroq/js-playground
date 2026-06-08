import { describe, expect, it, test } from "bun:test";
import { screen, render } from "@testing-library/react";
import { DummyBox } from "./DummyBox";

describe("DummyBox Component", () => {
  // screen.debug syntax
  test.skip("screen.debug()", () => {
    render(<DummyBox />);
    screen.debug();
  });

  // get container
  test.skip("container", () => {
    const { container } = render(<DummyBox />);
    const comp = container.querySelector(".dummy-area");
    expect(comp).toBeInTheDocument();
  });

  it("should render component", () => {
    render(<DummyBox />);
    const comp = screen.getByTestId("dummy-area");
    expect(comp).toBeInTheDocument();
    expect(comp).toHaveClass(/dummy-area/);
  });

  it("can pass className to component", () => {
    render(<DummyBox className="mb-5" />);
    expect(screen.getByTestId("dummy-area")).toHaveClass(/mb-5/);
  });

  it("can pass children to component", () => {
    render(<DummyBox>Dummy Content</DummyBox>);
    expect(screen.getByTestId("dummy-area")).toHaveTextContent(/content/i);
  });
});
