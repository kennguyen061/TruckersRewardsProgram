import { useEffect, useState } from "react";
import DriverNav from "../UI/DriverNav";
import Footer from "../Footer/Footer";
import "./Driver_Profile.css";
import { Link } from "react-router-dom";


function Driver_Profile() {

    const role = window.localStorage.getItem("role");
    const id = window.localStorage.getItem("id");
    const [firstName, setFirstName] = useState("name");
    const [lastName, setLastName] = useState("lastName");
    const [email, setEmail] = useState("email");
    const [address, setAddress] = useState("address");
    const [phoneNumber, setPhoneNumber] = useState("phoneNumber");

    const firstNameHandler = (event) => {
        setFirstName(event.target.value);
    };

    const lastNameHandler = (event) => {
        setLastName(event.target.value);
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
        const url = "http://18.235.52.212:8000/account/update";
        const userInfo = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            street: address,
            phoneNum: phoneNumber,
            role: role,
            id: id
        };

        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInfo),
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log("Error: ", error);
        });
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
                setFirstName(driver.firstName);
                setLastName(driver.lastName);
                setEmail(driver.email);
                setAddress(driver.address);
                setPhoneNumber(driver.phoneNumber);
            });
    }, [firstName]);

    return (
        <div>
            <DriverNav />
            <div className="Driver_Profile">
                <div className="Main_Component">
                    <form onSubmit={updateHandler}>
                        <div className="Cards">
                            <div>
                                <label className="Login-Header">
                                    Welcome Back {firstName} {lastName} !
                                </label>
                                <hr className="line" />
                            </div>
                            <div className='pii-field'>
                                <label className="Name">First Name</label>
                                <input
                                    type={"text"}
                                    placeholder={firstName}
                                    onChange={firstNameHandler}
                                />
                            </div>
                            <div className='pii-field'>
                                <label className="Name">Last Name</label>
                                <input
                                    type={"text"}
                                    placeholder={lastName}
                                    onChange={lastNameHandler}
                                />
                            </div>
                            <div className='pii-field'>
                                <label className="Email">Email</label>
                                <input
                                    type={"text"}
                                    placeholder={email}
                                    onChange={emailHandler}
                                />
                            </div>
                            <div className='pii-field'>
                                <label className="Address">Address</label>
                                <input
                                    type={"text"}
                                    placeholder={address}
                                    onChange={addressHandler}
                                />
                            </div>
                            <div className='pii-field'>
                                <label className="Phone">Phone Number</label>
                                <input
                                    type={"text"}
                                    placeholder={phoneNumber}
                                    onChange={phoneNumberHandler}
                                />
                            </div>
                            <div>
                                <button type="submit" onClick={updateHandler}>Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="bottom_here">
                <Footer />
            </div>
        </div>
    );
}

export default Driver_Profile;
