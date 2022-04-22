import "./Home.css";
import NewNav from "../UI/HomeNav";
// import SponsorNav from "../UI/SponsorNav";
import Hero from "../Hero/Hero";
import People from "../People/People";
import WeStand from "../WeStand/WeStand";
import Footer from "../Footer/Footer";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// toast.warn("Roger's Rewards is currently under development, we appreciated your understanding");
function Home() {
  window.localStorage.clear();
  return (
    <div>
      <NewNav />
      {/* <SponsorNav /> */}
      <Hero />
      <People />
      <WeStand />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
export default Home;
