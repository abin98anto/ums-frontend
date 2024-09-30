import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import UserLogin from "./pages/UserLogin/UserLogin";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          {/* Add more routes here as your application grows */}
          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
