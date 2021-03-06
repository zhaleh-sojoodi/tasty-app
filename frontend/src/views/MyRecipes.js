import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Container, Button } from 'reactstrap';

import NavigationBar from 'components/NavigationBar';
import Footer from 'components/Footer';
import RecipeGrid from 'components/RecipeGrid';

const BASE_URL = "http://localhost:5000/api/recipe";
const USER_ID = 'user_id';

function MyRecipes(props) {
  const [recipes, setRecipes] = useState();
  
  useEffect(() => {
    const getMyRecipes = async() => {
      const settings = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
      let userId = sessionStorage.getItem(USER_ID);
      const uri = BASE_URL + "/user/" + userId;
  
      try {
        const response = await fetch(uri, settings);
        let data = await response.json();
        setRecipes(data.recipes);
      } catch(e) {
        console.error(e);
      }
    }
    getMyRecipes();
  }, []);

  return (
    <>
      <NavigationBar {...props} />
      <main className="main">
        <Container className="mt-4 d-flex justify-content-between">
          <h2 className="display-3 mb-3">My Recipes</h2>
          <Button
            className="mb-4"
            color="default"
            type="button"
            tag={Link}
            to="/create-recipe"
          >
            Create New
          </Button>
        </Container>
        <Container>
          {recipes && <RecipeGrid props={recipes} /> }
        </Container>
        </main>
      <Footer />
    </>
  );
}

export default MyRecipes;
