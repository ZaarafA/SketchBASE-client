import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in:", userCredential.user);
        } catch (error) {
            console.error("Error logging in:", error);
        }
        navigate("/");
    };

    return (
        <div className="container">
            <Header />
            <div className="main">
                <Sidebar />
                <div className="content signup-container">
                    <div className="signup-box">
                        <h1>Login</h1>
                        <p>Welcome back! Please enter your credentials to log in.</p>
                        <form onSubmit={handleSubmit}>
                            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <button type="submit" className="signup-button"> Login </button>
                        </form>
                        <button className="back-button button-redirect">
                            <Link className="button-link" to="/signup">TO SIGN UP</Link>
                        </button>
                        <button className="back-button" onClick={() => navigate("/")}>Back to Home</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
