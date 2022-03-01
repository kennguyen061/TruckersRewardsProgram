import { Route, Routes } from "react-router-dom";

import Home from "./Components/pages/Home.js";
import Application from "./Components/pages/Application.js";
import Main from "./Components/pages/Main.js";
import Points from "./Components/pages/Points.js";

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Application" element={<Application />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/main/points" element={<Points />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
