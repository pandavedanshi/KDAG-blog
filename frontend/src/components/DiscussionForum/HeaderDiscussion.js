import React from "react";
import "./DiscussionCard.css";
import profileImage from "./profile.jpeg";
import icon_viewed from "./asset_viewed.png";
import icon_commented from "./asset_comment.png"; 

const HeaderDiscussion = () => {
	return (
		<div className="header-discussion-card-container">
			<div className="header-discussion-card">
				<div className="header-discussion-card-image-container">
					<img src={profileImage} />
				</div>
				<div className="header-discussion-card-description">
					<div className="header-discussion-card-description-heading">
						Description Title
					</div>
					<div className="header-discussion-card-last-comment-date">
						posted <span>13:35 22 Dec 2023</span>
					</div>
					<div className="header-discussion-card-description-details">
						This text explains the discussion topic. This is a sample text that
						represents what will be written here, lorem ipsum blah blah blah
						blah lorem ipsum blah blah blah blah This is a sample text that
						represents what will be written here, lorem ipsum blah blah blah
						blah lorem ipsum blah blah blah blah This is a sample text that
						represents what will be written here, lorem ipsum blah blah blah
						blah lorem ipsum blah blah blah blah This is a sample text that
						represents what will be written here, lorem ipsum blah blah blah
						blah lorem ipsum blah blah blah blah...
					</div>
					<div className="header-discussion-card-actions">
						<div className="header-discussion-card-actions-viewed">
							<img src={icon_viewed} />
							53
						</div>
						<div className="header-discussion-card-actions-commented">
							<img src={icon_commented} />
							17
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeaderDiscussion;
