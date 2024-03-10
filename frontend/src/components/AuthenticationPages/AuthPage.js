import React, { useState } from "react";
import Particless from "../Common/Particles/Particless";
import "./AuthPage.css";

const AuthPage = () => {
	const [isSignUpActive, setIsSignUpActive] = useState(false);

	const toggleForm = () => {
		setIsSignUpActive((prev) => !prev);
	};

	return (
		<>
			<div className="auth-outer-container">
				<div className={`auth-container ${isSignUpActive ? "active" : ""}`}>
					<div className="form-container sign-up">
						<form>
							<h1>Create Account</h1>
							<input type="text" placeholder="First Name" />
							<input type="text" placeholder="Last Name" />
							<input type="text" placeholder="Username" />
							<input type="text" placeholder="College" />
							<input type="email" placeholder="Email" />
							<input type="password" placeholder="Password" />
							<input type="password" placeholder="Retype Password" />
							<button type="submit">Sign Up</button>
						</form>
					</div>
					<div className="form-container sign-in">
						<form>
							<h1>Sign In</h1>
							<input type="email" placeholder="Email" />
							<input type="password" placeholder="Password" />
							<button type="submit">Sign In</button>
						</form>
					</div>
					<div className="toggle-container">
						<div className={`toggle ${isSignUpActive ? "active" : ""}`}>
							<div className="toggle-panel toggle-left">
								<h1>Welcome Back!</h1>
								<p>
									Sign in to unlock access to your account and explore all the
									features our website has to offer.
								</p>
								<button className="hidden" onClick={toggleForm}>
									Sign In
								</button>
							</div>
							<div className="toggle-panel toggle-right">
								<h1>Hello, Friend!</h1>
								<p>
									It looks like you haven't registered yet. Register now to
									unlock access to all of the site's features.
								</p>
								<button className="hidden" onClick={toggleForm}>
									Sign Up
								</button>
							</div>
						</div>
					</div>
				</div>
				<Particless />
			</div>
		</>
	);
};

export default AuthPage;
