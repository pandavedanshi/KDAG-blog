import React from "react";
import "./DiscussionPage.css";
import HeaderDiscussion from "./HeaderDiscussion";
import Fade from "react-reveal/Fade";
import Particless from "../Common/Particles/Particless";
import "./DiscussionComment.css";

const DiscussionPage = () => {
	return (
		<>
			<Fade left>
				<HeaderDiscussion />
			</Fade>
			<Particless />
		</>
	);
};

export default DiscussionPage;
