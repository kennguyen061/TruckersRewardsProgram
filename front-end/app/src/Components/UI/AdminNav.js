import "./AdminNav.css";
import { BiLogOut } from "react-icons/bi";
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

function AdminNav() {
  const [nav, setNav] = useState(false);
  const handlerNav = () => setNav(!nav);
  return (
    <div className={nav ? "navbar-bg" : "anavbar"}>
      <div className="logo">
       <Link to="/pages/Admin_Profile" smooth={true} duration={500}>
         <h2>
            Roger's Rewards <BsTruck className="icon" />
         </h2>
        </Link>
      </div>
      <ul className="nav-menu">
        <Link to="/pages/Admin_Profile" smooth={true} duration={500}>
          <li>Home</li>
        </Link>
        <Link to="/pages/error" smooth={true} duration={500}>
          <li>Reports</li>
        </Link>
        <Link to="/pages/error" smooth={true} duration={500}>
          <li>Accounts</li>
        </Link>
        <Link to="/pages/error" smooth={true} duration={500}>
          <li>Dashboard</li>
        </Link>
      </ul>
      <div className="nav-icons">
        <Link to="/" smooth={true} duration={500}>
          <BiLogOut className="icon" style={{ marginRight: "1rem" }} />
        </Link>
        <Link to="/pages/Admin_Profile" smooth={true} duration={500}>
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
          <Link to="/pages/Admin_Profile" smooth={true} duration={500}>
            <li>Home</li>
          </Link>
          <Link to="/pages/error" smooth={true} duration={500}>
            <li>Reports</li>
          </Link>
          <Link to="/pages/error" smooth={true} duration={500}>
            <li>Accounts</li>
          </Link>
          <Link to="/pages/error" smooth={true} duration={500}>
            <li>Dashboard</li>
          </Link>
        </ul>
        <div className="small-menu-bot">
          <div className="menu-icos">
            <Link to="/" smooth={true} duration={500}>
             <button>LogOut</button>
            </Link>
            <Link to="/Admin_Profile" smooth={true} duration={500}>
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

export default AdminNav;
