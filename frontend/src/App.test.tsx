import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import API from "./api";
import App from "./App";
import { Word } from "./hooks/useWords";

let words: Word[] = [{ _id: "1", word: "Apple" }];
const mockAPI = {
  list: API.list as jest.MockedFunction<typeof API.list>
}

jest.mock("./api");

beforeEach(() => {
  mockAPI.list.mockImplementation(async () => words);
});

test("renders add button", async () => {
  render(<App />);
  const addButton = screen.getByText(/add/i);
  expect(addButton).toBeInTheDocument();
  await screen.findByTestId("spinner");
  await waitForElementToBeRemoved(() => screen.queryByTestId(/spinner/i));
});
