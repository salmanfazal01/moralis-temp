import { grey } from "@mui/material/colors";
import typography from "./typography";
import breakpoints from "./breakpoints";
import components from "./components";

export const lightTheme = {
  palette: {
    mode: "light",
    primary: {
      main: "#1AAB9B",
      dark: "#0c6e5a",
      invert: "#FFF",
    },
    info: {
      main: "#447AFB",
      light: "#739CFF",
      darkk: "#1E53D2",
    },
    grey: {
      grey1: "#F9F9FA",
      grey2: grey[200],
      grey3: grey[300],
      grey4: grey[400],
      grey5: grey[500],
      grey6: grey[600],
      grey7: grey[700],
      grey8: grey[800],
      grey9: grey[900],
    },
    text: {
      primary: "#425466",
      title: "#333333",
      invert: "#fff",
    },
    background: {
      default: "#F6FAF9",
      main: "#fff",
      dark: "#333333",
      gradient1:
        "linear-gradient(335deg, rgba(245,252,239,1) 13%, rgba(250,255,247,1) 38%, rgba(255,255,255,1) 100%)",
    },
    boxShadows: {
      shadow1:
        "0px 1px 3px rgba(190, 190, 190, 0.25), 0px 20px 40px -40px rgba(219, 227, 237, 0.4)",
      shadow2:
        "0px 4px 6px -4px rgba(24, 39, 75, 0.12), 0px 8px 8px -4px rgba(24, 39, 75, 0.08)",
      shadow3:
        "0px 6px 8px -6px rgba(24, 39, 75, 0.12), 0px 8px 16px -6px rgba(24, 39, 75, 0.08)",
      shadow4:
        "0px 6px 12px -6px rgba(24, 39, 75, 0.12), 0px 8px 24px -4px rgba(24, 39, 75, 0.08)",
      shadow5:
        "0px 6px 14px -6px rgba(24, 39, 75, 0.12), 0px 10px 32px -4px rgba(24, 39, 75, 0.1)",
      shadow6:
        "0px 8px 18px -6px rgba(24, 39, 75, 0.12), 0px 12px 42px -4px rgba(24, 39, 75, 0.12)",
      shadow7:
        "0px 8px 22px -6px rgba(24, 39, 75, 0.12), 0px 14px 64px -4px rgba(24, 39, 75, 0.12)",
      shadow8:
        "0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)",
    },
  },
  components,
  typography,
  breakpoints,
};
