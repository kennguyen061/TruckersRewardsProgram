import { Link, Route, useNavigate } from "react-router-dom";
import "./Login.css";
import NewNav from "../UI/HomeNav";
import Footer from "../Footer/Footer";
// import { useCookies } from "react-cookie";
import { useState } from "react";

function Login() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const navigate = useNavigate();

  const emailHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const loginInfo = {
      email: enteredEmail,
      password: enteredPassword,
    };

    const response = await fetch("http://18.235.52.212:8000/account/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginInfo),
    });

    const { role } = await response.json();
    window.localStorage.setItem("role", role);
    //redirect to other pages
  };

  return (
    <div>
      <NewNav />
      <div className="Login_Page">
        <div className="Left-Component">
          <label className="Main-Text">WELCOME TO ROGER'S REWARDS</label>
          <label className="Subtext">
            Join and start earning points for your drives today!
          </label>
        </div>
        <div className="Right-Component">
          <div className="Cards">
            <div className="Cards-2">
              <div>
                <label className="Login-Header">BE ONE OF US!</label>
              </div>
              <form onSubmit={submitHandler}>
                <div>
                  <input
                    type={"email"}
                    required
                    className="EMAIL"
                    onChange={emailHandler}
                    placeholder={" Enter Email"}
                  />
                </div>
                <div>
                  <input
                    type={"password"}
                    required
                    className="PASSWORD"
                    onChange={passwordHandler}
                    placeholder={" Enter Password"}
                  />
                </div>
                <div>
                  {" "}
                  <button type="submit"> Login </button>
                </div>
              </form>

              <div>
                <label className="Sign_Up_Text">
                  Don't have an account?{" "}
                  {
                    <Link to="/pages/application" className="Link">
                      {" "}
                      Click Here{" "}
                    </Link>
                  }
                </label>
              </div>
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

export default Login;
/*(export default Main;*/
