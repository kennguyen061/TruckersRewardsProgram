import { useState, useEffect } from "react";
import ReportGenerator from "../ReportGeneratorS";

import "./SponsorReport.css";

const SponsorPassword = () => {
  const [data, setData] = useState([]);
  const [sponsor, setSponsor] = useState("Sponsor");
  let SID = window.localStorage.getItem("sid");

  useEffect(() => {
    const url = new URL("http://18.235.52.212:8000/reports/sponsorPwdChanges");

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
      title="Sponsor Driver Password Changes"
      filename="Sponsor-Driver-Password-Changes.pdf"
    >
      <div className="ReportStyle">
        <h1>{`${sponsor}'s Password Changes`}</h1>

        <p>This is a report of all driver password changes </p>
        <table>
          <thead>
            <tr>
              <th>Driver</th>
              <th>Date Changed</th>
              <th>User Type</th>
            </tr>
          </thead>
          <tbody>
            <tbody>
              {data.map((item) => (
                <tr>
                  <td>{item.Email}</td>
                  <td>{item.Pwd_date}</td>
                  <td>{item.User_type} </td>
                </tr>
              ))}
            </tbody>
          </tbody>
        </table>
      </div>
    </ReportGenerator>
  );
};

export default SponsorPassword;
