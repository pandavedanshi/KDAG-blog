import React from "react";
import Header from "./Header/Header";
import ResourcesList from "./Resources/ResourcesList";
import Navbar from "../Common/Navbar/Navbar";

const ResourcesPage = () => {
  return (
    <>
      <Navbar />
      <Header />
      <ResourcesList />
    </>
  );
};

export default ResourcesPage;
