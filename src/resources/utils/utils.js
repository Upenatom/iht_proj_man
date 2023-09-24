import { createTheme } from "@mui/material/styles";

export function uiTheme() {
  //create theme for material UI
  const theme = createTheme({
    palette: {
      primary: {
        light: "#93a0aa",
        main: "#647887",
        dark: "#485660",
        contrastText: "#eff0f2",
      },
      secondary: {
        light: "#b3c4c2",
        main: "#648785",
        dark: "#3b4f4e",
        contrastText: "#d2d6d9",
      },
      // secondary: {
      //   light: "#d2cecc",
      //   main: "#877364",
      //   dark: "##675241",
      //   contrastText: "#ececec",
      // },
      error: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
      warning: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
      info: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
      success: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
  });
  return theme;
}
