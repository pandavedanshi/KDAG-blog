import Particless from "../Common/Particles/Particless";
import { useState } from "react";
import "./EditProfile.css";

const EditProfile = () => {
    const {newPasswordButton,setNewPasswordButton} = useState(false);
    const {username,setUsername} = useState("");
    const {firstName,setFirstName} = useState("");
    const {lastName,setLastName} = useState("");
    const {college,setColege} = useState("");
    const {email,setEmail} = useState("");
    const {phone,setPhone} = useState("");
    const currPassword = useState("");

    	return (
		<div>
			<div className="edit_profile_outer_container">
                <div className="edit_profile_container">
                    <form>
                        <label>Username</label>
                        <input type="text" />
                        <label>First Name</label>
                        <input type="text" />
                        <label>Last Name</label>
                        <input type="text" />
                        <label>College</label>
                        <input type="text" />
                        <label>Email</label>
                        <input type="email" />
                        <label>Phone number</label>
                        <input type="tel" />
                        <label>Password</label>
                        <input type="password" />
                        <input type="submit" />
                    </form>
                </div>
            </div>
			<Particless />
		</div>
	);
};

export default EditProfile;
