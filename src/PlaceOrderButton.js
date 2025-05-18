import React, { useState } from "react";
import "./PlaceOrderButton.css";

const PlaceOrderButton = ({ toUserId, serviceTypes = [] }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
    <>
        <button className="open-modal-btn" onClick={() => setIsOpen(true)}>Start Order</button>

        {isOpen && (
            <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <h3>New Order for </h3>

                    <label>Description:</label>
                    <textarea placeholder="Enter order description..." rows={4}></textarea>

                    <label>Service Type:</label>
                    <select defaultValue="">
                        <option value="" disabled>Select a service</option>
                        {serviceTypes.map((type, i) => (
                            <option key={i} value={type}>{type}</option>
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
