import "./People.css";
import p1 from "../../assets/Happy_guy_1.jpg";
import p2 from "../../assets/Happy_guy_2.jpg";
import p3 from "../../assets/happy_women_1.jpg";
import p4 from "../../assets/long truck.jpg";
import p5 from "../../assets/Talking.jpg";

function People() {
  return (
    <div className="People">
      <div className="container">
        <h1>Highlights of The Week</h1>
        <p>Drive Safe, Earn Points, Be Featured</p>
        <div className="img-container">
          <img className="span img-grid-row-2" src={p4} alt="/" />
          <img src={p5} alt="/" />
          <img src={p1} alt="/" />
          <img src={p2} alt="/" />
          <img src={p3} alt="/" />
        </div>
      </div>
    </div>
  );
}

export default People;
