import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, addDoc, setDoc,collection, arrayUnion, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import "./ImageUploadButton.css";

const ServiceButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [tagsString, setTagsString] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [saving, setSaving] = useState(false);

    const auth = getAuth();
    const currentUser = auth.currentUser;

    const handleSave = async () => {
        if (!currentUser) return;
        setSaving(true);

        const tags = tagsString.split(",").map(t => t.trim()).filter(t => t);
        const service = {
            title, price, description, tags, imageLink: "", createdAt: serverTimestamp()
        };

        // add to userServices array
        const serviceRef = await addDoc(
            collection(db, "Users", currentUser.uid, "userServices"), service
        );

        // for each tag: store a reference to this service
        for (const tag of tags) {
            const tagRef = doc(db, "Service_Tags", tag);
            await setDoc(
                tagRef,
                { services: arrayUnion(serviceRef) },
                { merge: true }
            );
        }

        // reset form
        setTitle("");
        setPrice("");
        setDescription("");
        setTagsString("");
        setImageFile(null);
        setSaving(false);
        setIsOpen(false);
    };

    return (
        <>
        <button className="open-modal-btn" onClick={() => setIsOpen(true)}>Add Service</button>

        {isOpen && (
            <div className="modal-overlay" onClick={() => !saving && setIsOpen(false)}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>

                    <label>Service Title:</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter service title" disabled={saving} />

                    <label>Base Price:</label>
                    <input type="text" value={price} onChange={e => setPrice(e.target.value)} placeholder="Enter Base price" disabled={saving} />

                    <label>Tags:</label>
                    <input type="text" value={tagsString} onChange={e => setTagsString(e.target.value)} placeholder="Enter Tags, comma separated" disabled={saving} />

                    <label>Description:</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe your service..." rows={4} disabled={saving} />

                    <label>Sample Image:</label>
                    <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} disabled={saving} />

                    <div className="modal-actions">
                        <button id="modal-upload" onClick={handleSave} disabled={saving} >
                            {saving ? "Saving…" : "Save"}
                        </button>
                        <button id="modal-cancel" onClick={() => setIsOpen(false)} disabled={saving} > Cancel </button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default ServiceButton;
