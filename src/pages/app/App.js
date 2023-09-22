import "./App.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import CreateUserPage from "../CreateUserPage/CreateUserPage";
import UserDashboardPage from "../UserDashboardPage/UserDashboardPage";
function App() {
  const [user, setUser] = useState(null);
  const setUserInState = (incomingUserData) =>
    setUser({ user: incomingUserData });

  return (
    <div className="App">
      {user ? (
        <Routes>
          <Route path="/userDashboard" element={<UserDashboardPage />} />
          <Route
            path="/admin/createUser"
            element={<CreateUserPage setUserInState={setUserInState} />}
          />
        </Routes>
      ) : (
        <AuthPage />
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
