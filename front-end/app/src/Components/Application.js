import { Link } from "react-router-dom";
import "../App.css";

function Application() {
  return (
    <div className="Container">
      <div className="Card">
        <h1 className="Title">Application</h1>
        <div className="Link-box">
          <Link to="/" className="App-link">
            {" "}
            Home{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Application;
