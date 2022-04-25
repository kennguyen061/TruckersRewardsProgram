import "./PointTake.css";
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import SponsorNav from "../UI/SponsorNav";

const PointTake = () => {
  const SubmitHandler = async (event) => {
    event.preventDefault();

    const url1 = new URL(
      "http://18.235.52.212:8000/drivermgt/getDriverByEmail"
    ); //params are email

    url1.searchParams.append(
      "Email",
      window.localStorage.getItem("DRIVEREMAIL")
    );

    const url2 = new URL("http://18.235.52.212:8000/points/");

    const url3 = new URL("http://18.235.52.212:8000/points/update");

    const res1 = await fetch(url1, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const res1J = await res1.json();

    window.localStorage.setItem("DRIVERID", parseInt(res1J.UID));

    console.log("changed");
    url2.searchParams.append("UID", window.localStorage.getItem("DRIVERID"));
    url2.searchParams.append("SID", window.localStorage.getItem("sid"));
    console.log(url2);

    const res2 = await fetch(url2, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const res2J = await res2.json();
    window.localStorage.setItem("POINTSPRE", res2J);

    let curr = parseInt(window.localStorage.getItem("POINTSPRE"));
    let sub = parseInt(window.localStorage.getItem("POINTCHG"));

    window.localStorage.setItem("POINTSPOST", curr + sub);

    const stuff = {
      SID: window.localStorage.getItem("sid"),
      UID: window.localStorage.getItem("DRIVERID"),
      newAmount: window.localStorage.getItem("POINTSPOST"),
      reason: window.localStorage.getItem("BECAUSE"),
    };

    fetch(url3, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stuff),
    });
    console.log("Thats all check points page for update");
    console.log(stuff);
  };

  return (
    <div className="PointTakePage">
      <SponsorNav />
      <div className="spacer"></div>
      <h2 className="Header">
        Hello, please input the email of the driver you'd like to input
      </h2>
      <form onSubmit={SubmitHandler}>
        <label className="Tags">Enter Persons Email:</label>
        <input
          type="text"
          name="Email"
          value={window.localStorage.getItem("DRIVEREMAIL")}
          onChange={(event) =>
            window.localStorage.setItem("DRIVEREMAIL", event.target.value)
          }
        />

        <label className="Tags">Enter point Change:</label>
        <input
          type="number"
          name="Changa:"
          value={window.localStorage.getItem("POINTCHG")}
          onChange={(event) =>
            window.localStorage.setItem(
              "POINTCHG",
              parseInt(event.target.value)
            )
          }
        />
        <label className="Tags">Reason for changing points:</label>
        <input
          type="text"
          name="WhyTho"
          value={window.localStorage.getItem("BECAUSE")}
          onChange={(event) =>
            window.localStorage.setItem("BECAUSE", event.target.value)
          }
        />

        <input type="submit" />
      </form>
      <div className="spacer"></div>
      <Footer />
    </div>
  );
};

export default PointTake;
