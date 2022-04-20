import React, { useState, useEffect } from "react";
import DriverNav from "../UI/DriverNav";
import "./Cart.css";
import "react-toastify/dist/ReactToastify.css";

//Retreive cart from the logged in driver
//call / route



export default function Cart() {
  const [cart, setCart] = useState("");

  const role = window.localStorage.getItem("role");
  const id = window.localStorage.getItem("id");

  const url = new URL ("http://18.235.52.212:8000/cart/")

  url.searchParams.append("UID", id)
  url.searchParams.append("SID", 1)


  const fetchData = () => {
    fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      .then(response => response.json())
      .then((data) => {
        setCart(data)
      });

      // .then(err => {console.log(err);});
  };

  console.log(cart)

    useEffect(() => {
      fetchData();
    }, []);

    
  return (
    <div>
      <DriverNav />

      <div className="cart">
        {/* iterate through cart items for driver  */}
        <div>
          <div>
            <button className="button_1" style={{ float: "right" }}>
              {" "}
              +{" "}
            </button>
            {/* add total quantity in cart (call /increasequantity route) */}

            <button className="button_1" style={{ float: "right" }}>
              {" "}
              -{" "}
            </button>
          </div>
          {/* when user clicks this button, it will remove the item the cart (call /remove) */}
          <button className="button_1" style={{ float: "right" }}>
            {" "}
            Save Catalog{" "}
          </button>
        </div>

        <button className="button_1" style={{ float: "right" }}>
          {" "}
          Checkout{" "}
        </button>
      </div>
    </div>
  );
}
