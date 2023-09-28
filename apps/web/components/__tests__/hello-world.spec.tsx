import { it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { HelloWorld } from "../hello-world";

const mockAction = vi.fn();

it("should render", () => {
  render(<HelloWorld action={mockAction} />);
  expect(screen.getByText("Hello World!")).toBeDefined();
});

it("should click", async () => {
  const user = userEvent.setup();
  render(<HelloWorld action={mockAction} />);
  await user.click(screen.getByRole("button"));
  expect(mockAction).toHaveBeenCalled();
});
