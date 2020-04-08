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
const AUTH_TOKEN = 'auth_token';

function Recipe(props) {

  
  const [recipe, setRecipe] = useState({});
  const [recipeExists, setRecipeExists] = useState(true);
  const [recipeBelongsToUser, setRecipeBelongsToUser] = useState(false);
  const [creator, setCreator] = useState({});
  const [creatorID, setCreatorID] = useState();

  const [averageRating, changeAverageRating] = useState();
  const [likes, setLikes] = useState();
  const [likeButtonColor, setLikeButtonColor] = useState();

  const settings = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
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

  const fetchRecipe = async(id) => {
    // Get recipe data
    try {
      const uri = BASE_URL + "/recipe/" + id;
      const response = await fetch(uri, settings);

      // Unable to fetch recipe
      if(!response.ok || response.status == 500) {
        console.log("Unable to retrieve recipe.");
        setRecipeExists(false);
        return;
      }

      // Successful fetch
      let data = await response.json();
      setRecipe(data.recipe);
      setCreatorID(data.recipe.creator);
      setLikes(data.recipe.likes.likesNumber);
      setLikeButtonColor(checkUserLikesRecipe(data.recipe.likes.likes));
    } catch(e) {
      console.error(e);
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
        response.status == 401 ||
        response.status == 500
      ) {
        alert("Could not create recipe. Please try again.");
        setRecipeExists(false);
        throw response;
      } else if (response.status == 404) {
        forceLogout();
        throw response;
      }

      // Successful delete
      let data = await response.json();
    } catch(err) {
      setRecipeExists(false);
      console.error(err);
    }
  }

  const toggleLike = async() => {
    let token;
    let userID;

    if(sessionStorage.getItem("auth_token") && sessionStorage.getItem("user_id")) {
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
        response.status == 404 ||
        response.status == 500
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
  }, [creatorID, likes])

  // useEffect(() => {
  //   const getRecipe = async () => {
  //     const uri = BASE_URL + "/" + props.location.state.recipeId;
  //     try {
  //       const response = await fetch(uri, settings);
  //       let data = await response.json();
  //       setRecipe(data.recipe);
  //       console.log(data.recipe);
  //     } catch(e) {
  //       console.error(e);
  //     }
      
  //   }
  //   getRecipe();
  //   //Find creator
  //   //Call getUserById
  // //   if (props.location.state.ratings.averageRating !== undefined) {
  // //     changeAverageRating(props.location.state.ratings.averageRating);
  // //   } else {
  // //     changeAverageRating(0);
  // //   }
  // // }, [props.location.state.ratings.averageRating]);
  // },[]);

  // Note: Add [averageRating] to the dependency array of useEffect once the POST to submit the user's rating is completed.

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
                className="img-fluid"
                src={ recipePlaceholder }
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
                      <p>{ recipe && recipe.servings} people</p>
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
              <p>{ recipe && recipe.description !== "" ? recipe.description : "No description available."}</p>
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
                <Link to={ creatorID && "/profile/" + creatorID }>
                  <h3 className="mt-3 display-4 text-center">
                  { creator && creator.name }
                  </h3>
                </Link>

                {/* Creator Profile Picture */}
                <Link to={ creatorID && "/profile/" + creatorID }>
                  <img
                    style={{
                      borderRadius: "50%",
                      width: "150px",
                      height: "150px",
                      objectFit: "cover"
                    }}
                    className="img-fluid mx-auto d-block mb-3"
                    src={ profilePlaceholder }
                    alt={ creator && creator.name }
                  />
                </Link>

                {/* Creator Bio */}
                <p className="text-center">{ creator && creator.biography }</p>
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
                  {recipe.ratings && recipe.ratings.averageRating} average from{" "}
                  {recipe.ratings && recipe.ratings.ratings.length} votes
                </p>
              </div>

              {/* Edit Recipe (Only when the recipe belongs to the current user) */}
              { recipeBelongsToUser &&
              <div className="mt-5 mb-3 d-flex flex-column justify-content-center align-items-center">
                <Link to={`/edit-recipe/${recipe.id}`} className="text-muted">
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
            Sorry, this recipe doesn't exist <span role="img" aria-label="Crying Emoji">😢</span>
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

  // return (
  //   <>
  //     <NavigationBar {...props} />
  //     <main className="main">
  //       <Container className="mt-5">
  //         <Row>
  //           {/* Recipe Details */}
  //           <Col lg="8">
  //             {/* Image */}
  //             <img
  //               className="img-fluid"
  //               src={ recipePlaceholder }
  //               // src={props.location.state.image}
  //               alt={props.location.state.title}
  //             />

  //             {/* Title & Like Recipe*/}
  //             <div className="d-flex justify-content-between">
  //               {/* Title */}
  //               <h3 className="mt-3 display-4">{recipe.title}</h3>

  //               {/* Like Button */}
  //               <Button
  //                 className="btn-icon btn-3 align-self-center"
  //                 color="danger"
  //                 type="button"
  //               >
  //                 <span className="btn-inner--icon">
  //                   <i className="ni ni-favourite-28" />
  //                 </span>
  //                 <span className="btn-inner--text">{recipe.likes && recipe.likes.likesNumber}</span>
  //               </Button>
  //             </div>
  //             <hr className="mt-2 mb-3" />

  //             {/* Recipe Info */}
  //             <Row>
  //               {/* Preparation Time */}
  //               <Col sm="6">
  //                 <Row>
  //                   <i className="col-1 ni ni-scissors m-1 recipe-details-icon" />
  //                   <Col>
  //                     <strong>Prep Time</strong>
  //                     <p>{recipe.preparationTime} minutes</p>
  //                   </Col>
  //                 </Row>
  //               </Col>

  //               {/* Difficulty */}
  //               <Col sm="6">
  //                 <Row>
  //                   <i className="col-1 ni ni-settings-gear-65 m-1 recipe-details-icon" />
  //                   <Col>
  //                     <strong>Difficulty</strong>
  //                     <p>{recipe.difficulty}</p>
  //                   </Col>
  //                 </Row>
  //               </Col>

  //               {/* Cooking Time */}
  //               <Col sm="6">
  //                 <Row>
  //                   <i className="col-1 ni ni-time-alarm m-1 recipe-details-icon" />
  //                   <Col>
  //                     <strong>Cooking Time</strong>
  //                     <p>{recipe.cookingTime} minutes</p>
  //                   </Col>
  //                 </Row>
  //               </Col>

  //               {/* Servings */}
  //               <Col sm="6">
  //                 <Row>
  //                   <i className="col-1 ni ni-single-02 m-1 recipe-details-icon" />
  //                   <Col>
  //                     <strong>Servings</strong>
  //                     <p>{recipe.servings} people</p>
  //                   </Col>
  //                 </Row>
  //               </Col>

  //               {/* Total Time */}
  //               <Col sm="6">
  //                 <Row>
  //                   <i className="col-1 ni ni-single-02 m-1 recipe-details-icon" />
  //                   <Col>
  //                     <strong>Total Time</strong>
  //                     <p>
  //                       {recipe.cookingTime + recipe.preparationTime} minutes
  //                     </p>
  //                   </Col>
  //                 </Row>
  //               </Col>

  //               {/* Category */}
  //               <Col sm="6">
  //                 <Row>
  //                   <i className="col-1 ni ni-folder-17 m-1 recipe-details-icon" />
  //                   <Col>
  //                     <strong>Category</strong>
  //                     <p>{recipe.category}</p>
  //                   </Col>
  //                 </Row>
  //               </Col>
  //             </Row>
  //             <hr className="mt-3 mb-3" />

  //             {/* Description */}
  //             <p>{recipe.description !== "" ? recipe.description : "No description available."}</p>
  //             <hr className="mt-3 mb-3" />

  //             {/* Ingredients */}
  //             <h4>Ingredients</h4>
  //             <ul>
  //               {recipe.ingredients && recipe.ingredients.map(function (ingredient, i) {
  //                 return <li key={i}>{ingredient}</li>;
  //               })}
  //             </ul>
  //             <hr className="mt-3 mb-3" />

  //             {/* Steps */}
  //             <h4>Directions</h4>
  //             <ol className="mb-5">
  //               {recipe.directions && recipe.directions.map(function (step, i) {
  //                 return <li key={i}>{step}</li>;
  //               })}
  //             </ol>
  //           </Col>

  //           {/* Author Details, Stats */}
  //           <Col>
  //             {/* Author Details */}
  //             <div className="p-3 mb-4 shadow">
  //               {/* Creator Name */}
  //               <Link to="/profile">
  //                 <h3 className="mt-3 display-4 text-center">{creator.name}</h3>
  //               </Link>

  //               {/* Creator Profile Picture */}
  //               <Link to="/profile">
  //                 <img
  //                   style={{
  //                     borderRadius: "50%",
  //                     width: "150px",
  //                     height: "150px",
  //                     objectFit: "cover"
  //                   }}
  //                   className="img-fluid mx-auto d-block mb-3"
  //                   src={ profilePlaceholder }
  //                   alt={creator.name}
  //                 />
  //               </Link>

  //               {/* Creator Bio */}
  //               <p className="text-center">{creator.bio}</p>
  //             </div>

  //             {/* Ratings */}
  //             <div className="p-3 shadow d-flex flex-column justify-content-center align-items-center">
  //               <h3 className="mt-3 display-4 text-center">Rate this recipe</h3>
  //               <Ratings
  //                 rating={averageRating}
  //                 widgetRatedColors="#f5365c"
  //                 changeRating={changeAverageRating}
  //               >
  //                 <Ratings.Widget widgetDimension="25px" />
  //                 <Ratings.Widget widgetDimension="25px" />
  //                 <Ratings.Widget widgetDimension="25px" />
  //                 <Ratings.Widget widgetDimension="25px" />
  //                 <Ratings.Widget widgetDimension="25px" />
  //               </Ratings>
  //               <p className="mt-3">
  //                 {recipe.ratings && recipe.ratings.averageRating} average from{" "}
  //                 {recipe.ratings && recipe.ratings.ratings.length} votes
  //               </p>
  //             </div>

  //             {/* Edit Recipe (Only when the recipe belongs to the current user) */}
  //             <div className="mt-5 mb-3 d-flex flex-column justify-content-center align-items-center">
  //               <Link to="/edit-recipe" className="text-muted">
  //                 Edit recipe
  //               </Link>
  //             </div>

  //             {/* Delete Recipe (Only when the recipe belongs to the current user) */}
  //             <div className="d-flex flex-column justify-content-center align-items-center">
  //               <Link
  //                 to="/"
  //                 className="text-danger"
  //                 onClick={() =>
  //                   alert(`Are you sure you want to delete ${props.location.state.title}?`)
  //                 }
  //               >
  //                 Delete recipe
  //               </Link>
  //             </div>
  //           </Col>
  //         </Row>
  //       </Container>
  //     </main>
  //     <Footer />
  //   </>
  // );
}

export default Recipe;
