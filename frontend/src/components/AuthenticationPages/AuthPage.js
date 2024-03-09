import React, { useState } from "react";
import Particless from "../Common/Particles/Particless";
import "./AuthPage.css";

const AuthPage = () => {
	const [signIn, toggle] = useState(true);

	return (
		<>
			<div className="auth-outer-container">
				<div className="auth-container">
					<div className={`auth-signUpContainer ${!signIn ? "active" : ""}`}>
						<form>
							<div className="form-title">Create Account</div>
							<label>First Name</label>
							<input type="text" />
							<label>Last Name</label>
							<input type="text" />
							<label>Username</label>
							<input type="text" />
							<label>College</label>
							<input type="text" />
							<label>Email</label>
							<input type="email" />
							<label>Password</label>
							<input type="password" />
							<label>Retype your Password</label>
							<input type="password" />
							<button type="submit">Register</button>
						</form>
					</div>

					<div className={`auth-signInContainer ${!signIn ? "active1" : ""}`}>
						<form>
							<div className="form-title">SIGN IN</div>
							<label>Email</label>
							<input type="email" />
							<label>Password</label>
							<input type="password" />
							<button type="submit">Sign In</button>
						</form>
					</div>

					<div className={`auth-overlayContainer ${!signIn ? "active2" : ""}`}>
						<div className={`auth-overlay ${!signIn ? "active3" : ""}`}>
							<div
								className={`auth-leftOverlayPanel ${!signIn ? "active4" : ""}`}
							>
								<div className="auth-overlay-title">Welcome Back!</div>
								<div className="auth-overlay-paragraph">
									To stay connected with us login with your Personal info.
								</div>
								<button className="GhostButton" onclick={() => toggle(true)}>
									Sign In
								</button>
							</div>

							<div
								className={`auth-rightOverlayPanel ${!signIn ? "active5" : ""}`}
							>
								<div className="auth-overlay-title">Hello, Friend!</div>
								<div className="auth-overlay-paragraph">
									Enter your personal details and start your journey with us!
								</div>
								<button className="GhostButton" onclick={() => toggle(true)}>
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
