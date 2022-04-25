import "./ReportsHomepage.css";
import NewNav from "../UI/SponsorNav";
import { Link } from "react-router-dom";

const SponsorReportsHomepage = () => {
  return (
    <div className="SponsorReports">
      <NewNav />
      <div className="Spacer"></div>
      <div className="ReportsSection">
        <div className="ReportsTitle">
          <h1>Sponsor Reports</h1>
          <h2>Select your reports below</h2>
        </div>
        <div>
          <table>
            <tr>
              <td>
                <Link
                  to="/Reports/SponsorReports/CurrentDrivers"
                  className="Reports-Link"
                >
                  Current Drivers Report
                </Link>
              </td>
              <td>
                <Link
                  to="/Reports/SponsorReports/DriverApp"
                  className="Reports-Link"
                >
                  Driver Application Report
                </Link>
              </td>
              <td>
                <Link
                  to="/Reports/SponsorReports/LeastBought"
                  className="Reports-Link"
                >
                  Least Bought Rewards Report
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link
                  to="/Reports/SponsorReports/MostBought"
                  className="Reports-Link"
                >
                  Most Bought Rewards Report
                </Link>
              </td>
              <td>
                <Link
                  to="/Reports/SponsorReports/LoginAttempts"
                  className="Reports-Link"
                >
                  Login Attempts Report
                </Link>
              </td>
              <td>
                <Link
                  to="/Reports/SponsorReports/PasswordReport"
                  className="Reports-Link"
                >
                  Password Changes Report
                </Link>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <Link
                  to="/Reports/SponsorReports/DriversPoints"
                  className="Reports-Link"
                >
                  {" "}
                  Points Awarded Report
                </Link>
              </td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SponsorReportsHomepage;
