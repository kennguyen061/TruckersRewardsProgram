import { useState, useEffect } from "react";
import ReportGenerator from "../ReportGenerator";
import "./SponsorReport.css";

const SponsorLogin = () => {
  return (
    <ReportGenerator
      title="Sponsor Driver Login Attempts"
      filename="Sponsor-Driver-Login-Attempts.pdf"
    >
      {/* You could dynamically generate this ... this example does not. */}
      <div className="ReportStyle">
        <h1>Sponsor Driver Login Attempts</h1>
        <p>This is a report of all attempts to login</p>
        <table>
          <tr>
            <th>Driver</th>
            <th>Login</th>
            <th>Time</th>
            <th> Reason</th>
          </tr>

          <tr>
            <td>Bob</td>
            <td>Yes</td>
            <td>2:12pm</td>
            <td>Correct password</td>
          </tr>

          <tr>
            <td>Bob</td>
            <td>Yes</td>
            <td>2:12pm</td>
            <td>Correct password</td>
          </tr>

          <tr>
            <td>Bob</td>
            <td>Yes</td>
            <td>2:12pm</td>
            <td>Correct password</td>
          </tr>
        </table>
      </div>
    </ReportGenerator>
  );
};

export default SponsorLogin;
