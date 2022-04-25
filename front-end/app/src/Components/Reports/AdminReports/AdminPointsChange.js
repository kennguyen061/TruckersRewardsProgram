import { useState, useEffect } from "react";
import ReportGenerator from "../ReportGenerator";
import "./SponsorReport.css";

const AdminPoints = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = new URL("http://18.235.52.212:8000/reports/pointChangeAll");

    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data2) => setData(data2));
  }, []);
  return (
    <ReportGenerator title="Admin Driver Points" filename="Admin-Driver-Points">
      <div className="ReportStyle">
        <h1>{`Roger's Rewards's Driver Points`}</h1>

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

export default AdminPoints;
