import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ChildProfile from "./pages/ChildProfile/ChildProfile";
import Assessment from "./pages/Assessment/Assessment";
import AssessmentResult from "./pages/Results/AssessmentResult";
import Recommendation from "./pages/Recommendation/Recommendation";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/child-profile" element={<ChildProfile />} />

      <Route path="/assessment" element={<Assessment />} />

      <Route path="/results" element={<AssessmentResult />} /> 

      <Route path="/recommendations" element={<Recommendation />} />

      <Route path="/dashboard" element={<Dashboard />} />   
    </Routes>
  );
}

export default App;