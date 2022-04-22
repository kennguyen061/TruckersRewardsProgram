import { useState, useEffect } from "react";
import ReportGenerator from "../ReportGenerator";

import "./SponsorReport.css";

const SponsorLeastBought = () => {
  const [data, setData] = useState([]);
  const [sponsor, setSponsor] = useState("Sponsor");
  let SID = window.localStorage.getItem("sid");

  useEffect(() => {
    const url = new URL("http://18.235.52.212:8000/reports/boughtDESC");

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
      title="Sponsor Least Bought Rewards"
      filename="Sponsor-Least-Bought.pdf"
    >
      <div className="ReportStyle">
        <h1>Sponsor Least Bought Rewards</h1>
        <p>This is a report of the least bought rewards</p>
        <table>
          <thead>
            <tr>
              <th>Reward</th>
              <th>Cost</th>
              <th>Points</th>
              <th>Rank</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => {
              <tr>{item.name}</tr>
              <tr>item.</tr>
            })}
          </tbody>
          {/*

          <tr>
            <td>Yo Momma</td>
            <td>$25.99</td>
            <td>5,000,000</td>
            <td>11</td>
          </tr>

          <tr>
            <td>Yo Momma</td>
            <td>$25.99</td>
            <td>5,000,000</td>
            <td>11</td>
          </tr>

          <tr>
            <td>Yo Momma</td>
            <td>$25.99</td>
            <td>5,000,000</td>
            <td>11</td>
          </tr>
          */}
        </thead>
      </div>
    </ReportGenerator>
  );
};

export default SponsorLeastBought;
