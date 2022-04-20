import { useEffect, useState } from "react";
import ReportGenerator from "../ReportGenerator";

import "./SponsorReport.css";

const SponsorCurrentDrivers = () => {
  const [data, setData] = useState([]);

  const createRows = async () => {
    let SID = window.localStorage.getItem("sid");
    const url = new URL("http://18.235.52.212:8000/drivermgt/viewdrivers");

    url.searchParams.append("SID", SID);

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data2 = await response.json();
    setData(data2);
  };
  createRows();

  return (
    <ReportGenerator
      title="Sponsor Drivers"
      filename="Sponsor-Current-Drivers.pdf"
    >
      {/* You could dynamically generate this ... this example does not. */}
      <div className="ReportStyle">
        <h1>Sponsor Curent Drivers</h1>
        <p>This is a report of all drivers</p>
        <table>
          <thead>
            <tr>
              <th>Driver</th>
              <th>Address</th>
              <th>Phone number</th>
              <th> Email</th>
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

          {/*
          <tr>
            <td>Bob</td>
            <td>111 One St Somewhere PA</td>
            <td>888-888-8888</td>
            <td>Bob@sposor.net</td>
          </tr>

          <tr>
            <td>Bob</td>
            <td>111 One St Somewhere PA</td>
            <td>888-888-8888</td>
            <td>Bob@sposor.net</td>
          </tr>

          <tr>
            <td>Bob</td>
            <td>111 One St Somewhere PA</td>
            <td>888-888-8888</td>
            <td>Bob@sposor.net</td>
          </tr>
  */}
        </table>
      </div>
    </ReportGenerator>
  );
};

export default SponsorCurrentDrivers;
