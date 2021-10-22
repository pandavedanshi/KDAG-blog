import React from "react"
import TeamCard from "./TeamCard"
import TeamCardSM from  "./TeamCardSM";
import TeamPageHeading from "./TeamPageHeading";
import members from "./MembersStatic"
import seniormembers from "./SeniorMembersStatic";
import advisors from "./AdvisorsStatic";
import Navbar from "../Common/Navbar/Navbar";
import Header from "./Header";
import Fade from "react-reveal/Fade";
// import bullet from "../../assets/svgs/TeamBullet.svg";
import "./TeamPage.css"

const TeamPage = () => {
    return  (
        <>
        <Navbar />
        <Header />
        <Fade left>
        <TeamPageHeading text="Heads" />
        </Fade>
        <div className="members-head-list">
            
        {members?.map((member) => {
            return <TeamCard key={member.id} member = {member} />;
          }) 
        }
        </div>

        <Fade left>
        <TeamPageHeading text="Advisors" />
        </Fade>
        <div className="members-head-list">
            
        {advisors?.map((member) => {
            return <TeamCardSM key={member.id} member = {member} />;
          }) 
        }
        </div>

        <Fade left>
        <TeamPageHeading text="Senior Members" />
        </Fade>
        <div className="members-head-list members-head-list-bottom">
            
        {seniormembers?.map((member) => {
            return <TeamCardSM key={member.id} member = {member} />;
          }) 
        }
        </div>
        
        </>
    )
}

export default TeamPage;
