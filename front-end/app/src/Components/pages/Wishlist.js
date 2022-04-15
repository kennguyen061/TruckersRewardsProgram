import React from "react";
import DriverNav from "../UI/DriverNav";
import Footer from "../Footer/Footer";

import "./Wishlist.css";
function Wishlist(props) {
  return (
    <div>
      <DriverNav />
      <div className="Wishlist">
        <label className="Login-Header">Wishlist</label>
        <hr className="line_50" />
      </div>
      <div className="bottom_here">
        <Footer />
      </div>
    </div>
  );
}

export default Wishlist;
