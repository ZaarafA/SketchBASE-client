import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: username });
            console.log("User created:", userCredential.user);
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    return (
    <div className="container">
        <Header />
        <div className="main">
            <Sidebar />
            <div className="content">
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit">Signup</button>
                </form>
            </div>
        </div>
    </div>
    );
};

export default Signup;
