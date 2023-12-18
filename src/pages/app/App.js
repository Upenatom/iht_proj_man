import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import DisplayProjects from "../../components/Display/DisplayProjects";
import UserDashboardPage from "../UserDashboardPage/UserDashboardPage";
import * as utils from "../../resources/utils/utils";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  const [user, setUser] = useState(null);
  let theme = utils.uiTheme();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      // if (payload.exp < Date.now() / 1000) {
      //   localStorage.removeItem("token");
      //   token = null;
      // } else {
      const user = payload.user;
      setUser(user);
      // }
    }
  }, []);

  return (
    <div className="App">
      {user ? (
        <Routes>
          <Route
            path="/"
            element={
              <ThemeProvider theme={theme}>
                <UserDashboardPage
                  setUser={setUser}
                  user={user}
                  theme={theme}
                />
              </ThemeProvider>
            }
          />
          <Route
            path="/display"
            element={
              <ThemeProvider theme={theme}>
                <DisplayProjects user={user} />
              </ThemeProvider>
            }
          />
        </Routes>
      ) : (
        <ThemeProvider theme={theme}>
          <AuthPage setUser={setUser} />
        </ThemeProvider>
      )}
    </div>
  );
}

export default App;
