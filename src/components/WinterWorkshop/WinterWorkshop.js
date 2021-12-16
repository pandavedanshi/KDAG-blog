import React from "react";
import data from "./data";
import workshopbanner from "../../assets/pics/winterworkshop/winterworkshop.svg";
import DayTabs from "./DayTabs";
import Navbar from "../Common/Navbar/Navbar";
import Header from "./Header"

const WinterWorkshop = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div style={{margin: "10rem"}}>
        <img
          className="winter-workshop-image"
          src={workshopbanner}
          alt="Winter Workshop"
        />
        <DayTabs days={data} />
      </div>
    </div>
  );
};

export default WinterWorkshop;
