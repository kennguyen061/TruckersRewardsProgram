import React from "react";
import NewNav from "../UI/HomeNav";
import Footer from "../Footer/Footer";

import "./Wishlist.css";
function Wishlist(props) {
  return (
    <div>
      <NewNav />
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
