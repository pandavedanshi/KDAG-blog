import React, { useState, useContext } from "react";
import Fade from "react-reveal/Fade";
import Particless from "../Common/Particles/Particless";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterPage.css";

const RegisterPage = () => {
	const particless = React.useMemo(() => <Particless />, []);
	const [showUsermessage, setShowUsermessage] = useState(false);
	const [numMembers, setNumMembers] = useState(0);

	if (showUsermessage) {
		setTimeout(() => {
			setShowUsermessage(false);
		}, 25000);
	}

	const member = (
		<>
			<input type="text" name="firstname" placeholder="First Name" required />
			<input type="text" name="lastname" placeholder="Last Name"/>
			<input type="" name="Gender" placeholder="" />
			<input type="email" name="email" placeholder="Email Id" required />
			<input type="number" name="phone" placeholder="Contact Number" required />
			<input type="text" name="college" placeholder="College Name" required />
			<input type="text" name="degree" placeholder="Degree" required />
			<input type="number" name="year" placeholder="Year of Study" required />
			<input type="number" name="year" placeholder="Github Id" required />
		</>
	);

	const handleNumMembers = (e) => {
		const value = e.target.value;
		if (value > 5) {
			toast.error("There can be a maximum of 5 participants in a team!", {
				position: "top-center",
				draggable: true,
				theme: "dark",
			});
		} else if (value < 2) {
			toast.error("There have to be a minimum of 2 members in a team!", {
				position: "top-center",
				draggable: true,
				theme: "dark",
			});
		} else if (value <= 5) {
			setNumMembers(Number(value));
		}
	};

	const renderMembers = () => {
		let memberElements = [];
		for (let i = 2; i < numMembers; i++) {
			memberElements.push(
				<div key={`member${i + 1}`}>
					<div className="register-form-details">Details of Member {i + 1}</div>
					{member}
				</div>
			);
		}
		return memberElements;
	};

	return (
		<>
			<div className="register-container">
				<Fade top>
					<div className="register-header">
						<div className="spacer layer1"></div>
						<div className="register-kdsh">KDSH 2025</div>
						<div className="register-kdsh-desc">
							<p>
								The 5th Edition of the{" "}
								<strong>Kharagpur Data Science Hackathon</strong> (KDSH) is here
								to redefine excellence in data science. Dive into machine
								learning, solve real-world challenges, and showcase your
								innovative solutions. Connect with industry leaders, sharpen
								your skills, and become a trailblazer in the field.
							</p>

							<p>
								To participate, please fill in your details in the form below.
							</p>

							<p>
								Before registering, ensure you've starred the following GitHub
								repositories:
							</p>

							<ul>
								<li>
									<a
										className="kdsh-link"
										href="https://github.com/pathwaycom/pathway"
										target="_blank"
									>
										👉Pathway
									</a>
								</li>
								<li>
									<a
										className="kdsh-link"
										href="https://github.com/pathwaycom/llm-app"
										target="_blank"
									>
										👉LLM App
									</a>
								</li>
							</ul>
						</div>
					</div>
				</Fade>
				<Fade left>
					<div className="register-form">
						<form>
							<div>
								<h1 style={{ fontStyle: "italic" }}>REGISTER</h1>
								<br />
								<input
									type="text"
									name="name"
									placeholder="Team Name"
									required
								/>
								<input
									type="text"
									name="numMembers"
									placeholder="Number of members"
									onChange={handleNumMembers}
								/>
								<div className="register-form-details">
									Details of Member 1 : Team Leader
								</div>
								{member}
								<div className="register-form-details">Details of Member 2</div>
								{member}
								{renderMembers()}
								<button className="register-form-submit">
									<p>Register</p>
								</button>
							</div>
						</form>
					</div>
				</Fade>
			</div>
			{particless}
		</>
	);
};

export default RegisterPage;
