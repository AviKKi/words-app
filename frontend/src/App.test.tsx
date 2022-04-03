import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import API from "./api";
import App from "./App";
import { Word } from "./hooks/useWords";
import exp from "constants";
import userEvent from "@testing-library/user-event";

let words: Word[] = [{ _id: "1", word: "Apple" }];
const mockAPI = {
  list: API.list as jest.MockedFunction<typeof API.list>,
  create: API.create as jest.MockedFunction<typeof API.create>,
  delete: API.delete as jest.MockedFunction<typeof API.delete>,
  update: API.update as jest.MockedFunction<typeof API.update>,
};
// count of element in the array
let mockCount = 1;
jest.mock("./api");

beforeEach(() => {
  mockAPI.list.mockImplementation(async () => words);
  mockAPI.delete.mockImplementation(async (id: string) => {});
  mockAPI.create.mockImplementation(async (word: string) => ({
    word,
    _id: String(mockCount++),
  }));
});

test("renders add button", async () => {
  render(<App />);
  const addButton = screen.getByText(/add/i);
  expect(addButton).toBeInTheDocument();
  await screen.findByTestId("spinner");
  await waitForElementToBeRemoved(() => screen.queryByTestId(/spinner/i));
});

test("list is rendered correctly", async () => {
  render(<App />);
  await waitForElementToBeRemoved(() => screen.queryByTestId(/spinner/i));
  const input: HTMLInputElement = screen.getByDisplayValue(/apple/i);
  expect(input).toBeDefined();
  expect(input.value).toContain("Apple");
});

test("Add a new element is working", async () => {
  render(<App />);
  await waitForElementToBeRemoved(() => screen.queryByTestId(/spinner/i));
  const input: HTMLInputElement = screen.getByPlaceholderText(/enter a word/i);
  fireEvent.change(input, { target: { value: "Grapes" } });
  const button = screen.getByRole('button', {name: /add/i})
  fireEvent.click(button)
  await screen.findByDisplayValue(/grapes/i)
});

