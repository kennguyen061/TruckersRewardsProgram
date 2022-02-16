import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from "./Components/Home.js";
import Application from "./Components/Application.js";

function App() {
  return (
    <div>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Application" element={<Application />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
