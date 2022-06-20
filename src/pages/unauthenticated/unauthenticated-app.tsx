import * as React from "react";
import Challenge from "./components/challenge/challenge";
import Login from "./components/login";
/**
 * UnauthenticatedApp and AuthenticatedApp seems may seem unnecessary
 * at this stage but it would be good practice if we wanted to add future
 * content --> Register etc.
 */
function UnauthenticatedApp() {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  return id ? <Challenge id={id} /> : <Login />;
}

export default UnauthenticatedApp;
