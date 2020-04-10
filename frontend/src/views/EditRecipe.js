import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import capitalize from '../utils/capitalize';
import forceLogout from "../utils/forceLogout";

import {
  Alert,
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Col,
} from "reactstrap";

import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";

const BASE_URL = "http://localhost:5000/api";

function EditRecipe(props) {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    preparationtime: "",
    cookingtime: "",
    servings: "",
    difficulty: "easy",
    category: "entree",
    ingredients: "",
    directions: ""
  });
  const [errors, setErrors] = useState([]);
  const [recipeID, setRecipeID] = useState(null);

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

  const updateRecipe = async(id) => {
    let token = sessionStorage.getItem("auth_token");

    if(token) {
      const uri = BASE_URL + "/recipe/" + id;

      try {
        const response = await fetch(uri, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description ? formData.description : "",
            preparationTime: formData.preparationtime,
            cookingTime: formData.cookingtime,
            servings: formData.servings,
            difficulty: capitalize(formData.difficulty),
            category: capitalize(formData.category),
            ingredients: sortStringToArray(formData.ingredients),
            directions: sortStringToArray(formData.directions)
          })
        });

        // Bad response
        if(!response.ok) {
          if(response.status === 401) {
            forceLogout();
            throw response;
          } else if(response.status === 422) {
            setErrors(errors => [...errors, "Invalid input. Please try again."]);
            throw response;
          } else if(response.status === 500) {
            setErrors(errors => [...errors, "Failed to update recipe. Please try again later."]);
            throw response;
          } else {
            setErrors(errors => [...errors, "Something went wrong. Please try again later."]);
            throw response;
          }
        }

        // Success
        let data = await response.json();

        // Redirect to created recipe
        if(data.recipe._id) {
          props.history.push(`/recipe/${data.recipe._id}`);
          window.location.reload();
        }
      } catch(e) {
        console.error(e);
      }
    } else {
      forceLogout()
      return;
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
      console.log("Ready to submit.");
      updateRecipe(recipeID);
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

  useEffect(() => {
    window.scrollTo(0, 0);

    if(props.match.params.id) {
      setRecipeID(props.match.params.id);
    } else {
      setRecipeID(null);
    }
  }, [errors, props.match.params.id])

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

          {/* If Recipe Exists */}
          { recipeID !== null ?
          <>
          <h1 className="display-3 mb-3">Edit Recipe</h1>
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
                rows="10"
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
                rows="10"
                placeholder="Put each direction on its own line"
                value={directions}
                onChange={e => onChange(e)}
              />
            </FormGroup>

            <Button
              color="default"
              onClick={e => onSubmit(e)}
            >
              Save Changes
            </Button>
          </Form>
          </>
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

export default EditRecipe;
