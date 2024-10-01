import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import UserLogin from "./pages/UserLogin/UserLogin";
import Profile from "./pages/Profile/Profile";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashborad" element={<Dashboard />} />
          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
