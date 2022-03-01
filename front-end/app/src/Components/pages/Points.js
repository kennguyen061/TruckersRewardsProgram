import "./Points.css";
import { Doughnut } from "react-chartjs-2";
import NewNav from "../UI/NewNav";
import Hero from "../Hero/Hero";

import Footer from "../Footer/Footer";
import PointsGraphic from "../PointsGraphic/PointsGraphic";

function Points() {
  return (
    <div>
      <NewNav />
      <PointsGraphic />

      <Footer />
    </div>
  );
}

export default Points;
