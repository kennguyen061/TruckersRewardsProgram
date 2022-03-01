import "./GoRound.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

/*please get better pictures for this they look bad. */
import p1 from "../../assets/coolT_1.jpg";
import p2 from "../../assets/coolT_2.jpg";
import p3 from "../../assets/prime.jpg";

function GoRound() {
  return (
    <div name="carousel" className="container">
      <Carousel
        className="carousel"
        showArrows={true}
        autoPlay={false}
        infiniteLoop={true}
      >
        <div>
          <img src={p1} alt="/" />
          {/* <p className="legend">Legend 1</p> */}
        </div>
        <div>
          <img src={p2} alt="/" />
          {/* <p className="legend">Legend 2</p> */}
        </div>
        <div>
          <img src={p3} alt="/" />
          {/* <p className="legend">Legend 3</p> */}
        </div>
      </Carousel>
    </div>
  );
}

export default GoRound;
