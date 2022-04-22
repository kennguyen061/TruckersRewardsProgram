import "./Error.css";
import NewNav from "../UI/HomeNav";
import DriverNav from "../UI/DriverNav";
import SponsorNav from "../UI/SponsorNav";
import AdminNav from "../UI/AdminNav";
import { Link, Route, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import Video from "../../assets/broll_5.mp4";

//current videos are 1080p try some 720 idk they are too long

function Error() {
  const role = window.localStorage.getItem("role");
  const id = window.localStorage.getItem("id");
  const navigate = useNavigate();
  let nav;

  const url = new URL("http://18.235.52.212:8000/account/read");

  url.searchParams.append("role", role);
  url.searchParams.append("id", id);

  if (role === "DRIVER") {
    nav = <DriverNav />;
  } else if (role === "SPONSOR") {
    nav = <SponsorNav />;
  } else if (role === "ADMIN") {
    nav = <AdminNav />;
  } else {
    nav = <NewNav />;
  }

  return (
    <div>
      {nav}
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
