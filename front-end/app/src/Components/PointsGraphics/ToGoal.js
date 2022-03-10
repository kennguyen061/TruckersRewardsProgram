import "./ToGoal.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
function ProgressBar() {
  var totalPoints = 2000;
  var goal = 9000;
  var ratio = (totalPoints / goal) * 100;
  ratio = ratio - (ratio % 1);

  return (
    <div className="progress-bar">
      <div className="container">
        <div className="Left">
          <div className="total">
            <div className="box">
              <div className="tot">
                <h2>Total Points</h2>
                <h2>{totalPoints}</h2>
              </div>
            </div>
            <div className="togoal">
              <div className="box">
                <h2>How close you are to your goal.</h2>
                <div className="featuredChart">
                  <CircularProgressbar
                    value={ratio}
                    text={ratio + "%"}
                    strokeWidth={10}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="log">
            <div className="box">
              <p>This will have the history of point transactions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
