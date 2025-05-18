import React from "react";

const OrderMessage = ({ msg, currentUserId, onAccept, onDeny }) => {
    const isRecipient = msg.to === currentUserId;
    const isSent = msg.from === currentUserId;

    return (
        <div className={`message ${isSent ? "sent" : "received"}`}>
            <p><strong>Order Request Sent: {msg.order.serviceType}</strong></p>
            <p>{msg.order.description}</p>
            {isRecipient && (
                <div className="order-actions">
                    <button className="accept-btn" onClick={() => onAccept(msg)}>Accept</button>
                    <button className="deny-btn"   onClick={() => onDeny(msg)}>Deny</button>
                </div>
            )}
        </div>
    );
};

export default OrderMessage;
