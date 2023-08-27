import "./App.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import Dashboard from "../../components/Dashboard/Dashboard";
import UserDashboard from "../../components/Dashboard/UserDashboard";
import CreateUser from "../../pages/CreateUser/CreateUser";

function App() {
  const [user, setUser] = useState(null);
  const setUserInState = (incomingUserData) =>
    setUser({ user: incomingUserData });

  return (
    <div className="App">
      {user ? (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/user" element={<UserDashboard />} />
          <Route path="/admin/createUser" element={<CreateUser />} />
        </Routes>
      ) : (
        <AuthPage />
      )}
    </div>
  );
}

export default App;
