import React, { useState } from "react";
import { Link } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import recipesData from "../data/recipes.json";

// Modal component
const RecipeModal = ({ recipe, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 mt-4 z-50">
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
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
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
  const [searchText, setSearchText] = useState("");

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  const filteredRecipes = fishRecipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-700 via-gray-900 to-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center mb-8">
          <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 md:items-center">
            <input
              type="search"
              className="p-2 border border-gray-400 rounded-lg w-full md:w-auto md:ml-2"
              placeholder="חיפוש מתכון..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <Link to="/" className="text-white text-xl">
            <EastIcon />
          </Link>
        </div>
        <h1 className="text-3xl text-white text-center mb-8">מתכונים</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredRecipes.length === 0 ? (
            <div className="col-span-full text-center">
              <p className="font-bold text-lg text-white">
                לא נמצאו מתכונים התואמים את החיפוש
              </p>
            </div>
          ) : (
            filteredRecipes.map((recipe, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
              >
                <img
                  src={recipe.picture}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-center mb-2">
                    {recipe.title}
                  </h2>
                  <p className="text-center">זמן הכנה: {recipe.prepTime}</p>
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => openModal(recipe)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      להכנת המתכון
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={closeModal} />
      )}
    </div>
  );
}

