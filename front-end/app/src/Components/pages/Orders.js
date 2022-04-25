import React, { useState, useEffect } from "react";
import DriverNav from "../UI/DriverNav";
import Footer from "../Footer/Footer";
import "./Orders.css";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
toast.configure();

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const role = window.localStorage.getItem("role");
  const id = window.localStorage.getItem("id");
  const sid = window.localStorage.getItem("sid");

  const fetchOrders = () => {
    const url = new URL("http://18.235.52.212:8000/cart/driverorders");

    url.searchParams.append("UID", id);
    //will need a call to find the SID soon
    url.searchParams.append("SID", sid);

    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      });
  };

  console.log(orders);

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = (orderID) => () => {
    const url = new URL("http://18.235.52.212:8000/cart/cancelorder");

    const body = {
      OrderID: orderID,
    };

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    toast("Canceled Order, Refresh Page to see Changes")
  };
  return (
    <div className="orderpage">
      <DriverNav />

      <div className="orders">
        <div className="tBox">
          <table>
            <tr>
              <td>
                <h2>OrderID</h2>
              </td>
              <td>
                <h2>Order Date</h2>
              </td>
              <td>
                <h2>Quantity Ordered</h2>
              </td>
              <td>
                <h2>Address</h2>
              </td>
              <td>
                <h2>Order Status</h2>
              </td>
            </tr>

            {orders.map((orders) => (
              <tr>
                <td>{orders.OrderID}</td>
                <td>{orders.OrderDate}</td>
                <td>{orders.Total}</td>
                <td>{orders.Address}</td>
                <td>{orders.Orderstatus}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}
