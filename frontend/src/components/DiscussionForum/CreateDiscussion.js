import Particless from "../Common/Particles/Particless";
import Fade from "react-reveal/Fade";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import "./CreateDiscussion.css";

const CreateDiscussion = (props) => {
	const particless = React.useMemo(() => <Particless />, []);
	const currentDate = new Date();
	const day = currentDate.getDate();
	const month = currentDate.getMonth() + 1;
	const year = currentDate.getFullYear();
	const formattedDate = `${day.toString().padStart(2, "0")}-${month
		.toString()
		.padStart(2, "0")}-${year.toString().slice(-2)}`;

	const [rDirect, setRDirect] = useState(false);
	const [userId, setUserId] = useState("empty");
	const token = localStorage.getItem("access_token");

	useEffect(() => {
		if (token) {
			try {
				const decodedToken = jwtDecode(token);
				if (decodedToken && decodedToken.sub && decodedToken.sub.user_id) {
					setUserId(decodedToken.sub.user_id);
				}
			} catch (error) {
				console.error("Error decoding token:", error);
			}
		}
	}, [token]);

	const { showLogout } = props;
	const history = useHistory();
	const [discussionContent, setDiscussionContent] = useState("");

	useEffect(() => {
		if (!showLogout) {
			history.push("/auth");
		}
	}, [showLogout]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const formData = {
				message: discussionContent,
				date: formattedDate,
			};

			const response = await fetch(
				`${process.env.REACT_APP_FETCH_URL}/create_post/${userId}`,
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
				console.log("Error creating discussion(response):", jsonData.message);
			} else {
				const jsonData = await response.json();
				console.log("Discussion created successfully:", jsonData.message);
				setRDirect(true);
			}
		} catch (error) {
			console.error("Error creating discussion(catch):", error);
		}
	};

	if (rDirect) {
		history.push("/forum");
	}

	return (
		<div>
			{showLogout && (
				<div className="create-discussion-container">
					<div className="discussion-circle"></div>
					<Fade right>
						<div className="create-discussion-form-container">
							<form onSubmit={handleSubmit}>
								<h1>Create Discussion</h1>
								{/* <input type="text" placeholder="Title" required /> */}
								<textarea
									type="text"
									placeholder="Discussion content"
									required
									value={discussionContent}
									onChange={(e) => setDiscussionContent(e.target.value)}
								/>
								<button type="submit">Post</button>
							</form>
						</div>
					</Fade>
				</div>
			)}
			{particless }
		</div>
	);
};

export default CreateDiscussion;
