import { Route, Routes } from "react-router-dom";

import Home from "./Components/pages/Home.js";
import Application from "./Components/pages/Application.js";
import Points from "./Components/pages/Points.js";
import Profile from "./Components/pages/Driver_Profile.js";
import Login from "./Components/pages/Login.js";
import Wishlist from "./Components/pages/Wishlist.js";
import Dev from "./Components/pages/Dev.js";
import Catalog from "./Components/Catalog/Catalog.js";
import Listing from "./Components/Catalog/listing_details.js";
import Sponsor_Profile from "./Components/pages/Sponsor_Profile.js";
import Driver_Sponsor_Dashboard from "./Components/pages/Driver_Sponsor_Dashboard.js";
import Driver_Management from "./Components/pages/Driver_Management.js";
import Apply_To_Sponsor from "./Components/pages/Apply_To_Sponsor.js";
import Admin_Profile from "./Components/pages/Admin_Profile.js";

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages/Application" element={<Application />} />
          <Route path="/pages/Driver_Profile" element={<Profile />} />
          <Route path="/pages/Sponsor_Profile" element={<Sponsor_Profile />} />
          <Route path="/pages/Admin_Profile" element={<Admin_Profile />} />
          <Route path="/main/points" element={<Points />} />
          <Route path="/pages/Login" element={<Login />} />
          <Route path="/pages/Wishlist" element={<Wishlist />} />
          <Route path="/pages/Dev" element={<Dev />} />
          <Route path="/Catalog/Catalog" element={<Catalog />} />
          <Route path="/Catalog/Listing" element={<Listing />} />
          <Route path="/pages/Driver_Sponsor_Dashboard" element={<Driver_Sponsor_Dashboard />} />
          <Route path="/pages/Driver_Management" element={<Driver_Management />} />
          <Route path="/pages/Apply_To_Sponsor" element={<Apply_To_Sponsor />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
