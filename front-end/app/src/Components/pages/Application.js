import NewNav from "../UI/HomeNav";
import "./Application.css";
import DriverForm from "../DriverForm/DriverForm";
import NewDriver from "../DriverForm/NewDriver";
import Footer from "../Footer/Footer";

function Application() {
  const addDriverHandler = (driver) => {
    console.log("in applicartion");

    fetch("http://18.235.52.212:8000/account/create/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(driver),
    })
      .then(() => {
        console.log("account-creation request submitted");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return (
    <div>
      <NewNav />
      <div className="Container">
        <div>
          <NewDriver onAddDriver={addDriverHandler}>
            <DriverForm />
          </NewDriver>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Application;
