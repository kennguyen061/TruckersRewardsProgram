//import { Link, Route } from "react-router-dom";
import "./Main.css";
import NewNav from "../UI/NewNav";
import Hero from "../Hero/Hero";
import People from "../People/People";
import WeStand from "../WeStand/WeStand";
import GoRound from "../GoRound/GoRound";
import Footer from "../Footer/Footer";

function Main() {
  return (
    <div>
      <NewNav />
      <Hero />
      <People />
      <WeStand />
      <GoRound />
      <Footer />
    </div>
  );
}
export default Main;
