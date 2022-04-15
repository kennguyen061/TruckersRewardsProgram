import React from "react";
import SponsorNav from "../UI/SponsorNav";
import Footer from "../Footer/Footer";

import "./Sponsor_Profile.css";
function Sponsor_Profile(props) {
  return (
    <div>
      <SponsorNav />
      <div className="Sponsor_Profile">
        <div>
          <label className="Login-Header">Welcome Back First Last Name!</label>
          <hr className="line_50" />
        </div>
        <div>
          <label className="Name">Organization:</label>
          <hr className="line_bold" />
        </div>
        <div>
          <label className="Name">Name:</label>
          <hr className="line_bold" />
        </div>
        <div>
          <label className="Email">{"Email:"}</label>
          <hr className="line_bold" />
        </div>
        <div>
          <label className="Address">Address:</label>
          <hr className="line_bold" />
        </div>
        <div>
          <label className="Phone">Phone Number:</label>
        </div>
      </div>
      <div className="bottom_here">
        <Footer />
      </div>
    </div>
  );
}

export default Sponsor_Profile;
