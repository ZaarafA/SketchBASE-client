import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

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
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {!error && !user && <p>Loading…</p>}
                    {user && ( <> <h1>{user.name || user.displayName}</h1> </> )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
