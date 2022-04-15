import React from "react";
import DriverNav from "../UI/DriverNav";
import Footer from "../Footer/Footer";

import "./Driver_Profile.css";
function Driver_Profile(props) {
  return (
    <div>
      <DriverNav />
      <div className="Driver_Profile">
        <div className="Main_Component">
          <div className="Cards">
            <div>
              <label className="Login-Header">
                Welcome Back First Last Name!
              </label>
              <hr className="line" />
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
        </div>
      </div>
      <div className="bottom_here">
        <Footer />
      </div>
    </div>
  );
}

export default Driver_Profile;
