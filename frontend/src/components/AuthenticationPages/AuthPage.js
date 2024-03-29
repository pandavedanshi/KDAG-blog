import React, { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";
import { useHistory } from "react-router-dom";
import Particless from "../Common/Particles/Particless";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import "./AuthPage.css";

const AuthPage = (props) => {
	const particless = React.useMemo(() => <Particless />, []);
	const { showLogout, setShowLogout } = props;
	const history = useHistory();
	const [isSignUpActive, setIsSignUpActive] = useState(false);
	const [rDirect, setRDirect] = useState(false);
	const [showUsermessage, setShowUsermessage] = useState(false);
	const [userMessage, setUserMessage] = useState("");
	const [register_firstName, setRegister_firstName] = useState("");
	const [register_lastName, setRegister_lastName] = useState("");
	const [register_userName, setRegister_userName] = useState("");
	const [register_college, setRegister_college] = useState("");
	const [register_email, setRegister_email] = useState("");
	const [register_password, setRegister_password] = useState("");
	const [register_retypePassword, setRegister_retypePassword] = useState("");
	const [register_phone, setRegister_phone] = useState("");
	const [login_username, setLogin_username] = useState("");
	const [login_password, setLogin_password] = useState("");

	if (showUsermessage) {
		setTimeout(() => {
			setShowUsermessage(false);
		}, 25000);
	}

	const toggleForm = () => {
		setIsSignUpActive((prev) => !prev);
	};

	const submitRegister = async (e) => {
		e.preventDefault();

		const isValidEmail = (email) => {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return emailRegex.test(email);
		};

		if (!isValidEmail(register_email)) {
			setUserMessage(
				"Please enter a valid email address."
			);
			setShowUsermessage(true);
			return;
		}

		if (register_phone.length !== 10) {
			setUserMessage("The phone number must be 10 digits long");
			setShowUsermessage(true);
			return;
		}

		if (register_retypePassword !== register_password) {
			setUserMessage("The passwords you have typed do not match");
			setShowUsermessage(true);
			return;
		}

		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

		if (!passwordRegex.test(register_password)) {
			setUserMessage(
				"Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number"
			);
			setShowUsermessage(true);
			return;
		}

		const user_data = {
			f_name: register_firstName,
			l_name: register_lastName,
			username: register_userName,
			college: register_college,
			phone: register_phone,
			email: register_email,
			password: register_password,
		};

		const response = await fetch(
			`${process.env.REACT_APP_FETCH_URL}/user/signup`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...user_data,
				}),
			}
		);
		try {
			if (response.ok) {
				const content = await response.json();
				setUserMessage("Registration successful");
				setShowUsermessage(true);
				setIsSignUpActive(!isSignUpActive);
			} else {
				const jsonData = await response.json();
				// toast.error(jsonData.message);
				setUserMessage(jsonData.message);
				setShowUsermessage(true);
			}
		} catch (error) {
			setUserMessage(error);
			setShowUsermessage(true);
		}
	};

	const submitLogin = async (e) => {
		e.preventDefault();
		const user_data = {
			username: login_username,
			password: login_password,
		};

		try {
			const response = await fetch(
				`${process.env.REACT_APP_FETCH_URL}/user/login`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...user_data,
					}),
				}
			);

			if (!response.ok) {
				const jsonData = await response.json();
				setUserMessage(jsonData.message);
				setShowUsermessage(true);
				return;
			}

			const jsonData = await response.json();
			setUserMessage("Login successful");
			setShowUsermessage(true);
			localStorage.setItem("access_token", jsonData.access_token);
			setRDirect(true);
			setShowLogout(true);
		} catch (error) {
			setUserMessage("An error occurred during login. Please try again later.");
			setShowUsermessage(true);
		}
	};

	if (rDirect) {
		history.push("/forum");
	}

	if (showLogout) {
		history.push("/forum");
	}

	return (
		<>
			<Fade left>
				{!showLogout && (
					<div className="auth-outer-container">
						{showUsermessage && (
							<div className={`user_message`}>{userMessage}</div>
						)}

						<div className={`auth-container ${isSignUpActive ? "active" : ""}`}>
							<div className="form-container sign-up">
								<form onSubmit={submitRegister}>
									<h1>Create Account</h1>
									<input
										type="text"
										placeholder="First Name"
										required
										onChange={(e) => setRegister_firstName(e.target.value)}
									/>
									<input
										type="text"
										placeholder="Last Name"
										onChange={(e) => setRegister_lastName(e.target.value)}
									/>
									<input
										type="text"
										placeholder="Username"
										required
										onChange={(e) => setRegister_userName(e.target.value)}
									/>
									<input
										type="text"
										placeholder="College"
										required
										onChange={(e) => setRegister_college(e.target.value)}
									/>
									<input
										type="number"
										placeholder="Phone"
										required
										onChange={(e) => setRegister_phone(e.target.value)}
										style={{
											"-webkit-appearance": "textfield",
											"-moz-appearance": "textfield",
											appearance: "textfield",
										}}
									/>
									<input
										type="email"
										placeholder="Email"
										required
										onChange={(e) => setRegister_email(e.target.value)}
									/>
									<input
										type="password"
										placeholder="Password"
										required
										onChange={(e) => setRegister_password(e.target.value)}
									/>
									<input
										type="password"
										placeholder="Retype Password"
										required
										onChange={(e) => setRegister_retypePassword(e.target.value)}
									/>
									<button type="submit">Sign Up</button>
								</form>
							</div>
							<div className="form-container sign-in">
								<form onSubmit={submitLogin}>
									<h1>Sign In</h1>
									<input
										type="text"
										placeholder="Username"
										required
										onChange={(e) => setLogin_username(e.target.value)}
									/>
									<input
										type="password"
										placeholder="Password"
										required
										onChange={(e) => setLogin_password(e.target.value)}
									/>
									<button type="submit">Sign In</button>
								</form>
							</div>
							<div className="toggle-container">
								<div className={`toggle ${isSignUpActive ? "active" : ""}`}>
									<div className="toggle-panel toggle-left">
										<h1>Welcome Back!</h1>
										<p>
											Sign in to unlock access to your account and explore all
											the features our website has to offer.
										</p>
										<button
											className="hidden"
											onClick={toggleForm}
											style={{ cursor: "none" }}
										>
											Sign In
										</button>
									</div>
									<div className="toggle-panel toggle-right">
										<h1>Hello, Friend!</h1>
										<p>
											It looks like you haven't registered yet. Register now to
											unlock access to all of the site's features.
										</p>
										<button
											className="hidden"
											onClick={toggleForm}
											style={{ cursor: "none" }}
										>
											Sign Up
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* <ToastContainer /> */}
			</Fade>
			{particless}
		</>
	);
};

export default AuthPage;
