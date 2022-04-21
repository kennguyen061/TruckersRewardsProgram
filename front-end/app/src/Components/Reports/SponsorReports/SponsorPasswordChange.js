import { useState, useEffect } from "react";
import ReportGenerator from "../ReportGenerator";

import "./SponsorReport.css";

const SponsorPassword = () => {
  return (
    <ReportGenerator
      title="Sponsor Driver Password Changes"
      filename="Sponsor-Driver-Password-Changes.pdf"
    >
      {/* You could dynamically generate this ... this example does not. */}
      <div className="ReportStyle">
        <h1>Sponsor Driver Password Changes</h1>
        <p>This is a report of all driver password changes </p>
        <table>
          <tr>
            <th>Driver</th>
            <th>Date Changed</th>
            <th> Reason</th>
          </tr>

          <tr>
            <td>Bob</td>
            <td>9/1/11</td>
            <td>Locked out</td>
          </tr>

          <tr>
            <td>Bob</td>
            <td>9/1/11</td>
            <td>Locked out</td>
          </tr>

          <tr>
            <td>Bob</td>
            <td>9/1/11</td>
            <td>Locked out</td>
          </tr>
        </table>
      </div>
    </ReportGenerator>
  );
};

export default SponsorPassword;
