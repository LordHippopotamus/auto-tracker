import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  LoaderFunction,
  Outlet,
  redirect,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import Navigation from "./Navigation";
import { LoaderData } from "../types/LoaderData";

export const action = async () => {
  sessionStorage.removeItem("user");
  return redirect("login");
};

export const loader = (() => {
  const storageUser = sessionStorage.getItem("user");
  const user = storageUser ? JSON.parse(storageUser) : null;
  return { user };
}) satisfies LoaderFunction;

const Root = () => {
  const { user } = useLoaderData() as LoaderData<typeof loader>;
  const location = useLocation();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {location.pathname !== "/login" && <Navigation user={user} />}
      <Outlet />
    </ThemeProvider>
  );
};

export default Root;
