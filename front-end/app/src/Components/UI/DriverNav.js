import "./DriverNav.css";
import { BiSearch } from "react-icons/bi";
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

function DriverNav() {
  const [nav, setNav] = useState(false);
  const handlerNav = () => setNav(!nav);
  return (
      <div className={nav ? "navbar-bg" : "dnavbar"}>
        <div className="logo">
          <h2>
            Roger's Rewards <BsTruck className="icon" />
          </h2>
        </div>
        <ul className="nav-menu">
          <Link to="/" smooth={true} duration={500}>
            <li>Home</li>
          </Link>
          <Link to="/pages/application" smooth={true} duration={500}>
            <li>Sponsors</li>
          </Link>
          <Link to="/Catalog/Catalog" smooth={true} duration={500}>
              <li>Catalog</li>
          </Link>
          <Link to="/main/points" smooth={true} duration={500}>
            <li>Points</li>
          </Link>
          <Link to="/pages/Wishlist" smooth={true} duration={500}>
            <li>Wishlist</li>
          </Link>
        </ul>
        <div className="nav-icons">
          <BiSearch className="icon" style={{ marginRight: "1rem" }} />
          <Link to="/pages/Driver_Profile" smooth={true} duration={500}>
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
            <Link to="/Home" smooth={true} duration={500}>
              <li>Home</li>
            </Link>
            <Link to="/pages/application" smooth={true} duration={500}>
              <li>Sponsors</li>
            </Link>
            <Link to="/Catalog/Catalog" smooth={true} duration={500}>
              <li>Catalog</li>
            </Link>
            <Link to="/main/points" smooth={true} duration={500}>
              <li>Points</li>
            </Link>
            <Link to="/pages/Wishlist" smooth={true} duration={500}>
              <li>Wishlist</li>
            </Link>
          </ul>
          <div className="small-menu-bot">
            <div className="menu-icos">
              <button>Search</button>
              <button>Account</button>
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

export default DriverNav;
