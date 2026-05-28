import { describe, expect, it, vi } from "bun:test";
import { screen, render, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button Component", () => {
  it("should render component", () => {
    render(<Button>Btn</Button>);
    const comp = screen.getByTestId("btn");
    expect(comp).toBeInTheDocument();
    expect(comp).toHaveClass(/btn/);
  });

  it("uses btn-primary as default when no className is provided", () => {
    render(<Button>Btn</Button>);
    expect(screen.getByTestId("btn")).toHaveClass("btn", "btn-primary");
  });

  it("can pass className to component", () => {
    render(<Button className="btn-danger">Btn</Button>);
    expect(screen.getByTestId("btn")).toHaveClass(/btn-danger/);
  });

  it("can pass component to component", () => {
    render(
      <Button as="a" href="#test">
        link
      </Button>,
    );
    const link = screen.getByTestId("btn");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("role", "link");
  });

  it("shows spinner when loading is true", () => {
    render(<Button loading>Loading</Button>);
    screen.debug();
    const btn = screen.getByTestId("btn");
    expect(btn).toBeDisabled();

    // check spinner: option 1
    const spinner = btn.querySelector("span.spinner");
    expect(spinner).toBeInTheDocument();

    // check spinner: option 2
    expect(btn.firstChild).toHaveClass("spinner");
  });

  it("calls onClick handler", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    fireEvent.click(screen.getByTestId("btn"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
