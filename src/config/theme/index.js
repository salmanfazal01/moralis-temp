import { createTheme as muiCreateTheme } from "@mui/material";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";

const themeMap = {
  light: lightTheme,
  dark: darkTheme,
};

export function createTheme(theme) {
  return muiCreateTheme(themeMap[theme]);
}
