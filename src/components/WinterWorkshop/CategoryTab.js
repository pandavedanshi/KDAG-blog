import React from "react";

import Topics from "./Topics";
import Projects from "./Topics";
import Resources from "./Topics";
import Tasks from "./Topics";

const CategoryTab = (props) => {
  return (
      props.category == "Topics" ?
      <Topics {...props.category[0] } /> : props.category == "Projects" ?
      <Projects  {...props.category[0] } /> : props.category == "Resources" ?
      <Resources  {...props.category[0] } /> :
      <Tasks  {...props.category[0] } />
  );
};

export default CategoryTab;
