import React from "react";
import NewNav from "../UI/HomeNav";
import Footer from "../Footer/Footer";

import "./Driver_Profile.css";
function Driver_Profile(props) {
  return (
    <div>
      <NewNav />
    <div className="Profile">
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
            <label className="Email">{"Email: "}</label>
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
    </div>
  );
}

export default Driver_Profile;
