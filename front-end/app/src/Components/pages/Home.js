import "./Home.css";
import NewNav from "../UI/HomeNav";

import Hero from "../Hero/Hero";
import People from "../People/People";
import WeStand from "../WeStand/WeStand";
import Footer from "../Footer/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  window.localStorage.clear();
  return (
    <div>
      <NewNav />
      <Hero />
      <People />
      <WeStand />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
export default Home;
