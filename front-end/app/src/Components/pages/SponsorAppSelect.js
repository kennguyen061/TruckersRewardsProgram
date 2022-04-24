import { useEffect, useState } from "react";
import DriverNav from "../UI/DriverNav";
import Footer from "../Footer/Footer";

import "./SponsorAppSelect.css";

function SponsorAppSelect(props) {
  const [returnedDrivers, setReturnedDrivers] = useState([]);
  const [numDrivers, setnumDrivers] = useState(false);
  const [reason, setReason] = useState("");

  const sid = window.localStorage.getItem("sid");

  const url = new URL(
    "http://18.235.52.212:8000/application/getAllSponsorApps"
  );

  url.searchParams.append("SID", 2);

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
    status = event.target.value;
    console.log(status);
  };

  const submitHandler = async (event) => {
    //stop normal submit
    event.preventDefault();
    let uid = event.target.dataset.driver;

    console.log(uid);
    console.log(reason);

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
      console.log("send approved");
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

  let status = "Approved";

  return (
    <div>
      <DriverNav />
      <div className="spacer"></div>

      <div className="content">
        <div>
          <h1>New Sponsor Applicants</h1>
          <h2> Please accept and reject all new applicants</h2>
        </div>
        <div className="app-box">
          <div>
            {numDrivers ? (
              <div>
                {returnedDrivers.map((driver) => (
                  <div>
                    {" "}
                    <form onSubmit={submitHandler} data-driver={driver.UID}>
                      <div>{driver.First_name + " " + driver.Last_name}</div>
                      <div>{driver.Email}</div>
                      <div> {"In Progress"}</div>
                      <div> {driver.AppDate}</div>
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

        <Footer />
      </div>
    </div>
  );
}

export default SponsorAppSelect;
