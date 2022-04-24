import DriverNav from "../UI/DriverNav";
import { useNavigate } from "react-router-dom";
import "./Apply_To_Sponsor.css";

import { useEffect, useState } from "react";

import Footer from "../Footer/Footer";

function Apply_To_Sponsor(props) {
  //get sponsor names
  const [chosen, setChosen] = useState();
  const [sponsors, setSponsors] = useState([]);
  const id = window.localStorage.getItem("id");
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL("http://18.235.52.212:8000/application/getAllSponsors");
    //fetch all sponsors
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data2) => {
        setSponsors(data2);
        setChosen(data2[0].SID);
      });
  }, []); //update on sponsors?

  const submitHandler = async (event) => {
    //stop normal submit
    event.preventDefault();
    //get driver data - await

    const appInfo = {
      UID: id,
      SID: chosen,
    };
    console.log(appInfo);

    const url2 = new URL(
      "http://18.235.52.212:8000/application/createApplication"
    );

    fetch(url2, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appInfo),
    }).then((res) => {
      //nothing for now
    });

    //redirect back to profile
    navigate("/pages/Driver_Profile", { replace: false });
  };
  const dropdownChangeHandler = (event) => {
    setChosen(event.target.value);
  };

  return (
    <div className="main">
      <DriverNav />
      <div className="spacer"></div>
      <div className="App">
        <div className="sponsor-filter">
          <h1>Which Sponsor would you like to apply to ?</h1>
          <h2>Please choose the sponsor you would like to join</h2>
          <form onSubmit={submitHandler} className="expenses-filter_control">
            <select value={props.selected} onChange={dropdownChangeHandler}>
              {sponsors.map((s) => (
                <option value={s.SID} key={s.SID}>
                  {" "}
                  {s.name}{" "}
                </option>
              ))}
            </select>
            <button>APPLY TO SPONSOR</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Apply_To_Sponsor;
