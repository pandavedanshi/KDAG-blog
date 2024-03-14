import Particless from "../Common/Particles/Particless";
import Fade from "react-reveal/Fade";

import "./CreateDiscussion.css";

const CreateDiscussion = () => {
	return (
		<div>
			{/* <Fade left> */}
				<div className="create-discussion-container">
					<div className="discussion-circle">
						{/* <div className="discussion-ball"></div> */}
					</div>
					<Fade right>
						<div className="create-discussion-form-container">
							<form>
								<h1>Create Discussion</h1>
								<input type="text" placeholder="Title" required />
								<textarea
									type="text"
									placeholder="Discussion content"
									required
								/>
								<button type="submit">Post</button>
							</form>
						</div>
					</Fade>
				</div>
			{/* </Fade> */}
			<Particless />
		</div>
	);
};

export default CreateDiscussion;
