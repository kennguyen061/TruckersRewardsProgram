import React, { useState, useEffect } from "react";
import DriverNav from "../UI/DriverNav";
import Footer from "../Footer/Footer";
import "./Cart.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Link, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
toast.configure();


export default function Cart() {

  const [cart, setCart] = useState([]);
  
  
  const role = window.localStorage.getItem("role");
  const id = window.localStorage.getItem("id");
  const sid = window.localStorage.getItem("sid");
  const url = new URL("http://18.235.52.212:8000/cart/");

  url.searchParams.append("UID", id);
  //will need a call to find the SID soon
  url.searchParams.append("SID", 1);

  var total_cost = localStorage.getItem('bannerViews');

  if(!total_cost) {
    total_cost = 5;
  }

  function costFunc() {
    let total = 0;
    cart.map((cart) => ( 
      total += (cart.Quantity * cart.Price)
    ))
    return total
  }

  function addTotalCost() {
    localStorage.setItem('bannerViews', costFunc());
  }



  const fetchData = () => {

    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setCart(data);
      });
      
  };

  useEffect(() => {
    fetchData();
  
  }, []);

  addTotalCost();
  // cart.map((cart) => ( 
  //   setCost(cart.Price)
  // ))

  

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

    

    //window.location.reload(false);
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
    
    addTotalCost();
    window.location.reload(false);

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

    window.location.reload(false);
  };
  


  return (
    
    <div>
      
      <DriverNav/>

      <div className="cart">
        {cart.map((cart) => ( 
          
          <div
            className="item"
            style={{ border: "2px solid black", marginTop: 10 }}
          >
            <center>
              <h2 style={{ marginTop: 5 }}>{cart.ItemName}</h2>

              <br></br><h3>Availability: {cart.Availability}</h3>
              <br></br><h3 style={{ color: "red", marginBottom: 10 }}>
                {" "}
                Total Cost: {cart.Quantity * cart.Price} Points
              
              </h3>
            </center>

            <div className="quantity">
              <div style={{ marginLeft: 50, float: "right" }}>
                <button
                  className="button_2"
                  style={{ alignItems: "right" }}
                  onClick={remove(cart)}
                >
                  {" "}
                  Remove{" "}
                </button>
              </div>

              <button className="button_1" 
              style={{ float: "left" }}
              onClick={decrease_qty(cart)}>
                {" "}
                -{" "}
              </button>

              <b> Qty: {cart.Quantity}</b>

              <button
                className="button_1"
                style={{ float: "right" }}
                onClick={increase_qty(cart)}
              >
                {" "}
                +{" "}
              </button>
            </div>
          </div>
         
        ))}
        <center>
          <h1>Cart Total : {total_cost} Points</h1>
          <Link to={`/Checkout`}>
          <button className="button_1" style={{ marginTop: 30 }}>
            {" "}
            Checkout{" "}
          </button>
          </Link>
          <Footer />
        </center>
      </div>
    </div>
  );
}
