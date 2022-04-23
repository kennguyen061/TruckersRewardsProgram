import DriverNav from "../UI/DriverNav";
import "./Application.css";

import { useEffect, useState } from "react";

import Footer from "../Footer/Footer";

function Application(props) {
  //get sponsor names
  const [sponsors, setSponsors] = useState([]);
  const id = window.localStorage.getItem("id");

  useEffect(() => {
    const url = new URL("http://18.235.52.212:8000/application/getAllSponsors");
    //fetch all sponsors
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data2) => setSponsors(data2));
  }, []); //update on sponsors?

  const submitHandler = async (data) => {
    //stop normal submit
    //get driver data - await
    //set sponsor that we are applying to
    //put info together
    //send off - await
    //redirect back to profile
  };
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div>
      <DriverNav />
      <div className="spacer"></div>
      <div>
        <div className="sponsor-filter">
          <h1>Which Sponsor would you like to apply to ?</h1>
          <h2>Please choose the sponsor you would like to join</h2>
          <div className="expenses-filter_control">
            <select value={props.selected} onChange={dropdownChangeHandler}>
              {sponsors.map((s) => (
                <option value={s}> {s.name} </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Application;
