import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { App } from "./App";
import { AuthProvider } from "./contexts/auth-context";
const queryClient = new QueryClient();
/**
 * Work process and priorities:
 * Overall data structure is key in my opinion and therefore I started
 * with the database modelling. Coming from a mainly postgres background
 * I took my time to study best practices for mongodb 2022. I then started
 * modelling, implemented an api to communicate and connected postman for
 * easy testing.
 * After that I started with the state management and chose react query which
 * helps you with the global state management. Together with a context it's
 * often sufficient.
 * Last thing I prioritised was overall design. I'm not saying it's not important
 * but the backend is the beating heart of an application and ensures services
 * running longterm. For an example I prioritised error handling all over the app,
 * while presenting it to the user had to come second.
 * 3rd party APIs are routed through a selfmaintained server. I consider that
 * important both for security and convenience. With everything going through
 * my own backend I have several advantages: Change and add data sources without
 * changing frontend, I can also map different data sources together instead of
 * doing it frontend. When the data is fetched it's ready to be rendered.
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
