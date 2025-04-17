import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Sidebar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);

    const handleSignOut = async () => {
        try {
            const auth = getAuth();
            await signOut(auth);
            console.log("User signed out");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <div className="sidebar">
            <div className="sidebar-section sidebar-buttons">
                <Link to="/">Home</Link>
                <Link to="/messages">Messages</Link>
                <Link to="/search">Search</Link>
                <Link to={user ? `/profile/${user.uid}` : "/login"}>Profile</Link>
                {/* TEMP LINKS: FOR TESTING ONLY */}
                <Link to="/login">*Login</Link>
                <Link to="/signup">*Sign Up</Link>
                <Link to="/test">*Faraaz Testing</Link>
                </div>
            <div className="sidebar-section sidebar-middle">
                <h3>Ongoing Orders</h3>
            </div>
            <div className="sidebar-section sidebar-bottom">
                <div className="pfp-div">
                    <img alt="Profile" src="https://picsum.photos/300/300" />
                </div>
                <p>{user ? user.displayName : "Guest User"}</p>
                {user && (<button onClick={handleSignOut}>Sign Out</button>)}
            </div>
        </div>
    );
};

export default Sidebar;
