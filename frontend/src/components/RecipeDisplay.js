import React from 'react';
import { Link } from 'react-router-dom';

import {
  Card,
  Col,
  CardImg,
  CardSubtitle,
  CardTitle,
  Row
} from 'reactstrap';

function RecipeDisplay(props) {
  return (
    <Row className="ml-1 mr-1">
      {props.props.map(function (recipe, index) {
        return (
          <Col xs="12" sm="6" lg="3" key={index}>
            <Link to={{ pathname: "/recipe", state: recipe.creator }}>
              <Card tag="button" className="p-1 m-auto">
                <CardImg top width="100%" src={recipe.image} alt="Card image cap" />
                <CardTitle>{recipe.title}</CardTitle>
                <CardSubtitle>Created By: {recipe.creator}</CardSubtitle>
                <CardSubtitle>Difficulty: {recipe.difficulty}</CardSubtitle>
                <CardSubtitle>Cooking Time: {recipe.cookingTime} min</CardSubtitle>
                <CardSubtitle>Prep Time: {recipe.preparationTime} min</CardSubtitle>
                <CardSubtitle>Category: {recipe.category}</CardSubtitle>
              </Card>
            </Link>

          </Col>
        )
      })}
    </Row>
  );
}

export default RecipeDisplay;