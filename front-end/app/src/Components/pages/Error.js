import "./Error.css";
import NewNav from "../UI/HomeNav";
import React, { useState, useEffect } from "react";

import Video from "../../assets/broll_5.mp4";

//current videos are 1080p try some 720 idk they are too long

function Error() {
  return (
    <div>
      <NewNav />
    <div className="error">
      <video autoPlay loop muted id="video">
        <source src={Video} type="video/mp4" />
      </video>
      <div className="overlay"></div>
        <div className="content">
          <h1>Looks like you got lost while driving</h1>
          <h2>Please try to login again or contact your systems administrator!</h2>
        </div>
      </div>
    </div>
  );
}

export default Error;
