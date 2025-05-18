import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./PlaceOrderButton.css";

const PlaceOrderButton = ({ toUserId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [toUserName, setToUserName] = useState("");
    const [serviceTypes, setServiceTypes] = useState([]);

    useEffect(() => {
        if (!isOpen || !toUserId) return;
        const fetchUserData = async () => {
            try {
                const userRef = doc(db, "Users", toUserId);
                const snap = await getDoc(userRef);
                if (snap.exists()) {
                    const data = snap.data();
                    setToUserName(data.name || data.displayName || "");
                    const services = Array.isArray(data.userServices)
                        ? data.userServices
                        : [];
                    setServiceTypes(services.map(svc => svc.title));
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        };
        fetchUserData();
    }, [isOpen, toUserId]);

    return (
    <>
        <button className="open-modal-btn" onClick={() => setIsOpen(true)}>Start Order</button>

        {isOpen && (
            <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <h3>New Order for {toUserName}</h3>

                    <label>Description:</label>
                    <textarea placeholder="Enter order description..." rows={4}></textarea>

                    <label>Service Type:</label>
                    <select defaultValue="">
                        <option value="" disabled>Select a service</option>
                        {serviceTypes.map((type, idx) => (
                            <option key={idx} value={type}>{type}</option>
                        ))}
                    </select>

                    <div className="modal-actions">
                        <button className="place-order-btn">Place Order</button>
                        <button className="cancel-btn" onClick={() => setIsOpen(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        )}
    </>
    );
};

export default PlaceOrderButton;
