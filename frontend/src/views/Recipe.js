import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Ratings from "react-ratings-declarative";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

import { Button, Container, Row, Col } from "reactstrap";

import { mostPopular } from "../dummydata";

function Recipe(props) {
  let recipe = mostPopular[0];

  let creator = {
    name: "Jane Doe",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    bio:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum possimus odit aut placeat dolores sequi.",
  };

  const [averageRating, changeAverageRating] = useState();

  useEffect(() => {
    console.log(props.location.state.recipeId);
    //Call getRecipeByRecipeId
    //Find creator
    //Call getUserById
    if (recipe.ratings.averageRating !== undefined) {
      changeAverageRating(recipe.ratings.averageRating);
    } else {
      changeAverageRating(0);
    }
  }, [recipe.ratings.averageRating]);
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
                <h3 className="mt-3 display-4">{recipe.title}</h3>

                {/* Like Button */}
                <Button
                  className="btn-icon btn-3 align-self-center"
                  color="danger"
                  type="button"
                >
                  <span className="btn-inner--icon">
                    <i className="ni ni-favourite-28" />
                  </span>
                  <span className="btn-inner--text">{recipe.likes.length}</span>
                </Button>
              </div>
              <hr className="mt-2 mb-3" />

              {/* Recipe Info */}
              <Row>
                {/* Preparation Time */}
                <Col sm="6">
                  <Row>
                    <i className="col-1 ni ni-scissors m-1 recipe-details-icon" />
                    <Col>
                      <strong>Prep Time</strong>
                      <p>{recipe.preparationTime} minutes</p>
                    </Col>
                  </Row>
                </Col>

                {/* Difficulty */}
                <Col sm="6">
                  <Row>
                    <i className="col-1 ni ni-settings-gear-65 m-1 recipe-details-icon" />
                    <Col>
                      <strong>Difficulty</strong>
                      <p>{recipe.difficulty}</p>
                    </Col>
                  </Row>
                </Col>

                {/* Cooking Time */}
                <Col sm="6">
                  <Row>
                    <i className="col-1 ni ni-time-alarm m-1 recipe-details-icon" />
                    <Col>
                      <strong>Cooking Time</strong>
                      <p>{recipe.cookingTime} minutes</p>
                    </Col>
                  </Row>
                </Col>

                {/* Servings */}
                <Col sm="6">
                  <Row>
                    <i className="col-1 ni ni-single-02 m-1 recipe-details-icon" />
                    <Col>
                      <strong>Servings</strong>
                      <p>{recipe.servings} people</p>
                    </Col>
                  </Row>
                </Col>

                {/* Total Time */}
                <Col sm="6">
                  <Row>
                    <i className="col-1 ni ni-single-02 m-1 recipe-details-icon" />
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
                    <i className="col-1 ni ni-folder-17 m-1 recipe-details-icon" />
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
                <Link to="/profile">
                  <h3 className="mt-3 display-4 text-center">{creator.name}</h3>
                </Link>

                {/* Creator Profile Picture */}
                <Link to="/profile">
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
                </Link>

                {/* Creator Bio */}
                <p className="text-center">{creator.bio}</p>
              </div>

              {/* Ratings */}
              <div className="p-3 shadow d-flex flex-column justify-content-center align-items-center">
                <h3 className="mt-3 display-4 text-center">Rate this recipe</h3>
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

              {/* Edit Recipe (Only when the recipe belongs to the current user) */}
              <div className="mt-5 mb-3 d-flex flex-column justify-content-center align-items-center">
                <Link to="/edit-recipe" className="text-muted">
                  Edit recipe
                </Link>
              </div>

              {/* Delete Recipe (Only when the recipe belongs to the current user) */}
              <div className="d-flex flex-column justify-content-center align-items-center">
                <Link
                  to="/"
                  className="text-danger"
                  onClick={() =>
                    alert(`Are you sure you want to delete ${recipe.title}?`)
                  }
                >
                  Delete recipe
                </Link>
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
