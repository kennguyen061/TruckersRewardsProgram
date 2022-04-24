import { useEffect, useState } from "react";
import DriverNav from "../UI/DriverNav";
import Footer from "../Footer/Footer";
import "./Driver_Profile.css";
import { Link } from "react-router-dom";


function Driver_Profile() {
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

    const updateHandler = (event) => {
        event.preventDefault();
    }

  const url = new URL("http://18.235.52.212:8000/account/read");

  url.searchParams.append("role", role);
  url.searchParams.append("id", id);

  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((driver) => {
        nameHandler(driver.firstName);
        lastNameHandler(driver.lastName);
        emailHandler(driver.email);
        addressHandler(driver.address);
        phoneHandler(driver.phoneNumber);
      });
  }, [returnedName]);

    return (
        <div>
            <DriverNav />
            <div className="Driver_Profile">
                <div className="Main_Component">
                    <div className="Cards">
                        <div>
                            <label className="Login-Header">
                                Welcome Back {returnedName} {returnedLastName} !
                            </label>
                            <hr className="line" />
                        </div>
                        <div className='pii-field'>
                            <label className="Name">First Name</label>
                            <input
                                type={"text"}
                                placeholder={returnedName}
                            />
                        </div>
                        <div className='pii-field'>
                            <label className="Name">Last Name</label>
                            <input
                                type={"text"}
                                placeholder={returnedLastName}
                            />
                        </div>
                        <div className='pii-field'>
                            <label className="Email">Email</label>
                            <input
                                type={"text"}
                                placeholder={enteredEmail}
                            />
                        </div>
                        <div className='pii-field'>
                            <label className="Address">Address</label>
                            <input
                                type={"text"}
                                placeholder={enteredAddress}
                            />
                        </div>
                        <div className='pii-field'>
                            <label className="Phone">Phone Number</label>
                            <input
                                type={"text"}
                                placeholder={enteredPhone}
                            />
                        </div>
                        <div className="update-button">
                            <button type="submit">Update</button>
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

export default Driver_Profile;
