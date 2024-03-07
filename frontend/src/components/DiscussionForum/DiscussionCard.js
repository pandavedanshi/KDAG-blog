import React, { useState, useEffect } from "react";
import "./HeaderDiscussion.css";
import profileImage from "./profile.jpeg";
import icon_viewed from "./asset_viewed.png";
import icon_commented from "./asset_comment.png";
import { Link } from "react-router-dom";

const DiscussionCard = () => {
	return (
		<Link to="/discussion_page_id" className="discussion-card-container">
			<div className="discussion-card">
				<div className="discussion-card-image-container">
					<img src={profileImage} />
				</div>
				<div className="discussion-card-description">
					<div className="discussion-card-description-heading">
						Description Title
					</div>
					<div className="discussion-card-description-details">
						This is a sample text that represents what will be written here,
						lorem ipsum blah blah blah blah lorem ipsum blah blah blah blah
					</div>
				</div>
				<div className="discussion-card-actions">
					<div className="discussion-card-actions-viewed">
						<img src={icon_viewed} />
						53
					</div>
					<div className="discussion-card-actions-commented">
						<img src={icon_commented} />
						17
					</div>
				</div>
				<div className="discussion-card-last-comment">
					<div className="discussion-card-last-comment-user">
						<strong>Last post</strong> by <span>Andrew</span>
					</div>
					<div className="discussion-card-last-comment-date">
						at <span>13:35 22 Dec 2023</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default DiscussionCard;
