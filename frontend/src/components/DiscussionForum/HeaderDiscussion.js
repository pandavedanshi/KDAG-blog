import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./DiscussionCard.css";
import profileImage from "./profile.jpeg";
import icon_viewed from "./asset_viewed.png";
import icon_commented from "./asset_comment.png";
import DiscussionComment from "./DiscussionComment";


const HeaderDiscussion = () => {
	const [showReplies, setShowReplies] = useState(false);

	const toggleReplies = () => {
		setShowReplies(!showReplies);
	};

	const replies = [
		<Fade bottom key={1}>
			<DiscussionComment />
		</Fade>,
		<Fade bottom key={2}>
			<DiscussionComment />
		</Fade>,
		<Fade bottom key={3}>
			<DiscussionComment />
		</Fade>,
		<Fade bottom key={4}>
			<DiscussionComment />
		</Fade>
	];

	return (
		<div className="header-discussion-card-container">
			<div className="header-discussion-card">
				{/* <div className="header-discussion-card-image-container">
					<img src={profileImage} />
				</div> */}
				<div className="header-discussion-card-description">
					<div className="header-discussion-card-description-poster">
						<img
							src="https://img.freepik.com/free-photo/cyberpunk-urban-scenery_23-2150712464.jpg"
							alt="img"
						/>
					</div>

					{/* <div className="header-discussion-card-description-heading">
						Description Title Description Title Description Title
					</div> */}
					<div className="header-discussion-card-posted-by">
						<Link to="/user_profile_public">_username.abc123</Link>
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
						blah lorem ipsum blah blah blah blah... This text explains the
						discussion topic. This is a sample text that represents what will be
						written here, lorem ipsum blah blah blah blah lorem ipsum blah blah
						blah blah This is a sample text that represents what will be written
						here, lorem ipsum blah blah blah blah lorem ipsum blah blah blah
						blah This is a sample text that represents what will be written
						here, lorem ipsum blah blah blah blah lorem ipsum blah blah blah
						blah This is a sample text that represents what will be written
						here, lorem ipsum blah blah blah blah lorem ipsum blah blah blah
						blah...This text explains the discussion topic. This is a sample
						text that represents what will be written here, lorem ipsum blah
						blah blah blah lorem ipsum blah blah blah blah This is a sample text
						that represents what will be written here, lorem ipsum blah blah
						blah blah lorem ipsum blah blah blah blah This is a sample text that
						represents what will be written here, lorem ipsum blah blah blah
						blah lorem ipsum blah blah blah blah This is a sample text that
						represents what will be written here, lorem ipsum blah blah blah
						blah lorem ipsum blah blah blah blah...This text explains the
						discussion topic. This is a sample text that represents what will be
						written here, lorem ipsum blah blah blah blah lorem ipsum blah blah
						blah blah This is a sample text that represents what will be written
						here, lorem ipsum blah blah blah blah lorem ipsum blah blah blah
						blah This is a sample text that represents what will be written
						here, lorem ipsum blah blah blah blah lorem ipsum blah blah blah
						blah This is a sample text that represents what will be written
						here, lorem ipsum blah blah blah blah lorem ipsum blah blah blah
						blah...This text explains the discussion topic. This is a sample
						text that represents what will be written here, lorem ipsum blah
						blah blah blah lorem ipsum blah blah blah blah This is a sample text
						that represents what will be written here, lorem ipsum blah blah
						blah blah lorem ipsum blah blah blah blah This is a sample text that
						represents what will be written here, lorem ipsum blah blah blah
						blah lorem ipsum blah blah blah blah This is a sample text that
						represents what will be written here, lorem ipsum blah blah blah
						blah lorem ipsum blah blah blah blah...This text explains the
						discussion topic. This is a sample text that represents what will be
						written here, lorem ipsum blah blah blah blah lorem ipsum blah blah
						blah blah This is a sample text that represents what will be written
						here, lorem ipsum blah blah blah blah lorem ipsum blah blah blah
						blah This is a sample text that represents what will be written
						here, lorem ipsum blah blah blah blah lorem ipsum blah blah blah
						blah This is a sample text that represents what will be written
						here, lorem ipsum blah blah blah blah lorem ipsum blah blah blah
						blah...
					</div>
					<div className="header-discussion-card-actions">
						{/* <div className="header-discussion-card-actions-viewed">
							<img src={icon_viewed} />
							53
						</div> */}
						<div className="header-discussion-card-actions-commented">
							<button onClick={toggleReplies}>
								<img src={icon_commented} />
								17
							</button>
						</div>
						<div className="header-discussion-card-actions-delete">
							<Link to="/create_comment">Comment</Link>
						</div>
						<div className="header-discussion-card-actions-delete">
							<button>Delete post</button>
						</div>
					</div>
				</div>
			</div>

			{showReplies && replies}
		</div>
	);
};

export default HeaderDiscussion;
