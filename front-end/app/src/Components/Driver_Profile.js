import { useLocation } from "react-router-dom";

import React from "react";
import Navbar from "./UI/Navbar";
import "./Driver_Profile.css";

function Driver_Profile(props) {
  const { state } = useLocation();
  return (
    <div className="Profile_Page">
      <Navbar />
      <div className="Main_Component">
        <div className="Cards">
          <div>
            <label className="Login-Header">
              Welcome Back First Last Name!
            </label>
            <hr className="line_bold" />
          </div>
          <div>
            <label className="Name">Name</label>
            <hr className="line_bold" />
          </div>
          <div>
            <label className="Email">{"Email: " + state.email}</label>
            <hr className="line_bold" />
          </div>
          <div>
            <label className="Address">Address</label>
            <hr className="line_bold" />
          </div>
          <div>
            <label className="Phone_Number">Phone Number</label>
            <hr className="line_bold" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Driver_Profile;
