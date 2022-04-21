import { useState, useEffect } from "react";
import ReportGenerator from "../ReportGenerator";
import "./SponsorReport.css";

const SponsorPoints = () => {
  return (
    <ReportGenerator
      title="Sponsor Driver Points"
      filename="Sponsor-Driver-Points"
    >
      {/* You could dynamically generate this ... this example does not. */}
      <div className="ReportStyle">
        <h1>Sponsor Driver Points</h1>
        <p>This is a report of all driver points</p>
        <table>
          <tr>
            <th>Driver</th>
            <th>Curent Total</th>
            <th>Lifetime Total</th>
            <th>Rewards redeemed</th>
          </tr>

          <tr>
            <td>Bob</td>
            <td>5</td>
            <td>7</td>
            <td>1</td>
          </tr>

          <tr>
            <td>Bob</td>
            <td>5</td>
            <td>7</td>
            <td>1</td>
          </tr>

          <tr>
            <td>Bob</td>
            <td>5</td>
            <td>7</td>
            <td>1</td>
          </tr>
        </table>
      </div>
    </ReportGenerator>
  );
};

export default SponsorPoints;
