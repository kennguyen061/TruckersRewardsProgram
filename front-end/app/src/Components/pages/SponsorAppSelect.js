import React from "react";
import DriverNav from "../UI/DriverNav";
import Footer from "../Footer/Footer";

import "./SponsorAppSelect.css";
function SponsorAppSelect(props) {
  return (
    <div>
      <DriverNav />
      <div className="spacer"></div>

      <div className="content">
        <div>
          <h1>New Sponsor Applicants</h1>
          <h2> Please accept and reject all new applicants</h2>
        </div>
        <div className="app-box">{/* for each new applicant mke div*/}</div>
      </div>

      <Footer />
    </div>
  );
}

export default SponsorAppSelect;
