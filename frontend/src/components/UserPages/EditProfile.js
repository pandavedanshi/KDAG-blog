import Particless from "../Common/Particles/Particless";
import React, { useState } from "react";
import password_show_img from "../../assets/pics/password_show.png";
import password_hidden_img from "../../assets/pics/password_hidden.png";
import "./EditProfile.css";

const EditProfile = () => {
	const [toggle, setToggle] = useState(false);
	const password_hashed = "***************  ";
	const [newPasswordButton, setNewPasswordButton] = useState(false);
	const [username, setUsername] = useState("_username_123.abc");
	const [firstName, setFirstName] = useState("FirstName");
	const [lastName, setLastName] = useState("LastName");
	const [college, setCollege] = useState(
		"Indian Institute of Technology,Kharagpur"
	);
	const [email, setEmail] = useState("email.abc@email.com");
	const [phone, setPhone] = useState("1234567890");
	const [currPassword, setCurrPassword] = useState("password123  ");

	const password_toggle = () => {
		setToggle(!toggle);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(
			username,
			firstName,
			lastName,
			college,
			email,
			phone,
			currPassword
		);
	};

	return (
		<div>
			<div className="edit_profile_outer_container">
				<div className="edit_profile_container">
					<div className="edit_profile_heading">
						<p>
							E<br />D<br />I<br />T<br />
							<br />Y<br />O<br />U<br />R<br />
							<br />P<br />R<br />O<br />F<br />I<br />L<br />E
						</p>
					</div>
					<form onSubmit={handleSubmit}>
						<div className="edit_profile_username">
							<label>Username</label>
							<br />
							<input
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div className="edit_profile_firstname">
							<label>First Name</label>
							<br />
							<input
								type="text"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>

						<div className="edit_profile_lastname">
							<label>Last Name</label>
							<br />
							<input
								type="text"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>

						<div className="edit_profile_college">
							<label>College</label>
							<br />
							<input
								type="text"
								value={college}
								onChange={(e) => setCollege(e.target.value)}
							/>
						</div>

						<div className="edit_profile_email">
							<label>Email</label>
							<br />
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div className="edit_profile_phone">
							<label>Phone number</label>
							<br />
							<input
								type="tel"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
						</div>

						<div className="edit_profile_password">
							<label>Password</label>
							<br />
							<input
								type="password"
								value={currPassword}
								onChange={(e) => setCurrPassword(e.target.value)}
							/>
							<button onClick={password_toggle}>
								{toggle ? (
									<img src={password_hidden_img} />
								) : (
									<img src={password_show_img} />
								)}
							</button>
						</div>
						<input type="submit" value="Update" />
					</form>
				</div>
			</div>
			<Particless />
		</div>
	);
};

export default EditProfile;
