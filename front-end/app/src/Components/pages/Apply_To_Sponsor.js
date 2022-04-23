import DriverNav from "../UI/DriverNav";
import "./Application.css";

import Footer from "../Footer/Footer";

function Application() {
  //get sponsor names

  return (
    <div>
      <DriverNav />
      <div className="spacer"></div>
      <div>
        <div>
          <p>{`Select your Sponsor -> `}</p>
          <p> {/*add drop down box */} </p>
          <p> {/*Sponsor info*/} </p>
          <p> {/*Submit button*/} </p>
          <p> {/* redirect to profile */} </p>
        </div>
      </div>
    </div>
  );
}

export default Application;
