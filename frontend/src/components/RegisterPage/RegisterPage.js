import React, { useEffect, useState } from "react";
import useDebounce from "./DebounceHook";
import Fade from "react-reveal/Fade";
import Particless from "../Common/Particles/Particless";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterPage.css";

const RegisterPage = () => {
	const particless = React.useMemo(() => <Particless />, []);
	const [showUsermessage, setShowUsermessage] = useState(false);

	const [numMembers, setNumMembers] = useState(2);
	const [team, setTeam] = useState("");

	const [members, setMembers] = useState(
		Array.from({ length: 5 }, () => ({
			firstname: "",
			lastname: "",
			gender: "",
			mail: "",
			mobile: "",
			college: "",
			degree: "",
			YOS: "",
			GitHubID: "",
			team: "",
		}))
	);

	if (showUsermessage) {
		setTimeout(() => {
			setShowUsermessage(false);
		}, 25000);
	}

	const MemberForm = React.memo(({ index, handleInputChange }) => {
		console.log("Rendering member form", index);
		return (
			<>
				<input
					type="text"
					name="firstname"
					placeholder="First Name"
					required
					value={members[index].firstname}
					onChange={(e) =>
						handleInputChange(index, "firstname", e.target.value)
					}
				/>
				<input
					type="text"
					name="lastname"
					placeholder="Last Name"
					value={members[index].lastname}
					onChange={(e) => handleInputChange(index, "lastname", e.target.value)}
				/>
				<div className="register-form-gender">
					<label for="gender">Select Gender:</label>
					<select
						id="gender"
						name="gender"
						value={members[index].gender}
						onChange={(e) => handleInputChange(index, "gender", e.target.value)}
					>
						<option value="male">Male</option>
						<option value="female">Female</option>
						<option value="other">Other</option>
					</select>
				</div>
				<input
					type="email"
					name="email"
					placeholder="Email Id"
					required
					value={members[index].mail}
					onChange={(e) => handleInputChange(index, "mail", e.target.value)}
				/>
				<input
					type="number"
					name="phone"
					placeholder="Contact Number"
					required
					value={members[index].mobile}
					onChange={(e) => handleInputChange(index, "mobile", e.target.value)}
				/>
				<input
					type="text"
					name="college"
					placeholder="College Name"
					required
					value={members[index].college}
					onChange={(e) => handleInputChange(index, "college", e.target.value)}
				/>
				<input
					type="text"
					name="degree"
					placeholder="Degree"
					required
					value={members[index].degree}
					onChange={(e) => handleInputChange(index, "degree", e.target.value)}
				/>
				<input
					type="number"
					name="year"
					placeholder="Year of Study - 1/2/3..."
					required
					value={members[index].YOS}
					onChange={(e) => handleInputChange(index, "YOS", e.target.value)}
				/>
				<input
					type="text"
					name="year"
					placeholder="Github Id"
					required
					value={members[index].GitHubID}
					onChange={(e) => handleInputChange(index, "GitHubID", e.target.value)}
				/>
			</>
		);
	});

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
			setNumMembers(value);
		}
	};

	const handleTeamName = (e) => {
		const value = e.target.value;
		const trimmed = value.trim();
		if (trimmed === "") {
			toast.error("Please enter a valid name", {
				position: "top-center",
				draggable: true,
				theme: "dark",
			});
			return;
		}
		if (value.length > 35) {
			toast.error("Please Choose a name not more than 35 characters", {
				position: "top-center",
				draggable: true,
				theme: "dark",
			});
			return;
		}
		const validNameRegex = /^[a-zA-Z\s]*$/;
		if (!validNameRegex.test(trimmed)) {
			toast.error("Team name can only contain letters and spaces", {
				position: "top-center",
				draggable: true,
				theme: "dark",
			});
			return;
		}

		setTeam(value);
	};

	useEffect(() => {
		console.log("-----------------------------------------------------------");
		console.log(members);
	}, [numMembers, members]);

	// const handleInputChange = (index, field, value) => {
	// 	const updatedMembers = [...members];
	// 	updatedMembers[index] = {
	// 		...updatedMembers[index],
	// 		[field]: value,
	// 	};
	// 	setMembers(updatedMembers);
	// };

	// const handleInputChange = (index, field, value) => {
	// 	setMembers((prevMembers) => {
	// 		const updatedMembers = [...prevMembers];
	// 		updatedMembers[index] = {
	// 			...updatedMembers[index],
	// 			[field]: value,
	// 		};
	// 		return updatedMembers;
	// 	});
	// };

	const [debouncedValue, setDebouncedValue] = useState("");

	const handleInputChange = (index, field, value) => {
		setMembers((prevMembers) => {
			const updatedMembers = [...prevMembers];
			updatedMembers[index] = {
				...updatedMembers[index],
				[field]: debouncedValue,
			};
			return updatedMembers;
		});
	};

	const debouncedInput = useDebounce(debouncedValue, 300);

	const handleOnChange = (index, field, value) => {
		setDebouncedValue(value);
		handleInputChange(index, field, debouncedInput);
	};

	const renderMembers = () => {
		let memberElements = [];
		for (let i = 2; i < numMembers; i++) {
			memberElements.push(
				<div key={`member${i + 1}`}>
					<div className="register-form-details">Details of Member {i + 1}</div>
					<MemberForm index={i} handleInputChange={handleInputChange} />
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
									onChange={handleTeamName}
								/>
								<input
									type="number"
									name="numMembers"
									placeholder="Number of members"
									onChange={handleNumMembers}
									required
								/>
								<div className="register-form-details">
									Details of Member 1 : Team Leader
								</div>
								<MemberForm index={0} handleInputChange={handleInputChange} />
								<div className="register-form-details">Details of Member 2</div>
								<MemberForm index={1} handleInputChange={handleInputChange} />
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
