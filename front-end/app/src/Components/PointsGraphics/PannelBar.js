import "./PannelBar";
import Collapsible from "react-collapsible";

const Accord = () => {
  const url = new URL("http://18.235.52.212:8000/points/history");

  const id = window.localStorage.getItem("id");
  const sid = window.localStorage.getItem("sid");

  url.searchParams.append("UID", id);
  url.searchParams.append("SID", sid);

  console.log(url);

  const fuck = async () => {
    const res1 = fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const res1J = res1.json();

    let length = Object.keys(res1J).length;
    console.log(length);
    console.log("Yea its the at the set items");
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
  };

  let reason1 = window.localStorage.getItem("REASON1");
  let reason2 = window.localStorage.getItem("REASON2");
  return (
    <div className="boxed">
      <Collapsible trigger="latest Change">
        <p>{reason1}</p>
      </Collapsible>
      <Collapsible trigger="latest Change">
        <p>{reason2}</p>
      </Collapsible>
    </div>
  );
};

export default Accord;
