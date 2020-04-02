import React from 'react';

import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

function Dashboard() {
  var recipes = [
    {
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
    },
    {
      title: "Recipe2",
      difficulty: "Medium",
      cookingTime: 30,
      preparationTime: 30,
      category: "Lunch",
      ingredients: [
        { ingredient: "Ingredient1" },
        { ingredient: "Ingredient2" },
        { ingredient: "Ingredient3" }
      ],
      addedDate: Date.now,
      creator: "UserId2"
    },
    {
      title: "Recipe3",
      difficulty: "Hard",
      cookingTime: 40,
      preparationTime: 40,
      category: "Breakfast",
      ingredients: [
        { ingredient: "Ingredient1" },
        { ingredient: "Ingredient2" },
        { ingredient: "Ingredient3" },
        { ingredient: "Ingredient4" }
      ],
      addedDate: Date.now,
      creator: "UserId3"
    },
  ];

  return (
    <div>
      <NavigationBar />
      <main className="main">
        {console.log(recipes)}
          {recipes.map(function(recipe, index) {
            return (
              <ul>
                <li>{ recipe.title }</li>
                <li>{ recipe.difficulty }</li>
                <li>{ recipe.cookingTime } min</li>
                <li>{ recipe.preparationTime } min</li>
                <li>{ recipe.category }</li>
                {recipe.ingredients.map(function(i, index) {
                  return <li>{ i.ingredient }</li>
                })}
                <li>{ recipe.creator }</li>

              </ul>
            )
          })}
      </main>
      <Footer />
    </div >
  );
}

export default Dashboard;
