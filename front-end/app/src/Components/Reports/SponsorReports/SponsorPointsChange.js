import { useState, useEffect } from "react";
import ReportGenerator from "../ReportGenerator";
import "./SponsorReport.css";

const SponsorPoints = () => {
  const [data, setData] = useState([]);
  const [sponsor, setSponsor] = useState("Sponsor");
  let SID = window.localStorage.getItem("sid");

  useEffect(() => {
    const url = new URL("http://18.235.52.212:8000/reports/pointChangeSponsor");

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
      title="Sponsor Driver Points"
      filename="Sponsor-Driver-Points"
    >
      <div className="ReportStyle">
        <h1>{`${sponsor}'s Driver Points`}</h1>

        <p>This is a report of all driver points</p>
        <table>
          <thead>
            <tr>
              <th>Driver Email</th>
              <th>Update Points</th>
              <th>Date</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr>
                <td>{item.Email}</td>
                <td>{item.Point_Update}</td>
                <td>{Date(Date.parse(item.PointDate.replace(/[-]/g, "/")))}</td>
                <td>{item.Update_Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ReportGenerator>
  );
};

export default SponsorPoints;
