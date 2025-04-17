import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

const ImageUploadButton = () => {
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);

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
            console.log("Cloudinary URL:", json.secure_url);
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
        </div>
    );
};

export default ImageUploadButton;
