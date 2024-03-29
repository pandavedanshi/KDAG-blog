import Particless from "../Common/Particles/Particless";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import password_show_img from "../../assets/pics/password_show.png";
import password_hidden_img from "../../assets/pics/password_hidden.png";
import "./EditProfile.css";

const EditProfile = (props) => {
	const particless = React.useMemo(() => <Particless />, []);
	const { user_id } = useParams();
	const token = localStorage.getItem("access_token");
	const { showLogout } = props;
	const history = useHistory();
	const [toggle, setToggle] = useState(false);
	const password_hashed = "***************  ";
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [college, setCollege] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_FETCH_URL}/user/profile_self/${user_id}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (!response.ok) {
					const jsonData = await response.json();
					// toast.error(jsonData.message);
					console.log(jsonData);
				} else {
					const jsonData = await response.json();
					console.log("User Info fetched successfully:", jsonData.message);
					setFirstName(jsonData.f_name);
					setCollege(jsonData.college);
					setEmail(jsonData.email);
					setLastName(jsonData.l_name);
					setPhone(jsonData.phone);
					setUsername(jsonData.username);
				}
			} catch (error) {
				console.error("Error fetching User Info:", error);
				// toast.error("Error fetching posts. Please try again later.");
			}
		};

		fetchUserInfo();
	}, []);

	// const password_toggle = () => {
	// 	setToggle(!toggle);
	// };

	useEffect(() => {
		if (!showLogout) {
			history.push("/auth");
		}
	}, [showLogout]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newData = {
			username : username,
			f_name : firstName,
			l_name : lastName,
			email : email,
			college : college,
			phone : phone,

		};

		const token = localStorage.getItem("access_token");
		await fetch(`${process.env.REACT_APP_FETCH_URL}/user/edit_profile/${user_id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				...newData,
			}),
		}).then(async (res) => {
			let jsonData = await res.json();
			if (!res.ok) {
				// toast.error(jsonData.message);
				console.log(jsonData.message);
			}
			else {
				console.log("Profile edited sucessfully");
				history.push(`/user_profile_self/${user_id}`);
			}
		});
	};

	return (
		<div>
			{showLogout && (
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

							{/* <div className="edit_profile_password">
								<label>Password</label>
								<br />
								<input
									type="password"
									value={userData.password}
									onChange={(e) => setCurrPassword(e.target.value)}
								/>
								<button onClick={password_toggle}>
									{toggle ? (
										<img src={password_hidden_img} />
									) : (
										<img src={password_show_img} />
									)}
								</button>
							</div> */}
							<input type="submit" value="Update" style={{cursor:"none"}}/>
						</form>
					</div>
				</div>
			)}
			{particless }
		</div>
	);
};

export default EditProfile;
