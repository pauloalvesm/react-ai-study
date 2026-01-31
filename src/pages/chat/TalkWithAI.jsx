import React, { useState } from "react";
import api from "../../services/api";

export default function TalkWithAI() {
    const [prompt, setPrompt] = useState("");
    const [chatResponse, setChatResponse] = useState("");

    const askAi = async () => {
        try {
            const response = await api.get(`ask-ai-options`, {
                params: { prompt }
            });

            const data = await response.data;
            console.log(data);
            setChatResponse(data);
        } catch (error) {
            console.log("Error generating response: ", error);
        }
    }
    
    return (
        <div>
            <h2>Talk With AI</h2>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)} 
                placeholder="Enter a promt for AI"
            />

            <button onClick={askAi}>Ask AI</button>

            <div className="output">
                <p>{chatResponse}</p>
            </div>
        </div>
    );
}
