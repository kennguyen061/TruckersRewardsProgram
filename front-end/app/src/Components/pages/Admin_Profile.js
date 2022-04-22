import { useEffect, useState } from "react";
import AdminNav from "../UI/AdminNav";
import Footer from "../Footer/Footer";
import "./Admin_Profile.css";

function Admin_Profile() {
  const role = window.localStorage.getItem("role");
  const id = window.localStorage.getItem("id");

  const [returnedName, setReturnedName] = useState("name");
  const [returnedLastName, setReturnedLastName] = useState("lastName");
  const [enteredEmail, setEnteredEmail] = useState("email");
  const [enteredAddress, setEnteredAddress] = useState("address");
  const [enteredPhone, setEnteredPhone] = useState("phoneNumber");

  const nameHandler = (item) => {
    setReturnedName(item);
  };

  const lastNameHandler = (item) => {
    setReturnedLastName(item);
  };

  const emailHandler = (item) => {
    setEnteredEmail(item);
  };

  const addressHandler = (item) => {
    setEnteredAddress(item);
  };

  const phoneHandler = (item) => {
    setEnteredPhone(item);
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
      
        nameHandler(admin.firstName);
        lastNameHandler(admin.lastName);
        emailHandler(admin.email);
        addressHandler(admin.address);
        phoneHandler(admin.phoneNumber);
      });
  }, [returnedName]);

  return (
    <div>
      <AdminNav />
      <div className="Admin_Profile">
        <div className="Main_Component">
          <div className="Cards">
            <div>
              <label className="Login-Header">
                Welcome Back {returnedName} {returnedLastName}!
              </label>
              <hr className="line" />
            </div>
            <div>
              <label className="Name">Name: {returnedName} {returnedLastName}</label>
              <hr className="line_bold" />
            </div>
            <div>
              <label className="Email">{"Email:"} {enteredEmail}</label>
              <hr className="line_bold" />
            </div>
            <div>
              <label className="Address">Address: {enteredAddress}</label>
              <hr className="line_bold" />
            </div>
            <div>
              <label className="Phone">Phone Number: {enteredPhone}</label>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom_here">
        <Footer />
      </div>
    </div>
  );
}

export default Admin_Profile;
