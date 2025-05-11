import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import EditProfileButton from "./EditProfileButton";
import ImageUploadButton from "./imageUploadButton";
import Sidebar from "./Sidebar";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firebase";
import "./Profile.css";
import ServiceButton from "./ServicesButton";

const Profile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const auth = getAuth();
    const [newReview, setNewReview] = useState("");

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

    // add review to Users.{User}.Reviews
    const handleReviewSubmit = async () => {
        if (!newReview.trim() || auth.currentUser?.uid === userId) return;
        const reviewObj = {
            reviewer: auth.currentUser.uid,
            reviewer_name: auth.currentUser.displayName,
            review: newReview.trim(),
            date: new Date(),
        };
        try {
            const userRef = doc(db, "Users", userId);
            await updateDoc(userRef, {
                Reviews: arrayUnion(reviewObj)
            });
            // update local state
            setUser(prev => ({
                ...prev,
                Reviews: prev.Reviews ? [...prev.Reviews, reviewObj] : [reviewObj]
            }));
            setNewReview("");
        } catch (err) {
            console.error("Error adding review:", err);
        }
    };

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
                                        <p> <b>{user.name || user.displayName}</b> </p>
                                        <p>4.3 ★ (1129)</p>
                                    </div>

                                    {(auth.currentUser?.uid === userId) ? (
                                        <EditProfileButton></EditProfileButton> ) : (
                                        <Link to="/messages"> <button className="message-button"> Message </button> </Link>
                                    )}
                                </div>

                                {/* Tabs */}
                                <div className="tabs">
                                    <Link className="active" to={`/profile/${userId}`}><button>Profile</button></Link>
                                    <Link to={`/profile/${userId}/services`}><button>Services</button></Link>
                                    <Link to={`/profile/${userId}/portfolio`}><button>Portfolio</button></Link>
                                </div>

                                {/* Services */}
                                <div className="services-section">
                                    <div className="section-title">
                                        Services:
                                        <div className="pf-btn-group">
                                            {auth.currentUser?.uid === userId && <ServiceButton/>}
                                            <Link to={`/profile/${userId}/services`}><button className="show-more">Show more</button></Link>
                                        </div>
                                        </div>
                                    <div className="cards-container">
                                        {Array.isArray(user.userServices) && user.userServices.length > 0 ? (
                                            // create cards either for existing services or for placeholders
                                            user.userServices.map((service, idx) => (
                                                <div key={idx} className="card service-card" style={{backgroundImage: `url(${service.imageLink})`}} >
                                                    <div className="card-overlay">
                                                        <p className="service-title">{service.title}</p>
                                                        <p className="service-price">${service.price}</p>
                                                    </div>
                                                </div>
                                            ))) : (
                                            Array.from({ length: 5 }).map((_, i) => (
                                                <div key={i} className="card placeholder" />
                                            ))
                                        )}
                                    </div>
                                </div>

                                {/* Portfolio */}
                                <div className="portfolio-section">
                                    <div className="section-title"> 
                                        Portfolio:
                                        <div className="pf-btn-group">
                                            {auth.currentUser?.uid === userId && <ImageUploadButton />}
                                            <Link to={`/profile/${userId}/portfolio`}><button className="show-more">Show more</button></Link>
                                        </div>
                                    </div>
                                    <div className="cards-container">
                                        {Array.isArray(user.userImages) && user.userImages.length > 0 ? (
                                            user.userImages.slice(-5).map((url, idx) => (
                                                    <div key={idx} className="card"> <img src={url} alt={`Portfolio Piece`} /></div>
                                                ))) : (
                                            Array.from({ length: 5 }).map( (_, i) => ( <div key={i} className="card placeholder" />))
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right column: reviews */}
                            <div className="profile-right">
                                <div className="reviews-section">
                                    Reviews
                                    <div className="reviews-list">
                                        {Array.isArray(user.Reviews) && user.Reviews.length > 0 ? user.Reviews.map((r, i) => (
                                            <div key={i} className="review">
                                                <p>{r.review}</p>
                                                <p className="reviewer_name">by {r.reviewer_name}</p>
                                            </div>
                                        )) : <p>No reviews yet.</p>
                                        }
                                    </div>
                                    {auth.currentUser?.uid !== userId && (
                                        <div className="add-review">
                                            <textarea value={newReview}
                                                onChange={e => setNewReview(e.target.value)}
                                                placeholder="Write your review..."/>
                                            <button onClick={handleReviewSubmit}>Submit</button>
                                        </div>
                                    )}
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
