import ReportGenerator from "../ReportGenerator";

import "./SponsorReport.css";

const SponsorCurrentDrivers = () => {
  const createRows = async () => {
    let SID = window.localStorage.getItem("sid");
    const url = new URL("http://18.235.52.212:8000/drivermgt/viewdrivers");

    url.searchParams.append("SID", SID);

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    console.log(data);
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
          <tr>
            <th>Driver</th>
            <th>Address</th>
            <th>Phone number</th>
            <th> Email</th>
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

          <tr>
            <td>Bob</td>
            <td>111 One St Somewhere PA</td>
            <td>888-888-8888</td>
            <td>Bob@sposor.net</td>
          </tr>
        </table>
      </div>
    </ReportGenerator>
  );
};

export default SponsorCurrentDrivers;
