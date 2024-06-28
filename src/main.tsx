import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Root, { loader as rootLoader } from "./routes/root";
import Index from "./routes";
import Login, { action as loginAction } from "./routes/login";
import Devices, { loader as devicesLoader } from "./routes/devices";
import ErrorPage from "./routes/error-page";

const router = createBrowserRouter([
  {
    path: "/",
    loader: rootLoader,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "devices",
        element: <Devices />,
        loader: devicesLoader,
      },
      {
        path: "login",
        element: <Login />,
        errorElement: <Login />,
        action: loginAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
