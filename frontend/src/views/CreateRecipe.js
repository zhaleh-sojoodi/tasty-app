import React from "react";

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

function CreateRecipe() {
  return (
    <div>
      <NavigationBar />
      <main className="main">
        <Container className="mt-4 mb-4" style={{minHeight:'90vh'}}>
          <h1 className="display-3 mb-3">Create a Recipe</h1>

          <Form>
            <FormGroup>
              <Label for="exampleEmail">Recipe Title</Label>
              <Input
                type="title"
                name="title"
                id="title"
                placeholder="Name of your recipe"
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
              />
            </FormGroup>

            <Row>
                <Col lg="3">
                <FormGroup>
                <Label for="preparationtime">Preparation Time</Label>
                <Input
                    type="number"
                    name="preparationtime"
                    id="preparationtime"
                    placeholder="Enter time in minutes"
                />
                </FormGroup>
                </Col>

                <Col lg="3">
                <FormGroup>
                <Label for="cookingtime">Cooking Time</Label>
                <Input
                    type="number"
                    name="cookingtime"
                    id="cookingtime"
                    placeholder="Enter time in minutes"
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
              >
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Desserts</option>
                <option>Drinks</option>
                <option>Snacks</option>
                <option>Vegetarian</option>
                <option>Vegan</option>
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
              />
            </FormGroup>

            <FormGroup>
              <Label for="steps">Steps</Label>
              <Input
                type="textarea"
                name="steps"
                id="steps"
                rows="5"
                placeholder="Put each step on its own line"
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

            <Button color="default">Create</Button>
          </Form>
        
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default CreateRecipe;
