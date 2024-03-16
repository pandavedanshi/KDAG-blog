import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import "./DiscussionComment.css";
import DiscussionComment from "./DiscussionComment";
import icon_commented from "./asset_comment.png";

const DiscussionComment2 = () => {
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
		<Fade bottom key={2}>
			<DiscussionComment />
		</Fade>,
	];
	return (
		<div className="discussion-comment-container">
			<div className="discussion-comment">
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
						<div className="discussion-comment-posted-by">_username.abc123</div>

						<div className="discussion-comment-last-comment-date">
							posted on <span>22 Dec 2023</span>
						</div>
						<div className="discussion-comment-actions-commented">
							<button onClick={toggleReplies}>
								<img src={icon_commented} />
								17
							</button>
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

export default DiscussionComment2;
