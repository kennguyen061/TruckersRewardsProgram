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
    setReenteredPassword("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-driver__control">
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="Homer"
          value={enteredFirstName}
          onChange={(event) => setEnteredFirstName(event.target.value)}
          required
        />
      </div>
      <div className="new-driver__control">
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Simpson"
          value={enteredLastName}
          onChange={(event) => setEnteredLastName(event.target.value)}
          required
        />
      </div>
      <div className="new-driver__control">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={enteredEmail}
          placeholder="user@email.com"
          onChange={(event) => setEnteredEmail(event.target.value)}
          required
        />
      </div>
      <div className="new-driver__control">
        <label>Street Address</label>
        <input
          type="text"
          name="street"
          value={enteredStreet}
          placeholder="742 Evergreen Ter."
          onChange={(event) => setEnteredStreet(event.target.value)}
          required
        />
      </div>
      <div className="new-driver__control">
        <label>City</label>
        <input
          type="text"
          name="city"
          value={enteredCity}
          placeholder="Springfield"
          onChange={(event) => setEnteredCity(event.target.value)}
          required
        />
      </div>
      <div className="new-driver__control">
        <label>State(2 letters)</label>
        <input
          type="text"
          name="state"
          minLength="2"
          maxLength="2"
          placeholder="WA"
          value={enteredState}
          onChange={(event) => setEnteredState(event.target.value)}
          required
        />
      </div>
      <div className="new-driver__control">
        <label>Zip Code</label>
        <input
          type="number"
          name="zip"
          minLength="2"
          maxLength="2"
          value={enteredZip}
          placeholder="80085"
          onChange={(event) => setEnteredZip(event.target.value)}
          required
        />
      </div>
      <div className="new-driver__control">
        <label>Phone Number</label>
        <input
          type="tel"
          name="phoneNum"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="939-555-0113"
          value={enteredPhoneNum}
          onChange={(event) => setEnteredPhoneNum(event.target.value)}
          required
        />
        <hr className="line" />
      </div>
      <div className="new-driver__control">
        <label>Password</label>
        <p>8-15 character, 1 uppercase, 1 lowercase, 1 special character</p>
        <input
          type="password"
          name="password"
          value={enteredPassword}
          placeholder="4-8 Characters"
          minLength="8"
          maxLength="15"
          onChange={(event) => setEnteredPassword(event.target.value)}
          required
        />
      </div>
      <div className="new-driver__control">
        <label>Re-Enter Password</label>
        <input
          type="password"
          value={reenteredPassword}
          placeholder="4-8 Characters"
          minLength="4"
          maxLength="8"
          onChange={(event) => setReenteredPassword(event.target.value)}
          required
        />
        <hr className="line" />
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
