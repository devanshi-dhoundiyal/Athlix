import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ChildProfile from "./pages/ChildProfile/ChildProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/child-profile" element={<ChildProfile />} />
    </Routes>
  );
}

export default App;