import { useState, useEffect } from "react";
import ReportGenerator from "../ReportGenerator";

import "./SponsorReport.css";

const SponsorDriverApp = () => {
  const [data, setData] = useState([]);
  const [sponsor, setSponsor] = useState("Sponsor");
  let SID = window.localStorage.getItem("sid");

  useEffect(() => {
    const url = new URL(
      "http://18.235.52.212:8000/application/getAllSponsorApps"
    );

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
  }, []);

  return (
    <ReportGenerator
      title="Sponsor Driver Applications"
      filename="Sponsor-Driver-Apps.pdf"
    >
      {/* You could dynamically generate this ... this example does not. */}
      <div className="ReportStyle">
        <h1>`${sponsor}'s Driver Application Report</h1>
        <p>This is a report of all driver apps</p>
        <table>
          <thead>
            <tr>
              <th>Driver</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Application Status</th>
              <th>Date Applied</th>
              <th> Reason</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr>
                <td>{item.First_name + " " + item.Last_name}</td>
                <td>{item.Email} </td>
                <td>{item.Phone_number}</td>
                <td>{item.AppStatus}</td>
                <td>{item.AppDate}</td>
                <td>{item.Reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ReportGenerator>
  );
};

export default SponsorDriverApp;
