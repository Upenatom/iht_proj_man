import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import UserAdminPage from "../UserAdminPage/UserAdminPage";
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
  // const setUserInState = (incomingUserData) =>
  //   setUser({ user: incomingUserData });

  let theme = utils.uiTheme();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.esp < Date.now() / 1000) {
        localStorage.removeItem("token");
        token = null;
      } else {
        console.log("else");
        const user = payload.user;
        setUser(user);
      }
    }
  }, []);

  return (
    <div className="App">
      {user ? (
        <Routes>
          <Route
            path="/"
            element={<UserDashboardPage setUser={setUser} user={user} />}
          />
          <Route path="/admin/createUser" element={<UserAdminPage />} />
        </Routes>
      ) : (
        <ThemeProvider theme={theme}>
          <AuthPage setUser={setUser} />
        </ThemeProvider>
        // <UserAdminPage />
      )}
    </div>
  );
}

export default App;
