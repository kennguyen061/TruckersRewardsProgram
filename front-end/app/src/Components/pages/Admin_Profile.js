import React from "react";
import AdminNav from "../UI/AdminNav";
import Footer from "../Footer/Footer";

import "./Admin_Profile.css";
function Admin_Profile(props) {
  return (
    <div>
      <AdminNav />
    <div className="Admin_Profile">
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

export default Admin_Profile;
