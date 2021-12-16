import React from "react";

import "./Resources.css"


const { TabPane } = Tabs;



const Resources = (props) => {
  return (
    <div>
       <div className="main-container">
      <div className="main-head-box">
        <div className="main-head">
          <div className="Topicrect"> </div>
          <div className="topic">Resources</div>
        </div>
      </div>

      <div className="blogs-head">
        <span>Blogs</span>
        <span className="see-all">See all</span>
        <img src="\icons\arrow.svg" alt="" />
       
      </div>
      </div>
    </div>

    
  );
};

export default Resources;
