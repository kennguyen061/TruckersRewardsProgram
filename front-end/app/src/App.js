import { Route, Routes } from "react-router-dom";

import Home from "./Components/pages/Home.js";
import Application from "./Components/pages/Application.js";
import Points from "./Components/pages/Points.js";
import Profile from "./Components/pages/Driver_Profile.js";
import Login from "./Components/pages/Login.js";
import Wishlist from "./Components/pages/Wishlist.js";

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages/application" element={<Application />} />
          <Route path="/pages/Driver_Profile" element={<Profile />} />
          <Route path="/main/points" element={<Points />} />
          <Route path="/pages/Login" element={<Login />} />
          <Route path="/pages/Wishlist" element={<Wishlist />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
