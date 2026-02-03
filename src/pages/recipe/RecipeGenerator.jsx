import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import api from "../../services/api";
import LoadingOverlay from "../../components/Loading/LoadingOverlay";

export default function RecipeGenerator() {
    const [ingredients, setIngredients] = useState("");
    const [cuisine, setCuisine] = useState("Any");
    const [dietaryRestrictions, setDietaryRestrictions] = useState("");
    const [recipe, setRecipe] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const createRecipe = async () => {
        if (!ingredients) return;

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
            console.log(data);
            setRecipe(data);
        } catch (error) {
            console.log("Error generating recipe: ", error);
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <div>
            {isLoading && <LoadingOverlay />}
            <h2>Generate Recipes</h2>
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

            <button onClick={createRecipe} disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate Recipe"}
            </button>

            <div className="output">
                <ReactMarkdown>{recipe}</ReactMarkdown>
            </div>

        </div>
    );
}
