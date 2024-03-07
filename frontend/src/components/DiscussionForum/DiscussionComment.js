import React from "react";
import "./DiscussionComment.css";
import profileImage from "./profile.jpeg";
import icon_heart from "./asset_heart.png";

const DiscussionComment = () => {
	return (
		<div className="discussion-comment-container">
			<div className="discussion-comment">
				<div className="discussion-comment-image-container">
					<img src={profileImage} />
				</div>
				<div className="discussion-comment-description">
					<div className="discussion-comment-description-details">
						This is a sample text that represents what will be written here,
						lorem ipsum blah blah blah blah lorem ipsum blah blah blah blah This
						is a sample text that represents what will be written here, lorem
						ipsum blah blah blah blah lorem ipsum blah blah blah blah This is a
						sample text that represents what will be written here, lorem ipsum
						blah blah lorem ipsum blah blah blah blah This is a sample text
					</div>
					<div className="discussion-comment-bottom">
						<div className="discussion-comment-last-comment-date">
							posted on <span>22 Dec 2023</span>
						</div>
						<div className="discussion-comment-actions">
							<div className="discussion-comment-actions-liked">
								<img src={icon_heart} />
								53
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DiscussionComment;
