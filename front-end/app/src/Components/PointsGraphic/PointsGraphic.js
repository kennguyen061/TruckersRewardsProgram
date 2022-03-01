import "./PointsGraphic.css";
import { Doughnut } from "react-chartjs-2";

function PointsGraphic() {
  return (
    <div className="PointGrah">
      <div className="Graph"></div>
      <div className="content">
        <h1>Current point exchange rate is one point to one penny</h1>
        <h2>
          Think I want a graphic that will show how close you are to a goal.
        </h2>
        <h2>
          When you click on your total points it will change it to show the
          dollar amount it gets converted into.
        </h2>
        <h2>
          Maybe it can look like a truck witht he tail filling up? When its full
          or at the goal is when the cab turns a color!
        </h2>
      </div>
      <div className="History">
        <h1>I think this will be the history?</h1>
      </div>
    </div>
  );
}

export default PointsGraphic;
