import React from "react";
import Header from "./Header/Header";
import ResourcesList from "./Resources/ResourcesList";
import Navbar from "../Common/Navbar/Navbar";
import Particless from "../Common/Particles/Particless";
// import Footer from "../Common/Footer/Footer";

const ResourcesPage = () => {
  return (
    <>
      <Navbar />
      <Header />
      <ResourcesList />
      <Particless />
      {/* <Footer /> */}
    </>
  );
};

export default ResourcesPage;