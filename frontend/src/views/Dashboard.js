import React from 'react';

import {
  Container
} from 'reactstrap';

import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import RecipeDisplay from '../components/RecipeDisplay';

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
      creator: "UserId1",
      image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
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
      creator: "UserId2",
      image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
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
      creator: "UserId3",
      image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
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
      creator: "UserId1",
      image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
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
      creator: "UserId2",
      image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
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
      creator: "UserId3",
      image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
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
      creator: "UserId1",
      image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
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
      creator: "UserId2",
      image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
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
      creator: "UserId1",
      image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
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
      creator: "UserId2",
      image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
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
      creator: "UserId3",
      image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
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
      creator: "UserId1",
      image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
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
      creator: "UserId2",
      image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
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
      creator: "UserId3",
      image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
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
      creator: "UserId1",
      image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
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
      creator: "UserId2",
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    }
  ];

  return (
    <div>
      <NavigationBar />
      <main className="main">
        <Container className="mt-4 mb-4">
          <h4 className="display-4 mb-0">Most Popular</h4>
          <RecipeDisplay props={mostPopular} />
          <hr />
        </Container>
        <Container className="mt-4 mb-4">
          <h4 className="display-4 mb-0">Highest Rated</h4>
          <RecipeDisplay props={highestRated} />
        </Container>
      </main>
      <Footer />
    </div >
  );
}

export default Dashboard;
