import React from 'react';
import { Link } from 'react-router-dom';

import {
  Col,
  CardText,
  CardTitle,
  CardSubtitle,
  ListGroup,
  ListGroupItem,
  Row
} from 'reactstrap';

function RecipeList(props) {
  return (
    <ListGroup>
      {props.props.map(function (recipe, index) {
        return (
          <ListGroupItem 
            tag="button" 
            action
          >
          <Link to="/recipe" props={"UserId1"}>
            <Row>
              <Col sm="12" md="4" lg="3">
                <img width="200" src={recipe.image} alt="..." className="img-thumbnail float-left"></img>
              </Col>
              <Col sm="12" md="8" lg="9">
                <CardTitle>{recipe.title}</CardTitle>
                <CardSubtitle>{recipe.description}</CardSubtitle>
                <CardText>
                  <small className="text-muted">Created By: {recipe.creator}</small>
                </CardText>
                {/* <CardSubtitle>Difficulty: {recipe.difficulty}</CardSubtitle>
                <CardSubtitle>Cooking Time: {recipe.cookingTime} min</CardSubtitle>
                <CardSubtitle>Prep Time: {recipe.preparationTime} min</CardSubtitle>
                <CardSubtitle>Category: {recipe.category}</CardSubtitle> */}
              </Col>
            </Row>
          </Link>
          </ListGroupItem>

        )
      })}
    </ListGroup>
  );
}

export default RecipeList;