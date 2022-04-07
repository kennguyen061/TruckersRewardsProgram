import React from "react";
import DriverNav from "../UI/DriverNav";
import Footer from "../Footer/Footer";

import "./Wishlist.css";
function Wishlist(props) {
  return (
    <div>
      <DriverNav />
    <div className="Profile">
      <div className="Main_Component">
        <div className="Cards">
          <div>
            <label className="Login-Header">
              Wishlist
            </label>
            <hr className="line" />
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default Wishlist;
