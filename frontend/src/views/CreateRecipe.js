import React, { useState } from "react";
import { Redirect } from 'react-router-dom';

import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Col
} from "reactstrap";

import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";

const BASE_URL = "http://localhost:5000/api/recipe";
const AUTH_TOKEN = 'auth_token';
const USER_ID = 'user_id';

function CreateRecipe() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [servings, setServings] = useState(2);
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("breakfast");
  const [ingredients, setIngredients] = useState([]);
  const [directions, setDirections] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const [recipeId, setRecipeId] = useState("");

  function sortStringToArray(string) {
    if (string !== "") {
    var array = [];
    string.split('\n').forEach((item) => {
      if (item.length > 0)
        array.push(item)
    });
    return array;
  } else {
    return string;
  }
  }

  function checkForm() {
    try {
      if (title === "") {
        setErrorMessage(errorMessage.push("Title is missing."));
      }
      if (preparationTime === "") {
        setErrorMessage(errorMessage.push("Preparation Time is missing."));
      }
      if (cookingTime === "") {
        setErrorMessage(errorMessage.push("Cooking Time is missing."));
      }
      if (ingredients !== "") {
        var ingredientsArray = sortStringToArray(ingredients);
      } else {
        setErrorMessage(errorMessage.push("Ingredients section is missing."));
      }
      if (directions !== "") {
        var directionsArray = sortStringToArray(directions);
      } else {
        setErrorMessage(errorMessage.push("Directions section is missing."));
      }
    } catch (error) {
      console.log(error);
    }
    if (errorMessage.length === 0) {
      submitForm(ingredientsArray, directionsArray);
    } else {
      console.log("display errors");
      console.log(errorMessage);
    }
    setErrorMessage([]);
  }

  function submitForm(ingredientsArray, directionsArray) {
    console.log("Submit form");
    let authToken = sessionStorage.getItem(AUTH_TOKEN);
    let userId = sessionStorage.getItem(USER_ID);
    let recipe = {
      title: title,
      description: description,
      preparationTime: preparationTime,
      cookingTime: cookingTime,
      servings: servings,
      difficulty: difficulty,
      category: category,
      ingredients: ingredientsArray,
      directions: directionsArray,
      creator: userId
    }
    fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(recipe)
    })
      // Response received.
      .then(response => response.json())
      // Data retrieved.
      .then(json => {
        console.log(json);
        if (json !== null) {
          console.log("ADDED SUCCESSFUL");
          setRecipeId(json._id);
        }
      })
      // Data not retrieved.
      .catch(function (error) {
        console.log("caught error");
      })
  }

  return (
    <div>
      {recipeId !== "" ? <Redirect to={{
        pathname: "/recipe",
        state: {
          recipeId: recipeId
        }
      }} /> : null}
      <NavigationBar />
      <main className="main">
        <Container className="mt-4 mb-4" style={{ minHeight: '90vh' }}>
          <h1 className="display-3 mb-3">Create a Recipe</h1>

          <Form>
            <FormGroup>
              <Label for="title">Recipe Title</Label>
              <Input
                type="title"
                name="title"
                id="title"
                placeholder="Name of your recipe"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                rows="3"
                placeholder="Give a brief description of your recipe here"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </FormGroup>

            <Row>
              <Col lg="3">
                <FormGroup>
                  <Label for="preparationtime">Preparation Time (min)</Label>
                  <Input
                    type="number"
                    name="preparationtime"
                    id="preparationtime"
                    min={0}
                    value={preparationTime}
                    onChange={e => setPreparationTime(e.target.value)}
                    placeholder={"Enter time in minutes"}

                  />
                </FormGroup>
              </Col>

              <Col lg="3">
                <FormGroup>
                  <Label for="cookingtime">Cooking Time (min)</Label>
                  <Input
                    type="number"
                    name="cookingtime"
                    id="cookingtime"
                    placeholder={"Enter time in minutes"}
                    min={0}
                    value={cookingTime}
                    onChange={e => setCookingTime(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col lg="3">
                <FormGroup>
                  <Label for="servings">Servings</Label>
                  <Input
                    type="number"
                    name="servings"
                    id="servings"
                    placeholder="2"
                    value={servings}
                    onChange={e => setServings(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col lg="3">
                <FormGroup>
                  <Label for="exampleSelect">Difficulty</Label>
                  <Input
                    type="select"
                    name="difficulty"
                    id="difficulty"
                    value={difficulty}
                    onChange={e => setDifficulty(e.target.value)}
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label for="category">Category</Label>
              <Input
                type="select"
                name="category"
                id="category"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="desserts">Desserts</option>
                <option value="drinks">Drinks</option>
                <option value="snacks">Snacks</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="">Vegan</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="ingredients">Ingredients</Label>
              <Input
                type="textarea"
                name="ingredients"
                id="ingredients"
                rows="5"
                placeholder="Put each ingredient on its own line"
                value={ingredients}
                onChange={e => setIngredients(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="directions">Directions</Label>
              <Input
                type="textarea"
                name="directions"
                id="directions"
                rows="5"
                placeholder="Put each step on its own line"
                value={directions}
                onChange={e => setDirections(e.target.value)}
              />
            </FormGroup>

            {/* Pending backend integration */}
            {/* <FormGroup>
              <Label for="recipeimage">Recipe Image</Label>
              <Input
                type="file"
                name="recipeimage"
                id="recipeimage"
              />
              <FormText color="muted">
                For best results, upload an image that is at least 800x600 pixels.
              </FormText>
            </FormGroup> */}

            <Button color="default" onClick={() => checkForm()}>Create</Button>
          </Form>

        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default CreateRecipe;
