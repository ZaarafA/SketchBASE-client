import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-section sidebar-buttons">
                <Link to="/">Home</Link>
                <Link to="/messages">Messages</Link>
                <Link to="/search">Search</Link>
                <Link to="/profile/1">Profile</Link>
                {/* TEMP LINKS: FOR TESTING ONLY */}
                <Link to="/login">*Login</Link>
                <Link to="/signup">*Sign Up</Link>
            </div>
            <div className="sidebar-section sidebar-middle">
                <h3>Ongoing Orders</h3>
            </div>

            <div className="sidebar-section sidebar-bottom">
                <div className="pfp-div"><img alt="Profile" src="https://picsum.photos/300/300"></img></div>
                <p>USERNAME</p>
            </div>
        </div>
    );
};

export default Sidebar;
