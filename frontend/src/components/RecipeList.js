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

    </ListGroup >
  );
}

export default RecipeList;