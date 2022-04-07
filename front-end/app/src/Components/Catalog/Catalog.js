import DriverNav from "../UI/DriverNav";
import "./Catalog.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Outlet } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Footer/Footer";
toast.configure();

//in order for api to work, go to this link: https://cors-anywhere.herokuapp.com and click temporary access

export default function Catalog() {
  //used to grab the active listings
  const [listing, setlisting] = useState([]);

  //used for the search parameters
  const [q, setQ] = useState("");

  //search bar will only look at title and tags
  const [searchParam] = useState(["title", "tags"]);

  //used for the filtering using dropdown
  const [filterParam, setFilterParam] = useState("All");

  const notify_cart = (item) => () => {
    // Calling toast method by passing string
    //variables to add to the table are
    //item.listing_id
    //item.title
    //item.price (should be in points though)

    //make some conditional that checks if the driver already has that item on the cart, if they do, increase the quantity by 1

    toast("Product has been added to the cart");
  };

  const notify_wishlist = (item) => () => {
    // Calling toast method by passing string
    //variables to add to the table are
    //item.listing_id
    //item.title
    //item.price (should be in points though)

    //make some conditional that checks if the driver already has that item on their wishlist, if they do don't add it

    toast("Product has been added to your wishlist");
  };

  const fetchHighData = async () => {
    const high_etsy_url =
      "https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?sort_on=price&sort_order=down&includes=MainImage&limit=10&api_key=dmmhikoeydunsffqrxyeubdv";
    const response = await axios.get(high_etsy_url);
    setlisting(response.data.results);
  };

  const fetchLowData = async () => {
    const low_etsy_url =
      "https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?sort_on=price&sort_order=up&includes=MainImage&limit=10&api_key=dmmhikoeydunsffqrxyeubdv";
    const response = await axios.get(low_etsy_url);
    setlisting(response.data.results);
  };

  const fetchData = () => {
    const etsy_url =
      "https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?includes=MainImage&limit=10&api_key=dmmhikoeydunsffqrxyeubdv";

    fetch(etsy_url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setlisting(data.results);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  function search(listing) {
    return listing.filter((item) => {
      if (filterParam === "All") {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      } else if (item.taxonomy_path.includes(filterParam)) {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      }
    });
  }

  return (
    <div className="Catalog">
      <center>
        <DriverNav />
        <input
          className="search-input"
          type="search"
          style={{ marginTop: 100, width: 500, height: 35 }}
          placeholder="Search for an item "
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </center>

      <center>
        <div
          className="buttons has-addons is-centered"
          style={{ marginTop: 30 }}
        >
          <button className="button" onClick={fetchData}>
            {" "}
            Sort by: Recent{" "}
          </button>
          <button className="button" onClick={fetchHighData}>
            Sort by: Highest Price
          </button>
          <button className="button" onClick={fetchLowData}>
            Sort by: Lowest Price
          </button>

          {/* <div className="select" style={{ marginLeft: 50, marginBottom: 8 }}>
          <select
            onChange={(e) => {
              setFilterParam(e.target.value);
            }}
            className="custom-select"
            aria-label="Filter Countries By Region"
          >
            <option value="All">Filter By Category</option>
            <option value="Art & Collectibles">Art & Collectibles</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Home & Living">Home & Living</option>
            <option value="Craft Supplies & Tools">
              Craft Supplies & Tools
            </option>
            <option value="Clothing">Clothing</option>
            <option value="Toys & Games">Toys & Games</option>
          </select>
          <span className="focus"></span>
        </div> */}
        </div>
      </center>

      <div
        className="columns"
        style={{ marginTop: 30, marginLeft: 10, marginRight: 10 }}
      >
        <div className="column">
          {search(listing).map((listing) => (
            <div
              className="box"
              style={{ border: "2px solid black", backgroundColor: "#E2DBD9" }}
            >
              <center>
                <img src={listing.MainImage.url_170x135} alt="listing1"></img>{" "}
              </center>
              <Link to={`/listing_details/${listing.listing_id}`}>
                <center>
                  <h1 style={{ fontSize: 25, color: "blue" }}>
                    <strong>{listing.title} </strong>
                  </h1>
                </center>
              </Link>

              {/* Convert to points */}
              <center>
                <h2 style={{ color: "black" }}>Price: {listing.price}</h2>
              </center>

              <button className="button is-info" onClick={notify_cart(listing)}>
                {" "}
                Add to Cart{" "}
              </button>
              <button
                className="button is-warning"
                onClick={notify_wishlist(listing)}
                style={{ float: "right" }}
              >
                {" "}
                Add to Wishlist
              </button>
            </div>
          ))}
        </div>
      </div>
      <Outlet />
      <Footer />
    </div>
  );
}
