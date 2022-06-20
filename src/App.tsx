import { CircularProgress } from "@mui/material";
import * as React from "react";
import { useAuth } from "./contexts/auth-context";
const AuthenticatedApp = React.lazy(
  () => import("./pages/authenticated/authenticated-app")
);
const UnauthenticatedApp = React.lazy(
  () => import("./pages/unauthenticated/unauthenticated-app")
);
/**
 * The overall structure centers around authenticated/unauthenticated
 * components which renders based on a user token. The token is required
 * in a global scope which leads to the creation of a auth context.
 * A router could be introduced as the application grows and requires
 * an instant path to a component, like a historic result, but right now
 * I would go with this approach, first suggested to me by Kent C. Dodds
 * in one of his tech talks.
 *
 * Shared components are stored in components repo. The hook form components
 * Should get a repo of their own. I created a style repo because the CSS in JS
 * approach I would like would incorporate shared colors and features.
 *
 * All the pages are stored in pages repo and could be divided into a auth/unauth subpreo
 * utils could be expanded with more helper functions. Helper function should be structured
 * according to area of use.
 *
 * I recently read an article about screaming structure, the overall idea being
 * that the repos should explicitly tell the service provided. When the repo grows
 * I'd look into that to seperate contexts etc. according to role in the app.
 */
function App() {
  const { user } = useAuth();
  return (
    <React.Suspense fallback={<CircularProgress />}>
      {user?.user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

export { App };
