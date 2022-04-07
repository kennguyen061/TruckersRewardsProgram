import "./Points.css";
import DriverNav from "../UI/DriverNav";
import Footer from "../Footer/Footer";
import PointsOverTime from "../PointsGraphics/PointsOverTime";
import ToGoal from "../PointsGraphics/ToGoal";

function Points() {
  return (
    <div className="page">
      <DriverNav />
      <ToGoal />
      <PointsOverTime />
      <Footer />
    </div>
  );
}

export default Points;
