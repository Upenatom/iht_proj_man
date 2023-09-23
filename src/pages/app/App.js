import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import CreateUserPage from "../CreateUserPage/CreateUserPage";
import UserDashboardPage from "../UserDashboardPage/UserDashboardPage";
function App() {
  const [user, setUser] = useState(null);
  // const setUserInState = (incomingUserData) =>
  //   setUser({ user: incomingUserData });

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
          <Route path="/" element={<UserDashboardPage setUser={setUser} />} />
          <Route path="/admin/createUser" element={<CreateUserPage />} />
        </Routes>
      ) : (
        <AuthPage setUser={setUser} />
        // <CreateUserPage />
        // <Routes>
        //   <Route
        //     path="/"
        //     elememt={<AuthPage setUserInState={setUserInState} />}
        //   />
        //   <Route
        //     path="/admin/createUser"
        //     element={<CreateUserPage setUserInState={setUserInState} />}
        //   />
        // </Routes>
      )}
    </div>
  );
}

export default App;
