import { Route, Link, Routes } from "react-router-dom";

import Application from "./Application.js";

function Home() {
  return (
    <div>
      <h2>Home 22</h2>
      <Link to="/"> Home </Link>
      <Link to="/Application"> APP </Link>
    </div>
  );
}

export default Home;
