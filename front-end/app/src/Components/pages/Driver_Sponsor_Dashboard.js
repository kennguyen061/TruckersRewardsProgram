import React from "react";
import { Link, Route } from "react-router-dom";
import DriverNav from "../UI/DriverNav";
import Footer from "../Footer/Footer";

import "./Driver_Sponsor_Dashboard.css";
function Driver_Sponsor_Dashboard(props) {
  return (
    <div>
      <DriverNav />
      <div className="Dashboard_Profile">
        <label className="dashboard_header">Sponsor Dashboard</label>
        <hr className="line_50" />
        <br></br>
        <Link to="/pages/Apply_To_Sponsor" className="Link">
          <button type="submit">
            <label className="sponsor_button"> Apply to New Sponsor</label>
          </button>
        </Link>
        <hr className="line_30" />
        <label className="current_sponsors">Current Sponsors</label>
        <hr className="line_30" />
        <div className="bottom_here">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Driver_Sponsor_Dashboard;
