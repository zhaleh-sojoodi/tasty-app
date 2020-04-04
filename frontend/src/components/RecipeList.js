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
          // {/* State to be changed to ObjectID */ }
          <Link to={{ pathname: "/recipe", state: recipe.creator }} key={index}>
            <ListGroupItem className="mb-3" tag="button" action >
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
                </Col>
              </Row>
            </ListGroupItem>
          </Link>
        )
      })}
    </ListGroup >
  );
}

export default RecipeList;