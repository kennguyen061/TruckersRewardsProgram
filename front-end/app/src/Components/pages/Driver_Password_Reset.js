import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DriverNav from "../UI/DriverNav";
import Footer from "../Footer/Footer";
import "./Driver_Password_Reset.css";

export default function Driver_Password_Reset() {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [reenteredPassword, setReenteredPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    const info = {
      role: window.localStorage.getItem("role"),
      newpassword: enteredPassword,
      UID: window.localStorage.getItem("uid"),
    };

    const response = await fetch("http://18.235.52.212:8000/account/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    });

    const value = await response.json();

    if (value === false) {
      alert("There was a problem restting your password. Try again.");
      setEnteredPassword("");
      setReenteredPassword("");
    } else {
      alert("Password Reset");
      setEnteredPassword("");
      setReenteredPassword("");
      navigate("/pages/Driver_Profile", { replace: false });
    }
  };

  return (
    <div className="page">
      <DriverNav />
      <div className="spacer"></div>

      <div>
        <h1>Password Reset</h1>
        <h2>Please input your new password and submit</h2>
      </div>
      <div className="form-box">
        <form onSubmit={submitHandler} className="form">
          <div className="item-box">
            <label>New Password</label>
            <p>8-15 character, 1 uppercase, 1 lowercase, 1 special character</p>
            <input
              type="password"
              name="password"
              value={enteredPassword}
              placeholder="8-15 Characters"
              minLength="8"
              maxLength="15"
              onChange={(event) => setEnteredPassword(event.target.value)}
              required
            />
          </div>
          <div className="item-box">
            <label>Re-Enter New Password</label>
            <input
              type="password"
              value={reenteredPassword}
              placeholder="8-15 Characters"
              minLength="8"
              maxLength="15"
              onChange={(event) => setReenteredPassword(event.target.value)}
              required
            />
            <hr />
          </div>
          <div>
            <button
              type="submit"
              disabled={enteredPassword !== reenteredPassword}
            >
              {" "}
              update password
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
