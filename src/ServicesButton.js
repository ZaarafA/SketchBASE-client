import React, { useState } from "react";
import "./ImageUploadButton.css";

const ServiceButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [tagsString, setTagsString] = useState("");
    const [imageFile, setImageFile] = useState(null);

    return (
        <>
        <button className="open-modal-btn" onClick={() => setIsOpen(true)}>Add Service</button>

        {isOpen && (
            <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>

                    <label>Service Title:</label>
                    <input type="text" value={title} 
                        onChange={e => setTitle(e.target.value)} placeholder="Enter service title" />

                    <label>Base Price:</label>
                    <input type="text" value={price} onChange={e => setPrice(e.target.value)} placeholder="Enter Base price" />

                    <label>Tags:</label>
                    <input type="text" value={price} onChange={e => setTagsString(e.target.value)} placeholder="Enter Tags, comma separated" />

                    <label>Description:</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} 
                        placeholder="Describe your service..." rows={4} />

                    <label>Sample Image:</label>
                    <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} />

                    <div className="modal-actions">
                        <button id="modal-upload" onClick={() => {/* */}}> Save </button>
                        <button id="modal-cancel" onClick={() => setIsOpen(false)}> Cancel </button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default ServiceButton;
