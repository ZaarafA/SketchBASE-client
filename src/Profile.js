import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./Profile.css";

const Profile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const ref = doc(db, "Users", userId);
                const snap = await getDoc(ref);
                if (!snap.exists()) {
                    setError("User not found");
                } else {
                    setUser(snap.data());
                }
            } catch (err) {
                setError(err.message);
            }
        };
        fetchUser();
    }, [userId]);

    return (
        <div className="container">
            <Header />
            <div className="main">
                <Sidebar />

                <div className="content">
                    {error && <p className="error">{error}</p>}
                    {!error && !user && <p>Loading…</p>}

                    {user && (
                        <div className="profile-container">
                            {/* Left column: header, tabs, services, portfolio */}
                            <div className="profile-left">
                                <div className="profile-header">
                                    {/* avatar + name + handle + rating + message button */}
                                    <div className="avatar"></div>
                                    <div className="info">
                                        <h1>{user.name || user.displayName}</h1>
                                        <p>@{user.username || userId}</p>
                                        <p>4.3 ★ (1129)</p>
                                    </div>
                                    <button className="message-button">Message</button>
                                </div>

                                <div className="tabs">
                                    <button className="active">Profile</button>
                                    <button>Services</button>
                                    <button>Reviews</button>
                                    <button>Portfolio</button>
                                </div>

                                <div className="services-section">
                                    Services Section
                                </div>

                                <div className="portfolio-section">
                                    Portfolio Section
                                </div>
                            </div>

                            {/* Right column: reviews */}
                            <div className="profile-right">
                                <div className="reviews-section">
                                    Reviews Section
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
