import React from "react";
import Header from "./Header/Header";
import EventsList from "./Events/EventsList";
import Navbar from "../Common/Navbar/Navbar";

const EventsPage = () => {
  return (
    <>
      <Navbar />
      <Header />
      <EventsList />
    </>
  );
};

export default EventsPage;