import React, { useState, useEffect } from "react";
import DriverNav from "../UI/DriverNav";
import Footer from "../Footer/Footer";
import "./Cart.css";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
toast.configure();

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [enteredAddress, setEnteredAddress] = useState("address");

  const role = window.localStorage.getItem("role");
  const id = window.localStorage.getItem("id");
  const sid = window.localStorage.getItem("sid");

  var total_cost = localStorage.getItem("totalcost");

  const addressHandler = (item) => {
    setEnteredAddress(item);
  };

  if (!total_cost) {
    total_cost = 0;
  }

  function costFunc() {
    let total = 0;
    cart.map((cart) => (total += cart.Quantity * cart.Price));
    return total;
  }

  localStorage.setItem("totalcost", costFunc());

  const fetchCartData = () => {
    const url = new URL("http://18.235.52.212:8000/cart/");

    url.searchParams.append("UID", id);
    //will need a call to find the SID soon
    url.searchParams.append("SID", 1);


    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setCart(data);
      });
  };

  const fetchDriverData = () => {
    const url = new URL("http://18.235.52.212:8000/account/read");

    url.searchParams.append("role", role);
    url.searchParams.append("id", id);
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((driver) => {
        addressHandler(driver.address);
      });
  };

  useEffect(() => {
    fetchCartData();
    fetchDriverData();
  }, []);

  console.log(enteredAddress);

  const remove = (item) => () => {
    const url = new URL("http://18.235.52.212:8000/cart/remove");

    const body = {
      UID: id,

      //needs to change
      SID: 1,
      ItemID: item.ItemID,
    };

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    toast("Removed Item for Cart, Refresh Page to see Changes")
  };

  const increase_qty = (item) => () => {
    const url = new URL("http://18.235.52.212:8000/cart/increasequantity");

    const body = {
      UID: id,

      //needs to change
      SID: 1,
      ItemID: item.ItemID,
    };

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    toast("Incresed  Quantity, Refresh Page to see Changes")

  };

  const decrease_qty = (item) => () => {
    const url = new URL("http://18.235.52.212:8000/cart/decreasequantity");

    const body = {
      UID: id,
      SID: 1,
      ItemID: item.ItemID,
    };

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    toast("Decreased Quantity, Refresh Page to see Changes")

  };

  //will need to confirm this works
  const Checkout = () => {
    const url = new URL("http://18.235.52.212:8000/cart/checkout");

    const body = {
      UID: id,
      SID: 1,
      address: enteredAddress,
    };

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    .then(response => response.json())
    .then((res) => {
      //console.log(res)
      if (res === false)
      {
        toast("Insufficient Points to Complete Order")
      }
      else 
      {
        toast("Order Submitted")
      }
    });
    

   
    //add toast to checkout page it is going to a blank page
  };

  return (
    <div>
      <DriverNav />

      <div className="cart">
        {cart.map((cart) => (
          <div
            className="item"
            style={{ border: "2px solid black", marginTop: 10 }}
          >
            <center>
              <h2 style={{ marginTop: 5 }}>{cart.ItemName}</h2>

              <br></br>
              <h3>Availability: {cart.Availability}</h3>
              <br></br>
              <h3 style={{ color: "red", marginBottom: 10 }}>
                {" "}
                Total Cost: {cart.Quantity * cart.Price} Points
              </h3>
            </center>

            <div className="quantity">
              <div style={{ marginLeft: 50, float: "right" }}>
              
              </div>

           

              <b> Qty: {cart.Quantity}</b>

           
            </div>
          </div>
        ))}
        <center>
          <h1> Orders are Non-Refundable </h1>
          <h1> Orders Cannot be Canceled Once Placed </h1>
          <h1>Cart Total : {total_cost} Points</h1>
            <button
              className="button_1"
              style={{ marginTop: 30 }}
              onClick={Checkout}
            >
              {" "}
              Place Your Order{" "}
            </button>
          {/* <Footer /> */}
        </center>
      </div>
      <Footer />
    </div>
  );
}
