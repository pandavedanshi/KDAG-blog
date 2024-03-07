import React from "react";
import Header from "./Header";
import Fade from "react-reveal/Fade";
import Particless from "../Common/Particles/Particless";
import DiscussionCard from "./DiscussionCard";
import icon_add from "./asset_addition_symbol.png";

const ForumPage = () => {
	return (
		<>
			<Fade left>
				<Header />
			</Fade>
			<div className="forum-section">
				<div className="discussion-cards">
					<div className="discussion-card-create-new">
						<div className="discussion-card-button-container">
							<button>
								<img src={icon_add} />
								New Discussion
							</button>
						</div>
					</div>
					<Fade bottom>
						<DiscussionCard />
					</Fade>
					<Fade bottom>
						<DiscussionCard />
					</Fade>
					<Fade bottom>
						<DiscussionCard />
					</Fade>
					<Fade bottom>
						<DiscussionCard />
					</Fade>
					<Fade bottom>
						<DiscussionCard />
					</Fade>
					<Fade bottom>
						<DiscussionCard />
					</Fade>
				</div>
			</div>
			<Particless />
		</>
	);
};

export default ForumPage;
