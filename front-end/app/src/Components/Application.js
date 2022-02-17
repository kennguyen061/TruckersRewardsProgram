import "./Application.css";
import DriverForm from "./DriverForm/DriverForm";
import NewDriver from "./DriverForm/NewDriver";
import Navbar from "./UI/Navbar";

function Application() {
  const addDriverHandler = (driver) => {
    console.log("in applicartion");
    console.log(driver);
    //this is where we would Post to the Server
  };

  return (
    <div className="Container">
      <Navbar />
      <div>
        <NewDriver>
          <DriverForm />
        </NewDriver>
      </div>
    </div>
  );
}

export default Application;
