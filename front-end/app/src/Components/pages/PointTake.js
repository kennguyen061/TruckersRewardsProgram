import "./PointTake.css";
import { useState } from "react";
import Footer from "../Footer/Footer";
import SponsorNav from "../UI/SponsorNav";

const PointTake = () => {
  const role = window.localStorage.getItem("role");
  const sid = window.localStorage.getItem("sid");

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const Email = event.target.Email;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [Email]: value }));
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
          Enter Persons Email:
          <input
            type="text"
            name="Email:"
            value={inputs.username || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Enter point Change:
          <input
            type="number"
            name="Ammount changed:"
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
