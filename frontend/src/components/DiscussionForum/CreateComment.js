import Particless from "../Common/Particles/Particless";
import Fade from "react-reveal/Fade";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { jwtDecode } from "jwt-decode";

import "./CreateDiscussion.css";

const CreateComment = (props) => {
	const { showLogout } = props;
	const { post_id, currLevel } = useParams();
	const history = useHistory();
	const [commentMessage, setCommentMessage] = useState("");
	const token = localStorage.getItem("access_token");
	const [rdirect, setRdirect] = useState(false);
	const [level, setLevel] = useState(currLevel);
	const [authorId, setAuthorId] = useState("");

	useEffect(() => {
		if (currLevel === "none") {
			setLevel("");
		}
	}, []);

	useEffect(() => {
		if (token) {
			try {
				const decodedToken = jwtDecode(token);
				if (decodedToken && decodedToken.sub && decodedToken.sub.user_id) {
					setAuthorId(decodedToken.sub.user_id);
				}
			} catch (error) {
				console.error("Error decoding token:", error);
			}
		}
	}, [token]);

	useEffect(() => {
		if (!showLogout) {
			history.push("/auth");
		}
	}, [showLogout]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const formData = {
				message: commentMessage,
				author_id: authorId,
				level: level,
			};

			const response = await fetch(
				`http://127.0.0.1:8080/reply/create_reply/${post_id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						...formData,
					}),
				}
			);

			if (!response.ok) {
				const jsonData = await response.json();
				console.log("Error creating comment:", jsonData.message);
			} else {
				const jsonData = await response.json();
				console.log("comment posted successfully:", jsonData.message);
				setRdirect(true);
			}
		} catch (error) {
			console.error("Error posting comment:", error);
		}
	};

	if (rdirect) {
		history.goBack();
	}

	return (
		<div>
			{showLogout && (
				<div className="create-discussion-container">
					<div className="discussion-circle"></div>
					<Fade right>
						<div className="create-discussion-form-container">
							<form onSubmit={handleSubmit}>
								<h1>Post Comment</h1>
								{/* <input type="text" placeholder="Title" required /> */}
								<textarea
									type="text"
									placeholder="Type your message here"
									required
									onChange={(e) => setCommentMessage(e.target.value)}
								/>
								<button type="submit">Comment</button>
							</form>
						</div>
					</Fade>
				</div>
			)}
			<Particless />
		</div>
	);
};

export default CreateComment;
