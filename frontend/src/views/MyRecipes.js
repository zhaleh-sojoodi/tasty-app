import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Button } from 'reactstrap';

import NavigationBar from 'components/NavigationBar';
import Footer from 'components/Footer';
import RecipeList from 'components/RecipeList';

import { mostPopular } from "../dummydata";

function MyRecipes() {

  let myRecipes = mostPopular;

  return (
    <div>
      <NavigationBar />
      <main className="main">
        <Container className="mt-4 d-flex justify-content-between">
          <h2 className="display-3 mb-3">Your Recipes</h2>
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
          <RecipeList props = {myRecipes} />
        </Container>
        </main>
      <Footer />
    </div>
  );
}

export default MyRecipes;
