//import { Link, Route } from "react-router-dom";
import "./Dev.css";
import NewNav from "../UI/HomeNav";
import Hero from "../Hero/Hero";
import People from "../People/People";
import WeStand from "../WeStand/WeStand";
import Footer from "../Footer/Footer";
import React, { useState, useEffect } from'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Dev() {
  return (
    <div>
      <NewNav />
      <Hero />
      <People />
      <WeStand />
      <Footer />
      </div>
      
  );
}
export default Dev;
