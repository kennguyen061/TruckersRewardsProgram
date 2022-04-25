import "./ToGoal.css";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const ProgressBar = () => {
  //changed var to let
  // var should never be used as it is bad syntax in new version of javascript like we are using

  const id = window.localStorage.getItem("id");
  const sid = window.localStorage.getItem("sid");

  const [returnedCurrentPoints, setReturnedPoints] = useState(0);

  const url = new URL("http://18.235.52.212:8000/points/");

  useEffect(() => {
    url.searchParams.append("UID", id);
    url.searchParams.append("SID", sid);

    console.log(url);

    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((num) => setReturnedPoints(num));
  }, [sid]);

  return (
    <div className="progress-bar">
      <div className="box">
        <div className="tot">
          <h2>{"Hello, as of today you currently have:"}</h2>
          <h2>{`${returnedCurrentPoints} points`} </h2>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
