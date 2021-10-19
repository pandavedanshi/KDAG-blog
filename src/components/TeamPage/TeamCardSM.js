import React from "react";
import "./TeamCardSM.css";

const TeamCardSM = ({member}) => {
    return (
        <div class="member-card-SM">
            <div class="member-card-section-0-SM">
            <div class="member-profile-image-SM">
              <img src={member?.image} alt="John" />
            </div>
            </div>
            <div class="member-card-section-1-SM">
           <div class="member-name-SM">
             <p>{member?.name || "Name of Member"}</p>
           </div>
           {/* <div class="member-email-SM">
             <p>{member?.email || "email id"}</p>
           </div> */}
            </div>

           <div class="member-profile-follow-SM">
             <div class="member-social-icon-SM" >
               {/* <div class="member-social-icon-icon-SM">
                 <a href={member?.facebook || "#"}><i class="fab fa-facebook"></i></a>
               </div> */}
               {/* <div class="member-social-icon-icon">
                 <a href={member?.twitter || "#"}><i class="fab fa-twitter"></i></a>
               </div> */}
               <div class="member-social-icon-icon-SM">
                 <a href={member?.linkedin || "#"}><i class="fab fa-linkedin"></i></a>
               </div>
            </div>
        </div>
        </div>
    )
}

export default TeamCardSM;