import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: username });
            console.log("User created:", userCredential.user);
            navigate("/");
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h1>Create Your Account</h1>
                <p>Join our community and start showcasing your art today.</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter your name" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
                <button className="back-button" onClick={() => navigate("/")}>
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default Signup;
