import React, { useState } from "react";
import {collection, addDoc, serverTimestamp, doc,updateDoc, setDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from "./firebase";
import "./ImageUploadButton.css";

const ImageUploadButton = () => {
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [tagsString, setTagsString] = useState("");

    const handleFileChange = (e) => {
        setImageFile(e.target.files?.[0] || null);
    };

    const handleUpload = async () => {
        if (!imageFile) return;
        setUploading(true);

        const data = new FormData();
        data.append("file", imageFile);
        data.append("upload_preset", "unsigned_preset");
        data.append("cloud_name", "dt1uihx5y");

        try {
            const res = await fetch(
                "https://api.cloudinary.com/v1_1/dt1uihx5y/image/upload",
                { method: "POST", body: data }
            );
            const json = await res.json();

            if (json.secure_url) {
                // add image link and tags to db
                const tags = tagsString.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
                await addDoc(collection(db, "Images"), {
                    imageUrl: json.secure_url,
                    createdAt: serverTimestamp(),
                    uploadedBy: auth.currentUser.uid,
                    tags: tags,
                });

                // add image to userImages field
                const userRef = doc(db, "Users", auth.currentUser.uid);
                await setDoc( userRef,
                    { userImages: arrayUnion(json.secure_url) }, { merge: true }
                );

                // update Search_Tags for each tag
                for (const tag of tags) {
                    const tagRef = doc(db, "Search_Tags", tag);
                    await setDoc(tagRef, { images: arrayUnion(json.secure_url) }, { merge: true } );
                }

                // close modal & reset
                setIsOpen(false);
                setImageFile(null);
                setTagsString("");
            }
        } catch (err) {
            console.error("Upload failed:", err);
        } finally {
            setUploading(false);
        }
    };

    return (
    <div>
        <button className="open-modal-btn" onClick={() => setIsOpen(true)}>Upload Image</button>
        {isOpen && (
            <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()} >
                    <h3>Upload an Image</h3>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    <input type="text" placeholder="Add tags, comma separated" value={tagsString} onChange={(e) => setTagsString(e.target.value)} />
                    <div className="modal-actions">
                        <button id="modal-upload" onClick={handleUpload} disabled={!imageFile || uploading} >
                            {uploading ? "Uploading…" : "Submit"}
                        </button>
                        <button id="modal-cancel" onClick={() => setIsOpen(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        )}
    </div>
    );
};

export default ImageUploadButton;
