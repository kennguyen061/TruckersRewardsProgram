import { useState, useEffect } from "react";
import ReportGenerator from "../ReportGenerator";

import "./SponsorReport.css";

const SponsorMostBought = () => {
  const [data, setData] = useState([]);
  const [sponsor, setSponsor] = useState("Sponsor");
  let SID = window.localStorage.getItem("sid");

  useEffect(() => {
    const url = new URL("http://18.235.52.212:8000/reports/boughtASC");

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
      title="Sponsor Most Bought Rewards"
      filename="Sponsor-Most-Bought.pdf"
    >
      <div className="ReportStyle">
        <h1>{`${sponsor}'s Most Bought Rewards`}</h1>
        <p>This is a report of the most bought rewards</p>
        <table>
          <thead>
            <tr>
              <th>Reward</th>
              <th>Rank</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr>
                <td>{item.ItemName}</td>
                <td>{item.Count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ReportGenerator>
  );
};

export default SponsorMostBought;
