import { Link } from "react-router-dom";
import "./App.css";
function Home() {
  return (
    <div className="Container">
      <div className="Card">
        <h1 className="Title">Home</h1>
        <div className="Link-box">
          <Link to="/" className="App-link">
            {"Home"}
          </Link>

          <Link to="/Application" className="App-link">
            {"App"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
