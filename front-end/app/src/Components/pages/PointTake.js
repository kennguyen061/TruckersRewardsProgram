import "./PointTake.css";
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import SponsorNav from "../UI/SponsorNav";

const PointTake = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPointChange, setEnteredPointChange] = useState(0);
  const [driversID, setDriversID] = useState(0);
  const [driversCurrPoints, setDriversCurrPoints] = useState(0);
  const sid = window.localStorage.getItem("sid");

  const SubmitHandler = (event) => {
    event.preventDefault();
    const dataSet = {
      Email: enteredEmail,
      Changa: enteredPointChange,
    };

    console.log(dataSet);
    const url1 = new URL(
      "http://18.235.52.212:8000/drivermgt/getDriverByEmail"
    ); //params are email

    url1.searchParams.append("Email", enteredEmail);

    const url2 = new URL("http://18.235.52.212:8000/points/");

    const url3 = new URL("http://18.235.52.212:8000/points/update");

    const stuff = {
      SID: sid,
      UID: driversID,
      newAmount: driversCurrPoints,
      reason: "good work",
    };

    fetch(url1, {
      method: "GET",
      headers: { "Content-Type": "Drivermanagement/json" },
    })
      .then((res) => res.json())
      .then((num) => setDriversID(num))
      .then(() => {
        let trueID = parseInt(driversID.UID);
        console.log(trueID);
        setDriversID(trueID);
      })
      .then(() => {
        url2.searchParams.append("UID", driversID);
        url2.searchParams.append("SID", sid);
      })
      .then(
        fetch(url2, {
          method: "GET",
          headers: { "Content-Type": "Points/json" },
        })
          .then((res) => res.json())
          .then((num) => setDriversCurrPoints(num))
      )
      .then(() => {
        let curr = parseInt(driversCurrPoints);
        let chan = parseInt(enteredPointChange);

        console.log(curr + "fucking what" + chan);

        setDriversCurrPoints(curr + chan);
        console.log("The new point amount:" + driversCurrPoints);
      })
      .then(
        fetch(url3, {
          method: "POST",
          headers: { "Content-Type": "Points/json" },
          body: JSON.stringify(stuff),
        })
      );
    console.log("Thats all check points page for update");
    console.log(stuff);
  };

  return (
    <div className="PointTakePage">
      <SponsorNav />
      <div className="spacer"></div>
      <h2>Please Change the Points first!</h2>
      <form onSubmit={SubmitHandler}>
        <label>Enter Persons Email:</label>
        <input
          type="text"
          name="Email"
          value={enteredEmail}
          onChange={(event) => setEnteredEmail(event.target.value)}
        />

        <label>Enter point Change:</label>
        <input
          type="number"
          name="Changa:"
          value={enteredPointChange}
          onChange={(event) => setEnteredPointChange(event.target.value)}
        />

        <input type="submit" />
      </form>
      <div className="spacer"></div>
      <Footer />
    </div>
  );
};

export default PointTake;
