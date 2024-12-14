import React from "react";
import Fade from "react-reveal/Fade";
import Particless from "../Common/Particles/Particless";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterPage.css";
import "./Success.css";


const Success = () => {
	const particless = React.useMemo(() => <Particless />, []);

	return (
		<>
			<div className="success-container">
				<Fade top>
					<div className="register-header">
						<div className="spacer layer1"></div>
						<div className="register-kdsh">KDSH 2025</div>
						<div className="register-kdsh-desc">
							<p>
								Congratulations on successfully registering for{" "}
								<strong>Kharagpur Data Science Hackathon 2025</strong>. For
								timelines and other details related to the Hackathon visit{" "}
								<strong>
									<a
										style={{ color: "cyan ", fontStyle:"italic"}}
										className="kdsh-link"
										href="https://unstop.com/"
										target="_blank"
										rel="noreferrer noopener"
									>
										KDSH2025 - Unstop
									</a>
								</strong>
							</p>

							<p>Follow us on the following Platforms to stay updated</p>

							<ul>
								<li>
									<a
										className="kdsh-link"
										href="https://www.instagram.com/kdag.iitkgp/"
										target="_blank"
										rel="noreferrer noopener"
									>
										👉 Instagram
									</a>
								</li>
								<li>
									<a
										className="kdsh-link"
										href="https://www.facebook.com/kgpdag/"
										target="_blank"
										rel="noreferrer noopener"
									>
										👉 Facebook
									</a>
								</li>
								<li>
									<a
										className="kdsh-link"
										href="https://in.linkedin.com/company/kdag"
										target="_blank"
										rel="noreferrer noopener"
									>
										👉 LinkedIn
									</a>
								</li>
								<li>
									<a
										className="kdsh-link"
										href="https://kdagiit.medium.com/"
										target="_blank"
										rel="noreferrer noopener"
									>
										👉 Medium
									</a>
								</li>
							</ul>
						</div>
					</div>
				</Fade>
			</div>
			{particless}
		</>
	);
};

export default Success;
