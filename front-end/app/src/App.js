import { Route, Routes } from "react-router-dom";

import Home from "./Components/pages/Home.js";
import Application from "./Components/pages/Application.js";
import Points from "./Components/pages/Points.js";
import Profile from "./Components/pages/Driver_Profile.js";
import Login from "./Components/pages/Login.js";
import Wishlist from "./Components/pages/Wishlist.js";
import Dev from "./Components/pages/Dev.js";
import Cart from "./Components/pages/Cart.js";
import Checkout from "./Components/pages/Checkout.js";
import PointTake from "./Components/pages/PointTake.js";
import Catalog from "./Components/Catalog/Catalog.js";
import EditCatalog from "./Components/Catalog/Sponsor_Catalog_Edit.js";
import SponsorProfile from "./Components/pages/Sponsor_Profile.js";
import DriverSponsorDashboard from "./Components/pages/Driver_Sponsor_Dashboard.js";
import DriverManagement from "./Components/pages/Driver_Management.js";
import ApplyToSponsor from "./Components/pages/Apply_To_Sponsor.js";
import AdminProfile from "./Components/pages/Admin_Profile.js";
import SponsorReports from "./Components/Reports/SponsorReportsHomepage.js";
import AdminReports from "./Components/Reports/AdminReportsHomepage.js";
import SponsorCurrentDriver from "./Components/Reports/SponsorReports/SponsorCurentDrivers.js";
import SponsorDriverApp from "./Components/Reports/SponsorReports/SponsorDriverApp.js";
import SponsorLeastBought from "./Components/Reports/SponsorReports/SponsorLeastBought.js";
import SponsorMostBought from "./Components/Reports/SponsorReports/SponsorMostBought.js";
import SponsorPassword from "./Components/Reports/SponsorReports/SponsorPasswordChange.js";
import SponsorLogin from "./Components/Reports/SponsorReports/SponsorLoginAttemps.js";
import SponsorPoints from "./Components/Reports/SponsorReports/SponsorPointsChange.js";
import Listingdetails from "./Components/Catalog/listing_details.js";
import Error from "./Components/pages/Error.js";
import Orders from "./Components/pages/Orders.js";
import AdminDrivers from "./Components/Reports/AdminReports/AdminCurentDrivers.js";
import AdminApps from "./Components/Reports/AdminReports/AdminDriverApp";
import AdminLeastBought from "./Components/Reports/AdminReports/AdminLeastBought.js";
import AdminMostBought from "./Components/Reports/AdminReports/AdminMostBought.js";
import AdminPassword from "./Components/Reports/AdminReports/AdminPasswordChange.js";
import AdminLogin from "./Components/Reports/AdminReports/AdminLoginAttemps.js";
import AdminPoints from "./Components/Reports/AdminReports/AdminPointsChange.js";
import SponsorAppSelect from "./Components/pages/SponsorAppSelect.js";

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/pages/SponsorApplicants"
            element={<SponsorAppSelect />}
          />
          <Route path="/pages/Application" element={<Application />} />
          <Route path="/pages/Driver_Profile" element={<Profile />} />
          <Route path="/pages/Sponsor_Profile" element={<SponsorProfile />} />
          <Route path="/pages/Admin_Profile" element={<AdminProfile />} />
          <Route path="/main/points" element={<Points />} />
          <Route path="/pages/Login" element={<Login />} />
          <Route path="/pages/Wishlist" element={<Wishlist />} />
          <Route path="/pages/Dev" element={<Dev />} />
          <Route path="/pages/PointTake" element={<PointTake />} />
          <Route path="/Catalog/Catalog" element={<Catalog />} />
          <Route path="/Listing_details/:id" element={<Listingdetails />} />
          <Route path="/pages/Error" element={<Error />} />

          <Route
            path="/pages/Driver_Sponsor_Dashboard"
            element={<DriverSponsorDashboard />}
          />
          <Route
            path="/pages/Driver_Management"
            element={<DriverManagement />}
          />
          <Route path="/pages/Apply_To_Sponsor" element={<ApplyToSponsor />} />
          <Route path="/Reports/SponsorReports" element={<SponsorReports />} />
          <Route path="/Reports/AdminReports" element={<AdminReports />} />
          <Route
            path="/Catalog/Sponsor_Catalog_Edit"
            element={<EditCatalog />}
          />
          <Route path="/pages/Cart" element={<Cart />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/pages/Orders" element={<Orders />} />
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

          <Route
            path="/Reports/AdminReports/CurrentDrivers"
            element={<AdminDrivers />}
          />
          <Route
            path="/Reports/AdminReports/DriverApp"
            element={<AdminApps />}
          />
          <Route
            path="/Reports/AdminReports/LeastBought"
            element={<AdminLeastBought />}
          />
          <Route
            path="/Reports/AdminReports/MostBought"
            element={<AdminMostBought />}
          />
          <Route
            path="/Reports/AdminReports/LoginAttempts"
            element={<AdminLogin />}
          />
          <Route
            path="/Reports/AdminReports/PasswordReport"
            element={<AdminPassword />}
          />
          <Route
            path="/Reports/AdminReports/DriversPoints"
            element={<AdminPoints />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
