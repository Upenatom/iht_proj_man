import { createTheme } from "@mui/material/styles";
import { ReactComponent as IhtHeatingLogo } from "../logo/iht-heating-avatar-gradient.svg";
import { ReactComponent as IhtCoolingLogo } from "../logo/iht-cooling-avatar-gradient.svg";
import { ReactComponent as IhtGroupLogo } from "../logo/iht-group-avatar-gradient.svg";
import { ReactComponent as IhtLightingLogo } from "../logo/iht-lighting-avatar-colour.svg";

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
        main: "#876478",

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
export function logoSelect(division) {
  if (division === "IHTheating") {
    return <IhtHeatingLogo style={{ height: "20px", width: "20px" }} />;
  } else if (division === "IHTcooling") {
    return <IhtCoolingLogo style={{ height: "20px", width: "20px" }} />;
  } else if (division === "IHTlighting") {
    return <IhtLightingLogo style={{ height: "20px", width: "20px" }} />;
  } else if (division === "IHTplastic") {
    return <IhtGroupLogo style={{ height: "20px", width: "20px" }} />;
  } else return <IhtGroupLogo style={{ height: "20px", width: "20px" }} />;
}
