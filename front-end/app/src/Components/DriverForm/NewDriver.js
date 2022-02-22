import "./NewDriver.css";
import DriverForm from "./DriverForm";

const NewDriver = (props) => {
  const saveDriverDataHandler = (enteredDriverData) => {
    const driverData = {
      ...enteredDriverData,
      id: Math.random().toString(),
    };
    props.onAddDriver(driverData);
  };

  return (
    <div>
      <div className="new-driver">
        <div className="header">
          <label className="new-driver-label">New Driver Application</label>
          <hr className="line_bold" />
        </div>
        <DriverForm onSaveDriverData={saveDriverDataHandler}></DriverForm>
      </div>
    </div>
  );
};

export default NewDriver;
