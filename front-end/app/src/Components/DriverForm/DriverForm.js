import { useState } from "react";

import "./DriverForm.css";

const DriverForm = (props) => {
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredStreet, setEnteredStreet] = useState("");
  const [enteredCity, setEnteredCity] = useState("");
  const [enteredState, setEnteredState] = useState("");
  const [enteredZip, setEnteredZip] = useState("");
  const [enteredPhoneNum, setEnteredPhoneNum] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [reenteredPassword, setReenteredPassword] = useState("");
  const firstNameChangeHandler = (event) => {
    setEnteredFirstName(event.target.value);
  };

  const lastNameChangeHandler = (event) => {
    setEnteredLastName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const streetChangeHandler = (event) => {
    setEnteredStreet(event.target.value);
  };

  const cityChangeHandler = (event) => {
    setEnteredCity(event.target.value);
  };

  const stateChangeHandler = (event) => {
    setEnteredState(event.target.value);
  };

  const zipChangeHandler = (event) => {
    setEnteredZip(event.target.value);
  };

  const phoneNumChangeHandler = (event) => {
    setEnteredPhoneNum(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const copyPasswordChangeHandler = (event) => {
    setReenteredPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const driverData = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      email: enteredEmail,
      street: enteredStreet,
      city: enteredCity,
      state: enteredState,
      zip: enteredZip,
      phoneNum: enteredPhoneNum,
      password: enteredPassword,
    };

    //change this
    props.onSaveDriverData(driverData);
    setEnteredFirstName("");
    setEnteredLastName("");
    setEnteredEmail("");
    setEnteredStreet("");
    setEnteredCity("");
    setEnteredState("");
    setEnteredZip("");
    setEnteredPhoneNum("");
    setEnteredPassword("");
  };

  return (
    <form className="new-driver" onSubmit={submitHandler}>
      <div className="new-driver__control">
        <div className="new-driver__control">
          <label>First Name</label>
          <input
            type={"text"}
            placeholder={"Homer"}
            value={enteredFirstName}
            required
            onChange={firstNameChangeHandler}
          />
        </div>
        <div className="new-driver__control">
          <label>Last Name</label>
          <input
            type={"text"}
            placeholder={"Simpson"}
            value={enteredLastName}
            required
            onChange={lastNameChangeHandler}
          />
        </div>
        <div className="new-edriver__control">
          <label>Email</label>
          <input
            type={"email"}
            value={enteredEmail}
            placeholder={"user@email.com"}
            required
            onChange={emailChangeHandler}
          />
        </div>
        <div className="new-edriver__control">
          <label>Street Address</label>
          <input
            type={"text"}
            value={enteredStreet}
            placeholder={"742 Evergreen Terrace"}
            required
            onChange={streetChangeHandler}
          />
        </div>
        <div className="new-edriver__control">
          <label>City</label>
          <input
            type={"text"}
            value={enteredCity}
            placeholder={"Springfield"}
            required
            onChange={cityChangeHandler}
          />
        </div>
        <div className="new-edriver__control">
          <label>State(2 letters)</label>
          <input
            type={"text"}
            minLength={"2"}
            maxLength={"2"}
            placeholder={"WA"}
            value={enteredState}
            required
            onChange={stateChangeHandler}
          />
        </div>
        <div className="new-edriver__control">
          <label>Zip Code</label>
          <input
            type={"number"}
            minLength={"2"}
            maxLength={"2"}
            value={enteredZip}
            placeholder={"80085"}
            required
            onChange={zipChangeHandler}
          />
        </div>
        <div className="new-edriver__control">
          <label>Phone Number</label>
          <input
            type={"tel"}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder={"939-555-0113"}
            value={enteredPhoneNum}
            required
            onChange={phoneNumChangeHandler}
          />
        </div>
        <div className="new-edriver__control">
          <label>Password</label>
          <input
            type={"password"}
            value={enteredPassword}
            placeholder={"4-8 Characters"}
            minLength="4"
            maxLength="8"
            required
            onChange={passwordChangeHandler}
          />
        </div>
        <div className="new-edriver__control">
          <label>Re-Enter Password</label>
          <input
            type={"password"}
            value={reenteredPassword}
            placeholder={"4-8 Characters"}
            minLength="4"
            maxLength="8"
            required
            onChange={copyPasswordChangeHandler}
          />
        </div>
      </div>
      <div className="new-driver__actions">
        <button type="submit" disabled={enteredPassword !== reenteredPassword}>
          {" "}
          Create Account
        </button>
      </div>
    </form>
  );
};

export default DriverForm;
