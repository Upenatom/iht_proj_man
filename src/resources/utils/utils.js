import { createTheme } from "@mui/material/styles";
import { ReactComponent as IhtHeatingLogo } from "../logo/iht-heating-avatar-gradient.svg";
import { ReactComponent as IhtCoolingLogo } from "../logo/iht-cooling-avatar-gradient.svg";
import { ReactComponent as IhtGroupLogo } from "../logo/iht-group-avatar-gradient.svg";
import { ReactComponent as IhtLightingLogo } from "../logo/iht-lighting-avatar-colour.svg";
import dayjs from "dayjs";

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
      chip: {
        main: "#aa9d93",
        contrastText: "#000",
      },
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
      neutral: {
        main: "#46505A",
      },
      success: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
      text: {
        primary: "#173A5E",
        secondary: "#46505A",
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

export function departmentEnums() {
  const departments = [
    "R&D",
    "Office",
    "Marketing & Promo",
    "Technical Support, Product Support, QC, ETL",
    "Warehouse & Packaging",
    "Inventory & Purchasing",
    "Building Maintenance",
    "Safety",
    "HR",
  ];
  return departments;
}

export function taskStatusEnums() {
  const status = [
    "In Progress",
    "Paused",
    "Cancelled",
    "Completed",
    "Not Started",
  ];
  return status;
}

export function priorityEnums() {
  const priority = ["1-High", "2-Medium", "3-Low"];
  return priority;
}

export function putBuilder(bdy) {
  let body = bdy; //object to send to database
  let jwt = localStorage.getItem("token");
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
    body: JSON.stringify(body),
  };
  return options;
}

export function shortDate(date) {
  let stringDate = dayjs(date).format("MMM-D-YYYY").toString();
  return stringDate;
}
export function calcDaysRemain(endDate) {
  let projEnd = dayjs(endDate);
  let today = dayjs();
  let date = projEnd.diff(today, "day");
  return date;
}
