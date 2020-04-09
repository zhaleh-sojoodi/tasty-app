import React, { useState, useEffect } from "react";
import capitalize from '../utils/capitalize';
import forceLogout from '../utils/forceLogout';

import {
  Alert,
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  FormText
} from "reactstrap";

import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";

const BASE_URL = "http://localhost:5000/api/recipe";

function CreateRecipe(props) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    preparationtime: "",
    cookingtime: "",
    servings: "",
    difficulty: "Easy",
    category: "Entree",
    ingredients: "",
    directions: ""
  });
  const [errors, setErrors] = useState([]);

  const {
    title,
    description,
    preparationtime,
    cookingtime,
    servings,
    difficulty,
    category,
    ingredients,
    directions
  } = formData;

  const createRecipe = async() => {
    let id;
    if(sessionStorage.getItem("user_id")) {
        id = sessionStorage.getItem("user_id");
    } else {
        forceLogout();
        return;
    }
    let token = sessionStorage.getItem("auth_token");
    const uri = BASE_URL;

    // Set form data
    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');
    formData.append('title', title);
    if(description !== "") formData.append('description', description);
    formData.append('preparationTime', preparationtime);
    formData.append('cookingTime', cookingtime);
    formData.append('servings', servings);
    formData.append('difficulty', capitalize(difficulty));
    formData.append('category', capitalize(category));
    formData.append('ingredients', JSON.stringify(sortStringToArray(ingredients)));
    formData.append('directions', JSON.stringify(sortStringToArray(directions)));
    if(fileField) formData.append('image', fileField.files[0]);
    formData.append('creator', id);

    // Fetch
    try {
        const response = await fetch(uri, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        // Bad response
        if(response.status === 404) {
            console.log("404...")
            throw response;
        } else if(
            !response.ok ||
            response.status === 422 ||
            response.status === 500
        ) {
            setErrors(["Something went wrong, please try again."]);
            throw response;
        }

        // Success
        let data = await response.json();

        // Redirect to created recipe
        if(data.recipe._id) {
            props.history.push(`/recipe/${data.recipe._id}`);
        }
    } catch(e) {
        console.error(e);
    }
  }

  const onChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const onSubmit = e => {
    e.preventDefault();
    
    let formErrors = [];

    if(title === "") {
        formErrors.push("Recipe title is required.")
    }
    if(preparationtime === "") {
        formErrors.push("Preparation time is required.")
    }
    if(cookingtime === "") {
        formErrors.push("Cooking time is required.")
    }
    if(servings === "") {
        formErrors.push("Servings is required.")
    }
    if(ingredients === "") {
        formErrors.push("Ingredients cannot be empty.")
    }
    if(directions === "") {
        formErrors.push("Directions cannot be empty.")
    }

    if (formErrors.length === 0) {
        setErrors([]);
        createRecipe();
    } else {
        setErrors(formErrors);
    }
  }

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

  useEffect(() => {}, [errors])

  return (
    <>
    <NavigationBar {...props} />
      <main className="main">
        <Container className="mt-4 mb-4">
        
          {/* Display Form Errors */}
          { errors.length > 0 &&
          <>
          <Alert color="default">
          <ul className="my-3">
          { errors.map((error, i) =>{
            return <li key={i}>{error}</li>
          }) }
          </ul>
          </Alert>
          </>
          }

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
                onChange={e => onChange(e)}
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
                onChange={e => onChange(e)}
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
                    value={preparationtime}
                    placeholder={"Enter time in minutes"}
                    onChange={e => onChange(e)}
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
                    value={cookingtime}
                    onChange={e => onChange(e)}
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
                    onChange={e => onChange(e)}
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
                    onChange={e => onChange(e)}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
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
                onChange={e => onChange(e)}
              >
                <option value="entree">Entree</option>
                <option value="desserts">Desserts</option>
                <option value="drinks">Drinks</option>
                <option value="snacks">Snacks</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
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
                onChange={e => onChange(e)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="directions">Directions</Label>
              <Input
                type="textarea"
                name="directions"
                id="directions"
                rows="5"
                placeholder="Put each direction on its own line"
                value={directions}
                onChange={e => onChange(e)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="recipeimage">Recipe Image</Label>
              <Input
                type="file"
                name="recipeimage"
                id="recipeimage"
              />
              <FormText color="muted">
                For best results, upload an image that is at least 800x600 pixels.
              </FormText>
            </FormGroup>

            <Button
                color="default"
                onClick={e => onSubmit(e)}
            >
                Create Recipe
            </Button>
          </Form>

        </Container>
      </main>
      <Footer />
     
    </> 
  );
}

export default CreateRecipe;
