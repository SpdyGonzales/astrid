import { App } from "./App";
import { render } from "@testing-library/react";

describe("renders correct component with and without auth", () => {
  render(App());
});
