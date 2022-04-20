import { Route, Routes } from "react-router-dom";

import Home from "./Components/pages/Home.js";
import Application from "./Components/pages/Application.js";
import Points from "./Components/pages/Points.js";
import Profile from "./Components/pages/Driver_Profile.js";
import Login from "./Components/pages/Login.js";
import Wishlist from "./Components/pages/Wishlist.js";
import Dev from "./Components/pages/Dev.js";
import Cart from "./Components/pages/Cart.js";
import PointTake from "./Components/pages/PointTake.js";
import Catalog from "./Components/Catalog/Catalog.js";
import Edit_Catalog from "./Components/Catalog/Sponsor_Catalog_Edit.js";
import Sponsor_Profile from "./Components/pages/Sponsor_Profile.js";
import Driver_Sponsor_Dashboard from "./Components/pages/Driver_Sponsor_Dashboard.js";
import Driver_Management from "./Components/pages/Driver_Management.js";
import Apply_To_Sponsor from "./Components/pages/Apply_To_Sponsor.js";
import Admin_Profile from "./Components/pages/Admin_Profile.js";
import SponsorReports from "./Components/Reports/SponsorReportsHomepage.js";
import SponsorCurrentDriver from "./Components/Reports/SponsorReports/SponsorCurentDrivers.js";
import SponsorDriverApp from "./Components/Reports/SponsorReports/SponsorDriverApp.js";
import SponsorLeastBought from "./Components/Reports/SponsorReports/SponsorLeastBought.js";
import SponsorMostBought from "./Components/Reports/SponsorReports/SponsorMostBought.js";
import SponsorPassword from "./Components/Reports/SponsorReports/SponsorPasswordChange.js";
import SponsorLogin from "./Components/Reports/SponsorReports/SponsorLoginAttemps.js";
import SponsorPoints from "./Components/Reports/SponsorReports/SponsorPointsChange.js";
import Listing_details from "./Components/Catalog/listing_details.js";

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
          <Route path="/pages/PointTake" element={<PointTake />} />
          <Route path="/Catalog/Catalog" element={<Catalog />} />
          <Route path="/Listing_details/:id" element={<Listing_details />} />

          <Route
            path="/pages/Driver_Sponsor_Dashboard"
            element={<Driver_Sponsor_Dashboard />}
          />
          <Route
            path="/pages/Driver_Management"
            element={<Driver_Management />}
          />
          <Route
            path="/pages/Apply_To_Sponsor"
            element={<Apply_To_Sponsor />}
          />
          <Route path="/Reports/SponsorReports" element={<SponsorReports />} />
          <Route
            path="/Catalog/Sponsor_Catalog_Edit"
            element={<Edit_Catalog />}
          />
          <Route path="/pages/Cart" element={<Cart />} />

          <Route
            path="/Reports/SponsorReports/CurrentDrivers"
            element={<SponsorCurrentDriver />}
          />
          <Route
            path="/Reports/SponsorReports/DriverApp"
            element={<SponsorDriverApp />}
          />
          <Route
            path="/Reports/SponsorReports/LeastBought"
            element={<SponsorLeastBought />}
          />
          <Route
            path="/Reports/SponsorReports/MostBought"
            element={<SponsorMostBought />}
          />
          <Route
            path="/Reports/SponsorReports/LoginAttempts"
            element={<SponsorLogin />}
          />
          <Route
            path="/Reports/SponsorReports/PasswordReport"
            element={<SponsorPassword />}
          />
          <Route
            path="/Reports/SponsorReports/DriversPoints"
            element={<SponsorPoints />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
