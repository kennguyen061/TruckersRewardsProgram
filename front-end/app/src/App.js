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
import Report1 from "./Components/Reports/Report1.js";

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages/Application" element={<Application />} />
          <Route path="/pages/Driver_Profile" element={<Profile />} />
          <Route path="/main/points" element={<Points />} />
          <Route path="/pages/Login" element={<Login />} />
          <Route path="/pages/Wishlist" element={<Wishlist />} />
          <Route path="/pages/Dev" element={<Dev />} />
          <Route path="/Catalog/Catalog" element={<Catalog />} />
          <Route path="/Catalog/Listing" element={<Listing />} />
          <Route path="/Reports/Report1" element={<Report1 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
