import React, { useState } from "react";
import api from "../../services/api";
import LoadingOverlay from "../../components/Loading/LoadingOverlay";

export default function TalkWithAI() {
    const [prompt, setPrompt] = useState("");
    const [chatResponse, setChatResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleClear = () => {
        setPrompt("");
        setChatResponse("");
    }

    const askAi = async () => {
        if (!prompt) return;

        setIsLoading(true);
        try {
            const response = await api.get(`ask-ai-options`, {
                params: { prompt }
            });

            const data = await response.data;
            console.log(data);
            setChatResponse(data);
        } catch (error) {
            console.log("Error generating response: ", error);
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <div>
            {isLoading && <LoadingOverlay />}
            <h2>Talk With AI</h2>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)} 
                placeholder="Enter a promt for AI"
                disabled={isLoading}
            />

            <button onClick={askAi} disabled={isLoading}>
                {isLoading ? "Carregando..." : "Ask AI"}
            </button>

            <button 
                    className="cancel-button"
                    onClick={handleClear} 
                    disabled={isLoading}
                >
                    Cancel
                </button>

            <div className="output">
                <p>{chatResponse}</p>
            </div>
        </div>
    );
}
