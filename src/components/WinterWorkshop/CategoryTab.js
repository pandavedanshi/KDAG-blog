import React from "react";

import Topics from "./Topics";
import Projects from "./Topics";
import Resources from "./Resources";
import Tasks from "./Topics";

const CategoryTab = (props) => {
  return (
      props.category.title === "Topics" ?
      <Topics {...props.category } /> : props.category.title === "Projects" ?
      <Projects  {...props.category } /> : props.category.title === "Resources" ?
      <Resources  {...props.category } /> :
      <Tasks  {...props.category } />
  );
};

export default CategoryTab;
