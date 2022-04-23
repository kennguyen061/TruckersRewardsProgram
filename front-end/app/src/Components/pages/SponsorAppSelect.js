import { useEffect, useState } from "react";
import DriverNav from "../UI/DriverNav";
import Footer from "../Footer/Footer";

import "./SponsorAppSelect.css";

function SponsorAppSelect(props) {
  const [returnedDrivers, setReturnedDrivers] = useState([]);
  const [numDrivers, setnumDrivers] = useState(false);

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
    //console.log(appStatus);
    //console.log(event.target.dataset.driver);
    let d;
    returnedDrivers.map((driver) => {
      if ((driver.UID = event.target.dataset.driver)) {
        d = driver;
      }
    });

    console.log(d);

    if (status == "Approved") {
      console.log("send approved");
    } else {
      console.log("send Reject");
    }
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
