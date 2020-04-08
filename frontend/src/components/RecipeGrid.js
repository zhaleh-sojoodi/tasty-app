import React from 'react';
import { Link } from 'react-router-dom';
import star from "../assets/icons/star.svg";
import recipePlaceholder from "../assets/img/placeholders/recipe.png";

import {
  Card,
  Col,
  CardImg,
  CardBody,
  CardSubtitle,
  CardTitle,
  Row
} from 'reactstrap';

function RecipeGrid(props) {
  return (
    <Row>
      {props.props.map(function (recipe, index) {
        return (
          <Col key={index} lg="4" md="6" className="pb-4">
            <Link
            // to={{ pathname: "/recipe", state: {recipeId: recipe.id} }}
            to={`/recipe/${recipe.id}`}
            >
              <Card>
                <CardImg top width="100%" src={ recipePlaceholder } alt={recipe.title} />
                <CardBody>
                  <CardTitle className="h5 mt--2">{recipe.title}</CardTitle>
                  <CardSubtitle className="mt--3 mb-3">
                    <i className="ni ni-favourite-28 text-danger" />
                    <small className="ml-2 text-default">{recipe.likes && recipe.likes.likesNumber ? recipe.likes.likesNumber : 0 } like(s)</small>
                  </CardSubtitle>
                  <CardSubtitle>
                    <img src={star} alt="Star" />
                    <small className="ml-2 text-default">
                      {recipe.ratings.averageRating} ({recipe.ratings.ratings.length} { recipe.ratings.ratings.length === 1 ? "rating" : "ratings" }
                      )</small>
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

export default RecipeGrid;