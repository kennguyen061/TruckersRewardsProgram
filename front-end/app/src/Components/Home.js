import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Home.css";

function Home() {
  let navigate = useNavigate();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(enteredEmail);
    console.log(enteredPassword);

    if (enteredEmail === "test@test.com" && enteredPassword === "Test123") {
      console.log("enterd");
      navigate("../Driver_Profile", { replace: true });
    }
  };

  return (
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
                  placeholder={" Enter Email"}
                  onChange={(event) => setEnteredEmail(event.target.value)}
                />
              </div>
              <div>
                <input
                  type={"password"}
                  required
                  className="PASSWORD"
                  placeholder={" Enter Password"}
                  onChange={(event) => setEnteredPassword(event.target.value)}
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
                  <Link to="/Application" className="Link">
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
  );
}

export default Home;
