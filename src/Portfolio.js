import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./Portfolio.css";
import EditProfileButton from "./EditProfileButton";
import { getAuth } from "firebase/auth";

const Portfolio = () => {
    const { userId } = useParams();
    const auth = getAuth();
    const [user, setUser] = useState(null);
    const [artworks,setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userRef = doc(db, "Users", userId);
                const snap = await getDoc(userRef);
                if (!snap.exists()) {
                    setError("User not found");
                } else {
                    const data = snap.data();
                    setUser(data);
                    const urls = Array.isArray(data.userImages) ? data.userImages.slice().reverse() : [];
                    setArtworks(urls.map((url, idx) => ({ id: idx, imageUrl: url })));
                }
            } catch (err) {
                console.error("Error fetching user:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [userId]);

    return (
    <div className="portfolio-container">
        <Header />
        <div className="portfolio-main">
            <Sidebar />
            <div className="portfolio-content">
                {error && <p className="error">{error}</p>}
                {loading && <p className="loading">Loading…</p>}

                {user && (
                    <div className="profile-header">
                        <div className="avatar">
                            {user.photoURL && <img src={user.photoURL} alt="Profile" />}
                        </div>
                        <div className="info">
                            <p><b>{user.name || user.displayName}</b></p> <p>4.3 ★ (1129)</p>
                        </div>
                        {(auth.currentUser?.uid === userId) ? <EditProfileButton /> : 
                            <Link to="/messages">
                                <button className="message-button">Message</button>
                            </Link>
                        }
                    </div>
                )}
                {user && (
                    <div className="tabs">
                        <Link to={`/profile/${userId}`}><button>Profile</button></Link>
                        <Link to={`/profile/${userId}/services`}><button>Services</button></Link>
                        <Link className="active" to={`/profile/${userId}/portfolio`}><button>Portfolio</button></Link>
                    </div>
                )}

                {!loading && !error && (
                    <div className="image-cards">
                        {artworks.length > 0 ? artworks.map(art => (
                                <div key={art.id} className="image-card">
                                    <img src={art.imageUrl} alt={`Artwork ${art.id + 1}`} />
                                </div>
                        )) : <p className="no-results">No artwork found.</p>}
                    </div>
                )}
            </div>
        </div>
    </div>
    );
};

export default Portfolio;
