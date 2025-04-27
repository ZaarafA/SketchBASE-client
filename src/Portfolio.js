import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./Portfolio.css";

const Portfolio = () => {
    const { userId } = useParams();
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const userRef = doc(db, "Users", userId);
                const snap = await getDoc(userRef);
                if (!snap.exists()) {
                    setError("User not found");
                } else {
                    const data = snap.data();
                    const urls = Array.isArray(data.userImages) ? data.userImages : []; 
                    setArtworks(urls.map((url, idx) => ({ id: idx, imageUrl: url })));
                }
            } catch (err) {
                console.error("Error fetching artworks:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchArtworks();
    }, [userId]);

    return (
    <div className="portfolio-container">
        <Header />
        <div className="portfolio-main">
            <Sidebar />
            <div className="portfolio-content">
                <h1 className="portfolio-title">Artist Portfolio</h1>

                {loading && <p className="loading">Loading…</p>}
                {error   && <p className="error">{error}</p>}

                {!loading && !error && (
                    <div className="image-cards">
                        {artworks.length > 0 ? (
                            artworks.map(art => (
                                <div key={art.id} className="image-card">
                                    <img src={art.imageUrl} alt={`Artwork ${art.id + 1}`} />
                                </div>
                            ))) : (<p className="no-results">No artwork found.</p>)}
                    </div>
                )}
            </div>
        </div>
    </div>
    );
};

export default Portfolio;
