import { useState, useEffect } from "react";
import ReportGenerator from "../ReportGenerator";

import "./SponsorReport.css";

const AdminMostBought = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = new URL("http://18.235.52.212:8000/reports/getAllMostBought");

    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data2) => setData(data2));
  }, []);

  return (
    <ReportGenerator
      title="Admin Most Bought Rewards"
      filename="Admin-Most-Bought.pdf"
    >
      <div className="ReportStyle">
        <h1>{`Roger's Rewards's Most Bought Rewards`}</h1>
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

export default AdminMostBought;
