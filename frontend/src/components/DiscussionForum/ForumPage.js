import React from "react";
import Header from "./Header";
import Fade from "react-reveal/Fade";
import Particless from "../Common/Particles/Particless";
import DiscussionCard from "./DiscussionCard";
import icon_add from "./asset_addition_symbol.png";
import { Link } from "react-router-dom";

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
								<Link to="/create_discussion">
									<img src={icon_add} />
									New Discussion
								</Link>
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
