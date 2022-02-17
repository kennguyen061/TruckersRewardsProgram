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
    <div className="new-driver">
      <DriverForm onSaveDriverData={saveDriverDataHandler}></DriverForm>
    </div>
  );
};

export default NewDriver;
