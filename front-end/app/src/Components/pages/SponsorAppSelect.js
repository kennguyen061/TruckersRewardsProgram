import { useEffect, useState } from "react";
import DriverNav from "../UI/DriverNav";
import Footer from "../Footer/Footer";

import "./SponsorAppSelect.css";

function SponsorAppSelect(props) {
  const [returnedDrivers, setReturnedDrivers] = useState([]);
  const [numDrivers, setnumDrivers] = useState(false);
  const [appStatus, setAppStatus] = useState("Approved");
  const [userSubmited, setUserSubmited] = useState([]);
  const sid = window.localStorage.getItem("sid");

  useEffect(() => {
    const url = new URL(
      "http://18.235.52.212:8000/application/getAllSponsorApps"
    );

    url.searchParams.append("SID", 2);
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((driver) => {
        if (driver === false) {
          setnumDrivers(false);
        } else {
          setnumDrivers(true);
          setReturnedDrivers(driver);
        }
      });
  }, []);

  const dropdownChangeHandler = (event) => {
    setAppStatus(event.target.value);
  };

  const submitHandler = async (event) => {
    //stop normal submit
    event.preventDefault();
    console.log(appStatus);
    console.log(event.target.dataset.driver);
  };

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
                    <form
                      onSubmit={submitHandler}
                      data-driver={driver.First_name}
                    >
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
