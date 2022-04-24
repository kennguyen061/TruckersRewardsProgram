import React from "react";
import { Link, Route } from "react-router-dom";
import DriverNav from "../UI/DriverNav";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";

import "./Driver_Sponsor_Dashboard.css";
const CurrentSponsor = () => {
  const [data, setData] = useState([]);
  const [sponsor, setSponsor] = useState("Sponsor");
  let SID = window.localStorage.getItem("sid");
  useEffect(() => {
    const url = new URL("http://18.235.52.212:8000/drivermgt/viewdrivers");

    url.searchParams.append("SID", SID);

  const urlName = new URL("http://18.235.52.212:8000/reports/SponsorName");

  urlName.searchParams.append("sid", SID);

  fetch(urlName, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((comp) => setSponsor(comp));  
}, [SID]);

  return (
    <div>
      <DriverNav />
      <div className="Dashboard_Profile">
        <label className="dashboard_header">Dashboard</label>
        <hr className="line_50" />
        <br></br>
        <Link to="/pages/Apply_To_Sponsor" className="Link">
          <button type="submit">
            <label className="sponsor_button"> Apply to New Sponsor</label>
          </button>
        </Link>
        <hr className="line_30" />
        <label className="current_sponsors">Current Sponsors</label>
        <label className="current_sponsors">{`${sponsor}`}</label>
        <hr className="line_30" />
        <div className="bottom_here">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default CurrentSponsor;
