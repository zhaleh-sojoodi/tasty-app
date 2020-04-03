import React from 'react';

import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

function Recipe() {
  var recipe = {
    title: "Recipe1",
    difficulty: "Easy",
    cookingTime: 20,
    preparationTime: 20,
    category: "Breakfast",
    ingredients: [
      { ingredient: "Ingredient1" },
      { ingredient: "Ingredient2" }
    ],
    addedDate: Date.now,
    creator: "UserId1"
  }

  return (
    <div>
      <NavigationBar />
      <main className="main">
        <h1>{recipe.title}</h1>
      </main>
      <Footer />
    </div >
  );
}

export default Recipe;
