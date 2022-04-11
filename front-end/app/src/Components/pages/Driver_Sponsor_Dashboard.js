import React from "react";
import DriverNav from "../UI/DriverNav";
import Footer from "../Footer/Footer";

import "./Driver_Sponsor_Dashboard.css";
function Driver_Sponsor_Dashboard(props) {
  return (
    <div>
      <DriverNav />
      <div className="Dashboard_Profile">
      <label className="dashboard_header">
        Sponsor Dashboard
      </label>
      <hr className="line_50" />
      <br></br>
        <button type="submit" >
          <label className="sponsor_button">
           {" "}
            Apply to New Sponsor
          </label>
        </button>
        <hr className="line" />
          <label className="current_sponsors">
            Current Sponsors
          </label>
        <hr className="line" />
    <div className="bottom_here">
      <Footer />
    </div>
    </div>
    </div>
  );
}

export default Driver_Sponsor_Dashboard;
