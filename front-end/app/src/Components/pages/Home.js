//import { Link, Route } from "react-router-dom";
import "./Home.css";
import NewNav from "../UI/HomeNav";
import Hero from "../Hero/Hero";
import People from "../People/People";
import WeStand from "../WeStand/WeStand";
import Footer from "../Footer/Footer";

function Home() {
  return (
    <div>
      <NewNav />
      <Hero />
      <People />
      <WeStand />

      <Footer />
    </div>
  );
}
export default Home;
