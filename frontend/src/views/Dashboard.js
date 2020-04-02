import React from 'react';

import {
  Card,
  CardDeck,
  CardImg,
  CardSubtitle,
  CardTitle,
  Container,
  Row
} from 'reactstrap';

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
    }
  ];

  return (
    <div>
      <NavigationBar />
      <Container>
        <main className="main">
          {console.log(recipes)}
          <Row>
            {recipes.map(function (recipe, index) {
              return (
                <CardDeck className="p-1 m-auto">
                  <Card>
                    <CardImg top width="100%" alt="Card image cap" />
                    <CardTitle>{recipe.title}</CardTitle>
                    <CardSubtitle>Difficulty: {recipe.difficulty}</CardSubtitle>
                    <CardSubtitle>Cooking Time: {recipe.cookingTime} min</CardSubtitle>
                    <CardSubtitle>Prep Time: {recipe.preparationTime} min</CardSubtitle>
                    <CardSubtitle>Category: {recipe.category}</CardSubtitle>
                    {/* <CardBody>
                      Ingredients:
                      {recipe.ingredients.map(function (i, index) {
                        return <p>{index + 1}. {i.ingredient}</p>
                      })}
                    </CardBody> */}

                    <p>Created By: {recipe.creator}</p>
                  </Card>
                </CardDeck>
              )
            })}
          </Row>
        </main>
      </Container>

      <Footer />
    </div >
  );
}

export default Dashboard;
