import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

const ImageUploadButton = () => {
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
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
                setImageUrl(json.secure_url);

                await addDoc(collection(db, "Images"), {
                    imageUrl: json.secure_url,
                    createdAt: serverTimestamp(),
                    uploadedBy: auth.currentUser.uid,
                });
            }
        } catch (err) {
            console.error("Upload failed:", err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange}/>
            <button onClick={handleUpload} disabled={!imageFile || uploading} >
                {uploading ? "Uploading…" : "Upload Image"}
            </button>

            {imageUrl && (
                <div style={{ marginTop: 16 }}>
                    <p>Uploaded successfully!</p>
                    <img src={imageUrl} alt="Preview" style={{ maxWidth: "100%", height: "auto" }} />
                </div>
            )}
        </div>
    );
};

export default ImageUploadButton;
