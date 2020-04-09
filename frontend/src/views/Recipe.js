import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import forceLogout from "../utils/forceLogout";

import Ratings from "react-ratings-declarative";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

import { Button, Container, Row, Col } from "reactstrap";
import recipePlaceholder from "../assets/img/placeholders/recipe.png";
import profilePlaceholder from "../assets/img/placeholders/profile.jpg";

const BASE_URL = "http://localhost:5000/api";

function Recipe(props) {

  const [recipe, setRecipe] = useState({});
  const [recipeExists, setRecipeExists] = useState(true);
  const [recipeBelongsToUser, setRecipeBelongsToUser] = useState(false);
  const [creator, setCreator] = useState({});
  const [creatorID, setCreatorID] = useState();

  const [likes, setLikes] = useState();
  const [likeButtonColor, setLikeButtonColor] = useState("default");

  const [userRating, setUserRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const [errors, setErrors] = useState([]);

  const settings = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }

  function checkLoggedIn() {
    return sessionStorage.getItem("auth_token") ? true : false;
  }

  function checkUserLikesRecipe(users) {
    let id = sessionStorage.getItem("user_id") ? sessionStorage.getItem("user_id") : forceLogout();
    let userLikesRecipe = false;

    if(!users.length) {
      userLikesRecipe = false;
    } else {
      users.forEach((user) => {
        if(id === user) {
          userLikesRecipe = true;
        }
      })
    }
    return userLikesRecipe ? "danger" : "default";
  }

  function checkUserRatedRecipe(ratings) {
    let userRating = 0;
    if(ratings.length > 0) {
      if(sessionStorage.getItem("user_id")) {
        ratings.forEach((r) => {
          if(r.user === sessionStorage.getItem("user_id")) {
            userRating = r.rating;
          }
        })
      } else {
        forceLogout();
        return;
      }
    }
    return userRating;
  }

  const fetchRecipe = async(id) => {
    // Get recipe data
    try {
      const uri = BASE_URL + "/recipe/" + id;
      const response = await fetch(uri, settings);

      // Unable to fetch recipe
      if(!response.ok || response.status === 500) {
        console.log("Unable to retrieve recipe.");
        setRecipeExists(false);
        return;
      }

      // Successful fetch
      let data = await response.json();
      console.log(data)

      // Set recipe data
      setRecipe(data.recipe);
      setCreatorID(data.recipe.creator);
      setLikes(data.recipe.likes.likesNumber);
      setAverageRating(data.recipe.ratings.averageRating);

      // If the user is logged in, set their likes and ratings
      if(checkLoggedIn()) {
        setLikeButtonColor(checkUserLikesRecipe(data.recipe.likes.likes));
        setUserRating(checkUserRatedRecipe(data.recipe.ratings.ratings));
      }
    } catch(e) {
      console.error(e);
      setRecipeExists(false);
    }
  }

  const fetchCreator = async(id) => {
    // Get user data
    try {
      const uri = BASE_URL + "/user/" + id;
      const response = await fetch(uri, settings);

      // Unable to fetch user data
      if(!response.ok) {
        console.log("Unable to get user profile.");
        return;
      }

      // Successful fetch, get user data
      let data = await response.json();
      setCreator(data.user);
    } catch(err) {
      console.error(err);
    }
  }

  const deleteRecipe = async(id) => {
    let token = sessionStorage.getItem("auth_token");
    try {
      const uri = BASE_URL + "/recipe/" + id;
      const response = await fetch(uri, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      // Unable to delete recipe
      if(
        !response.ok ||
        response.status === 401 ||
        response.status === 500
      ) {
        alert("Could not create recipe. Please try again.");
        setRecipeExists(false);
        throw response;
      } else if (response.status === 404) {
        forceLogout();
        throw response;
      }
    } catch(err) {
      setRecipeExists(false);
      console.error(err);
    }
  }

  const toggleLike = async() => {
    let token;
    let userID;

    // Continue only if there is a user logged in
    if(checkLoggedIn()) {
      if(sessionStorage.getItem("user_id")) {
        token = sessionStorage.getItem("auth_token");
        userID = sessionStorage.getItem("user_id");
      } else {
        forceLogout();
        return;
      }

      try {
        const uri = BASE_URL + `/recipe/${userID}/${recipe.id}`;
        const response = await fetch(uri, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        // Unable to like/unlike recipe
        if(!response.ok ||
          response.status === 404 ||
          response.status === 500
        ) {
          console.log("Can't like or unlike your recipe.")
          throw response;
        }

        // Successful like/unlike
        let data = await response.json();
        setLikes(data.likes.likesNumber);
      } catch(err) {
        setRecipeExists(false);
        console.error(err);
      }
    } else {
      // User is not logged in, redirect user to login page
      props.history.push("/login");
    }
  }

  const addRating = async(rating) => {
    let token;
    let userID;

    // User is logged in, add their rating
    if(checkLoggedIn()) {
      // Check if user is valid
      if(sessionStorage.getItem("user_id")) {
        token = sessionStorage.getItem("auth_token");
        userID = sessionStorage.getItem("user_id");
      // User is not authorized anymore, log them out
      } else {
        forceLogout();
        return;
      }

      // Fetch
      try {
        const uri = BASE_URL + "/recipe/rate";
        const response = await fetch(uri, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            userId: userID,
            recipeId: recipe.id,
            rate: rating
          })
        });

        // Bad response
        if (!response.ok ||
          response.status === 404 ||
          response.status === 500) {
          setErrors(errors => [...errors, "YIKES!"]);
          throw response;
        }

        // Successful fetch
        let data = await response.json();
        setUserRating(rating);
        setAverageRating(data.recipe.ratings.averageRating);
      } catch(e) {
        console.error(e);
        setErrors(errors => [...errors, "I caught something bad"]);
      }
    } else {
      // User is not logged in, redirect user to login page
      props.history.push("/login");
    }
  }

  function confirmDelete(e) {
    if(window.confirm(`Are you sure you want to delete ${recipe.title}?`)) {
      console.log(recipe.id)
      deleteRecipe(recipe.id);
      props.history.push("/my-recipes");
      window.location.reload();
    }
  }

  useEffect(() => {
    // Check if ID params exist in URL
    if(props.match.params.id) {
      // Fetch recipe data with params ID
      fetchRecipe(props.match.params.id);

      // Fetch creator data
      if(creatorID) {
        fetchCreator(creatorID)

        // Check if recipe belongs to current user
        if(creatorID === sessionStorage.getItem("user_id")) {
          setRecipeBelongsToUser(true);
        }
      }
    } else {
      setRecipeExists(false);
    }
  }, [creatorID, likes, userRating])

  return (
    <>
      <NavigationBar {...props} />
      <main className="main">
        <Container className="mt-5">

          {/* If Recipe Exists */}
          { recipeExists ?
          <Row>
            {/* Recipe Details */}
            <Col lg="8">
              {/* Image */}
              <img
                className="img-fluid recipe-detail-img"
                src={ recipe && recipe.imageURL ? recipe.imageURL : recipePlaceholder }
                alt={ recipe && recipe.title }
              />

              {/* Title & Like Recipe*/}
              <div className="d-flex justify-content-between">
                {/* Title */}
                <h3 className="mt-3 display-4">{recipe.title}</h3>

                {/* Like Button */}
                <Button
                  className="btn-icon btn-3 align-self-center"
                  color={ likeButtonColor }
                  type="button"
                  onClick={() => toggleLike()}
                >
                  <span className="btn-inner--icon">
                    <i className="ni ni-favourite-28" />
                  </span>
                  <span className="btn-inner--text">
                  { likes && likes }
                  </span>
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
                      <p>{ recipe && recipe.preparationTime} minutes</p>
                    </Col>
                  </Row>
                </Col>

                {/* Difficulty */}
                <Col sm="6">
                  <Row>
                    <i className="col-1 ni ni-settings-gear-65 m-1 recipe-details-icon" />
                    <Col>
                      <strong>Difficulty</strong>
                      <p>{ recipe && recipe.difficulty}</p>
                    </Col>
                  </Row>
                </Col>

                {/* Cooking Time */}
                <Col sm="6">
                  <Row>
                    <i className="col-1 ni ni-time-alarm m-1 recipe-details-icon" />
                    <Col>
                      <strong>Cooking Time</strong>
                      <p>{ recipe && recipe.cookingTime} minutes</p>
                    </Col>
                  </Row>
                </Col>

                {/* Servings */}
                <Col sm="6">
                  <Row>
                    <i className="col-1 ni ni-single-02 m-1 recipe-details-icon" />
                    <Col>
                      <strong>Servings</strong>
                      <p>{ recipe.servings == 1 ? <>{recipe.servings} person</> : <>{recipe.servings} people</>}</p>
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
                        { recipe && recipe.cookingTime + recipe.preparationTime} minutes
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
                      <p>{ recipe && recipe.category}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <hr className="mt-3 mb-3" />

              {/* Description */}
              <p>
                { recipe.description && recipe.description !== "" ? recipe.description : "No description available."}
              </p>
              <hr className="mt-3 mb-3" />

              {/* Ingredients */}
              <h4>Ingredients</h4>
              <ul>
                {recipe.ingredients && recipe.ingredients.map(function (ingredient, i) {
                  return <li key={i}>{ingredient}</li>;
                })}
              </ul>
              <hr className="mt-3 mb-3" />

              {/* Directions */}
              <h4>Directions</h4>
              <ol className="mb-5">
                { recipe && recipe.directions && recipe.directions.map(function (step, i) {
                  return <li key={i}>{step}</li>;
                })}
              </ol>
            </Col>

            {/* Author Details, Stats */}
            <Col>
              {/* Author Details */}
              <div className="p-3 mb-4 shadow">
                {/* Creator Name */}
                <Link to={`/profile/${creatorID}`}>
                  <h3 className="mt-3 display-4 text-center">
                  { creator && creator.name }
                  </h3>
                </Link>

                {/* Creator Profile Picture */}
                <Link to={`/profile/${creatorID}`}>
                  <img
                    style={{
                      borderRadius: "50%",
                      width: "150px",
                      height: "150px",
                      objectFit: "cover"
                    }}
                    className="img-fluid mx-auto d-block mb-3"
                    src={ creator && creator.imageURL ? creator.imageURL : profilePlaceholder }
                    alt={ creator && creator.name }
                  />
                </Link>

                {/* Creator Bio */}
                <p className="text-center">{ creator && creator.biography }</p>
              </div>

              {/* Ratings */}
              <div className="p-3 shadow d-flex flex-column justify-content-center align-items-center">
                <h3 className="mt-3 display-4 text-center">Average Rating</h3>
                
                {/* Average Rating */}
                <Ratings
                  rating={ averageRating }
                  widgetRatedColors="#f5365c"
                  changeRating={addRating}
                >
                  <Ratings.Widget widgetDimension="20px" />
                  <Ratings.Widget widgetDimension="20px" />
                  <Ratings.Widget widgetDimension="20px" />
                  <Ratings.Widget widgetDimension="20px" />
                  <Ratings.Widget widgetDimension="20px" />
                </Ratings>
                <p className="mt-3">
                  from {recipe.ratings && recipe.ratings.ratings.length} vote(s)
                </p>
                
                {/* User Rating Info */}
                { checkLoggedIn() &&
                <p className="text-muted mt--2" style={{fontSize:"0.9rem"}}>
                  { userRating > 0 ? 
                  <>You gave this {userRating} stars <span role="img" aria-label="Thumbs up emoji">👍</span></>
                  :
                  <>You haven't rated this recipe yet.</>
                  }
                </p>
                }

              </div>

              {/* Edit Recipe (Only when the recipe belongs to the current user) */}
              { recipeBelongsToUser &&
              <div className="mt-5 mb-3 d-flex flex-column justify-content-center align-items-center">
                <Link
                  to="/edit-recipe"
                  // to={`/edit-recipe/${recipe.id}`}
                  className="text-muted"
                >
                  Edit recipe
                </Link>
              </div>
              }

              {/* Delete Recipe (Only when the recipe belongs to the current user) */}
              { recipeBelongsToUser &&
              <div className="d-flex flex-column justify-content-center align-items-center">
                <Link
                  to="#"
                  className="text-danger"
                  onClick={ () => confirmDelete() }
                >
                  Delete recipe
                </Link>
              </div>
              }

            </Col>
          </Row>
          :
          <div className="px-4 d-flex flex-column justify-content-center">
          <h1 className="text-center mt-5">
            Sorry, this recipe doesn't exist <span role="img" aria-label="Ghost emoji">👻</span>
          </h1>
          <Link
            className="text-default text-center mt-3"
            to="/"
          >
            &larr; Back to Dashboard
          </Link>
          </div>
          }
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default Recipe;
