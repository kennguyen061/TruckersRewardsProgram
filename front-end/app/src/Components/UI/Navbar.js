import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="NavBox">
      <h2 className="space" />
      <Link to="/" className="NavLink">
        {" "}
        <button type="button" className="NavButton">
          {" "}
          Home{" "}
        </button>{" "}
      </Link>

      <Link to="/Application" className="NavLink">
        {" "}
        <button type="button" className="NavButton">
          {" "}
          Application{" "}
        </button>{" "}
      </Link>
    </div>
  );
}

export default Navbar;
