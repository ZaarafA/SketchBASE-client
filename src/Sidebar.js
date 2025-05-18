import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

const Sidebar = () => {
    const [user, setUser] = useState(null);
    const [incomingOrders, setIncomingOrders] = useState([]);
    const [outgoingOrders, setOutgoingOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (!user) return;
        // incoming orders eventlistener
        const incQ = query(
            collection(db, "Orders"),
            where("to", "==", user.uid)
        );
        const unsubInc = onSnapshot(incQ, snap => {
            setIncomingOrders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        // outgoing orders eventlistener
        const outQ = query(
            collection(db, "Orders"),
            where("from", "==", user.uid)
        );
        const unsubOut = onSnapshot(outQ, snap => {
            setOutgoingOrders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => { unsubInc(); unsubOut(); };
    }, [user]);

    const handleSignOut = async () => {
        try {
            const auth = getAuth();
            await signOut(auth);
            console.log("User signed out");
        } catch (error) {
            console.error("Error signing out:", error);
        }
        navigate('/');
    };

    return (
        <div className="sidebar">
            <div className="sidebar-section sidebar-buttons">
                <Link to="/">Home</Link>
                <Link to="/messages">Messages</Link>
                <Link to="/search">Search</Link>
                <Link to={user ? `/profile/${user.uid}` : "/login"}>Profile</Link>
                {!user && (<Link to="/login">Login / Signup</Link>)}
            </div>

            <div className="sidebar-section sidebar-middle">
                <h3>Incoming Orders</h3>
                {incomingOrders.length > 0 ? (
                    incomingOrders.map(o => (
                        <p key={o.id}> {o.toDisplay} — {o.serviceType} </p>
                    ))
                ) : (<p className="no-orders">No incoming orders</p>)}

                <h3>Outgoing Orders</h3>
                {outgoingOrders.length > 0 ? (
                    outgoingOrders.map(o => (
                        <p key={o.id}> {o.toDisplay} — {o.serviceType} </p>
                    ))
                ) : (<p className="no-orders">No outgoing orders</p>)}
            </div>


            <div className="sidebar-section sidebar-bottom">
                <div className="profile-info">
                    <div className="pfp-div">
                        <img alt="Profile" src={user && user.photoURL ? user.photoURL : "https://picsum.photos/300/300"}/>
                    </div>
                    <p>{user ? user.displayName : "Guest User"}</p>
                </div>
                {user && (<button className="signout-button" onClick={handleSignOut}>Sign Out</button>)}
            </div>
        </div>
    );
};

export default Sidebar;
