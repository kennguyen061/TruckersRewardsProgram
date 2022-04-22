import React, { useState, useEffect } from "react";
import DriverNav from "../UI/DriverNav";
import Footer from "../Footer/Footer";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
toast.configure();


export default function Orders() {
    return (
    
        <div>
          <DriverNav/>
        </div>
    );
}