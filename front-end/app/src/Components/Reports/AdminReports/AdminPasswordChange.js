import { useState, useEffect } from "react";
import ReportGenerator from "../ReportGenerator";

import "./SponsorReport.css";

const AdminPassword = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = new URL("http://18.235.52.212:8000/reports/allPwdChanges");

    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data2) => setData(data2));
  }, []);
  return (
    <ReportGenerator
      title="Admin Driver Password Changes"
      filename="Admin-Driver-Password-Changes.pdf"
    >
      <div className="ReportStyle">
        <h1>{`Roger's Rewards's Password Changes`}</h1>

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

export default AdminPassword;
