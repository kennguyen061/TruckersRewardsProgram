import "./ToGoal.css";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PannelBar from "./PannelBar";

function ProgressBar() {
  //changed var to let
  // var should never be used as it is bad syntax in new version of javascript like we are using

  const role = window.localStorage.getItem("role");
  const id = window.localStorage.getItem("id");
  const sid = window.localStorage.getItem("sid");

  const [returnedCurrentPoints, setReturnedPoints] = useState("point");

  const pointHandler = (item) => {
    setReturnedPoints(item);
  };

  const url = new URL("http://18.235.52.212:8000/points/");

  url.searchParams.append("role", role);
  url.searchParams.append("id", id);
  url.searchParams.append("sid", sid);
  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "points/json" },
    })
      .then((response) => response.json())
      .then((curr) => {
        pointHandler(curr.point);
      });
  }, [returnedCurrentPoints]);

  return (
    <div className="progress-bar">
      <div className="container">
        <div className="Left">
          <div className="total">
            <div className="box">
              <div className="tot">
                <h2>Total Points</h2>
                <h2>{returnedCurrentPoints}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="log">
            <div className="box">
              <div className="pannelBar">
                <PannelBar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
