import { Link, Route } from "react-router-dom";
import "./Login.css";
import NewNav from "../UI/HomeNav";
import Footer from "../Footer/Footer";

function Login() {
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
            <div>
              <input
                type={"email"}
                required
                className="EMAIL"
                placeholder={" Enter Email"}
              />
            </div>
            <div>
              <input
                type={"password"}
                required
                className="PASSWORD"
                placeholder={" Enter Password"}
              />
            </div>
            <div>
              {" "}
              <button
                type="submit"
                onClick={<Route path="/" />}
              >
                {" "}
                Login{" "}
              </button>
            </div>
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
    <Footer />
    </div>
  );
}

export default Login;
/*(export default Main;*/
