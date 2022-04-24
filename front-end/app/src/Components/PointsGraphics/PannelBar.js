import "./PannelBar";
import Collapsible from "react-collapsible";

function Accord() {
  const gogo = async (event) => {
    const url = new URL("http://18.235.52.212:8000/points/history");

    url.searchParams.append("UID", window.localStorage.getItem("id"));
    url.searchParams.append("SID", window.localStorage.getItem("sid"));

    const res1 = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const res1J = await res1.json();

    let length = Object.keys(res1J).length;
    console.log(length);

    window.localStorage.setItem(
      "REASON1",
      "On " +
        res1J[length - 1].PointDate +
        " you went to " +
        res1J[length - 1].Point_Update +
        " for the reason of " +
        res1J[length - 1].Update_Status
    );
    window.localStorage.setItem(
      "REASON2",
      "On " +
        res1J[length - 2].PointDate +
        " you went to " +
        res1J[length - 2].Point_Update +
        " for the reason of " +
        res1J[length - 2].Update_Status
    );
    let reason1 = window.localStorage.getItem("REASON1");
    let reason2 = window.localStorage.getItem("REASON2");
  };
  return (
    <div className="boxed">
      <Collapsible trigger="First" onChange={gogo}>
        <p color="black">{window.localStorage.getItem("REASON1")}</p>
      </Collapsible>
      <Collapsible trigger="second" onChange={gogo}>
        <p>{window.localStorage.getItem("REASON2")}</p>
      </Collapsible>
    </div>
  );
}

export default Accord;
