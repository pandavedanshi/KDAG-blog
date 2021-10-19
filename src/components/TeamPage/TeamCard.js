import React from "react";
import "./TeamCard.css";

const TeamCard = ({member}) => {
    return (
        <div class="member-card">
            <div class="member-profile-image">
              <img src={member?.image} alt="John" />
            </div>
           <div class="member-name">
             <p>{member?.name || "Name of Member"}</p>
           </div>
           {/* <div class="member-email">
             <p>{member?.email || "email id"}</p>
           </div> */}
           <div class="member-profile-follow">
             <div class="member-follow-text">
               <span>
                 Follow on
               </span>
             </div>
             <div class="member-social-icon" >
               <div class="member-social-icon-icon">
                 <a href={member?.facebook || "#"}><i class="fab fa-facebook"></i></a>
               </div>
               {/* <div class="member-social-icon-icon">
                 <a href={member?.twitter || "#"}><i class="fab fa-twitter"></i></a>
               </div> */}
               <div class="member-social-icon-icon">
                 <a href={member?.linkedin || "#"}><i class="fab fa-linkedin"></i></a>
               </div>
            </div>
        </div>
        </div>
    )
}

export default TeamCard;
