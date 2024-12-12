import React, { useState, useContext } from "react";
import Fade from "react-reveal/Fade";
import { useHistory } from "react-router-dom";
import Particless from "../Common/Particles/Particless";
import "./RegisterPage.css";

const RegisterPage = () => {
    const particless = React.useMemo(() => <Particless />, []);
    const history = useHistory();
    const [showUsermessage, setShowUsermessage] = useState(false);

    const token = localStorage.getItem("access_token");

    if (showUsermessage) {
        setTimeout(() => {
            setShowUsermessage(false);
        }, 25000);
    }

    // const toggleForm = () => {
    //     setIsSignUpActive((prev) => !prev);
    // };

    // const submitRegister = async (e) => {
    //     e.preventDefault();
    // };

    // const submitLogin = async (e) => {
    //     e.preventDefault();
    // };

    // if (rDirect) {
    //     history.push("/forum");
    // }

    // if (isLoggedIn) {
    //     history.push("/forum");
    // }

    return (
        <>
            <Fade left>

                <div className="auth-outer-container">
                    {/* {showUsermessage && (
                        <div className={`user_message`}>{userMessage}</div>
                    )} */}

                    <div className={`auth-container active`}>
                        <div className="form-container sign-up">
                            <form >
                                <div style={{
                                    maxHeight: "400px", 
                                    overflowY: "auto",
                                    padding: "20px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px"
                                }}>
                                    <h1>REGISTER</h1>
                                    <br />
                                    <input type="text" name="name" placeholder="Team Name" required/>
                                    <div className="details">Details of Team Leader</div>
                                    <input type="text" name="name" placeholder="Name" required/>
                                    <input type="email" name="email" placeholder="Email Id" required/>
                                    <input type="number" name="phone" placeholder="Contact Number" required/>
                                    <input type="text" name="college" placeholder="College Name" required/>
                                    <input type="text" name="degree" placeholder="Degree" required/>
                                    <input type="number" name="year" placeholder="Year of Study" required/>
                                    <div className="details">Details of Member 1</div>
                                    <input type="text" name="name" placeholder="Name" required/>
                                    <input type="email" name="email" placeholder="Email Id" required/>
                                    <input type="number" name="phone" placeholder="Contact Number" required/>
                                    <input type="text" name="college" placeholder="College Name" required />
                                    <input type="text" name="degree" placeholder="Degree" required/>
                                    <input type="number" name="year" placeholder="Year of Study" required/>
                                    <div className="details">Details of Member 2</div>
                                    <input type="text" name="name" placeholder="Name" />
                                    <input type="email" name="email" placeholder="Email Id" />
                                    <input type="number" name="phone" placeholder="Contact Number" />
                                    <input type="text" name="college" placeholder="College Name" />
                                    <input type="text" name="degree" placeholder="Degree" />
                                    <input type="number" name="year" placeholder="Year of Study" />
                                    <div className="details">Details of Member 3</div>
                                    <input type="text" name="name" placeholder="Name" />
                                    <input type="email" name="email" placeholder="Email Id" />
                                    <input type="number" name="phone" placeholder="Contact Number" />
                                    <input type="text" name="college" placeholder="College Name" />
                                    <input type="text" name="degree" placeholder="Degree" />
                                    <input type="number" name="year" placeholder="Year of Study" />
                                    <br />
                                    <button className="GoogleSignup">
                                        <p>Register</p>
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="toggle-container">
                            <div className={`toggle active`}>
                                <div className="toggle-panel toggle-left">
                                    <h1>Kharagpur Data Science Hackathon</h1>
                                    <p>
                                        Kharagpur Data Analytics Group is proud to bring to you the fifth edition of the 'Kharagpur Data Science Hackathon'. <b>Register Here for participating in KDSH 2025...</b>
                                    </p>
                                    <p>
                                        <b>Note:</b> You have to star the following GitHub Repository in order to Register.
                                    </p>
                                    <button
                                        className="hidden"
                                        style={{ cursor: "none" }}
                                        onClick={() => window.open("https://github.com/pathwaycom/pathway", "_blank")}
                                    >
                                        Link to the Repo
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </Fade>
            {particless}
        </>
    );
};

export default RegisterPage;
