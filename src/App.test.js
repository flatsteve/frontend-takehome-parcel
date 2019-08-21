import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "axios";

import App from "./App";
import { act } from "react-dom/test-utils";

afterEach(() => {
  cleanup();
  axiosMock.get.mockReset();
});

it("loads the app in its initial state", () => {
  const { getByText, getByTestId } = render(<App />);

  expect(getByText("Search")).toHaveClass("Nav__link--active");
  expect(getByText("Search Gems")).toBeDisabled();
  expect(getByTestId("empty-state")).toHaveTextContent("Lets get started");
});

it("handles search errors", async () => {
  const { getByPlaceholderText, getByText, getByTestId } = render(<App />);

  fireEvent.change(getByPlaceholderText("e.g. rake"), {
    target: { value: "rake" }
  });

  axiosMock.get.mockRejectedValueOnce(new Error());

  await act(async () => {
    fireEvent.click(getByText("Search Gems"));
  });

  expect(getByTestId("empty-state")).toHaveTextContent("Something went wrong");
});

it("handles no search results", async () => {
  const { getByPlaceholderText, getByText, getByTestId } = render(<App />);

  fireEvent.change(getByPlaceholderText("e.g. rake"), {
    target: { value: "asd" }
  });

  axiosMock.get.mockResolvedValueOnce({ data: [] });

  await act(async () => {
    fireEvent.click(getByText("Search Gems"));
  });

  expect(getByTestId("empty-state")).toHaveTextContent("Oops, no gems found");
});

it("allows the user to search for gems and save them", async () => {
  const { getByPlaceholderText, getByText, getByTestId, debug } = render(
    <App />
  );

  fireEvent.change(getByPlaceholderText("e.g. rake"), {
    target: { value: "rake" }
  });

  expect(getByText("Search Gems")).toBeEnabled();

  axiosMock.get.mockResolvedValueOnce({
    data: [
      { name: "rake", sha: 1 },
      { name: "rake-compiler", sha: 2 },
      { name: "guard-rake", sha: 3 }
    ]
  });

  await act(async () => {
    fireEvent.click(getByText("Search Gems"));
  });

  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  expect(axiosMock.get).toHaveBeenCalledWith(
    "http://localhost:3000/api/v1/search.json?query=rake"
  );

  expect(getByTestId("gems-list").querySelectorAll(".Gem").length).toBe(3);

  // Click on the first save button
  fireEvent.click(getByTestId("gems-list").querySelectorAll(".Button")[0]);

  // The first Gem should now be saved
  expect(
    getByTestId("gems-list").querySelectorAll(".Gem")[0]
  ).toHaveTextContent("Remove");

  expect(getByTestId("my-gems-link")).toHaveTextContent("My Gems (1)");

  fireEvent.click(getByTestId("my-gems-link"));

  expect(getByTestId("gems-list").querySelectorAll(".Gem").length).toBe(1);

  // Remove the saved Gem
  fireEvent.click(getByTestId("gems-list").querySelectorAll(".Button")[0]);

  expect(getByTestId("empty-state")).toHaveTextContent(
    "You don't have any saved gems"
  );
});
