import DriverNav from "../UI/DriverNav";
import "./Application.css";
import SponsorApplyForm from "../SponsorApplyForm/SponsorApplyForm";
import NewApplicant from "../SponsorApplyForm/SponsorApplyForm";
import Footer from "../Footer/Footer";

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
    <div>
      <DriverNav />
      <div className="Container">
        <div>
          <NewApplicant onAddDriver={addDriverHandler}>
            <SponsorApplyForm />
          </NewApplicant>
        </div>
      </div>
    <Footer />
    </div>
  );
}

export default Application;
