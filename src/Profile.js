import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import EditProfileButton from "./EditProfileButton";
import Sidebar from "./Sidebar";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firebase";
import "./Profile.css";

const Profile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const auth = getAuth();

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
                            {/* left column */}
                            <div className="profile-left">
                                {/* Profile Header */}
                                <div className="profile-header">
                                    <div className="avatar">
                                        {user.photoURL ? <img src={user.photoURL} alt="Profile"/> : null}
                                    </div>
                                    <div className="info">
                                        <p> <b>{user.name || user.displayName}</b>{" "} @{user.username || userId} </p>
                                        <p>4.3 ★ (1129)</p>
                                    </div>

                                    {(auth.currentUser?.uid == userId) ? (
                                        <EditProfileButton></EditProfileButton> ) : (
                                        <Link to="/messages"> <button className="message-button"> Message </button> </Link>
                                    )}
                                </div>

                                {/* Tabs */}
                                <div className="tabs">
                                    <button className="active">Profile</button>
                                    <button>Services</button>
                                    <button>Reviews</button>
                                    <button>Portfolio</button>
                                </div>

                                {/* Services */}
                                <div className="services-section">
                                    Services:
                                    <div className="cards-container">
                                        <div className="card placeholder"></div>
                                        <div className="card placeholder"></div>
                                        <div className="card placeholder"></div>
                                        <div className="card placeholder"></div>
                                        <div className="card placeholder"></div>
                                        </div>
                                    <button className="show-more">Show more</button>
                                </div>

                                {/* Portfolio */}
                                <div className="portfolio-section">
                                    Portfolio:
                                    <div className="cards-container">
                                        {Array.isArray(user.userImages) && user.userImages.length > 0 ? (
                                            user.userImages.slice(-5).map((url, idx) => (
                                                    <div key={idx} className="card"> <img src={url} alt={`Portfolio Piece`} /></div>
                                                ))) : (
                                            Array.from({ length: 5 }).map( (_, i) => ( <div key={i} className="card placeholder" />))
                                        )}
                                    </div>
                                    <button className="show-more">Show more</button>
                                </div>
                            </div>

                            {/* Right column: reviews */}
                            <div className="profile-right">
                                <div className="reviews-section">
                                    Reviews
                                    <div className="reviews-list">
                                        <div className="review placeholder">Review 1</div>
                                        <div className="review placeholder">Review 2</div>
                                        <div className="review placeholder">Review 3</div>
                                    </div>
                                    <button className="show-more">Show more</button>
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
