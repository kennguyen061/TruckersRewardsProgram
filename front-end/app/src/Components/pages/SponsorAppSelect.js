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
                    <p>{driver.First_name}</p>
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
