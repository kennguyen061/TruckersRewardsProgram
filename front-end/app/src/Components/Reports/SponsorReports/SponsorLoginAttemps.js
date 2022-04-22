import { useState, useEffect } from "react";
import ReportGenerator from "../ReportGenerator";
import "./SponsorReport.css";

const SponsorLogin = () => {
  const [data, setData] = useState([]);
  const [sponsor, setSponsor] = useState("Sponsor");
  let SID = window.localStorage.getItem("sid");

  useEffect(() => {
    const url = new URL(
      "http://18.235.52.212:8000/reports/sponsorLoginAttempts"
    );

    url.searchParams.append("SID", SID);

    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data2) => setData(data2));

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
      title="Sponsor Driver Login Attempts"
      filename="Sponsor-Driver-Login-Attempts.pdf"
    >
      <div className="ReportStyle">
        <h1>{`${sponsor}'s Driver Login Attempts`}</h1>
        <p>This is a report of all attempts to login</p>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr>
                <td>{item.Username}</td>
                <td>{item.Login_date}</td>
                <td>{item.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ReportGenerator>
  );
};

export default SponsorLogin;
