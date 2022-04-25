import { useState, useEffect } from "react";
import ReportGenerator from "../ReportGenerator";
import "./SponsorReport.css";

const AdminLogin = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = new URL("http://18.235.52.212:8000/reports/allLoginAttempts");

    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data2) => setData(data2));
  }, []);
  return (
    <ReportGenerator
      title="Admin Driver Login Attempts"
      filename="Admin-Driver-Login-Attempts.pdf"
    >
      <div className="ReportStyle">
        <h1>{`Roger's Rewards's Driver Login Attempts`}</h1>
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

export default AdminLogin;
