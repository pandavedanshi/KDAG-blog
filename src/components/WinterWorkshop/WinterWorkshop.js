import React from "react";
import data from "./data";
import workshopbanner from "../../assets/pics/winterworkshop/winterworkshop.svg";
import DayTabs from "./DayTabs";

const WinterWorkshop = () => {
  return (
    <div>
      <img className="winter-workshop-image" src={workshopbanner} alt="Winter Workshop" />
      <DayTabs days={data} />
    </div>
  )
}

export default WinterWorkshop;
