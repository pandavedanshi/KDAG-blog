import React, { useEffect, useState } from "react";
import Header from "./Header";
import Fade from "react-reveal/Fade";
import Particless from "../Common/Particles/Particless";
import DiscussionCard from "./DiscussionCard";
import icon_add from "./asset_addition_symbol.png";
import { Link } from "react-router-dom";

const ForumPage = () => {
	const [posts, setPosts] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredPosts, setFilteredPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch(`${process.env.REACT_APP_FETCH_URL}/get_posts`, {
					method: "GET",
				});
				if (!response.ok) {
					const jsonData = await response.json();
					// toast.error(jsonData.message);
					console.log(jsonData.message);
				} else {
					const jsonData = await response.json();
					console.log("Posts fetched successfully:", jsonData.message);
					setPosts(jsonData.posts);
					setFilteredPosts(jsonData.posts);
				}
			} catch (error) {
				console.error("Error fetching posts:", error);
				// toast.error("Error fetching posts. Please try again later.");
			}
		};

		fetchPosts();
	}, []);

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
		const filtered = posts.filter((post) =>
			post.author_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
			post.message.toLowerCase().includes(e.target.value.toLowerCase())
		);
		setFilteredPosts(filtered);
	};

	return (
		<>
			<Fade left>
				<Header />
			</Fade>
			<div className="forum-section">
				<div className="discussion-cards">
					<div className="discussion-card-header">
						<div className="discussion-card-create-new">
							<div className="discussion-card-button-container">
								<button style={{ cursor: "none" }}>
									<Link to="/create_discussion" style={{ cursor: "none" }}>
										<img src={icon_add} alt="New Discussion Icon" />
										<span className="new-discussion-text">New Discussion</span>
									</Link>
								</button>
							</div>
						</div>

						<div className="search-bar-container">
							<input
								type="text"
								placeholder="Search"
								value={searchQuery}
								onChange={handleSearch}
								className="search-bar-input"
							/>
							<button className="search-bar-button">Search</button>
						</div>
					</div>
					{filteredPosts.map((post) => (
						<Fade bottom key={post.post_id}>
							<DiscussionCard post={post} numReplies={post.replies} />
						</Fade>
					))}
				</div>
			</div>
			<Particless />
		</>
	);
};

export default ForumPage;
