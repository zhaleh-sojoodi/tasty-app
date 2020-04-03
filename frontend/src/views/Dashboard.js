import React from 'react';

import {
  Container
} from 'reactstrap';

import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import RecipeList from '../components/RecipeList';

function Dashboard() {
  var mostPopular = [
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
    }
  ];

  var highestRated = [
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
    }
  ];

  return (
    <div>
      <NavigationBar />
      <main className="main">
        <Container className="mt-4 mb-4">
          <h4 className="display-4 mb-0">Most Popular</h4>
          <RecipeList props={mostPopular} />
        </Container>
        <Container className="mt-4 mb-4">
          <h4 className="display-4 mb-0">Highest Rated</h4>
          <RecipeList props={highestRated} />
        </Container>
      </main>
      <Footer />
    </div >
  );
}

export default Dashboard;
