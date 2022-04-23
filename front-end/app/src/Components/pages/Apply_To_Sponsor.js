import DriverNav from "../UI/DriverNav";
import "./Application.css";
import { Dropdown, Option } from "../UI/Apply_2_SponsorDropBox.js";
import { useEffect, useState } from "react";

import Footer from "../Footer/Footer";

function Application() {
  //get sponsor names
  const [sponsors, setSponsors] = useState([]);
  const id = window.localStorage.getItem("id");

  useEffect(() => {
    //fetch all sponsors
    //set to state
  }, []); //update on sponsors?

  const submitHandler = async (data) => {
    //stop normal submit
    //get driver data - await
    //set sponsor that we are applying to
    //put info together
    //send off - await
    //redirect back to profile
  };

  return (
    <div>
      <DriverNav />
      <div className="spacer"></div>
      <div>
        <div>
          <h1>Which Sponsor would you like to apply to ?</h1>
          <Dropdown
            formLabel="Choose a Sponsor"
            buttonText="Send form"
            action="/"
          >
            <Option selected value="Click to see Sponsors" />
            <Option value="Sponsor 1" />
            <Option value="Sponsor 2" />
            <Option value="Sponsor 3" />
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default Application;
