import React, { useEffect } from 'react';
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

const BASE_URL = "http://localhost:5000/api/user";
const USER_ID = 'user_id';

function RecipeList(props) {
  // console.log('--from recipeList');
  // console.log(props.props);
  // console.log('--from recipeList');

  useEffect(() => {
    const getUser = async() => {
      const settings = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
      let userId = sessionStorage.getItem(USER_ID);

      const uri = BASE_URL + "/" + userId;
  
      try {
        const response = await fetch(uri, settings);
        let data = await response.json();
       console.log(data);
      } catch(e) {
        console.error(e);
      }
    }
    props.props.forEach((recipe) => {
      getUser();
    })
  }, []);

  return (
    <ListGroup>
      {props.props.map(function (recipe, index) {
        //console.log(recipe);
        return (
          // {/* State to be changed to ObjectID */ }
          <Link to={{ pathname: "/recipe", state: recipe }} key={index}>
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