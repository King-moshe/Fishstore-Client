import React, { useState } from "react";
import { Link } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import recipesData from "../data/recipes.json";

// Modal component
const RecipeModal = ({ recipe, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 mt-4">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <img
          src={recipe.picture}
          alt={recipe.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">{recipe.title}</h2>
          <p className="mb-4">זמן הכנה: {recipe.prepTime}</p>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">מצרכים ואופן הכנה:</h3>
            <p>{recipe.recipe}</p>
          </div>
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            סגור
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Recipes() {
  const { fishRecipes } = recipesData;
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-700 via-gray-900 to-gray-700">
      <div className="flex p-4 text-white">
        <div className="w-1/5 text-center">
          <Link to="/" className="rounded-lg">
            <EastIcon />
          </Link>
        </div>
        <div className="w-3/5 text-center">
          <h1 className="text-3xl">מתכונים</h1>
        </div>
        <div className="w-1/5 text-center">
          {/* Empty div to maintain the layout */}
        </div>
      </div>
      <article className="mt-3 justify-center flex flex-wrap">
        {fishRecipes.length === 0 ? (
          <p className="text-white">Loading...</p>
        ) : (
          fishRecipes.map((recipe, index) => (
            <div
              key={index}
              className="min-h-[320px] md:w-1/5 rounded-xl w-[75%] m-3.5 bg-white drop-shadow-2xl"
            >
              <button>
                <img
                  src={recipe.picture}
                  alt={recipe.title}
                  className="w-full h-full rounded-t-xl"
                />
                <div className="p-3 text-center">
                  <h2>
                    <b>{recipe.title}</b>
                  </h2>
                  <h2>זמן הכנה : {recipe.prepTime}</h2>
                </div>
              </button>
              <div className="text-center p-1 mb-2 flex justify-center">
                <button
                  onClick={() => openModal(recipe)}
                  className="me-3 border p-2 rounded-md bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white"
                >
                  להכנת המתכון
                </button>
              </div>
            </div>
          ))
        )}
      </article>
      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={closeModal} />
      )}
    </div>
  );
}
