import React from 'react';
import { Link } from 'react-router-dom';

import {
  Card,
  Col,
  CardImg,
  CardBody,
  CardSubtitle,
  CardTitle,
  Row
} from 'reactstrap';

function RecipeDisplay(props) {
  
  return (
    <Row>
      {props.props.map(function (recipe, index) {
        return (
          <Col key={index} lg="4" md="6" className="pb-4">
            <Link to={{ pathname: "/recipe", state: recipe }}>
              <Card>
                <CardImg top width="100%" src={recipe.image} alt={recipe.title} />
                <CardBody>
                  <CardTitle className="h4 mt--2">{recipe.title}</CardTitle>
                  <CardSubtitle className="mt--3 mb-3">
                    <i className="ni ni-favourite-28 text-danger" />
                    <small className="ml-2 text-default">{recipe.likes.length} people liked this</small>
                  </CardSubtitle>
                  <CardSubtitle>
                    <i className="ni ni-satisfied text-danger" />
                    <small className="ml-2 text-default">{recipe.ratings.averageRating} ({recipe.ratings.ratings.length} ratings)</small>
                  </CardSubtitle>
                </CardBody>
              </Card>
            </Link>
          </Col>
        )
      })}
    </Row>
  );
}

export default RecipeDisplay;