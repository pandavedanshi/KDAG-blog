import React from "react";
import Header from "./Header/Header";
import ResourcesList from "./Resources/ResourcesList";
import Navbar from "../Common/Navbar/Navbar";
// import Footer from "../Common/Footer/Footer";

const ResourcesPage = () => {
  return (
    <>
      <Navbar />
      <Header />
      <ResourcesList />
      {/* <Footer /> */}
    </>
  );
};

export default ResourcesPage;
