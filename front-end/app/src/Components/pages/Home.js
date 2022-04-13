//import { Link, Route } from "react-router-dom";
import "./Home.css";
import NewNav from "../UI/HomeNav";
import DriverNav from "../UI/DriverNav";
import Hero from "../Hero/Hero";
import People from "../People/People";
import WeStand from "../WeStand/WeStand";
import Footer from "../Footer/Footer";
import React, { useState, useEffect } from'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.warn("This text demonstrates the annoucement feature");
function Home() {
  return (
    <div>
      <DriverNav />
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
