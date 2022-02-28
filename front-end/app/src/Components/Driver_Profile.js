import { Link } from "react-router-dom";
import React from 'react';
import Navbar from "./UI/Navbar";
import "./Driver_Profile.css";


function Driver_Profile() {
  return (
    <div className="Profile_Page">
      <Navbar />
      <div className="Main Component">
        <div className="Header">
              <label className="Login-Header">Welcome Back First Last Name!</label>
              <hr className="line_bold" />
            </div>
          <div className="Cards">
            <div>
            <label className="Name">Name</label>
            <hr className="line_bold" />
            </div>
            <div>
              <label className="Email">Email</label>
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
