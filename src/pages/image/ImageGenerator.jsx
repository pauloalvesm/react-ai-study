import React, { useState } from "react";
import api from "../../services/api";
import LoadingOverlay from "../../components/Loading/LoadingOverlay";
import notificationService from "../../utils/notificationService";

export default function ImageGenerator() {
    const [prompt, setPrompt] = useState("");
    const [quality, setQuality] = useState("hd");
    const [n, setN] = useState("1");
    const [height, setHeight] = useState("1024");
    const [width, setWidth] = useState("1024");
    const [imageUrls, setImageUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleClear = () => {
        setPrompt("");
        setImageUrls([]);
    };

    const generateImages = async () => {
        if (!prompt) {
            notificationService.error("Please enter a prompt for the image!");
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.get(`generate-image`, {
                params: {
                    prompt,
                    quality,
                    n,
                    height,
                    width
                }
            });

            const data = await response.data;
            setImageUrls(data);

            setIsLoading(false);
            notificationService.success("Image generated successfully!");
        } catch (error) {
            setIsLoading(false);
            notificationService.error("Error generating image.");
        }
    }
    
    return (
        <div>
            {isLoading && <LoadingOverlay />}
            <h2 className="title-text">Generate Images</h2>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter a prompt for generate an image"
                disabled={isLoading}
            />
            <button 
                    className="success-button"
                    onClick={generateImages} 
                    disabled={isLoading}
                    title="Generate Image"
                >
                {isLoading ? "Generating..." : "Generate Image"}
            </button>

            <button 
                    className="cancel-button"
                    onClick={handleClear} 
                    disabled={isLoading}
                    title="Cancel"
                >
                    Cancel
                </button>

            <div className="image-grid">
                {imageUrls.map((url, index) => (
                    <img key={index} src={url} alt={`Generated ${index}`} />
                ))}
                {[...Array(4 - imageUrls.length)].map((_, index) => (
                    <div key={index + imageUrls.length} className="empty-image-slot"></div>
                ))}
            </div>
        </div>
    );
}
