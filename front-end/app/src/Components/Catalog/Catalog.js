import NewNav from "../UI/HomeNav";
import DriverNav from "../UI/DriverNav";
import SponsorNav from "../UI/SponsorNav";
import AdminNav from "../UI/SponsorNav";
import "./Catalog.css";
import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Footer/Footer";
toast.configure();

//in order for api to work, go to this link: https://cors-anywhere.herokuapp.com and click temporary access

export default function Catalog() {
  //used to grab the active listings
  const [listing, setlisting] = useState([]);

  //temp driver id
  const role = window.localStorage.getItem("role");
  const id = window.localStorage.getItem("id");
  const sid = window.localStorage.getItem("sid");

  //Setup dynamic navbar variable
  let nav = <NewNav />;
  if (role === "DRIVER") {
    nav = <DriverNav />;
  } else if (role === "SPONSOR") {
    nav = <SponsorNav />;
  } else if (role === "ADMIN") {
    nav = <AdminNav />;
  } else {
    //this.setState({ redirect: "/pages/Error" });
    this.props.history.push("/pages/error");
  }

  //used for the search parameters
  const [q, setQ] = useState("");

  //search bar will only look at title and tags
  const [searchParam] = useState(["Title"]);

  //used for the filtering using dropdown
  const [filterParam, setFilterParam] = useState("All");

  const notify_cart = (item) => () => {
    fetch("http://18.235.52.212:8000/cart/notifycart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ItemID: item.ListingID,
        //need the user id
        UID: id,
        SID: sid,
        ItemName: item.Title,
        Price: Math.round(item.Price),
        Quantity: 1,
        Availability: item.Quantity,
      }),
    }).catch((err) => console.error(err));

    toast("Product has been added to the cart");
  };


  const fetchData = () => {

    const url = new URL("http://18.235.52.212:8000/catalog/get-list-items");
    url.searchParams.append("sid", 1);

    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setlisting(data);
      });

    console.log(listing)

    
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(listing);
  function search(listing) {
    return listing.filter((item) => {
      if (filterParam === "All") {
        return searchParam.some((newItem) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(q.toLowerCase()) > -1
          );
        });
      } else if (item.taxonomy_path.includes(filterParam)) {
        return searchParam.some((newItem) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(q.toLowerCase()) > -1
          );
        });
      }
    });
  }


  return (
    <div className="Catalog">
      <center>
        {nav}
        <input
          className="search-input"
          type="search"
          style={{ marginTop: 100, width: 500, height: 35 }}
          placeholder="Search for an item "
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </center>


      <div
        className="columns"
        style={{
          marginTop: 30,
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 20,
          borderRadius: 8,
        }}
      >
        <div className="column">
          {search(listing).map((listing) => (
            <div
              className="box"
              style={{ border: "2px solid black", backgroundColor: "#E2DBD9" }}
            >
              <center>
                <img
                  style={{ marginTop: 10 }}
                  src={listing.ImageURL}
                  alt="listing1"
                ></img>{" "}
              </center>
              <center>
                <h1
                  style={{ fontSize: 25, color: "#EE730D", marginBottom: 10 }}
                >
                  <strong>{listing.Title} </strong>
                </h1>
              </center>
            

              <center>
                <h2 style={{ color: "black", marginBottom: 10 }}>
                  {" "}
                  Points: {Math.round(listing.Price)}
                </h2>
                <h4>Description: {listing.Description}</h4>

                <button
                  className="button_1"
                  onClick={notify_cart(listing)}
                  style={{ marginLeft: 10, marginTop: 5 }}
                >
                  {" "}
                  Add to Cart{" "}
                </button>
              </center>
            </div>
          ))}
        </div>
      </div>
      <Outlet />

      <Footer />
    </div>
  );
}
