import { test, expect, describe } from "bun:test";
import { screen, render } from "@testing-library/react";
import { DummyBox } from "./DummyBox";

describe("DummyBox Component", () => {
  test("Can use DummyBox", () => {
    render(<DummyBox />);
    const dummyComponent = screen.getByTestId("dummy-area");
    expect(dummyComponent).toBeInTheDocument();
  });
});
