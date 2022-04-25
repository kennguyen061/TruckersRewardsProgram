import { useEffect, useState } from "react";
import SponsorNav from "../UI/SponsorNav";
import Footer from "../Footer/Footer";

import "./SponsorAppSelect.css";

function SponsorAppSelect(props) {
  const [returnedDrivers, setReturnedDrivers] = useState([]);
  const [numDrivers, setnumDrivers] = useState(false);
  const [reason, setReason] = useState("");

  const sid = window.localStorage.getItem("sid");
  window.localStorage.setItem("status", "Approved");

  const url = new URL(
    "http://18.235.52.212:8000/application/getAllSponsorApps"
  );

  url.searchParams.append("SID", sid);

  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data != false) {
          setnumDrivers(true);
          setReturnedDrivers(data);
        }
      });
  }, [sid]);

  const dropdownChangeHandler = (event) => {
    window.localStorage.setItem("status", event.target.value);
  };

  const submitHandler = async (event) => {
    //stop normal submit
    event.preventDefault();
    let uid = event.target.dataset.driver;

    let status = window.localStorage.getItem("status");

    console.log(uid);
    console.log(reason);
    console.log(status);
    const data = {
      UID: uid,
      SID: sid,
      reason: reason,
    };

    let approveURL = new URL(
      "http://18.235.52.212:8000/application/approveapplication"
    );

    let rejectURL = new URL(
      "http://18.235.52.212:8000/application/rejectapplication"
    );

    if (status == "Approved") {
      console.log("send approved");
      const response = await fetch(approveURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log(res);
    } else {
      console.log("send Reject");
      const response = await fetch(rejectURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log(res);
    }

    setReason("");
  };

  return (
    <div>
      <SponsorNav />
      <div className="spacer"></div>

      <div className="content">
        <div>
          <h1>New Sponsor Applicants</h1>
          <h2> Please accept and reject all new applicants</h2>
          <hr />
        </div>
        <div>
          <div>
            {numDrivers ? (
              <div className="app-box">
                {returnedDrivers.map((driver) => (
                  <div className="status-selector">
                    {" "}
                    <form onSubmit={submitHandler} data-driver={driver.UID}>
                      <h2>{driver.First_name + " " + driver.Last_name}</h2>
                      <h2>{driver.Email}</h2>
                      <h2> {"In Progress"}</h2>
                      <h2> {driver.AppDate}</h2>
                      <select
                        value={props.selected}
                        onChange={dropdownChangeHandler}
                      >
                        <option value={"Accepted"}>Accept</option>
                        <option value={"Rejected"}>Decline</option>
                      </select>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="reason"
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                        required
                      />
                      <button>Submit</button>
                    </form>
                    <hr />
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {" "}
                <p> There are no drivers to review</p>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SponsorAppSelect;
