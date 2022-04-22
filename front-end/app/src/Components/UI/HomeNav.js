import "./Nav.css";
import { BsList, BsPerson, BsTruck } from "react-icons/bs";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitch,
  FaYoutube,
} from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";

function HomeNav() {
  const [nav, setNav] = useState(false);
  const handlerNav = () => setNav(!nav);
  return (
    <div className={nav ? "navbar-bg" : "navbar"}>
      <div className="logo">
        <h2>
          <Link to="/" smooth={true} duration={500}>
            Roger's Rewards <BsTruck className="icon" />
          </Link>
        </h2>
      </div>
      <ul className="nav-menu">
        <Link to="/" smooth={true} duration={500}>
          <li>Home</li>
        </Link>
        <Link to="/pages/application" smooth={true} duration={500}>
          <li>Apply</li>
        </Link>
        <Link to="/pages/Login" smooth={true} duration={500}>
          <li>Login</li>
        </Link>
      </ul>
      <div className="nav-icons">
        <Link to="/pages/Login" smooth={true} duration={500}>
          <BsPerson className="icon" />
        </Link>
      </div>
      <div className="Hamburger" onClick={handlerNav}>
        {!nav ? (
          <BsList className="icon" />
        ) : (
          <AiOutlineCloseCircle style={{ color: "#000" }} className="icon" />
        )}
      </div>

      <div className={nav ? "small active" : "small"}>
        <ul className="small-menu">
          <Link to="/" smooth={true} duration={500}>
            <li>Home</li>
          </Link>
          <Link to="/pages/application" smooth={true} duration={500}>
            <li>Apply</li>
          </Link>
          <Link to="/pages/Login" smooth={true} duration={500}>
            <li>Login</li>
          </Link>
        </ul>
        <div className="small-menu-bot">
          <div className="menu-icos">
          <Link to="/pages/Login" smooth={true} duration={500}>
            <button>Account</button>
          </Link>
          </div>
          <div className="socials">
            <FaFacebook className="icons" />
            <FaInstagram className="icons" />
            <FaTwitch className="icons" />
            <FaPinterest className="icons" />
            <FaYoutube className="icons" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeNav;
