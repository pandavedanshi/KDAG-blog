import React from "react";
import ResourcesCard from "./ResourcesCard";

const Resources = (props) => {
  return (
    <div className="winter-workshop-resources">
      <div className="winter-workshop-blogs-head">
        <span>Blogs</span>
      </div>
      <div className="winter-workshop-container">
        {props.blogs.map((e) => (
          <ResourcesCard {...e} />
        ))}
      </div>
      <div className="winter-workshop-blogs-head">
        <span>Videos</span>
      </div>
      <div className="winter-workshop-container">
        {props.videos.map((e) => (
          <ResourcesCard {...e} />
        ))}
      </div>
    </div>
  );
};

export default Resources;
