import "./Hero.css";

import Video from "../../assets/broll_5.mp4";

//current videos are 1080p try some 720 idk they are too long

function Hero() {
  return (
    <div className="hero">
      <video autoPlay loop muted id="video">
        <source src={Video} type="video/mp4" />
      </video>
      <div className="overlay"></div>
      <div className="content">
        <h1>Bringing commercial transport</h1>
        <h2>into the modern era</h2>
      </div>
    </div>
  );
}

export default Hero;
