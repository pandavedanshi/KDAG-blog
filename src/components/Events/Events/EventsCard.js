import React from "react"
import "./EventsCard.css"
import Fade from "react-reveal/Fade";

const EventsCard = ({ event }) => {
    return (
        <div>
            <Fade bottom>
        <div className="events-card">
            <div className="events-card-left">

            </div>
            <div className="events-card-right">
                <div className="events-card-title">{event.title || "Event Title"}</div>
                <div className="events-card-location"><i class="fas fa-map-marker-alt"></i> {event.location || "location, platform"}</div>
                <div className="events-card-date"><i class="far fa-calendar-alt"></i> {event.date || "Date range"}</div>
                <a href={event.link || "#"}>
                    <div className="events-card-button"><div className="events-card-button2">Event Information</div><div className="events-card-button1"><i class="fa fa-link"></i></div></div>
                </a>
            </div>
        </div>
            </Fade>
        </div>
    )
}

export default EventsCard
