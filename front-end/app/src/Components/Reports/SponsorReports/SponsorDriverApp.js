import { useState, useEffect } from "react";
import ReportGenerator from "../ReportGenerator";

import "./SponsorReport.css";

const SponsorDriverApp = () => {
  return (
    <ReportGenerator
      title="Sponsor Driver Applications"
      filename="Sponsor-Driver-Apps.pdf"
    >
      {/* You could dynamically generate this ... this example does not. */}
      <div className="ReportStyle">
        <h1>Sponsor Driver Applications</h1>
        <p>This is a report of all driver apps</p>
        <table>
          <tr>
            <th>Driver</th>
            <th>Application Status</th>
            <th>Date Applied</th>
            <th> Reason</th>
          </tr>

          <tr>
            <td>Bob</td>
            <td>Applied</td>
            <td>9/1/11</td>
            <td></td>
          </tr>

          <tr>
            <td>Phil</td>
            <td>Accepted</td>
            <td>9/1/11</td>
            <td></td>
          </tr>

          <tr>
            <td>Marry</td>
            <td>Rejected</td>
            <td>9/1/11</td>
            <td>Yo Momma Jokes</td>
          </tr>
        </table>
      </div>
    </ReportGenerator>
  );
};

export default SponsorDriverApp;
