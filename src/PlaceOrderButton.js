import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import "./PlaceOrderButton.css";

const PlaceOrderButton = ({ toUserId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [toUserName, setToUserName] = useState("");
    const [serviceTypes, setServiceTypes] = useState([]);
    const [description, setDescription] = useState("");
    const [serviceType, setServiceType] = useState("");
    const auth = getAuth();
    const currentUser = auth.currentUser;

    useEffect(() => {
        if (!isOpen || !toUserId) return;
        (async () => {
            const snap = await getDoc(doc(db, "Users", toUserId));
            if (!snap.exists()) return;
            const data = snap.data();
            setToUserName(data.name || data.displayName || "");
            setServiceTypes(Array.isArray(data.userServices) ? data.userServices.map(svc => svc.title) : []);
        })();
    }, [isOpen, toUserId]);

    const handlePlaceOrder = async () => {
        if (!currentUser || !serviceType || !description.trim()) return;
        await addDoc(collection(db, "Messages"), {
            from: currentUser.uid,
            to: toUserId,
            createdAt: serverTimestamp(),
            type: "order",
            order: { serviceType, description }
        });
        setIsOpen(false);
        setServiceType("");
        setDescription("");
    };

    return (
    <>
        <button className="open-modal-btn" onClick={() => setIsOpen(true)}>Start Order</button>

        {isOpen && (
            <div className="modal-overlay" onClick={() => setIsOpen(false)} >
                <div className="modal-content" onClick={e => e.stopPropagation()} >
                    <h3>New Order for {toUserName}</h3>

                    <label>Description:</label>
                    <textarea rows={4} value={description} onChange={e => setDescription(e.target.value)}/>

                    <label>Service Type:</label>
                    <select value={serviceType} onChange={e => setServiceType(e.target.value)} >
                        <option value="" disabled>Select a service</option>
                        {serviceTypes.map((t,i) => (
                            <option key={i} value={t}> {t} </option>
                        ))}
                    </select>

                    <div className="modal-actions">
                        <button onClick={handlePlaceOrder}>
                            Place Order
                        </button>
                        <button onClick={() => setIsOpen(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        )}
    </>
    );
};

export default PlaceOrderButton;
