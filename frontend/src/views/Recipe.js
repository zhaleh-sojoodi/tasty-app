import React, { useState, useEffect } from "react";
import Ratings from "react-ratings-declarative";

import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

import { Button, Container, Row, Col } from "reactstrap";

function Recipe(props) {
  let recipe = {
    title: "Healthy Pesto Pasta",
    description:
      "Rich and creamy pesto pasta with tomatoes, whole wheat noodles, bright pesto, and greek yogurt. Super creamy and rich pesto sauce made with protein-packed greek yogurt! So amazing you'll ditch store-bought versions for good!",
    difficulty: "Easy",
    cookingTime: 10,
    preparationTime: 20,
    servings: 2,
    category: "Dinner",
    ingredients: [
      "1 bag whole wheat pasta",
      "1 cup sliced spinach",
      "3 tomatoes",
      "3/4 cup plain greek yogurt",
      "1 jar (7 oz) genovese pesto",
      "Extra virgin olive oil, to taste",
    ],
    steps: [
      "Melt butter in a large skillet over medium high heat. Add garlic and cook, stirring frequently, until fragrant, about 1-2 minutes.",
      "Stir in chicken broth, milk and fettuccine; season with salt and pepper, to taste.",
      "Bring to a boil; reduce heat and simmer, stirring occasionally, until pasta is cooked through, about 18-20 minutes. Stir in Parmesan. If the mixture is too thick, add more milk as needed until desired consistency is reached.",
      "Serve immediately, garnished with parsley, if desired.",
    ],
    ratings: {
      averageRating: 4.5,
      ratings: [
        {
          user: "UserId1",
          rating: 4,
        },
        {
          user: "UserId2",
          rating: 5,
        },
      ],
    },
    likes: [
      {
        user: "UserId1",
      },
      {
        user: "UserId2",
      },
    ],
    addedDate: Date.now,
    creator: "UserId1",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  };
  console.log(props);
  let creator = {
    name: "Jane Doe",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    bio:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum possimus odit aut placeat dolores sequi.",
  };

  const [averageRating, changeAverageRating] = useState();

  useEffect(() => {
    if(recipe.ratings.averageRating) {
        changeAverageRating(recipe.ratings.averageRating);
    } else {
        changeAverageRating(0);
    }
  }, [recipe.ratings.averageRating])
  // Note: Add [averageRating] to the dependency array of useEffect once the POST to submit the user's rating is completed.

  return (
    <div>
      <NavigationBar />
      <main className="main">
        <Container className="mt-5">
          <Row>
            {/* Recipe Details */}
            <Col lg="8">
              {/* Image */}
              <img
                className="img-fluid"
                src={recipe.image}
                alt={recipe.title}
              />

              {/* Title & Like Recipe*/}
              <div className="d-flex justify-content-between">
                {/* Title */}
                <h2 className="mt-3">{recipe.title}</h2>

                {/* Like Button */}
                <Button
                  className="btn-icon btn-3 align-self-center"
                  color="danger"
                  type="button"
                >
                  <span className="btn-inner--icon">
                    <i className="ni ni-favourite-28" />
                  </span>
                  <span className="btn-inner--text">81</span>
                </Button>
              </div>
              <hr className="mt-2 mb-3" />

              {/* Recipe Info */}
              <Row>
                {/* Preparation Time */}
                <Col sm="6">
                  <Row>
                    <i className="col-1 ni ni-scissors m-1" />
                    <Col>
                      <strong>Prep Time</strong>
                      <p>{recipe.preparationTime} minutes</p>
                    </Col>
                  </Row>
                </Col>

                {/* Difficulty */}
                <Col sm="6">
                  <Row>
                    <i className="col-1 ni ni-settings-gear-65 m-1" />
                    <Col>
                      <strong>Difficulty</strong>
                      <p>{recipe.difficulty}</p>
                    </Col>
                  </Row>
                </Col>

                {/* Cooking Time */}
                <Col sm="6">
                  <Row>
                    <i className="col-1 ni ni-time-alarm m-1" />
                    <Col>
                      <strong>Cooking Time</strong>
                      <p>{recipe.cookingTime} minutes</p>
                    </Col>
                  </Row>
                </Col>

                {/* Servings */}
                <Col sm="6">
                  <Row>
                    <i className="col-1 ni ni-single-02 m-1" />
                    <Col>
                      <strong>Servings</strong>
                      <p>{recipe.servings} people</p>
                    </Col>
                  </Row>
                </Col>

                {/* Total Time */}
                <Col sm="6">
                  <Row>
                    <i className="col-1 ni ni-single-02 m-1" />
                    <Col>
                      <strong>Total Time</strong>
                      <p>
                        {recipe.cookingTime + recipe.preparationTime} minutes
                      </p>
                    </Col>
                  </Row>
                </Col>

                {/* Category */}
                <Col sm="6">
                  <Row>
                    <i className="col-1 ni ni-folder-17 m-1" />
                    <Col>
                      <strong>Category</strong>
                      <p>{recipe.category}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <hr className="mt-3 mb-3" />

              {/* Description */}
              <p>{recipe.description}</p>
              <hr className="mt-3 mb-3" />

              {/* Ingredients */}
              <h4>Ingredients</h4>
              <ul>
                {recipe.ingredients.map(function (ingredient, i) {
                  return <li key={i}>{ingredient}</li>;
                })}
              </ul>
              <hr className="mt-3 mb-3" />

              {/* Steps */}
              <h4>Steps</h4>
              <ol className="mb-5">
                {recipe.steps.map(function (step, i) {
                  return <li key={i}>{step}</li>;
                })}
              </ol>
            </Col>

            {/* Author Details, Stats */}
            <Col>
              {/* Author Details */}
              <div className="p-3 mb-4 shadow">
                {/* Creator Name */}
                <h2 className="text-center">{creator.name}</h2>

                {/* Creator Profile Picture */}
                <img
                  style={{
                    borderRadius: "50%",
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    objectPosition: "35% 100%",
                  }}
                  className="img-fluid mx-auto d-block mb-3"
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  alt={creator.name}
                />

                {/* Creator Bio */}
                <p className="text-center">{creator.bio}</p>

                {/* View Creator Profile */}
                <Button
                  className="btn-icon btn-3 mx-auto d-block"
                  color="danger"
                  type="button"
                >
                  <span className="btn-inner--icon">
                    <i className="ni ni-single-02" />
                  </span>
                  <span className="btn-inner--text">View Profile</span>
                </Button>
              </div>

              {/* Ratings */}
              <div className="p-3 shadow d-flex flex-column justify-content-center align-items-center">
                <h2>Rate this recipe</h2>
                <Ratings
                  rating={averageRating}
                  widgetRatedColors="#f5365c"
                  changeRating={changeAverageRating}
                >
                  <Ratings.Widget widgetDimension="25px" />
                  <Ratings.Widget widgetDimension="25px" />
                  <Ratings.Widget widgetDimension="25px" />
                  <Ratings.Widget widgetDimension="25px" />
                  <Ratings.Widget widgetDimension="25px" />
                </Ratings>
                <p className="mt-3">
                  {recipe.ratings.averageRating} average from{" "}
                  {recipe.ratings.ratings.length} votes
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default Recipe;
