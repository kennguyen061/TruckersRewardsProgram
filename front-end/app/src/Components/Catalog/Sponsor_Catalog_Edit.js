import React, { useState, useEffect } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Sponsor_Catalog_Edit.css";
import SponsorNav from "../UI/SponsorNav";
import Footer from "../Footer/Footer";
toast.configure();

export default function Edit_Catalog() {
  // set value for default selection
  const [selectedValues, setSelectedValue] = useState([]);

  //used to grab the active listings
  const [listing, setlisting] = useState([]);
  const [listing_1, setlisting_1] = useState([]);

  //changed var to let
  // var should never be used as it is bad syntax in new version of javascript like we are using
  let new_listing = [];

  const fetchData = () => {
    const etsy_url =
      "https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?includes=MainImage&limit=100&offset=0&api_key=dmmhikoeydunsffqrxyeubdv";

    fetch(etsy_url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setlisting(data.results);
      });

    const etsy_url_2 =
      "https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?includes=MainImage&limit=100&offset=100&api_key=dmmhikoeydunsffqrxyeubdv";

    fetch(etsy_url_2)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setlisting_1(data.results);
      });

    toast("Retrieving Catalog");
  };

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const options = [
    {
      value: "Art & Collectibles",
      label: "Art & Collectibles",
    },
    {
      value: "Jewelry",
      label: "Jewelry",
    },
    {
      value: "Home & Living",
      label: "Home & Living",
    },
    {
      value: "Craft Supplies & Tools",
      label: "Craft Supplies & Tools",
    },
    {
      value: "Clothing",
      label: "Clothing",
    },
    {
      value: "Toys & Games",
      label: "Toys & Games",
    },
    {
      value: "Paper & Party Supplies",
      label: "Paper & Party Supplies",
    },
    {
      value: "Gifts & Mementos",
      label: "Gifts & Mementos",
    },
    {
      value: "Books, Movies & Music",
      label: "Books, Movies & Music",
    },
    {
      value: "Electronics & Accessories",
      label: "Electronics & Accessories",
    },
    {
      value: "Bath & Beauty",
      label: "Bath & Beauty",
    },
    {
      value: "Accessories",
      label: "Accessories",
    },
  ];

  new_listing = listing.concat(listing_1);

  console.log(new_listing);
  console.log(selectedValues);

  //changed var to let
  // var should never be used as it is bad syntax in new version of javascript like we are using
  let filtered_listing = [];

  filtered_listing = new_listing.filter(
    (filtered_listing) =>
      !filtered_listing.title.includes("republican") ||
      !filtered_listing.title.includes("Republican") ||
      !filtered_listing.description.includes("republican") ||
      !filtered_listing.description.includes("Republican") ||
      !filtered_listing.tags.includes("republican") ||
      !filtered_listing.tags.includes("Republican") ||
      !filtered_listing.title.includes("sex") ||
      !filtered_listing.title.includes("Sex") ||
      !filtered_listing.description.includes("sex") ||
      !filtered_listing.description.includes("Sex") ||
      !filtered_listing.tags.includes("sex") ||
      !filtered_listing.tags.includes("Sex") ||
      !filtered_listing.title.includes("dildo") ||
      !filtered_listing.title.includes("Dildo") ||
      !filtered_listing.description.includes("dildo") ||
      !filtered_listing.description.includes("Dildo") ||
      !filtered_listing.tags.includes("dildo") ||
      !filtered_listing.tags.includes("Dildo") ||
      !filtered_listing.title.includes("porn") ||
      !filtered_listing.title.includes("Porn") ||
      !filtered_listing.description.includes("porn") ||
      !filtered_listing.description.includes("Porn") ||
      !filtered_listing.tags.includes("porn") ||
      !filtered_listing.tags.includes("Porn") ||
      !filtered_listing.title.includes("fuck") ||
      !filtered_listing.title.includes("Fuck") ||
      !filtered_listing.description.includes("fuck") ||
      !filtered_listing.description.includes("Fuck") ||
      !filtered_listing.tags.includes("fuck") ||
      !filtered_listing.tags.includes("Fuck") ||
      !filtered_listing.title.includes("ass") ||
      !filtered_listing.title.includes("Ass") ||
      !filtered_listing.description.includes("ass") ||
      !filtered_listing.description.includes("Ass") ||
      !filtered_listing.tags.includes("ass") ||
      !filtered_listing.tags.includes("Ass") ||
      !filtered_listing.title.includes("hell") ||
      !filtered_listing.title.includes("Hell") ||
      !filtered_listing.description.includes("hell") ||
      !filtered_listing.description.includes("Hell") ||
      !filtered_listing.tags.includes("hell") ||
      !filtered_listing.tags.includes("Hell") ||
      !filtered_listing.title.includes("dick") ||
      !filtered_listing.title.includes("Dick") ||
      !filtered_listing.description.includes("dick") ||
      !filtered_listing.description.includes("Dick") ||
      !filtered_listing.tags.includes("dick") ||
      !filtered_listing.tags.includes("Dick") ||
      !filtered_listing.title.includes("erotic") ||
      !filtered_listing.title.includes("Erotic") ||
      !filtered_listing.description.includes("erotic") ||
      !filtered_listing.description.includes("Erotic") ||
      !filtered_listing.tags.includes("erotic") ||
      !filtered_listing.tags.includes("Erotic")
  );

  // list array is filtered based on multi-select dropdown
  filtered_listing = filtered_listing.filter(
    (listing) =>
      listing.taxonomy_path.includes(selectedValues[0]) ||
      listing.taxonomy_path.includes(selectedValues[1]) ||
      listing.taxonomy_path.includes(selectedValues[2]) ||
      listing.taxonomy_path.includes(selectedValues[3]) ||
      listing.taxonomy_path.includes(selectedValues[4]) ||
      listing.taxonomy_path.includes(selectedValues[5]) ||
      listing.taxonomy_path.includes(selectedValues[6]) ||
      listing.taxonomy_path.includes(selectedValues[7]) ||
      listing.taxonomy_path.includes(selectedValues[8]) ||
      listing.taxonomy_path.includes(selectedValues[9]) ||
      listing.taxonomy_path.includes(selectedValues[10]) ||
      listing.taxonomy_path.includes(selectedValues[11])
  );

  //KENNY ADD filtered_listing in the Catalog table for the sponsor
  // call updatecatalogrules route
  console.log(filtered_listing);

  const save_catalog_notify = () => {
    toast("Catalog has been saved for Drivers");
  };

  return (
    <div className="Edit Catalog">
      <SponsorNav />
      <center>
        <div className="editing">
          <h1>
            Click this button to retrieve the most active listings from Etsy
            (this will take around five seconds)
          </h1>
          <h3 style={{ color: "red" }}>
            Every Catalog Item Displayed to the Driver is in Stock{" "}
          </h3>
          <h3 style={{ color: "red" }}>
            Catalog will not have any Explicit Items
          </h3>
          <br></br>
          <button className="button_1" onClick={fetchData}>
            {" "}
            Retrieve the Most Active Listings from Etsy{" "}
          </button>
          <br></br>

          <h1 style={{}}>
            Edit your Catalog by Choosing Categories to be Displayed
          </h1>
          <br></br>

          <Select
            styles={{
              width: 50,
              height: 35,
            }}
            name="categories"
            onChange={handleChange}
            isMulti
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
          />
          <br></br>

          <button
            className="button_1"
            onClick={save_catalog_notify}
            style={{ float: "right" }}
          >
            {" "}
            Save Catalog{" "}
          </button>
        </div>
      </center>
      <Footer />
    </div>
  );
}
