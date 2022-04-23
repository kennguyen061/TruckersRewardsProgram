import "./PointTake.css";
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import SponsorNav from "../UI/SponsorNav";

const PointTake = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPointChange, setEnteredPointChange] = useState(0);
  const [driversID, setDriversID] = useState(0);
  const [driversCurrPoints, setDriversCurrPoints] = useState(0);

  let go = 0;
  const SubmitHandler = (event) => {
    event.preventDefault();
    const dataSet = {
      Email: enteredEmail,
      Changa: enteredPointChange,
    };
    go++;
    console.log(go);
    console.log(dataSet);
  };

  const sid = 1;
  //get the driver id from email
  useEffect(() => {
    //Start of url1 ****************************************************
    const url1 = new URL(
      "http://18.235.52.212:8000/drivermgt/getDriverByEmail"
    ); //params are email

    url1.searchParams.append("Email", enteredEmail);

    //console.log(url1);

    fetch(url1, {
      method: "GET",
      headers: { "Content-Type": "Drivermanagement/json" },
    })
      .then((res) => res.json())
      .then((num) => setDriversID(num));

    console.log(driversID);
    //This returns {UID: 4} how do I get just the 4 to update UID param right?
    let trueID = parseInt(driversID.UID);
    console.log(trueID);

    /*
    //Start of url2 *****************************************************
    const url2 = new URL("http://18.235.52.212:8000/points/"); //params are id and sid

    url2.searchParams.append("UID", trueID);
    url2.searchParams.append("SID", sid);

    //console.log(url2);

    fetch(url2, {
      method: "GET",
      headers: { "Content-Type": "Points/json" },
    })
      .then((res) => res.json())
      .then((num) => setDriversCurrPoints(num));

    console.log("This is current Points:");
    console.log(typeof driversCurrPoints);
    console.log(driversCurrPoints);
    //This should work right becuase it is the direct grab from ToGoal.

    let curr = parseInt(driversCurrPoints);
    let chan = parseInt(enteredPointChange);

    let newAmount = curr + chan;
    console.log("The new point amount:" + newAmount);
    console.log(typeof newAmount);

    //start of url3 ***********************************************************
    const url3 = new URL("http://18.235.52.212:8000/points/update"); //params are

    const stuff = {
      SID: sid,
      UID: trueID,
      newAmount: newAmount,
      reason: "good work",
    };

    fetch(url3, {
      method: "POST",
      headers: { "Content-Type": "Points/json" },
      body: JSON.stringify(stuff),
    });

    console.log("Thats all check points page for update");
    */
  }, [enteredEmail]);

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
