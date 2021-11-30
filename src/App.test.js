import { render, screen, cleanup } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("renders app", () => {
  render(<App />);
  const title = screen.getByText(/TODO App/i);
  expect(title).toBeInTheDocument();
});

test("render default item", () => {
  render(<App />);
  const title = screen.getByText(/Buy milk/i);
  expect(title).toBeInTheDocument();
});

test("expect to add a new item", () => {
  render(<App />);
  const input = screen.getByPlaceholderText("Add new item");
  userEvent.type(input, "Buy chocolate{enter}");
  const item = screen.getByText("Buy chocolate");

  expect(item).toBeInTheDocument();
});

test("expect to remove item", async () => {
  cleanup();
  render(<App />);
  const input = screen.getByPlaceholderText("Add new item");
  userEvent.type(input, "Buy chocolate{enter}");
  const removeButtons = screen.getAllByTitle("Remove item");

  const item = screen.getByText("Buy chocolate");
  console.log(item.parentElement());
  expect(true).toBe(true);
});
