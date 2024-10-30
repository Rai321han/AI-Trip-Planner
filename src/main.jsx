import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./create-trip/index.jsx";

import { Toaster } from "./components/ui/toaster.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./view-trip/[tripId]/index.jsx";

import Layout from "./components/Layout/Layout.jsx";
import Usercontext from "./contexts/Usercontext.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import NotFound from "./components/NotFound.jsx";
import MyTrips from "./components/MyTrips/MyTrips.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        path: "/",
        element: <App />,
      },
      {
        path: "/create-trip",
        element: <CreateTrip />,
      },

      {
        path: "/view-trip/:tripId",
        element: (
          <ProtectedRoutes>
            <ViewTrip />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/my-trips",
        element: (
          <ProtectedRoutes>
            <MyTrips />
          </ProtectedRoutes>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Usercontext>
        <RouterProvider router={router}></RouterProvider>
      </Usercontext>

      <Toaster />
    </GoogleOAuthProvider>
  </StrictMode>
);
