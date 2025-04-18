import React, { useState } from "react";
import "./EditProfileButton.css";

const EditProfileButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [displayName, setDisplayName] = useState("");
    const [avatarFile, setAvatarFile] = useState(null);

    return (
        <>
            <button className="edit-profile-btn" onClick={() => setIsOpen(true)} > Edit Profile </button>

            {isOpen && (
                <div className="modal-overlay" onClick={() => setIsOpen(false)} >
                    <div className="modal-content" onClick={e => e.stopPropagation()} >
                        <h3>Edit Profile</h3>

                        <label>New Avatar:</label>
                        <input type="file" accept="image/*" onChange={e => setAvatarFile(e.target.files?.[0] || null) } />

                        <label>Display Name:</label>
                        <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} />

                        <div className="modal-actions">
                            <button>Save</button>
                            <button onClick={() => setIsOpen(false)}> Cancel </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditProfileButton;
