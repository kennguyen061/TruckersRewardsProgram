import "./PointTake.css";
import { useState } from "react";
import Footer from "../Footer/Footer";
import SponsorNav from "../UI/SponsorNav";

const PointTake = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  };

  return (
    <div className="PointTakePage">
      <SponsorNav />
      <div className="spacer"></div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Persons name:
          <input
            type="text"
            name="username"
            value={inputs.username || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Enter point Change:
          <input
            type="number"
            name="age"
            value={inputs.age || ""}
            onChange={handleChange}
          />
        </label>
        <input type="submit" />
      </form>
      <div className="spacer"></div>
      <Footer />
    </div>
  );
};

export default PointTake;
