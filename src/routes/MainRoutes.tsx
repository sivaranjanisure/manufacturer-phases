import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";
import DetailsPage from "../pages/Details";

function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="details/:nodeId" element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;
