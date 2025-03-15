import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Profile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    // fetch user data, store in state
    useEffect(() => {
    fetch(`http://localhost:5001/api/users/${userId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("User not found");
            }
            return response.json();
        })
        .then((data) => setUser(data))
        .catch((err) => setError(err.message));
    }, [userId]);

    if (error) return <p>{error}</p>;
    if (!user) return <p>Loading profile...</p>;

    return (
    <div className="container">
        <Header/>
        <div className="main">
            <Sidebar/>
            <div className="content">
                <h1>{user.firstName} {user.lastName}</h1>
                <h4>UserID: {user.id}</h4>
                <p>Created: {user.createdAt}</p>
            </div>
        </div>
    </div>
    );
};

export default Profile;
