import "./Points.css";
import NewNav from "../UI/NewNav";
import Footer from "../Footer/Footer";
import PointsOverTime from "../PointsGraphics/PointsOverTime";
import ToGoal from "../PointsGraphics/ToGoal";

function Points() {
  return (
    <div className="page">
      <NewNav />
      <ToGoal />
      <PointsOverTime />
      <Footer />
    </div>
  );
}

export default Points;
