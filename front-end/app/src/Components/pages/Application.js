import "./Application.css";
import DriverForm from "../DriverForm/DriverForm";
import NewDriver from "../DriverForm/NewDriver";

function Application() {
  const addDriverHandler = (driver) => {
    console.log("in applicartion");

    fetch("http://localhost:8000/account/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(driver),
    }).then(() => {
      console.log("account-creation request submitted");
    });
  };

  return (
    <div className="Container">
      <div>
        <NewDriver onAddDriver={addDriverHandler}>
          <DriverForm />
        </NewDriver>
      </div>
    </div>
  );
}

export default Application;
