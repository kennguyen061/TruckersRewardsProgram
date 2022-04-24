import React, { useState, useEffect } from "react";
import DriverNav from "../UI/DriverNav";
import Footer from "../Footer/Footer";
import "./Driver_Password_Reset.css"
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
toast.configure();

//onSubmit={submitHandler}

export default function Driver_Password_Reset() {
    const [enteredEmail, setEnteredEmail] = useState("");
    return (
        <div>
            <DriverNav />
       
            <div className = "DReset">
           
            </div>

            <div className="bottom_here">
                <Footer />
            </div>
        </div>
    )
}