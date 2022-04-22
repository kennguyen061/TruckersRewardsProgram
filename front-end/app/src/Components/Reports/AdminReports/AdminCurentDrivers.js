import { useState, useEffect } from "react";
import ReportGenerator from "../ReportGenerator";

import "./SponsorReport.css";

const SponsorCurrentDrivers = () => {
  const [data, setData] = useState([]);
  const [sponsor, setSponsor] = useState("Sponsor");
  let SID = window.localStorage.getItem("sid");

  useEffect(() => {
    const url = new URL("http://18.235.52.212:8000/drivermgt/viewdrivers");

    url.searchParams.append("SID", SID);

    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setData(data));

    const urlName = new URL("http://18.235.52.212:8000/reports/SponsorName");

    urlName.searchParams.append("sid", SID);

    fetch(urlName, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((comp) => setSponsor(comp));
  }, [SID]);

  return (
    <ReportGenerator
      title="Sponsor Drivers"
      filename="Sponsor-Current-Drivers.pdf"
    >
      <div className="ReportStyle">
        <h1>{`${sponsor}'s Curent Drivers`}</h1>
        <p>This is a report of all drivers</p>
        <table>
          <thead>
            <tr>
              <th>Driver</th>
              <th>Address</th>
              <th>Phone number</th>
              <th> Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr>
                <td>{item.First_name + " " + item.Last_name}</td>
                <td>{item.Address}</td>
                <td>{item.Phone_number}</td>
                <td>{item.Email} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ReportGenerator>
  );
};

export default SponsorCurrentDrivers;
