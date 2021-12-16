import React from "react";
import "./Topics.css";
import recording from "../../assets/pics/winterworkshop/recording.svg";

function Card(props) {
  return (
    <div>
      <div className="winter-workshop-content-container">
        <div className="winter-workshop-session-head">Session {props.id}</div>
        <div className="winter-workshop-session-subhead">
          | {props.time}{" "}
        </div>

        <div className="winter-workshop-record">
          <img
            className="winter-workshop-record-img"
            src={props.recording}
            href="{props.recording"
          />
          <span className="winter-workshop-record-text">Recording</span>
        </div>
        <div className="winter-workshop-topic-tabs">
          <div className="winter-workshop-topics">
            {props.topics.map((e) => {
              <span className="winter-workshop-topic-links">{e}</span>
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const Topics = (props) => {
  return (
    <div className="winter-workshop-main-container">
      <div>
        <div className="winter-workshop-main-head">
          <div className="winter-workshop-Topicrect"> </div>
          <span className="winter-workshop-topic">Topics Covered</span>
        </div>

        {props.sessions.map((e) => {
          <Card {...e} />
        })}
        <Card topic1="#" topic2="#" topic3="#" topic4="#" recording="#" />
        <Card topic1="#" topic2="#" topic3="#" topic4="#" recording="#" />
      </div>
    </div>
  );
};

export default Topics;
