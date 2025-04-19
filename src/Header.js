import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import ImageUploadButton from "./imageUploadButton";
// import ServiceButton from "./ServicesButton";
import "./App.css";

const Header = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);

    return (
        <div className="header">
            <h1 className="title">SketchBASE</h1>
            <div className="header-buttons">
                <p className="notifications">🔔</p>
                {/* {user && <div><ServiceButton/> <ImageUploadButton /></div> } */}
            </div>
        </div>
    )
};

export default Header;
