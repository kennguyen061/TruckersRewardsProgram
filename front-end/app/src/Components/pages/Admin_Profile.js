import { useEffect, useState } from "react";
import AdminNav from "../UI/AdminNav";
import Footer from "../Footer/Footer";
import "./Admin_Profile.css";
import { Link } from "react-router-dom";


function Admin_Profile() {
  const role = window.localStorage.getItem("role");
  const id = window.localStorage.getItem("id");
  const [firstName, setFirstName] = useState("name");
  const [lastName, setLastName] = useState("lastName");
  const [firstNameUpdated, setFirstNameUp] = useState("name");
  const [lastNameUpdated, setLastNameUp] = useState("lastName");
  const [email, setEmail] = useState("email");
  const [address, setAddress] = useState("address");
  const [phoneNumber, setPhoneNumber] = useState("phoneNumber");

  const firstNameHandler = (event) => {
    setFirstName(event.target.value);
  };

  const lastNameHandler = (event) => {
    setLastName(event.target.value);
  };

  const firstNameUpdateHandler = (event) => {
    setFirstNameUp(event.target.value);
  };

  const lastNameUpdateHandler = (event) => {
    setLastNameUp(event.target.value);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const addressHandler = (event) => {
    setAddress(event.target.value);
  };

  const phoneNumberHandler = (event) => {
    setPhoneNumber(event.target.value);
  };

  const updateHandler = (event) => {
    event.preventDefault();
    const url = "http://18.235.52.212:8000/account/update";
    const userInfo = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      street: address,
      phoneNum: phoneNumber,
      role: role,
      id: id,
    };

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const url = new URL("http://18.235.52.212:8000/account/read");
  url.searchParams.append("role", role);
  url.searchParams.append("id", id);

  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((admin) => {
        setFirstName(admin.firstName);
        setLastName(admin.lastName);
        setEmail(admin.email);
        setAddress(admin.address);
        setPhoneNumber(admin.phoneNumber);
      });
  }, [firstName]);

  return (
    <div className="card">
      <AdminNav />
      <div className="Admin_Profile">
        <form onSubmit={updateHandler}>
          <div>
            <div className="header">
              <label className="Login-Header">
                Welcome Back {firstName} {lastName} !
              </label>
              <hr className="line" />
              <h5>Fill in all text bubbles to update personal information</h5>
            </div>
            <div>
              <div className="pii-field">
                <label className="Name">First Name</label>
                <input
                  type={"text"}
                  placeholder={firstName}
                  onChange={firstNameUpdateHandler}
                />
              </div>
              <div className="pii-field">
                <label className="Name">Last Name</label>
                <input
                  type={"text"}
                  placeholder={lastName}
                  onChange={lastNameUpdateHandler}
                />
              </div>
              <div className="pii-field">
                <label className="Email">Email</label>
                <input
                  type={"text"}
                  placeholder={email}
                  onChange={emailHandler}
                />
              </div>
              <div className="pii-field">
                <label className="Address">Address</label>
                <input
                  type={"text"}
                  placeholder={address}
                  onChange={addressHandler}
                />
              </div>
              <div className="pii-field">
                <label className="Phone">Phone Number</label>
                <input
                  type={"text"}
                  placeholder={phoneNumber}
                  onChange={phoneNumberHandler}
                />
              </div>
              <div className="button">
                <button type="submit" onClick={updateHandler}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </form> 
        <Link to="/Driver_Password_Reset" className="Link">

          <button
            className="reset_password" 
            >
            Reset Password     
          </button>
          </Link>
      </div>

      <Footer />
    </div>
  );
}

export default Admin_Profile;
