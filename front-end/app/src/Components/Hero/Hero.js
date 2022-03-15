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
        <h1>I'm not sure what should go here</h1>
        <h2>Hey have you taken a good look at the navbar?</h2>
      </div>
    </div>
  );
}

export default Hero;
