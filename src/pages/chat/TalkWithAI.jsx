import React, { useState } from "react";
import api from "../../services/api";
import LoadingOverlay from "../../components/Loading/LoadingOverlay";
import notificationService from "../../utils/notificationService";

export default function TalkWithAI() {
    const [prompt, setPrompt] = useState("");
    const [chatResponse, setChatResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleClear = () => {
        setPrompt("");
        setChatResponse("");
    }

    const askAi = async () => {
        if (!prompt) {
            notificationService.error("Please enter a prompt!");
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.get(`ask-ai-options`, {
                params: { prompt }
            });

            const data = await response.data;
            setChatResponse(data);

            setIsLoading(false);
            notificationService.success("Response successfully generated!");
        } catch (error) {
            setIsLoading(false);
            notificationService.error("Error generating AI response.");
        }
    }
    
    return (
        <div className="animation-bounce-in-2s">
            {isLoading && <LoadingOverlay />}
            <h2 className="title-text">Talk With AI</h2>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)} 
                placeholder="Enter a promt for AI"
                disabled={isLoading}
            />

            <button 
                    className="success-button"
                    onClick={askAi} 
                    disabled={isLoading}
                    title="Ask AI"
                >
                {isLoading ? "Loading..." : "Ask AI"}
            </button>

            <button 
                    className="cancel-button"
                    onClick={handleClear} 
                    disabled={isLoading}
                    title="Cancel"
                >
                    Cancel
                </button>

            <div className="output">
                <p>{chatResponse}</p>
            </div>
        </div>
    );
}
