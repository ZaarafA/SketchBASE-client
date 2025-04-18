import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import "./ImageUploadButton.css";

const EditProfileButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [displayName, setDisplayName] = useState("");
    const [avatarFile, setAvatarFile] = useState(null);
    const [userData, setUserData] = useState(null);
    const [saving, setSaving] = useState(false);

    const auth = getAuth();
    const currentUser = auth.currentUser;

    useEffect(() => {
        if (!currentUser) return;
        const fetchUser = async () => {
            const userRef = doc(db, "Users", currentUser.uid);
            const snap = await getDoc(userRef);
            if (snap.exists()) {
                const data = snap.data();
                setUserData(data);
                setDisplayName(data.name || "");
            }
        };
        fetchUser();
    }, [currentUser]);

    if (!currentUser) return null;

    const handleSave = async () => {
        setSaving(true);
        const userRef = doc(db, "Users", currentUser.uid);
        await updateDoc(userRef, {
            name: displayName,
            updatedAt: serverTimestamp()
        });
        setUserData(prev => ({ ...prev, name: displayName }));
        setSaving(false);
        setIsOpen(false);
    };

    return (
        <>
            <button className="edit-profile-btn" onClick={() => setIsOpen(true)} > Edit Profile </button>

            {isOpen && userData && (
                <div className="modal-overlay" onClick={() => !saving && setIsOpen(false)} >
                    <div className="modal-content" onClick={e => e.stopPropagation()} >
                        <h3>Edit Profile</h3>

                        <label>New Avatar:</label>
                        <input type="file" accept="image/*" onChange={e => setAvatarFile(e.target.files?.[0] || null) } disabled={saving}/>

                        <label>Display Name:</label>
                        <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} disabled={saving}/>

                        <div className="modal-actions">
                            <button onClick={handleSave} disabled={saving}>
                                {saving ? "Saving…" : "Save"}
                            </button>
                            <button onClick={() => setIsOpen(false)} disabled={saving} > Cancel </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditProfileButton;
