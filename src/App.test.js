import { render, screen } from "@testing-library/react";
import App from "./App";
import GlobalStyles from "";
test("renders learn react link", () => {
  render(
    <GlobalStyles>
      <App />
    </GlobalStyles>
  );
});
