import { useState } from "react";
import { Link } from "react-router-dom";
import Particless from "../Common/Particles/Particless";
import username from "../../assets/pics/username.png";
import name from "../../assets/pics/name.png";
import email from "../../assets/pics/email.png";
import college from "../../assets/pics/college.png";
import phone from "../../assets/pics/phone.png";
import password_img from "../../assets/pics/password.png";
import username2 from "../../assets/pics/username2.png";
import phone2 from "../../assets/pics/phone2.png";
import name2 from "../../assets/pics/name2.png";
import email2 from "../../assets/pics/email2.png";
import college2 from "../../assets/pics/college2.png";
import password2 from "../../assets/pics/password2.png";
import user_profile from "../../assets/pics/user_profile.png";
import edit_icon from "../../assets/pics/edit.png";
import password_show from "../../assets/pics/password_show.png";
import password_hidden from "../../assets/pics/password_hidden.png";
import Fade from "react-reveal/Fade";
import "./UserProfileSelf.css";

const UserProfileSelf = () => {
	const [activeContent, setActiveContent] = useState("content6");
	const [toggle, setToggle] = useState(false);
	const [password, setPassword] = useState("password123  ");
	const password_hashed = "***************  ";

	const password_toggle = () => {
		setToggle(!toggle);
	};

	const handleMouseOver = (contentId) => {
		setActiveContent(contentId);
	};

	return (
		<div className="outer_profile_self_container">
			<div className="edit_profile_button">
				<Link to="/edit_profile">
					<img src={edit_icon} />
				</Link>
			</div>
			<Fade left>
				<div className="profile_self_container">
					<div className="profile_self_icon">
						<div
							className={`profile_self_img_box ${
								activeContent === "content1" && "profile_self_active"
							}`}
							style={{ "--i": "1" }}
							onMouseOver={() => handleMouseOver("content1")}
						>
							<img src={username2} />
						</div>
						<div
							className={`profile_self_img_box ${
								activeContent === "content2" && "profile_self_active"
							}`}
							style={{ "--i": "2" }}
							onMouseOver={() => handleMouseOver("content2")}
						>
							<img src={name2} />
						</div>
						<div
							className={`profile_self_img_box ${
								activeContent === "content6" && "profile_self_active"
							}`}
							style={{ "--i": "6" }}
							onMouseOver={() => handleMouseOver("content6")}
						>
							<img src={user_profile} />
						</div>
						<div
							className={`profile_self_img_box ${
								activeContent === "content4" && "profile_self_active"
							}`}
							style={{ "--i": "4" }}
							onMouseOver={() => handleMouseOver("content4")}
						>
							<img src={college2} />
						</div>
						<div
							className={`profile_self_img_box ${
								activeContent === "content5" && "profile_self_active"
							}`}
							style={{ "--i": "5" }}
							onMouseOver={() => handleMouseOver("content5")}
						>
							<img src={email2} />
						</div>
						<div
							className={`profile_self_img_box ${
								activeContent === "content3" && "profile_self_active"
							}`}
							style={{ "--i": "3" }}
							onMouseOver={() => handleMouseOver("content3")}
						>
							<img src={phone2} />
						</div>
						<div
							className={`profile_self_img_box ${
								activeContent === "content7" && "profile_self_active"
							}`}
							style={{ "--i": "7" }}
							onMouseOver={() => handleMouseOver("content7")}
						>
							<img src={password2} />
						</div>
					</div>

					<div className="profile_self_content">
						<div
							className={`profile_self_content_box ${
								activeContent === "content6" && "profile_self_active"
							}`}
							id="content6"
						>
							<div className="profile_self_card">
								<div className="profile_self_img_box">
									<img src={user_profile} />
								</div>
								<div className="profile_self_text_box">
									<h2>
										Welcome to <strong>KDAG</strong> <br />
										<span></span>
									</h2>
								</div>
							</div>
						</div>
						<div
							className={`profile_self_content_box ${
								activeContent === "content1" && "profile_self_active"
							}`}
							id="content1"
						>
							<div className="profile_self_card">
								<div className="profile_self_img_box">
									<img src={username} />
								</div>
								<div className="profile_self_text_box">
									<h2>
										__user__profile_self123 <br />
										<span>Username</span>
									</h2>
								</div>
							</div>
						</div>

						<div
							className={`profile_self_content_box ${
								activeContent === "content2" && "profile_self_active"
							}`}
							id="content2"
						>
							<div className="profile_self_card">
								<div className="profile_self_img_box">
									<img src={name} />
								</div>
								<div className="profile_self_text_box">
									<h2>
										FirstName lastname <br />
										<span>Name</span>
									</h2>
								</div>
							</div>
						</div>

						<div
							className={`profile_self_content_box ${
								activeContent === "content4" && "profile_self_active"
							}`}
							id="content4"
						>
							<div className="profile_self_card">
								<div className="profile_self_img_box">
									<img src={college} />
								</div>
								<div className="profile_self_text_box">
									<h2>
										Indian Institute of Technology, Kharagpur <br />
										<span>College</span>
									</h2>
								</div>
							</div>
						</div>

						<div
							className={`profile_self_content_box ${
								activeContent === "content5" && "profile_self_active"
							}`}
							id="content5"
						>
							<div className="profile_self_card">
								<div className="profile_self_img_box">
									<img src={email} />
								</div>
								<div className="profile_self_text_box">
									<h2>
										email.abc123@email.com <br />
										<span>Email</span>
									</h2>
								</div>
							</div>
						</div>

						<div
							className={`profile_self_content_box ${
								activeContent === "content3" && "profile_self_active"
							}`}
							id="content3"
						>
							<div className="profile_self_card">
								<div className="profile_self_img_box">
									<img src={phone} />
								</div>
								<div className="profile_self_text_box">
									<h2>
										1234567890 <br />
										<span>Phone</span>
									</h2>
								</div>
							</div>
						</div>
						<div
							className={`profile_self_content_box ${
								activeContent === "content7" && "profile_self_active"
							}`}
							id="content7"
						>
							<div className="profile_self_card">
								<div className="profile_self_img_box">
									<img src={password_img} />
								</div>
								<div className="profile_self_text_box">
									<h2 className="profile_self_password_view">
										{toggle ? password : password_hashed}
										<button onClick={password_toggle}>
											{toggle ? (
												<img src={password_hidden} />
											) : (
												<img src={password_show} />
											)}
										</button>
										<br />
										<span>Password</span>
									</h2>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Fade>
			<Particless />
		</div>
	);
};

export default UserProfileSelf;
