import { useState, useEffect } from "react";
import ReportGenerator from "../ReportGenerator";

import "./SponsorReport.css";

const SponsorLeastBought = () => {
  return (
    <ReportGenerator
      title="Sponsor Least Bought Rewards"
      filename="Sponsor-Least-Bought.pdf"
    >
      {/* You could dynamically generate this ... this example does not. */}
      <div className="ReportStyle">
        <h1>Sponsor Least Bought Rewards</h1>
        <p>This is a report of the least bought rewards</p>
        <table>
          <tr>
            <th>Reward</th>
            <th>Cost</th>
            <th>Points</th>
            <th>Rank</th>
          </tr>

          <tr>
            <td>Yo Momma</td>
            <td>$25.99</td>
            <td>5,000,000</td>
            <td>11</td>
          </tr>

          <tr>
            <td>Yo Momma</td>
            <td>$25.99</td>
            <td>5,000,000</td>
            <td>11</td>
          </tr>

          <tr>
            <td>Yo Momma</td>
            <td>$25.99</td>
            <td>5,000,000</td>
            <td>11</td>
          </tr>
        </table>
      </div>
    </ReportGenerator>
  );
};

export default SponsorLeastBought;
