import { Route, Routes } from "react-router-dom";

import Home from "./Components/Home.js";
import Application from "./Components/Application.js";
import Driver_Profile from "./Components/Driver_Profile.js";

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Application" element={<Application />} />
          <Route path="/Driver_Profile" element={<Driver_Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
