import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import Header from "./Header";
import Sidebar from "./Sidebar";
import EditProfileButton from "./EditProfileButton";
import "./Services.css";

const Services = () => {
    const { userId } = useParams();
    const auth = getAuth();
    const [user, setUser] = useState(null);
    const [services, setServices] = useState([]);
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
                    const svcs = Array.isArray(data.userServices) ? data.userServices.slice().reverse() : []; 
                    setServices(svcs.map((svc, idx) => ({ id: idx, ...svc })));
                }
            } catch (err) {
                console.error("Error fetching services:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    return (
    <div className="services-container">
        <Header />
        <div className="services-main">
            <Sidebar />
            <div className="services-content">
                {user && (
                    <div className="profile-header">
                        <div className="avatar"> {user.photoURL && <img src={user.photoURL} alt="Profile" />} </div>
                        <div className="info"> <p><b>{user.name || user.displayName}</b></p> <p>4.3 ★ (1129)</p> </div>
                        {auth.currentUser?.uid === userId ? (<EditProfileButton />) : (
                            <Link to="/messages"> <button className="message-button">Message</button> </Link>
                        )}
                    </div>
                )}

                {user && (
                    <div className="tabs">
                        <Link to={`/profile/${userId}`}><button>Profile</button></Link>
                        <button className="active">Services</button>
                        <Link to={`/profile/${userId}/portfolio`}><button>Portfolio</button></Link>
                    </div>
                )}

                {error && <p className="error">{error}</p>}
                {loading && <p className="loading">Loading…</p>}

                {!loading && !error && (
                    <div className="cards-container">
                        {services.length > 0 ? (
                            services.map(svc => (
                                <div key={svc.id} className="card service-card" style={{ backgroundImage: `url(${svc.imageLink})` }} >
                                    <div className="card-overlay">
                                        <p className="service-title">{svc.title}</p>
                                        <p className="service-price">${svc.price}</p>
                                        <p className="service-desc">{svc.description}</p>
                                    </div>
                                </div>
                            ))
                        ) : (<p className="no-results">No services found.</p>)}
                    </div>
                )}
            </div>
        </div>
    </div>
    );
};

export default Services;
