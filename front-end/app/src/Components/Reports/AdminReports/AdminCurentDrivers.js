import { useState, useEffect } from "react";
import ReportGenerator from "../ReportGenerator";

import "./SponsorReport.css";

const AdminCurrentDrivers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = new URL("http://18.235.52.212:8000/reports/getAllDrivers");

    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data2) => setData(data2));
  }, []);

  return (
    <ReportGenerator title="Admin Drivers" filename="Admin-Current-Drivers.pdf">
      <div className="ReportStyle">
        <h1>{`Roger's Rewards's Current Drivers`}</h1>
        <p>This is a report of all drivers</p>
        <table>
          <thead>
            <tr>
              <th>Driver</th>
              <th>Address</th>
              <th>Phone number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr>
                <td>{item.First_name + " " + item.Last_name}</td>
                <td>{item.Address}</td>
                <td>{item.Phone_number}</td>
                <td>{item.Email} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ReportGenerator>
  );
};

export default AdminCurrentDrivers;
