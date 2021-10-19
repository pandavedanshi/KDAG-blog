import React from "react"
import TeamCard from "./TeamCard"
import TeamCardSM from  "./TeamCardSM";
import TeamPageHeading from "./TeamPageHeading";
import members from "./MembersStatic"
import seniormembers from "./SeniorMembersStatic";
import advisors from "./AdvisorsStatic";
import Navbar from "../Common/Navbar/Navbar";
import Header from "./Header";
// import bullet from "../../assets/svgs/TeamBullet.svg";
import "./TeamPage.css"

const TeamPage = () => {
    return  (
        <>
        <Navbar />
        <Header />
        <TeamPageHeading text="Heads" />
        <div className="members-head-list">
            
        {members?.map((member) => {
            return <TeamCard key={member.id} member = {member} />;
          }) 
        }
        </div>

        <TeamPageHeading text="Advisors" />
        <div className="members-head-list members-head-list-bottom">
            
        {advisors?.map((member) => {
            return <TeamCardSM key={member.id} member = {member} />;
          }) 
        }
        </div>
        
        <TeamPageHeading text="Senior Members" />
        <div className="members-head-list">
            
        {seniormembers?.map((member) => {
            return <TeamCardSM key={member.id} member = {member} />;
          }) 
        }
        </div>

        <TeamPageHeading text="Advisors" />
        <div className="members-head-list members-head-list-bottom">
            
        {advisors?.map((member) => {
            return <TeamCardSM key={member.id} member = {member} />;
          }) 
        }
        </div>
        
        </>
    )
}

export default TeamPage;
