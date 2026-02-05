import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import api from "../../services/api";
import LoadingOverlay from "../../components/Loading/LoadingOverlay";
import notificationService from "../../utils/notificationService";

export default function RecipeGenerator() {
    const [ingredients, setIngredients] = useState("");
    const [cuisine, setCuisine] = useState("Any");
    const [dietaryRestrictions, setDietaryRestrictions] = useState("");
    const [recipe, setRecipe] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleClear = () => {
        setIngredients("");
        setCuisine("Any");
        setDietaryRestrictions("");
        setRecipe("");
    };

    const createRecipe = async () => {
        if (!ingredients) {
            notificationService.error("Please enter ingredients!");
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.get(`recipe-creator`, {
                params: { 
                    ingredients, 
                    dietaryRestrictions, 
                    cuisine 
                }
            });

            const data = await response.data;
            setRecipe(data);

            setIsLoading(false);
            notificationService.success("Recipe generated successfully!");
        } catch (error) {
            setIsLoading(false);
            notificationService.error("Error generating recipe.");
        }
    }
    
    return (
        <div className="animation-bounce-in-2s">
            {isLoading && <LoadingOverlay />}
            <h2 className="title-text">Generate Recipes</h2>
            <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)} 
                placeholder="Enter ingredients (comma separated)"
                disabled={isLoading}
            />
            <input
                type="text"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)} 
                placeholder="Enter cuisine type"
                disabled={isLoading}
            />
            <input
                type="text"
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)} 
                placeholder="Enter dietaryRestrictions"
                disabled={isLoading}
            />

            <button 
                    className="success-button"
                    onClick={createRecipe} 
                    disabled={isLoading}
                    title="Generate Recipe"
                >
                {isLoading ? "Generating..." : "Generate Recipe"}
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
                <ReactMarkdown>{recipe}</ReactMarkdown>
            </div>

        </div>
    );
}
