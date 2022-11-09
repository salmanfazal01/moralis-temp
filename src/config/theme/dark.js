import { grey } from "@mui/material/colors";
import typography from "./typography";
import breakpoints from "./breakpoints";
import components from "./components";

export const darkTheme = {
  palette: {
    mode: "dark",
    primary: {
      main: "#1AAB9B",
      invert: "#425466",
    },
    grey: {
      grey1: "#24252A",
      grey2: grey[800],
      grey3: grey[700],
      grey4: grey[600],
      grey5: grey[500],
      grey6: grey[400],
      grey7: grey[300],
      grey8: grey[200],
      grey9: grey[100],
    },
    text: {
      primary: "#FFF",
      title: "#FFF",
      invert: "#425466",
    },
    background: {
      default: "#1A1B1F",
      main: "#2F3237",
      dark: "#333333",
      paper: "rgba(46,48,53,1)",
      gradient1:
        "linear-gradient(87deg, rgba(46,48,53,1) 0%, rgba(46,48,53,1) 46%, rgba(49,52,58,1) 100%)",
    },
    boxShadows: {
      shadow1: "0px 1px 2px rgba(0, 0, 0, 0.12)",
      shadow2: "0px 8px 16px rgba(0, 0, 0, 0.12)",
      shadow3: "0px 12px 24px -4px rgba(0, 0, 0, 0.12)",
      shadow4: "0px 16px 32px -4px rgba(0, 0, 0, 0.12)",
      shadow5: "0px 20px 40px -4px rgba(0, 0, 0, 0.12)",
      shadow6: "0px 24px 48px rgba(0, 0, 0, 0.2)",
      shadow7: "0px 24px 48px rgba(0, 0, 0, 0.2)",
      shadow8: "0px 24px 48px rgba(0, 0, 0, 0.2)",
    },
  },
  components,
  typography,
  breakpoints,
};
