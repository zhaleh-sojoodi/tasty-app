import React from 'react';

import { Container } from 'reactstrap';

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
        <Container className="mt-4 mb-4">
          <h4 className="display-4 mb-0">My Recipes</h4>
          <RecipeList props = {myRecipes} />
          <hr />
        </Container>
        </main>
      <Footer />
    </div>
  );
}

export default MyRecipes;
