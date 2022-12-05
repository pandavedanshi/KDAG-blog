import React from "react";
import Header from "./Header/Header";
import EventsList from "./Events/EventsList";
import Navbar from "../Common/Navbar/Navbar";
import Particless from "../Common/Particles/Particless";

const EventsPage = () => {
  return (
    <>
      <Navbar />
      <Header />
      <EventsList />
      <Particless />
    </>
  );
};

export default EventsPage;