import React from "react";
import "./Content.css";

import headerGraphics from "./../../../assets/svgs/header-graphics.svg";

const Content = () => {
  return (
    <>
      <div className="content-container">
        <div className="content-pair">
          <div className="content-pair-text">
            <div className="content-pair-heading">
              <span className="content-pair-word">BLOGS</span>: Welcome to the pathway to master Data Science!
            </div>
            <div className="content-pair-paragraph">
            As we dive deeper into the world of Machine Learning everyday, it becomes imperative to stay up-to-date with the different machine learning algorithms that not only help us build our data models but also provide an in-depth understanding of data science. Plunge right in and happy learning!
            </div>
          </div>
          <div className="content-pair-graphics">
            <img src={headerGraphics} alt="CONTENT GRAPHICS 1" />
          </div>
        </div>

        <div className="content-pair">
        <div className="content-pair-text content-mobile">
            <div className="content-pair-heading">
              <span className="content-pair-word">RESOURCES</span>: Choose your own path in machine learning by exploring our resource library!
            </div>
            <div className="content-pair-paragraph">
            Every year KDAG conducts the Winter workshop for students of IIT KGP who are interested in the field of data analytics. From python basics to CNN, these modules have been meticulously curated to cover a spectrum of topics. KDAG also provides a planned preparation guide for interviews to help students with internship and placement drive
            </div>
          </div>
          <div className="content-pair-graphics">
            <img src={headerGraphics} alt="CONTENT GRAPHICS 1" />
          </div>
          <div className="content-pair-text content-nonmobile">
            <div className="content-pair-heading content-nonmobile">
              <span className="content-pair-word">RESOURCES</span>: Choose your own path in machine learning by exploring our resource library!
            </div>
            <div className="content-pair-paragraph content-nonmobile">
            Every year KDAG conducts the Winter workshop for students of IIT KGP who are interested in the field of data analytics. From python basics to CNN, these modules have been meticulously curated to cover a spectrum of topics. KDAG also provides a planned preparation guide for interviews to help students with internship and placement drive
            </div>
          </div>
        </div>

        <div className="content-pair">
          <div className="content-pair-text">
            <div className="content-pair-heading">
              <span className="content-pair-word">EVENTS</span>:Check out the plethora of events conducted by KDAG!
            </div>
            <div className="content-pair-paragraph">
            Data Science workshops, internship bootcamps, panel discussions on research internships opportunities in ML/AI , reading sessions , hackathons and what not! KDAG is pleased to bring it  forth to you to enhance your knowledge.You are just one click away from getting access to all of this! Go ahead and all the best!
            </div>
          </div>
          <div className="content-pair-graphics">
            <img src={headerGraphics} alt="CONTENT GRAPHICS 1" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
